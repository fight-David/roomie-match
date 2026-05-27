<template>
    <view class="onb__slide">
        <view class="onb__header">
            <view class="onb__title h-display">你的生活方式</view>
            <text class="onb__subtitle">拖动滑块，告诉室友你是什么样的人</text>
        </view>

        <view class="onb__axes">
            <view class="onb__axis-item" v-for="d in DIMENSIONS" :key="d.key">
                <view class="onb__axis-labels">
                    <text class="onb__axis-l">{{ d.left }}</text>
                    <view class="onb__axis-right-wrap">
                        <text class="onb__score">{{ values[d.key] || 3 }}</text>
                        <text class="onb__axis-r">{{ d.right }}</text>
                    </view>
                </view>

                <view
                    class="onb__track"
                    :data-key="d.key"
                    @touchstart="startDrag(d.key)"
                    @touchmove.stop.prevent="moveDrag"
                    @touchend="endDrag"
                >
                    <view class="onb__track-bg"></view>
                    <view
                        class="onb__track-fill"
                        :style="{ width: toPercent(values[d.key] || 3) }"
                    ></view>
                    <view class="onb__track-center"></view>
                    <view
                        class="onb__thumb"
                        :class="{ 'is-dragging': draggingKey === d.key }"
                        :style="{ left: toPercent(values[d.key] || 3) }"
                    ></view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'
import { DIMENSIONS } from '@/utils/constant'


const props = defineProps({
    modelValue: { type: Object, default: () => ({}) }
})
const emit = defineEmits(['updateUserProfile'])

// 初始值
const initialDims = props.modelValue?.dims || {}
const values = ref(
    Object.fromEntries(DIMENSIONS.map(d => [d.key, initialDims[d.key] || 3]))
)

const toPercent = (v) => ((v - 1) / 4 * 100) + '%'

// ── 拖拽 ──
const draggingKey = ref(null)
const { windowWidth } = uni.getWindowInfo()
const PADDING = 48  // onboarding 左右边距

const startDrag = (key) => { draggingKey.value = key }

const moveDrag = (e) => {
    if (!draggingKey.value) return
    const touch = e.touches?.[0]
    if (!touch) return

    const trackWidth = windowWidth - PADDING * 2
    let x = touch.clientX - PADDING
    x = Math.max(0, Math.min(trackWidth, x))
    const val = Math.round((x / trackWidth) * 4) + 1

    values.value[draggingKey.value] = val
    emit('updateUserProfile', 'dims', { ...values.value })
}

const endDrag = () => { draggingKey.value = null }
</script>

<style lang="scss" scoped>
.onb {
    &__header {
        padding-top: $space-1;
        padding-bottom: $space-5;
        text-align: center;
    }

    &__subtitle {
        display: block;
        margin-top: $space-2;
        font-size: $font-sm;
        color: $color-ink-ghost;
        letter-spacing: 1rpx;
    }

    &__axes {
        display: flex;
        flex-direction: column;
        gap: $space-5;
        padding: 0 $space-2;
    }

    &__axis-item {
        display: flex;
        flex-direction: column;
        gap: 14rpx;
    }

    &__axis-labels {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__axis-l {
        font-size: 24rpx;
        color: $color-ink-soft;
        letter-spacing: 0.5rpx;
        line-height: 1.4;
        max-width: 44%;
    }

    &__axis-right-wrap {
        display: flex;
        align-items: center;
        gap: 12rpx;
        max-width: 50%;
    }

    &__score {
        font-size: 30rpx;
        font-weight: 500;
        color: #526253;
        min-width: 24rpx;
        text-align: center;
        letter-spacing: -0.5rpx;
    }

    &__axis-r {
        font-size: 24rpx;
        color: $color-ink-soft;
        letter-spacing: 0.5rpx;
        line-height: 1.4;
        text-align: right;
    }

    // ── 轨道 ──
    &__track {
        position: relative;
        height: 56rpx;
        display: flex;
        align-items: center;
        touch-action: none;
    }

    &__track-bg {
        position: absolute;
        left: 0;
        right: 0;
        height: 6rpx;
        border-radius: 999rpx;
        background: #e8ece8;
    }

    &__track-fill {
        position: absolute;
        left: 0;
        top: 50%;
        height: 6rpx;
        transform: translateY(-50%);
        border-radius: 999rpx;
        background: #526253;
        pointer-events: none;
        transition: width .08s;
    }

    &__track-center {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 2rpx;
        height: 20rpx;
        background: rgba(255, 255, 255, .8);
        border-radius: 2rpx;
        z-index: 1;
    }

    // ── 滑块 ──
    &__thumb {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 44rpx;
        height: 44rpx;
        border-radius: 50%;
        background: #fff;
        border: 3rpx solid #526253;
        box-shadow: 0 4rpx 16rpx rgba(82, 98, 83, .24);
        pointer-events: none;
        z-index: 2;
        transition: box-shadow .15s, transform .1s;

        &.is-dragging {
            box-shadow: 0 6rpx 24rpx rgba(82, 98, 83, .4);
            transform: translate(-50%, -50%) scale(1.15);
        }
    }
}
</style>
