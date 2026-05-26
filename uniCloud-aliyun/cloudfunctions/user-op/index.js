'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { action } = event;

  try {
    // ─── 拉黑 ───
    if (action === 'block') {
      const { fromUserId, targetUserId } = event;
      if (!fromUserId || !targetUserId) {
        return { code: -1, message: '参数不完整' };
      }
      if (fromUserId === targetUserId) {
        return { code: -1, message: '不能拉黑自己' };
      }

      const existing = await db.collection('harmony-blocks')
        .where({ fromUserId, targetUserId })
        .get();

      if (existing.data && existing.data.length) {
        return { code: 0, message: '已拉黑' };
      }

      await db.collection('harmony-blocks').add({
        fromUserId,
        targetUserId,
        created_at: Date.now()
      });

      return { code: 0, message: '拉黑成功' };
    }

    // ─── 取消拉黑 ───
    if (action === 'unblock') {
      const { fromUserId, targetUserId } = event;
      if (!fromUserId || !targetUserId) {
        return { code: -1, message: '参数不完整' };
      }

      await db.collection('harmony-blocks')
        .where({ fromUserId, targetUserId })
        .remove();

      return { code: 0, message: '已取消拉黑' };
    }

    // ─── 查询用户的拉黑列表 ───
    if (action === 'listBlocks') {
      const { fromUserId } = event;
      if (!fromUserId) {
        return { code: -1, message: '参数不完整' };
      }

      const res = await db.collection('harmony-blocks')
        .where({ fromUserId })
        .get();

      return {
        code: 0,
        data: (res.data || []).map(x => x.targetUserId)
      };
    }

    // ─── 举报 ───
    if (action === 'report') {
      const { fromUserId, targetType, targetId, reason } = event;
      if (!fromUserId || !targetType || !targetId) {
        return { code: -1, message: '参数不完整' };
      }

      await db.collection('harmony-reports').add({
        fromUserId,
        targetType,           // 'user' | 'post' | 'comment'
        targetId,
        reason: reason || '',
        status: 'pending',
        created_at: Date.now()
      });

      return { code: 0, message: '已收到举报，我们会尽快处理' };
    }

    return { code: -1, message: '未知操作' };

  } catch (e) {
    return { code: -1, message: e.message || '操作失败' };
  }
};
