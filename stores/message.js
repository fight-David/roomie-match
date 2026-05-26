import { defineStore } from 'pinia'
import { CONVERSATIONS as MOCK_CONVERSATIONS } from '@/sources/mock.js'
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
      const userStore = useUserStore()
      const myId = userStore.uid
      if (!myId) {
        this.conversations = []
        return
      }

      try {
        const res = await uniCloud.callFunction({
          name: 'message-op',
          data: { action: 'list', userId: myId }
        })

        if (res.result?.code === 0) {
          const remote = res.result.data || []
          // 标记每条消息的 from 字段（基于当前用户）
          this.conversations = remote.map(c => ({
            ...c,
            messages: (c.messages || []).map(m => ({
              ...m,
              from: m.senderId === myId ? 'me' : 'peer'
            }))
          }))
          return
        }
        throw new Error(res.result?.message || '加载会话失败')
      } catch (e) {
        console.warn('加载会话失败', e)
        this.conversations = []
      }
    },

    createConversation(peerId, peerName, peerAvatar) {
      const userStore = useUserStore()
      const myId = userStore.uid || userStore.profile?.id || ''

      // 用稳定的 convId（双方排序后拼接），保证两边查到同一条
      // 这样不论是 A 发起还是 B 发起，convId 都一样
      const sortedIds = [myId, peerId].sort()
      const convId = `c_${sortedIds[0]}_${sortedIds[1]}`

      const existing = this.conversations.find(c => c.id === convId || c.peerId === peerId)
      if (existing) return existing.id

      const newConv = {
        id: convId,
        ownerId: myId,
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

      const userStore = useUserStore()
      const currentUserId = userStore.uid || userStore.profile?.id || ''
      if (!currentUserId) {
        uni.showToast({ title: '未登录', icon: 'none' })
        return
      }

      const now = new Date()
      const time = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })

      // 本地乐观更新
      conv.messages.push({ from: 'me', senderId: currentUserId, text, time, timestamp: Date.now() })
      conv.lastMsg = text
      conv.lastTime = '刚刚'

      // 同步到云端（ownerId 取自会话本地记录）
      try {
        await uniCloud.callFunction({
          name: 'message-op',
          data: {
            action: 'send',
            convId,
            senderId: currentUserId,
            currentUserId,
            ownerId: conv.ownerId || currentUserId,
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
    },

    // 拉取单个会话最新消息（用于聊天页轮询）
    async loadMessages(convId) {
      if (!convId) return
      try {
        const res = await uniCloud.callFunction({
          name: 'message-op',
          data: { action: 'getMessages', convId }
        })
        if (res.result?.code === 0) {
          const remoteMessages = res.result.data || []
          const conv = this.conversations.find(c => c.id === convId)
          if (!conv) return

          // 仅当远端消息数 > 本地时才合并（避免覆盖未发送的乐观消息）
          if (remoteMessages.length > (conv.messages?.length || 0)) {
            const userStore = useUserStore()
            const myId = userStore.uid

            // 标记 from 字段：senderId 是自己 → me，否则 peer
            conv.messages = remoteMessages.map(m => ({
              ...m,
              from: m.senderId === myId ? 'me' : (m.from || 'peer')
            }))

            const last = conv.messages[conv.messages.length - 1]
            if (last) {
              conv.lastMsg = last.text
              conv.lastTime = last.time
            }
          }
        }
      } catch (e) {
        console.warn('拉取消息失败', e)
      }
    }
  }
})