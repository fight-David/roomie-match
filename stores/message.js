import { defineStore } from 'pinia'
import { CONVERSATIONS as MOCK_CONVERSATIONS } from '@/sources/mock.js'
import { fetchConversations } from '@/api/db.js'
import { useUserStore } from './user'

export const useMessageStore = defineStore('message', {
  state: () => ({
    conversations: []
  }),

  getters: {
    getConversation: (state) => (id) => state.conversations.find(c => c.id === id),

    unreadTotal: (state) => state.conversations.reduce((sum, c) => sum + (c.unread || 0), 0)
  },

  actions: {
    async loadConversations() {
      try {
        const data = await fetchConversations()
        if (data && data.length) {
          this.conversations = data.map(c => ({
            ...c,
            messages: (c.messages || []).map(m => ({ ...m }))
          }))
        } else {
          this.conversations = MOCK_CONVERSATIONS.map(c => ({
            ...c,
            messages: c.messages.map(m => ({ ...m }))
          }))
        }
      } catch (e) {
        console.warn('加载会话失败，使用 mock', e)
        this.conversations = MOCK_CONVERSATIONS.map(c => ({
          ...c,
          messages: c.messages.map(m => ({ ...m }))
        }))
      }
    },

    createConversation(peerId, peerName, peerAvatar) {
      const existing = this.conversations.find(c => c.peerId === peerId)
      if (existing) return existing.id

      const convId = 'c' + Date.now()

      const newConv = {
        id: convId,
        peerId,
        peerName,
        peerAvatar,
        lastMsg: '',
        lastTime: '',
        unread: 0,
        messages: []
      }
      this.conversations.unshift(newConv)
      return convId
    },

        async sendMessage(convId, text) {
      const conv = this.conversations.find(c => c.id === convId)
      if (!conv) return

      const now = new Date()
      const time = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })

      // 先本地更新
      conv.messages.push({ from: 'me', text, time })
      conv.lastMsg = text
      conv.lastTime = '刚刚'

      // 同步到云端
      const userStore = useUserStore()
      const currentUserId = userStore.uid || 'p01'
      try {
        await uniCloud.callFunction({
          name: 'message-op',
          data: {
            action: 'send',
            convId,
            senderId: currentUserId,
            currentUserId,
            peerId: conv.peerId,
            peerName: conv.peerName,
            peerAvatar: conv.peerAvatar,
            text
          }
        })
      } catch (e) {
        console.warn('消息同步失败', e)
      }
    },

    clearUnread(convId) {
      const conv = this.conversations.find(c => c.id === convId)
      if (conv) conv.unread = 0
    }
  }
})