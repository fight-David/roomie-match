import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,

    // profile: {
    //   "cover": '',
    //   "photos": [],
    //   "nickname": "",
    //   "age": '',
    //   "gender": '',
    //   "bio": "",

    //   "target_gender": null,

    //   "budget_min": 3000,
    //   "budget_max": 6500,

    //   "target_districts": [],
    //   "target_subways": [],

    //   dims: {
    //     "schedule": 3,             // 1. 作息 (早起鸟 vs 夜猫子)
    //     "tidy": 3,             // 2. 整洁 (随性邋遢 vs 强迫症)
    //     "social": 3,            // 3. 社交 (抗拒外人 vs 喜欢聚会)
    //     "noise": 3,             // 4. 声响 (耳机党 vs 外放连麦)
    //     "finance": 3,           // 5. 财务 (锱铢必较 vs 差不多就行)
    //     "pets_vibe": 3,
    //   },

    //   "loves": [],
    //   "limits": []
    // }

    profile: {
      nickname: 'Ethan Wu',
      target_gender: '男',
      budget_min: 2000,
      budget_max: 4400,
      "age": '',
      "gender": '男',
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

  actions: {
    setProfile(data) {
      this.profile = {
        ...this.profile,
        ...data
      }
      console.log(this.profile);
    }
  }
})