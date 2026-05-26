'use strict';
const db = uniCloud.database();
const https = require('https');

// ─── 微信小程序配置（与 login 云函数保持一致）───
const WX_APPID = 'wx88bcb0459ac55ef8';
const WX_SECRET = '4c06186b61b238a0bc8e51426027f7b7';

// access_token 缓存（云函数容器复用期内有效）
let _tokenCache = { token: '', expiresAt: 0 };

function httpGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('解析失败: ' + data)); }
      });
    }).on('error', reject);
  });
}

function httpPostJson(url, body) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const payload = JSON.stringify(body);
    const req = https.request({
      hostname: u.hostname,
      path: u.pathname + u.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('解析失败: ' + data)); }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function getAccessToken() {
  const now = Date.now();
  if (_tokenCache.token && now < _tokenCache.expiresAt) {
    return _tokenCache.token;
  }
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${WX_APPID}&secret=${WX_SECRET}`;
  const res = await httpGet(url);
  if (!res.access_token) {
    throw new Error('获取 access_token 失败: ' + JSON.stringify(res));
  }
  _tokenCache = {
    token: res.access_token,
    // expires_in 一般 7200s，提前 5 分钟过期
    expiresAt: now + (res.expires_in - 300) * 1000
  };
  return _tokenCache.token;
}

// 检查文本安全（命中违规返回 false）
async function checkTextSafe(text, openid) {
  if (!text) return true;
  try {
    const token = await getAccessToken();
    const url = `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${token}`;
    const res = await httpPostJson(url, {
      version: 2,
      scene: 2,            // 2=评论；1=资料；3=论坛；4=社交日志
      content: text,
      openid: openid || ''
    });
    console.log('[msgSecCheck] 结果:', JSON.stringify(res));
    // errcode 0 = 通过；其它 = 违规或调用失败
    if (res.errcode === 0) return true;

    // 违规相关错误码（87014: 违规；87024: 含违法违规内容）
    if (res.errcode === 87014 || res.errcode === 87024) {
      return false;
    }

    // 其它错误码（40001 token 过期 / 40097 参数错误 / 87009 签名错误等）
    // 这些是"接口本身调用失败"，不是"内容违规"，记录日志后放行
    console.warn('[msgSecCheck] 接口调用失败 errcode=', res.errcode, 'errmsg=', res.errmsg);
    return true;
  } catch (e) {
    console.warn('[msgSecCheck] 异常:', e.message);
    return true;
  }
}

exports.main = async (event, context) => {
  const { action, post } = event;

  try {
    if (action === 'create') {
      const { harmony, authorName, _id, ...cleanPost } = post || {};

      // ─── 内容安全审核 ───
      const checkContent = [cleanPost.title, cleanPost.content].filter(Boolean).join(' ');
      const openid = event.openid || cleanPost.authorId || '';
      const safe = await checkTextSafe(checkContent, openid);
      if (!safe) {
        return {
          code: -1,
          message: '内容包含违规信息，请修改后重新发布'
        };
      }

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
      if (!postId) {
        return { code: -1, message: '缺少 postId' };
      }

      // 同时尝试 id 和 _id 两种字段（兼容旧/新数据）
      let removed = 0;
      try {
        const r1 = await db.collection('harmony-posts').where({ id: postId }).remove();
        removed += r1.deleted || 0;
      } catch (e) {}

      if (removed === 0) {
        try {
          const r2 = await db.collection('harmony-posts').doc(postId).remove();
          removed += r2.deleted || 1;
        } catch (e) {}
      }

      if (removed === 0) {
        return { code: -1, message: '帖子不存在' };
      }

      return { code: 0, message: '已删除', removed };
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

      // 评论也走一遍内容审核
      const safe = await checkTextSafe(text, event.openid || '');
      if (!safe) {
        return { code: -1, message: '评论包含违规信息' };
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
