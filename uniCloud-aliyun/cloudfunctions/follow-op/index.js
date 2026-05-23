'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { action, followerId, followeeId } = event;

  try {
    if (action === 'follow') {
      // 先查是否已关注
      const existing = await db.collection('harmony-follows')
        .where({ followerId, followeeId })
        .get();

      if (existing.data && existing.data.length) {
        return { code: 0, message: '已关注' };
      }

      // 新增关注
      await db.collection('harmony-follows').add({
        followerId,
        followeeId,
        created_at: Date.now()
      });

      return { code: 0, message: '关注成功' };
    }

    if (action === 'unfollow') {
      await db.collection('harmony-follows')
        .where({ followerId, followeeId })
        .remove();

      return { code: 0, message: '已取消关注' };
    }

    if (action === 'list') {
      // 获取某个用户的关注列表
      const follows = await db.collection('harmony-follows')
        .where({ followerId })
        .get();

      return {
        code: 0,
        data: (follows.data || []).map(f => f.followeeId)
      };
    }

    if (action === 'followers') {
      // 获取某个用户的粉丝列表
      const followers = await db.collection('harmony-follows')
        .where({ followeeId: followerId })
        .get();

      return {
        code: 0,
        data: (followers.data || []).map(f => f.followerId)
      };
    }

    return { code: -1, message: '未知操作' };

  } catch (e) {
    return { code: -1, message: e.message || '操作失败' };
  }
};
