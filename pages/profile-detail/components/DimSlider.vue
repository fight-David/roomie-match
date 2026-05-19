<template>
    <view class="ds">
        <view class="ds__head">
            <text class="ds__title">生活维度</text>
            <text class="ds__hint">{{ hintText }}</text>
        </view>
        <view class="ds__radar">
            <RadarChart :values="values" :labels="labels" :size="320" :max-value="5" tone="primary" />
        </view>
        <view class="ds__list">
            <view class="ds__item" v-for="d in dimList" :key="d.key">
                <view class="ds__item-head">
                    <text class="ds__item-label">{{ d.label }}</text>
                    <text class="ds__item-val">{{ dims[d.key] || 3 }}</text>
                </view>
                <view class="ds__slider-track" :data-key="d.key" @touchstart="startTrackDrag(d.key, $event)">
                    <view class="ds__slider-fill" :style="{ width: percentFromValue(dims[d.key] || 3) }"></view>
                    <view class="ds__slider-thumb"
                        :style="{ left: percentFromValue(dims[d.key] || 3) }">
                    </view>
                </view>
                <view class="ds__slider-labels">
                    <text class="ds__slider-low">{{ d.bottom }}</text>
                    <text class="ds__slider-high">{{ d.top }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import RadarChart from '@/components/RadarChart.vue'
import { DIMENSIONS } from '@/sources/mock.js'

const props = defineProps({
    dims: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:dims'])

const dimList = computed(() => DIMENSIONS)
const labels = computed(() => DIMENSIONS.map(d => d.label))
const values = computed(() => DIMENSIONS.map(d => props.dims[d.key] || 3))

// 将 1~5 映射为 0%~100%，1 在最左，5 在最右
const percentFromValue = (v) => ((v - 1) / 4) * 100 + '%'

const hintText = computed(() => {
    const v = values.value
    const max = Math.max(...v)
    const min = Math.min(...v)
    if (max - min <= 1) return '均衡'
    return '偏好鲜明'
})

let draggingKey = null

const calcValue = (key, clientX) => {
    const tracks = document.querySelectorAll('.ds__slider-track')
    for (const track of tracks) {
        if (track.dataset.key === key) {
            const rect = track.getBoundingClientRect()
            const x = clientX - rect.left
            const ratio = Math.max(0, Math.min(1, x / rect.width))
            return Math.round(ratio * 4) + 1
        }
    }
    return props.dims[key] || 3
}

const startTrackDrag = (key, e) => {
    draggingKey = key
    const val = calcValue(key, e.touches[0].clientX)
    const newDims = { ...props.dims, [key]: val }
    emit('update:dims', newDims)
}

const onGlobalTouchMove = (e) => {
    if (!draggingKey) return
    e.preventDefault()
    const val = calcValue(draggingKey, e.touches[0].clientX)
    const newDims = { ...props.dims, [draggingKey]: val }
    emit('update:dims', newDims)
}

const onGlobalTouchEnd = () => {
    draggingKey = null
}

onMounted(() => {
    document.addEventListener('touchmove', onGlobalTouchMove, { passive: false })
    document.addEventListener('touchend', onGlobalTouchEnd)
})

onUnmounted(() => {
    document.removeEventListener('touchmove', onGlobalTouchMove)
    document.removeEventListener('touchend', onGlobalTouchEnd)
})
</script>

<style lang="scss" scoped>
.ds {
    background: #fff;
    border-radius: 32rpx;
    padding: $space-4;

    &__head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: $space-3;
    }

    &__title {
        font-size: 24rpx;
        color: $color-ink-soft;
        font-weight: 500;
        letter-spacing: 1rpx;
    }

    &__hint {
        font-size: 20rpx;
        color: $color-ink-ghost;
        letter-spacing: 1rpx;
    }

    &__radar {
        display: flex;
        justify-content: center;
        padding: 0 0 $space-3;
    }

    &__list {
        display: flex;
        flex-direction: column;
        gap: 24rpx;
    }

    &__item-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 6rpx;
    }

    &__item-label {
        font-size: 22rpx;
        color: $color-ink-soft;
        font-weight: 500;
    }

    &__item-val {
        font-size: 22rpx;
        color: $color-ink;
        font-weight: 400;
        min-width: 32rpx;
        text-align: center;
    }

    &__slider-track {
        position: relative;
        height: 40rpx;
        display: flex;
        align-items: center;
        touch-action: none;
    }

    &__slider-track::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        height: 8rpx;
        transform: translateY(-50%);
        background: #E5E9E5;
        border-radius: 999rpx;
        pointer-events: none;
    }

    &__slider-fill {
        position: absolute;
        left: 0;
        top: 50%;
        height: 8rpx;
        transform: translateY(-50%);
        border-radius: 999rpx;
        background: #526253;
        pointer-events: none;
    }

    &__slider-thumb {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 28rpx;
        height: 28rpx;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 2rpx 8rpx rgba(82, 98, 83, 0.3);
        border: 2rpx solid #526253;
        pointer-events: none;
    }

    &__slider-labels {
        display: flex;
        justify-content: space-between;
        margin-top: 2rpx;
    }

    &__slider-low,
    &__slider-high {
        font-size: 18rpx;
        color: $color-ink-ghost;
    }
}
</style>