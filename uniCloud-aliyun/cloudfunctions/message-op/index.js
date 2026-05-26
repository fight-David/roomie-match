'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { action } = event;

  try {
    if (action === 'send') {
      const { convId, senderId, text, peerId, ownerId } = event;

      const existing = await db.collection('harmony-conversations')
        .where({ id: convId })
        .get();

      const now = Date.now();
      const time = new Date(now).toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
      });

      const msg = {
        senderId,
        text,
        time,
        timestamp: now
      };

      const convData = {
        lastMsg: text,
        lastTime: time,
        lastTimestamp: now
      };

      if (existing.data && existing.data.length) {
        await db.collection('harmony-conversations')
          .where({ id: convId })
          .update({
            ...convData,
            messages: db.command.push(msg)
          });
      } else {
        // 新会话：用前端传的 ownerId（双方 id 中较小那个），保证查询时双方都能查到
        const newConv = {
          id: convId,
          ownerId: ownerId || senderId,
          peerId,
          peerName: event.peerName || '',
          peerAvatar: event.peerAvatar || '',
          ...convData,
          unread: 0,
          messages: [msg]
        };
        await db.collection('harmony-conversations').add(newConv);
      }

      await db.collection('harmony-messages').add({
        convId,
        senderId,
        text,
        time,
        timestamp: now
      });

      return { code: 0, message: '发送成功' };
    }

    if (action === 'list') {
      const { userId } = event;
      if (!userId) {
        return { code: -1, message: '缺少 userId' };
      }

      const dbCmd = db.command;
      const res = await db.collection('harmony-conversations')
        .where(dbCmd.or([
          { ownerId: userId },
          { peerId: userId }
        ]))
        .orderBy('lastTimestamp', 'desc')
        .get();

      return {
        code: 0,
        data: res.data || []
      };
    }

    if (action === 'getMessages') {
      const { convId } = event;
      const res = await db.collection('harmony-conversations')
        .where({ id: convId })
        .get();

      if (res.data && res.data.length) {
        return {
          code: 0,
          data: res.data[0].messages || []
        };
      }
      return { code: 0, data: [] };
    }

    return { code: -1, message: '未知操作' };

  } catch (e) {
    return { code: -1, message: e.message || '操作失败' };
  }
};
