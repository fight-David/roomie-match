import { defineStore } from 'pinia'
import { PEOPLE as MOCK_PEOPLE } from '@/sources/mock.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,     // { uid, token } — 登录后才有
    token: '',
    uid: '',
    blockedIds: [],     // 我拉黑的用户 id 列表

    // profile 初始用 mock 数据保底
    profile: {
      id: 'p01',
      nickname: '',
      target_gender: '',
      city: 'SH',
      budget_min: 2000,
      budget_max: 4400,
      age: '',
      gender: '',
      bio: '',
      target_districts: [],
      target_subways: [],
      cover: '',
      photos: [
      ],
      dims: {
        schedule: null,
        tidy: null,
        social: null,
      },
      loves: [],
      limits: [],
    }
  }),

  getters: {
    isLoggedIn: (state) => !!state.token
  },

  actions: {
    setProfile(data) {
      this.profile = {
        ...this.profile,
        ...data
      }
    },

    async setCity(cityCode) {
      this.profile = { ...this.profile, city: cityCode }
      // 异步同步到云端，不阻塞 UI
      if (this.uid) {
        this.saveProfile().catch(e => console.warn('city 同步失败', e))
      }
    },

    async login() {
      return new Promise((resolve, reject) => {
        // #ifdef MP-WEIXIN
        uni.login({
          provider: 'weixin',
          success: async (loginRes) => {
            try {
              console.log('uniCloud:', typeof uniCloud, uniCloud?.config)
              console.log('code:', loginRes.code)

              const cloudRes = await uniCloud.callFunction({
                name: 'login',
                data: {
                  action: 'login',
                  code: loginRes.code
                }
              })

              console.log('cloudRes:', JSON.stringify(cloudRes))

              const result = cloudRes.result
              if (result.code === 0) {
                this.token = result.data.token
                this.uid = result.data.uid

                // 关键：无论是否有云端 profile，都把 id 设为真实 uid（wx_uid）
                // 这样 home 排除自己、authorId 判断才能正确工作
                this.profile = {
                  ...this.profile,
                  ...(result.data.profile || {}),
                  id: result.data.uid
                }

                resolve(result.data)
              } else {
                reject(new Error(result.message || '登录失败'))
              }
            } catch (e) {
              console.error('login error:', e)
              reject(e)
            }
          },
          fail: (e) => reject(e)
        })
        // #endif

        // #ifndef MP-WEIXIN
        // 非微信环境直接用 mock
        this.token = 'mock-token'
        this.uid = 'p01'
        this.profile = {
          ...this.profile,
          id: 'p01'
        }
        resolve({ isNewUser: false, profile: this.profile })
        // #endif
      })
    },

    async saveProfile() {
      if (!this.uid) {
        throw new Error('未登录，无法保存资料')
      }
      const res = await uniCloud.callFunction({
        name: 'login',
        data: {
          action: 'saveProfile',
          uid: this.uid,
          profile: this.profile
        }
      })
      if (res.result && res.result.code !== 0) {
        throw new Error(res.result.message || '保存失败')
      }
      return res.result
    },

    // ─── 拉黑相关 ───
    async loadBlockedIds() {
      if (!this.uid) return
      try {
        const res = await uniCloud.callFunction({
          name: 'user-op',
          data: { action: 'listBlocks', fromUserId: this.uid }
        })
        if (res.result?.code === 0) {
          this.blockedIds = res.result.data || []
        }
      } catch (e) {
        console.warn('加载拉黑列表失败', e)
      }
    },

    async blockUser(targetId) {
      if (!this.uid || !targetId) return
      try {
        await uniCloud.callFunction({
          name: 'user-op',
          data: { action: 'block', fromUserId: this.uid, targetUserId: targetId }
        })
        if (!this.blockedIds.includes(targetId)) {
          this.blockedIds.push(targetId)
        }
      } catch (e) {
        throw new Error('拉黑失败')
      }
    },

    async unblockUser(targetId) {
      if (!this.uid || !targetId) return
      try {
        await uniCloud.callFunction({
          name: 'user-op',
          data: { action: 'unblock', fromUserId: this.uid, targetUserId: targetId }
        })
        this.blockedIds = this.blockedIds.filter(id => id !== targetId)
      } catch (e) {
        throw new Error('取消拉黑失败')
      }
    },

    isBlocked(userId) {
      return this.blockedIds.includes(userId)
    },

    async reportTarget(targetType, targetId, reason) {
      if (!this.uid) throw new Error('未登录')
      const res = await uniCloud.callFunction({
        name: 'user-op',
        data: {
          action: 'report',
          fromUserId: this.uid,
          targetType,
          targetId,
          reason
        }
      })
      if (res.result?.code !== 0) {
        throw new Error(res.result?.message || '举报失败')
      }
      return res.result
    }
  }
})