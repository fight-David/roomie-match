'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { action, post } = event;

  try {
    if (action === 'create') {
      // 过滤废弃字段（harmony 已改为前端实时计算，authorName 通过 authorId 关联取）
      const { harmony, authorName, _id, ...cleanPost } = post || {};
      const doc = {
        ...cleanPost,
        photos: cleanPost.photos || [],
        created_at: Date.now(),
        updated_at: Date.now()
      };

      await db.collection('harmony-posts').add(doc);

      return {
        code: 0,
        message: '发布成功',
        data: doc
      };
    }

    if (action === 'delete') {
      const { postId } = event;
      await db.collection('harmony-posts').where({ id: postId }).remove();

      return { code: 0, message: '已删除' };
    }

    if (action === 'list') {
      const res = await db.collection('harmony-posts').orderBy('created_at', 'desc').get();
      return {
        code: 0,
        data: res.data || []
      };
    }

    if (action === 'addComment') {
      const { postId, name, text } = event;
      if (!postId || !text) {
        return { code: -1, message: '参数不完整' };
      }

      const doc = {
        id: 'cm' + Date.now(),
        postId,
        name: name || '匿名',
        text,
        created_at: Date.now()
      };

      await db.collection('harmony-comments').add(doc);

      return {
        code: 0,
        message: '评论成功',
        data: doc
      };
    }

    return { code: -1, message: '未知操作' };

  } catch (e) {
    return { code: -1, message: e.message || '操作失败' };
  }
};
