<template>
    <view class="cl">
        <view class="cl__item" v-for="c in conversations" :key="c.id" @tap="$emit('open', c)">
            <view class="cl__ava">
                <image class="cl__ava-img" :src="c.peerAvatar" mode="aspectFill" />
                <view v-if="c.unread" class="cl__badge">{{ c.unread > 9 ? '9+' : c.unread }}</view>
            </view>
            <view class="cl__body">
                <view class="cl__row">
                    <text class="cl__name">{{ c.peerName }}</text>
                    <text class="cl__time">{{ c.lastTime }}</text>
                </view>
                <view class="cl__row cl__row--btm">
                    <text class="cl__preview" :class="{ 'is-unread': c.unread }">{{ c.lastMsg }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
defineProps({
    conversations: { type: Array, default: () => [] }
})

defineEmits(['open'])
</script>

<style lang="scss" scoped>
.cl {
    display: flex;
    flex-direction: column;

    &__item {
        display: flex;
        gap: $space-3;
        padding: $space-3 0;
        border-bottom: 1rpx solid rgba(28, 30, 28, 0.04);

        &:last-child { border: none; }
    }

    &__ava {
        position: relative;
        width: 96rpx;
        height: 96rpx;
        flex-shrink: 0;
    }

    &__ava-img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    &__badge {
        position: absolute;
        top: -4rpx;
        right: -4rpx;
        min-width: 32rpx;
        height: 32rpx;
        line-height: 32rpx;
        text-align: center;
        border-radius: 999rpx;
        background: #A87063;
        color: #fff;
        font-size: 18rpx;
        font-weight: 500;
        padding: 0 6rpx;
    }

    &__body {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 8rpx;
    }

    &__row {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &--btm { justify-content: flex-start; }
    }

    &__name {
        font-size: 28rpx;
        font-weight: 500;
        color: $color-ink;
    }

    &__time {
        font-size: 20rpx;
        color: $color-ink-ghost;
    }

    &__preview {
        font-size: 24rpx;
        color: $color-ink-soft;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 80%;

        &.is-unread {
            color: $color-ink;
            font-weight: 500;
        }
    }
}
</style>
