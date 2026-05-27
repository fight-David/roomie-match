<template>
    <view class="pb">
        <view class="pb__item" v-for="b in bars" :key="b.key">
            <view class="pb__head">
                <text class="pb__label">{{ b.label }}</text>
                <text class="pb__pct">{{ b.pct }}%</text>
            </view>
            <view class="pb__track">
                <view
                    class="pb__fill"
                    :style="{ width: animating ? b.pct + '%' : '0%' }"
                ></view>
            </view>
            <text class="pb__desc">{{ b.desc }}</text>
        </view>
    </view>
</template>

<script setup>
import { computed } from 'vue'
import { buildPersonaBars } from '@/utils/persona.js'

const props = defineProps({
    dims:      { type: Object,  default: () => ({}) },
    animating: { type: Boolean, default: false }
})

const bars = computed(() => buildPersonaBars(props.dims))
</script>

<style lang="scss" scoped>
.pb {
    display: flex;
    flex-direction: column;
    gap: $space-4;

    &__item {
        display: flex;
        flex-direction: column;
        gap: 8rpx;
    }

    &__head {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }

    &__label {
        font-size: 22rpx;
        color: $color-ink-soft;
        letter-spacing: 1rpx;
        font-weight: 500;
    }

    &__pct {
        font-size: 28rpx;
        font-weight: 300;
        color: #526253;
        letter-spacing: -0.5rpx;
    }

    &__track {
        height: 6rpx;
        background: rgba(28, 30, 28, .06);
        border-radius: 999rpx;
        overflow: hidden;
    }

    &__fill {
        height: 100%;
        background: linear-gradient(90deg, #526253, #7a9b7a);
        border-radius: 999rpx;
        transition: width 1.2s cubic-bezier(.2, .9, .3, 1);
    }

    &__desc {
        font-size: 20rpx;
        color: $color-ink-ghost;
        letter-spacing: 0.5rpx;
    }
}
</style>
