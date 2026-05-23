'use strict';
const db = uniCloud.database();
const uniID = require('uni-id-common');

// uni-id 配置
const uniIDConfig = {
  passwordSecret: 'rm-harmony-secret-2024',
  tokenSecret: 'rm-harmony-token-2024',
  tokenExpiresIn: 2592000,
  tokenExpiresThreshold: 86400,
  passwordErrorLimit: 6,
  bindTokenToDevice: false,
  wxAuth: {
    oauth: {
      weixin: {
        appid: 'wx88bcb0459ac55ef8',
        appsecret: 'a2dc09722d6142a17a8e0652a9d42c9c'
      }
    }
  }
};

exports.main = async (event, context) => {
  const uniIDIns = uniID.createInstance({ context, config: uniIDConfig });

  const { action, code } = event;

  try {
    if (action === 'login') {
      // 微信登录
      const res = await uniIDIns.login({
        provider: 'weixin',
        code
      });

      if (res.code !== 0) {
        return res;
      }

      const uid = res.uid;

      // 查 harmomy-users 有没有这个用户的资料
      const userRes = await db.collection('harmony-users')
        .where({ wx_uid: uid })
        .get();

      let profile = null;
      if (userRes.data && userRes.data.length) {
        profile = userRes.data[0];
      }

      return {
        code: 0,
        message: '登录成功',
        data: {
          token: res.token,
          uid,
          profile,
          isNewUser: !profile
        }
      };
    }

    if (action === 'saveProfile') {
      // 保存/更新用户资料
      const { uid, profile } = event;

      // 开发阶段跳过 token 校验，正式上线时取消注释
      // const token = context.uniIdToken;
      // const check = await uniIDIns.checkToken(token);
      // if (check.code !== 0) return check;

      const existing = await db.collection('harmony-users')
        .where({ wx_uid: uid })
        .get();

      const doc = {
        ...profile,
        wx_uid: uid,
        updated_at: Date.now()
      };

      if (existing.data && existing.data.length) {
        await db.collection('harmony-users')
          .where({ wx_uid: uid })
          .update(doc);
      } else {
        doc.created_at = Date.now();
        await db.collection('harmony-users').add(doc);
      }

      return { code: 0, message: '保存成功' };
    }

    return { code: -1, message: '未知操作' };

  } catch (e) {
    return { code: -1, message: e.message || '服务器错误' };
  }
};
