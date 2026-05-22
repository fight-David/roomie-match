<template>
    <view class="ft">
        <view class="ft__bar">
            <view v-for="t in tabs" :key="t.key" class="ft__tab"
                :class="{ 'is-on': active === t.key }" @tap="$emit('switch', t.key)">
                <text class="ft__label">{{ t.label }}</text>
                <text class="ft__count">{{ t.count }}</text>
            </view>
        </view>
        <view class="ft__line">
            <view class="ft__indicator" :style="{ left: indicatorLeft + '%', width: indicatorWidth + '%' }"></view>
        </view>
    </view>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    tabs: { type: Array, required: true },
    active: { type: String, required: true }
})

defineEmits(['switch'])

const indicatorLeft = computed(() => {
    const idx = props.tabs.findIndex(t => t.key === props.active)
    return (idx / props.tabs.length) * 100 + (idx * 8 / props.tabs.length)
})

const indicatorWidth = computed(() => {
    return 100 / props.tabs.length - 8
})
</script>

<style lang="scss" scoped>
.ft {
    padding: 0 $space-4;
    margin-bottom: $space-2;

    &__bar {
        display: flex;
        gap: $space-1;
    }

    &__tab {
        flex: 1;
        height: 80rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8rpx;
        border-radius: $radius-md;
        transition: all $dur-fast $ease-out-expo;

        &.is-on {
            background: $color-primary-ghost;
        }
    }

    &__label {
        font-size: 24rpx;
        color: $color-ink-soft;
        letter-spacing: 1rpx;
        transition: color $dur-fast;

        .ft__tab.is-on & {
            color: $color-primary;
            font-weight: 500;
        }
    }

    &__count {
        font-size: 20rpx;
        color: $color-ink-ghost;

        .ft__tab.is-on & {
            color: $color-primary;
            font-weight: 500;
        }
    }

    &__line {
        position: relative;
        height: 2rpx;
        background: rgba(28,30,28,0.06);
        margin-top: $space-1;
    }

    &__indicator {
        position: absolute;
        bottom: 0;
        height: 2rpx;
        background: $color-primary;
        transition: left $dur-base $ease-out-expo, width $dur-base $ease-out-expo;
    }
}
</style>
