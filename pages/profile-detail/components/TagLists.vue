<template>
    <view class="pfd__card">
        <!-- 热爱 -->
        <view class="pfd__card-head">
            <view class="pfd__leaf pfd__leaf--heart">♥</view>
            <text class="pfd__card-title h-display">热爱</text>
        </view>
        <view class="pfd__pills">
            <view class="pfd__pill" v-for="t in loves" :key="t">
                <text>{{ t }}</text>
            </view>
        </view>

        <view style="height: 32rpx;"></view>

        <!-- 底线 -->
        <view class="pfd__card-head">
            <view class="pfd__leaf pfd__leaf--ban">⊘</view>
            <text class="pfd__card-title h-display">底线</text>
        </view>
        <view class="pfd__blacklist">
            <view class="pfd__bl-row" v-for="t in limits" :key="t">
                <text class="pfd__bl-dot">●</text>
                <text class="pfd__bl-t">{{ t }}</text>
            </view>
        </view>
    </view>
</template>

<script setup>
defineProps({
    loves: { type: Array, default: () => [] },
    limits: { type: Array, default: () => [] }
})
</script>

<style lang="scss" scoped>
.pfd {

    &__card {
        background: #E9EDE8;
        border-radius: 32rpx;
        padding: $space-4;
    }

    &__card-head {
        display: flex;
        align-items: center;
        gap: 12rpx;
        margin-bottom: $space-3;
    }

    &__card-title {
        font-size: 30rpx;
        font-weight: 600;
        color: $color-ink;
        letter-spacing: -0.3rpx;
        flex: 1;
    }

    &__leaf {
        width: 36rpx;
        height: 36rpx;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22rpx;

        &--heart {
            background: #D9E4D6;
            color: #526253;
        }

        &--ban {
            background: #EADBD7;
            color: #B85450;
        }
    }

    &__pills {
        display: flex;
        flex-wrap: wrap;
        gap: 14rpx;
    }

    &__pill {
        padding: 14rpx 28rpx;
        border-radius: 999rpx;
        background: #DDE4DA;
        color: $color-primary;
        font-size: 24rpx;
        letter-spacing: 0.5rpx;
    }

    &__blacklist {
        display: flex;
        flex-direction: column;
        gap: 14rpx;
    }

    &__bl-row {
        display: flex;
        align-items: center;
        gap: 16rpx;
    }

    &__bl-dot {
        color: #B85450;
        font-size: 14rpx;
        line-height: 1;
    }

    &__bl-t {
        font-size: 26rpx;
        color: $color-ink;
        letter-spacing: 0.3rpx;
    }
}
</style>