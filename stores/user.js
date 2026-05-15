import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,

    profile: {
      "cover": '',
      "photos": [],
      "nickname": "",
      "age": '',
      "gender": '',
      "bio": "",

      "target_gender": null,

      "budget_min": 3000,
      "budget_max": 6500,

      "target_districts": [],
      "target_subways": [],

      dims: {
        "schedule": 3,             // 1. 作息 (早起鸟 vs 夜猫子)
        "tidy": 3,             // 2. 整洁 (随性邋遢 vs 强迫症)
        "social": 3,            // 3. 社交 (抗拒外人 vs 喜欢聚会)
        "noise": 3,             // 4. 声响 (耳机党 vs 外放连麦)
        "finance": 3,           // 5. 财务 (锱铢必较 vs 差不多就行)
        "pets_vibe": 3,
      },

      "loves": [],
      "limits": []
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