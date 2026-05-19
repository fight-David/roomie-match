<template>
    <view class="pfd__card">
        <view class="pfd__card-head">
            <text class="pfd__card-title">生活维度</text>
            <text class="pfd__card-hint">点击调整</text>
        </view>
        <view class="pfd__radar">
            <RadarChart :values="values" :labels="labels" :size="480" :max-value="5" tone="primary" />
        </view>
        <view class="pfd__dims">
            <view
                v-for="(d, i) in dimList"
                :key="d.key"
                class="pfd__dim"
                hover-class="pfd__dim--press"
                :hover-stay-time="60"
                @tap="$emit('editDim', d.key)"
            >
                <text class="pfd__dim-label">{{ d.label }}</text>
                <view class="pfd__dim-bar">
                    <view class="pfd__dim-fill" :style="{ width: (dims[d.key] || 3) * 20 + '%' }"></view>
                </view>
                <text class="pfd__dim-num">{{ dims[d.key] || 3 }}</text>
            </view>
        </view>
    </view>
</template>

<script setup>
import { computed } from 'vue'
import RadarChart from '@/components/RadarChart.vue'
import { DIMENSIONS } from '@/sources/mock.js'

const props = defineProps({
    dims: { type: Object, default: () => ({}) }
})

defineEmits(['editDim'])

const labels = computed(() => DIMENSIONS.map(d => d.label))
const values = computed(() => DIMENSIONS.map(d => props.dims[d.key] || 3))
const dimList = computed(() => DIMENSIONS)
</script>

<style lang="scss" scoped>
.pfd {

    &__card {
        background: #fff;
        border-radius: 32rpx;
        padding: $space-4;
    }

    &__card-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: $space-2;
    }

    &__card-title {
        font-size: 24rpx;
        color: $color-ink-soft;
        font-weight: 500;
        letter-spacing: 1rpx;
    }

    &__card-hint {
        font-size: 20rpx;
        color: $color-ink-ghost;
        letter-spacing: 1rpx;
    }

    &__radar {
        display: flex;
        justify-content: center;
        padding: $space-2 0;
    }

    &__dims {
        margin-top: $space-2;
        display: flex;
        flex-direction: column;
        gap: 20rpx;
    }

    &__dim {
        display: flex;
        align-items: center;
        gap: 20rpx;
        padding: 8rpx 0;
        transition: opacity $dur-fast;

        &--press { opacity: 0.5; }
    }

    &__dim-label {
        width: 80rpx;
        font-size: 24rpx;
        color: $color-ink-soft;
        flex-shrink: 0;
    }

    &__dim-bar {
        flex: 1;
        height: 8rpx;
        border-radius: 999rpx;
        background: #E5E9E5;
        overflow: hidden;
    }

    &__dim-fill {
        height: 100%;
        border-radius: 999rpx;
        background: #526253;
        transition: width $dur-base $ease-out-expo;
    }

    &__dim-num {
        width: 40rpx;
        font-size: 24rpx;
        color: $color-ink;
        text-align: right;
        font-weight: 400;
    }
}
</style>