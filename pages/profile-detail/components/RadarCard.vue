<template>
    <view class="pfd__card">
        <view class="pfd__card-head">
            <text class="pfd__card-title h-display">六维生活雷达</text>
            <text class="pfd__card-icon">⌇</text>
        </view>
        <view class="pfd__radar">
            <RadarChart :values="values" :labels="labels" :size="520" :max-value="5" tone="primary" />
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

const labels = computed(() => DIMENSIONS.map(d => d.label))
const values = computed(() => DIMENSIONS.map(d => props.dims[d.key] || 3))
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

    &__card-icon {
        font-size: 28rpx;
        color: $color-ink-soft;
    }

    &__radar {
        display: flex;
        justify-content: center;
        padding: $space-3 0;
    }
}
</style>