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
      target_gender: '男',
      budget_min: 2000,
      budget_max: 4400,
      age: '',
      gender: '男',
      bio: '下班会去打球，也会认真做饭。',
      target_districts: ['徐汇', '闵行'],
      target_subways: ['1', '11'],
      cover: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&q=70&auto=format',
      photos: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&q=70&auto=format',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=70&auto=format',
      ],
      dims: {
        schedule: 3,
        tidy: 4,
        social: 4,
        noise: 3,
        finance: 4,
        pets_vibe: 2,
      },
      loves: ['篮球', '健身', '做饭', 'Citywalk'],
      limits: ['太邋遢', '冷暴力'],
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
              const cloudRes = await uniCloud.callFunction({
                name: 'login',
                data: {
                  action: 'login',
                  code: loginRes.code
                }
              })

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
      try {
        await uniCloud.callFunction({
          name: 'login',
          data: {
            action: 'saveProfile',
            uid: this.uid || 'p01',
            profile: this.profile
          }
        })
      } catch (e) {
        console.warn('保存资料失败', e)
      }
    }
  }
})