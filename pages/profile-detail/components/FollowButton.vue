<template>
    <view class="fb" :class="[statusClass]" hover-class="fb--press" :hover-stay-time="80" @tap="toggle">
        <text class="fb__icon">{{ icon }}</text>
        <text class="fb__label">{{ label }}</text>
    </view>
</template>

<script setup>
import { computed } from 'vue'
import { useFollowStore } from '@/stores/follow'

const props = defineProps({
    userId: { type: String, required: true }
})

const followStore = useFollowStore()

const relation = computed(() => followStore.getRelation(props.userId))

const statusClass = computed(() => {
    if (relation.value === 'mutual') return 'is-mutual'
    if (relation.value === 'following') return 'is-following'
    return 'is-idle'
})

const icon = computed(() => {
    if (relation.value === 'mutual') return '⭐'
    if (relation.value === 'following') return '✓'
    return '+'
})

const label = computed(() => {
    if (relation.value === 'mutual') return '室友'
    if (relation.value === 'following') return '已关注'
    return '关注'
})

const toggle = () => {
    if (relation.value === 'mutual' || relation.value === 'following') {
        followStore.unfollow(props.userId)
    } else {
        followStore.follow(props.userId)
    }
}
</script>

<style lang="scss" scoped>
.fb {
    flex: 0 0 34%;
    height: 100rpx;
    border-radius: 28rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8rpx;
    font-size: 24rpx;
    letter-spacing: 2rpx;
    font-weight: 500;
    transition: transform $dur-fast $ease-out-expo, background $dur-fast, color $dur-fast;

    &--press { transform: scale(0.97); }

    &.is-idle {
        background: #fff;
        color: $color-ink;
        box-shadow: 0 4rpx 20rpx rgba(143, 160, 142, 0.1);
    }

    &.is-following {
        background: $color-whisper;
        color: $color-ink-soft;
        box-shadow: none;
    }

    &.is-mutual {
        background: $color-primary;
        color: #fff;
        box-shadow: 0 12rpx 40rpx rgba(82, 98, 83, 0.32);
    }

    &__icon {
        font-size: 28rpx;
    }

    &__label {
        font-size: 24rpx;
    }
}
</style>
