<template>
    <view class="pc">
        <view class="pc__hd">
            <text class="pc__label">评论</text>
            <text class="pc__count">{{ comments.length }}</text>
        </view>

        <view class="pc__empty" v-if="!comments.length">
            <text>还没有评论，来说点什么</text>
        </view>

        <view class="pc__row" v-for="(c, i) in comments" :key="i">
            <text class="pc__name">{{ c.name }}</text>
            <text class="pc__text">{{ c.text }}</text>
        </view>
    </view>
</template>

<script setup>
defineProps({
    comments: { type: Array, default: () => [] }
})
</script>

<style lang="scss" scoped>
.pc {
    margin: $space-6 0;

    &__hd {
        display: flex;
        align-items: baseline;
        gap: $space-2;
        margin-bottom: $space-3;
    }

    &__label {
        font-size: $font-sm;
        color: $color-ink-soft;
        letter-spacing: 2rpx;
    }

    &__count {
        font-size: $font-xs;
        color: $color-ink-ghost;
    }

    &__empty {
        padding: $space-5 0;
        text-align: center;
        font-size: $font-sm;
        color: $color-ink-ghost;
        letter-spacing: 1rpx;
    }

    &__row {
        display: flex;
        gap: $space-2;
        padding: $space-2 0;
        border-bottom: 1rpx solid rgba(28, 30, 28, .05);

        &:last-child { border: none; }
    }

    &__name {
        font-size: $font-sm;
        font-weight: 500;
        color: #526253;
        flex-shrink: 0;
    }

    &__text {
        font-size: $font-sm;
        color: $color-ink;
        line-height: 1.65;
    }
}
</style>
