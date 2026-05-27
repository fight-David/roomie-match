<template>
    <view class="ps">
        <view class="ps__head">
            <text class="ps__title">和你相似的人</text>
            <text class="ps__sub">基于你的生活方式匹配</text>
        </view>

        <view class="ps__empty" v-if="!people.length">
            <text>正在寻找相似的人…</text>
        </view>

        <view class="ps__list" v-else>
            <view
                class="ps__card"
                v-for="p in people"
                :key="p.id || p._id"
                hover-class="ps__card--press"
                :hover-stay-time="80"
                @tap="$emit('open', p)"
            >
                <image class="ps__ava" :src="p.cover || p.photos?.[0]" mode="aspectFill" />
                <view class="ps__info">
                    <text class="ps__name">{{ p.nickname }}</text>
                    <text class="ps__bio">{{ p.bio }}</text>
                </view>
                <view class="ps__score">
                    <text class="ps__num">{{ p._harmony }}</text>
                    <text class="ps__pct">%</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
defineProps({
    people: { type: Array, default: () => [] }
})

defineEmits(['open'])
</script>

<style lang="scss" scoped>
.ps {
    &__head {
        margin-bottom: $space-4;
    }

    &__title {
        display: block;
        font-size: 30rpx;
        font-weight: 400;
        color: $color-ink;
        letter-spacing: -0.3rpx;
    }

    &__sub {
        display: block;
        margin-top: 6rpx;
        font-size: 22rpx;
        color: $color-ink-ghost;
        letter-spacing: 1rpx;
    }

    &__empty {
        padding: $space-5 0;
        font-size: $font-sm;
        color: $color-ink-ghost;
        letter-spacing: 1rpx;
    }

    &__list {
        display: flex;
        flex-direction: column;
        gap: $space-3;
    }

    &__card {
        display: flex;
        align-items: center;
        gap: $space-3;
        padding: $space-3;
        background: #fff;
        border-radius: 24rpx;
        box-shadow: 0 4rpx 20rpx rgba(143, 160, 142, .07);
        transition: transform .12s;

        &--press { transform: scale(0.985); }
    }

    &__ava {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        flex-shrink: 0;
        background: $color-mist;
    }

    &__info {
        flex: 1;
        min-width: 0;
    }

    &__name {
        display: block;
        font-size: 28rpx;
        font-weight: 500;
        color: $color-ink;
        letter-spacing: 0.3rpx;
    }

    &__bio {
        display: block;
        margin-top: 4rpx;
        font-size: 22rpx;
        color: $color-ink-soft;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__score {
        display: flex;
        align-items: baseline;
        gap: 2rpx;
        flex-shrink: 0;
    }

    &__num {
        font-size: 36rpx;
        font-weight: 300;
        color: #526253;
        letter-spacing: -1rpx;
    }

    &__pct {
        font-size: $font-xs;
        color: #526253;
        opacity: .7;
    }
}
</style>
