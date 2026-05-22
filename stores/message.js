import { defineStore } from 'pinia'
import { CONVERSATIONS } from '@/sources/mock.js'

export const useMessageStore = defineStore('message', {
  state: () => ({
    conversations: CONVERSATIONS.map(c => ({
      ...c,
      messages: c.messages.map(m => ({ ...m }))
    }))
  }),

  getters: {
    getConversation: (state) => (id) => state.conversations.find(c => c.id === id),

    unreadTotal: (state) => state.conversations.reduce((sum, c) => sum + (c.unread || 0), 0)
  },

  actions: {
    createConversation(peerId, peerName, peerAvatar) {
      const existing = this.conversations.find(c => c.peerId === peerId)
      if (existing) return existing.id

      const newConv = {
        id: 'c' + Date.now(),
        peerId,
        peerName,
        peerAvatar,
        lastMsg: '',
        lastTime: '',
        unread: 0,
        messages: []
      }
      this.conversations.unshift(newConv)
      return newConv.id
    },

    sendMessage(convId, text) {
      const conv = this.conversations.find(c => c.id === convId)
      if (!conv) return
      const now = new Date()
      const time = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      conv.messages.push({ from: 'me', text, time })
      conv.lastMsg = text
      conv.lastTime = '刚刚'
    },

    clearUnread(convId) {
      const conv = this.conversations.find(c => c.id === convId)
      if (conv) conv.unread = 0
    }
  }
})