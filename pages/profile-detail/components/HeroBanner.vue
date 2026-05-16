<template>
    <view class="pfd__hero">
        <view class="pfd__hero-bg"></view>
        <view class="pfd__hero-inner">
            <view class="pfd__portrait">
                <image class="pfd__portrait-img" :src="user.cover" mode="aspectFill" />
            </view>
            <view class="pfd__id">
                <text class="pfd__id-name h-display">{{ user.nickname }}</text>
                <view class="pfd__id-badge">
                    <text class="pfd__id-badge-dot"></text>
                    <text class="pfd__id-badge-t">{{ badgeText }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    user: { type: Object, default: () => ({}) }
})

const badgeText = computed(() => {
    return `寻找${props.user.target_gender}室友 · ${props.user.age || '?'}岁`
})
</script>

<style lang="scss" scoped>
.pfd {
    &__hero {
        position: relative;
        margin: 0 $space-3;
        border-radius: 40rpx;
        overflow: hidden;
    }

    &__hero-bg {
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, #5A6B5B 0%, #4E5E4F 100%);
    }

    &__hero-inner {
        position: relative;
        padding: $space-5 $space-4 $space-4;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__portrait {
        width: 360rpx;
        height: 420rpx;
        border-radius: 36rpx;
        overflow: hidden;
        background: #3F4E3F;
        box-shadow: 0 16rpx 40rpx rgba(0, 0, 0, 0.24);
    }

    &__portrait-img {
        width: 100%;
        height: 100%;
        display: block;
    }

    &__id {
        margin-top: $space-3;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__id-name {
        font-size: 56rpx;
        font-weight: 500;
        color: #fff;
        letter-spacing: -1rpx;
    }

    &__id-badge {
        margin-top: 16rpx;
        display: inline-flex;
        align-items: center;
        padding: 8rpx 24rpx;
        border-radius: 999rpx;
        background: rgba(255, 255, 255, 0.12);
        gap: 10rpx;
    }

    &__id-badge-dot {
        width: 10rpx;
        height: 10rpx;
        border-radius: 50%;
        background: #fff;
    }

    &__id-badge-t {
        font-size: 18rpx;
        letter-spacing: 2rpx;
        color: #fff;
    }
}
</style>