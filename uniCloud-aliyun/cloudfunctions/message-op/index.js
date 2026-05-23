'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { action } = event;

  try {
    if (action === 'send') {
      const { convId, senderId, text, peerId } = event;

      // 查找或创建会话
      let conv;
      const existing = await db.collection('harmony-conversations')
        .where({ id: convId })
        .get();

      const now = Date.now();
      const time = new Date(now).toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
      });

      const msg = {
        from: senderId === event.currentUserId ? 'me' : 'peer',
        text,
        time,
        timestamp: now
      };

      const convData = {
        lastMsg: text,
        lastTime: time,
      };

      if (existing.data && existing.data.length) {
        // 已有会话，追加消息
        await db.collection('harmony-conversations')
          .where({ id: convId })
          .update({
            ...convData,
            messages: db.command.push(msg)
          });
      } else {
        // 新会话
        const newConv = {
          id: convId,
          peerId,
          peerName: event.peerName || '',
          peerAvatar: event.peerAvatar || '',
          ...convData,
          unread: 0,
          messages: [msg]
        };
        await db.collection('harmony-conversations').add(newConv);
      }

      // 同步写入消息集合
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
      // 获取用户所有会话
      const { userId } = event;
      const res = await db.collection('harmony-conversations')
        .where({
          $or: [
            { peerId: userId }
          ]
        })
        .orderBy('lastTime', 'desc')
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
