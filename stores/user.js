import { defineStore } from 'pinia'
import { PEOPLE as MOCK_PEOPLE } from '@/sources/mock.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,     // { uid, token } — 登录后才有
    token: '',
    uid: '',

    // profile 初始用 mock 数据保底
    profile: {
      id: 'p01',
      nickname: 'Ethan Wu',
      target_gender: '',
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
        noise: null,
        finance: null,
        pets_vibe: null,
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

                if (result.data.profile) {
                  this.profile = {
                    ...this.profile,
                    ...result.data.profile,
                    id: result.data.uid
                  }
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
    }
  }
})