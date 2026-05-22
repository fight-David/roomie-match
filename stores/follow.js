import { defineStore } from 'pinia'

export const useFollowStore = defineStore('follow', {
  state: () => ({
    // key: 对方 userId, value: 'following' | 'mutual'
    relations: {
      'p01': 'following',
      'p03': 'mutual',
    }
  }),

  getters: {
    followingList: (state) => Object.entries(state.relations)
      .filter(([, v]) => v === 'following' || v === 'mutual')
      .map(([id, status]) => ({ id, status })),

    mutualList: (state) => Object.entries(state.relations)
      .filter(([, v]) => v === 'mutual')
      .map(([id]) => id),

    followersList: (state) => Object.entries(state.relations)
      .filter(([, v]) => v === 'follower')
      .map(([id]) => ({ id }))
  },

  actions: {
    getRelation(userId) {
      return this.relations[userId] || null
    },

    follow(userId) {
      const current = this.relations[userId]
      if (current === 'follower') {
        // 对方已关注我 → 互关
        this.relations[userId] = 'mutual'
      } else {
        this.relations[userId] = 'following'
      }
    },

    unfollow(userId) {
      const current = this.relations[userId]
      if (current === 'mutual') {
        // 互关变成对方单向关注我
        this.relations[userId] = 'follower'
      } else {
        delete this.relations[userId]
      }
    },

    // 对方关注了我（由消息或系统触发）
    addFollower(userId) {
      const current = this.relations[userId]
      if (current === 'following') {
        this.relations[userId] = 'mutual'
      } else if (!current) {
        this.relations[userId] = 'follower'
      }
    }
  }
})
