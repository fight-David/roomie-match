import { defineStore } from 'pinia'
import { useUserStore } from './user'

export const useFollowStore = defineStore('follow', {
  state: () => ({
    // key: 对方 userId, value: 'following' | 'mutual' | 'follower'
    relations: {}
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

    async loadRelations() {
      const userStore = useUserStore()
      const uid = userStore.uid || 'p01'

      try {
        // 查我关注了谁
        const followRes = await uniCloud.callFunction({
          name: 'follow-op',
          data: { action: 'list', followerId: uid }
        })
        const followingIds = followRes.result.data || []

        // 查谁关注了我（粉丝）
        const followerRes = await uniCloud.callFunction({
          name: 'follow-op',
          data: { action: 'followers', followerId: uid }
        })
        const followerIds = followerRes.result.data || []

        const relations = {}
        const followerSet = new Set(followerIds)

        followingIds.forEach(id => {
          if (followerSet.has(id)) {
            relations[id] = 'mutual'
          } else {
            relations[id] = 'following'
          }
        })

        followerIds.forEach(id => {
          if (!relations[id]) {
            relations[id] = 'follower'
          }
        })

        this.relations = relations
      } catch (e) {
        console.warn('加载关注关系失败', e)
        // fallback: 空
      }
    },

    async follow(userId) {
      const userStore = useUserStore()
      const uid = userStore.uid || 'p01'

      const current = this.relations[userId]

      // 先更新本地状态
      if (current === 'follower') {
        this.relations[userId] = 'mutual'
      } else {
        this.relations[userId] = 'following'
      }

      // 同步到云端
      try {
        await uniCloud.callFunction({
          name: 'follow-op',
          data: { action: 'follow', followerId: uid, followeeId: userId }
        })
      } catch (e) {
        console.warn('关注同步失败', e)
        // 回滚
        this.relations[userId] = current
      }
    },

    async unfollow(userId) {
      const userStore = useUserStore()
      const uid = userStore.uid || 'p01'

      const current = this.relations[userId]

      // 先更新本地状态
      if (current === 'mutual') {
        this.relations[userId] = 'follower'
      } else {
        delete this.relations[userId]
      }

      // 同步到云端
      try {
        await uniCloud.callFunction({
          name: 'follow-op',
          data: { action: 'unfollow', followerId: uid, followeeId: userId }
        })
      } catch (e) {
        console.warn('取消关注同步失败', e)
        // 回滚
        if (current === 'mutual') {
          this.relations[userId] = 'mutual'
        } else {
          this.relations[userId] = current
        }
      }
    },

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
