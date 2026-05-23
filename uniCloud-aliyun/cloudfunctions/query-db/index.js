'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { collection, where = {}, options = {} } = event;

  try {
    let query = db.collection(collection);
    const keys = Object.keys(where);
    if (keys.length) {
      query = query.where(where);
    }
    const res = await query.get(options);

    return {
      code: 0,
      message: '查询成功',
      data: res.data
    };
  } catch (e) {
    return {
      code: -1,
      message: e.message || '查询失败',
      data: []
    };
  }
};
