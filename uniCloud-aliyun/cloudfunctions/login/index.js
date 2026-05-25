'use strict';
const db = uniCloud.database();

// 微信登录配置
const wxAppId = 'wx88bcb0459ac55ef8';
const wxAppSecret = '4c06186b61b238a0bc8e51426027f7b7';

exports.main = async (event, context) => {
  const { action } = event;

  try {
    if (action === 'login') {
      const { code } = event;
      
      const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${wxAppId}&secret=${wxAppSecret}&js_code=${code}&grant_type=authorization_code`;

      // 用 Node.js 内置 https 模块请求
      const https = require('https');
      
      const wxData = await new Promise((resolve, reject) => {
        https.get(url, (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            try {
              resolve(JSON.parse(data));
            } catch (e) {
              reject(new Error('解析微信返回失败: ' + data));
            }
          });
        }).on('error', (e) => {
          reject(new Error('请求微信失败: ' + e.message));
        });
      });

      if (wxData.errcode && wxData.errcode !== 0) {
        return {
          code: -1,
          message: '微信登录失败: ' + JSON.stringify(wxData)
        };
      }
      const openid = wxData.openid;
      const unionid = wxData.unionid || openid;

      if (!openid) {
        return {
          code: -1,
          message: '微信登录失败: 未获取到 openid'
        };
      }

      // 查用户资料
      const userRes = await db.collection('harmony-users')
        .where({ wx_uid: unionid })
        .get();

      let profile = null;
      if (userRes.data && userRes.data.length) {
        profile = userRes.data[0];
      }

      // 判断是否为新用户：没有资料，或者资料不完整（没有 onboarding_done 标记）
      const isNewUser = !profile || !profile.onboarding_done;

      // 新用户自动创建一条空的记录
      if (!profile) {
        const newUser = {
          wx_uid: unionid,
          wx_openid: openid,
          created_at: Date.now()
        };
        await db.collection('harmony-users').add(newUser);
      }

      const token = 'token_' + unionid + '_' + Date.now();

      return {
        code: 0,
        message: '登录成功',
        data: {
          token,
          uid: unionid,
          profile,
          isNewUser
        }
      };
    }

    if (action === 'saveProfile') {
      const { uid, profile } = event;

      const existing = await db.collection('harmony-users')
        .where({ wx_uid: uid })
        .get();

      // 过滤掉 _id 等不能被 update 的字段
      const { _id, wx_openid, created_at, ...rest } = profile || {};
      const doc = {
        ...rest,
        wx_uid: uid,
        updated_at: Date.now()
      };

      if (existing.data && existing.data.length) {
        await db.collection('harmony-users')
          .doc(existing.data[0]._id)
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
