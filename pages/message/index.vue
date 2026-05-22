<template>
    <view class="msg">
        <view class="msg__top h-safe-top">
            <view class="msg__header">
                <text class="msg__title h-display">消息</text>
            </view>

            <view class="msg__notif">
                <text class="msg__notif-icon">⊙</text>
                <text class="msg__notif-text">发现 2 位可能匹配你的新室友</text>
            </view>
        </view>

        <scroll-view scroll-y class="msg__scroll">
            <ConversationList :conversations="messageStore.conversations" @open="openChat" />

            <view class="msg__end">
                <text>— 共 {{ messageStore.conversations.length }} 条会话 —</text>
            </view>
        </scroll-view>

        <ChatView v-if="activeChat" :conversation="activeChat" @close="activeChat = null"
            @send="sendMsg" />

        <Tabbar current="message" />
    </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useMessageStore } from '@/stores/message'
import ConversationList from './components/ConversationList.vue'
import ChatView from './components/ChatView.vue'
import Tabbar from '@/components/Tabbar.vue'

const messageStore = useMessageStore()
const activeChat = ref(null)

onLoad((q) => {
    if (q?.convId) {
        const conv = messageStore.getConversation(q.convId)
        if (conv) {
            activeChat.value = conv
            messageStore.clearUnread(conv.id)
        }
    }
})

const openChat = (c) => {
    activeChat.value = c
    messageStore.clearUnread(c.id)
}

const sendMsg = (text) => {
    if (!activeChat.value) return
    messageStore.sendMessage(activeChat.value.id, text)
}
</script>

<style lang="scss" scoped>
.msg {
    min-height: 100vh;

    &__top {
        padding: $space-3 $space-4 0;
    }

    &__header {
        display: flex;
        align-items: center;
        height: 80rpx;
        margin-bottom: $space-3;
    }

    &__title {
        font-size: 40rpx;
        font-weight: 600;
        letter-spacing: -0.3rpx;
        color: $color-ink;
    }

    &__notif {
        display: flex;
        align-items: center;
        gap: $space-2;
        padding: $space-2 $space-3;
        background: $color-primary-ghost;
        border-radius: $radius-md;
        margin-bottom: $space-3;
    }

    &__notif-icon {
        font-size: 28rpx;
        color: $color-primary;
    }

    &__notif-text {
        font-size: 22rpx;
        color: $color-primary;
        letter-spacing: 0.5rpx;
    }

    &__scroll {
        height: calc(100vh - 280rpx);
        padding: 0 $space-4;
    }

    &__end {
        text-align: center;
        padding: $space-4 0 $space-5;
        color: $color-ink-ghost;
        font-size: 20rpx;
        letter-spacing: 4rpx;
    }
}
</style>
