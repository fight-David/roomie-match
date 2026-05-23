'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { action, post } = event;

  try {
    if (action === 'create') {
      const doc = {
        ...post,
        id: 'j' + Date.now(),
        created_at: Date.now()
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

    return { code: -1, message: '未知操作' };

  } catch (e) {
    return { code: -1, message: e.message || '操作失败' };
  }
};
