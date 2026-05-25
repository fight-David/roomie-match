<template>
    <view class="cb" hover-class="cb--press" :hover-stay-time="80" @tap="chat">
        <text class="cb__icon">💬</text>
        <text class="cb__label">打个招呼</text>
    </view>
</template>

<script setup>
import { useMessageStore } from '@/stores/message'

const props = defineProps({
    userId: { type: String, required: true },
    userName: { type: String, default: '' },
    userAvatar: { type: String, default: '' }
})

const messageStore = useMessageStore()

const chat = () => {
    const convId = messageStore.createConversation(props.userId, props.userName, props.userAvatar)
    uni.navigateTo({ url: `/pages/message/index?convId=${convId}` })
}
</script>

<style lang="scss" scoped>
.cb {
    height: 100rpx;
    border-radius: 28rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
    background: #3F4E3F;
    color: #fff;
    font-size: 26rpx;
    letter-spacing: 3rpx;
    font-weight: 500;
    box-shadow: 0 12rpx 40rpx rgba(82, 98, 83, 0.32);
    transition: transform $dur-fast $ease-out-expo;

    &--press { transform: scale(0.97); }

    &__icon {
        font-size: 28rpx;
    }

    &__label {
        font-size: 26rpx;
    }
}
</style>
