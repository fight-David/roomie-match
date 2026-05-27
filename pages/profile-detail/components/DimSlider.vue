<template>
    <view class="ds" :class="{ 'ds--readonly': readonly }">
        <view class="ds__head">
            <text class="ds__title">生活方式</text>
            <text class="ds__hint">{{ hintText }}</text>
        </view>

        <view class="ds__list">
            <view class="ds__item" v-for="d in DIMENSIONS" :key="d.key">
                <view class="ds__axis">
                    <text class="ds__axis-left">{{ d.left }}</text>
                    <view class="ds__axis-right-wrap">
                        <text class="ds__score" v-if="!readonly">{{ dims[d.key] || 3 }}</text>
                        <text class="ds__axis-right">{{ d.right }}</text>
                    </view>
                </view>

                <view
                    class="ds__track"
                    :data-key="d.key"
                    @touchstart="readonly ? null : startDrag(d.key)"
                    @touchmove.stop.prevent="readonly ? null : moveDrag($event)"
                    @touchend="readonly ? null : endDrag()"
                >
                    <view class="ds__track-bg"></view>
                    <view
                        class="ds__track-fill"
                        :style="{ width: toPercent(dims[d.key] || 3) }"
                    ></view>
                    <view class="ds__track-center"></view>
                    <view
                        class="ds__thumb"
                        :style="{ left: toPercent(dims[d.key] || 3) }"
                    ></view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { DIMENSIONS } from '@/utils/constant'

const props = defineProps({
    dims: { type: Object, default: () => ({}) },
    readonly: { type: Boolean, default: false }
})

const emit = defineEmits(['update:dims'])

const toPercent = (v) => ((v - 1) / 4 * 100) + '%'

const hintText = computed(() => {
    const vals = DIMENSIONS.map(d => props.dims[d.key] || 3)
    const spread = Math.max(...vals) - Math.min(...vals)
    if (spread <= 1) return '均衡'
    if (spread >= 3) return '偏好鲜明'
    return '有自己的节奏'
})

const draggingKey = ref(null)
const { windowWidth } = uni.getWindowInfo()
const PADDING = 32

const startDrag = (key) => { draggingKey.value = key }

const moveDrag = (e) => {
    if (!draggingKey.value) return
    const touch = e.touches?.[0]
    if (!touch) return
    const trackWidth = windowWidth - PADDING * 2
    let x = touch.clientX - PADDING
    x = Math.max(0, Math.min(trackWidth, x))
    const val = Math.round((x / trackWidth) * 4) + 1
    emit('update:dims', { ...props.dims, [draggingKey.value]: val })
}

const endDrag = () => { draggingKey.value = null }
</script>

<style lang="scss" scoped>
.ds {
    background: #fff;
    border-radius: 32rpx;
    padding: $space-4;

    // readonly 模式：背景更淡，无白底卡片感
    &--readonly {
        background: transparent;
        padding: $space-3 0;
    }

    &__head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: $space-4;
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

    &__list {
        display: flex;
        flex-direction: column;
        gap: $space-4;
    }

    &__item {
        display: flex;
        flex-direction: column;
        gap: 12rpx;
    }

    &__axis {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__axis-left {
        font-size: 22rpx;
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
        font-size: 28rpx;
        font-weight: 500;
        color: #526253;
        min-width: 24rpx;
        text-align: center;
        letter-spacing: -0.5rpx;
    }

    &__axis-right {
        font-size: 22rpx;
        color: $color-ink-soft;
        letter-spacing: 0.5rpx;
        line-height: 1.4;
        text-align: right;
    }

    &__track {
        position: relative;
        height: 48rpx;
        display: flex;
        align-items: center;
        touch-action: none;

        // readonly 时轨道更细更轻
        .ds--readonly & {
            height: 36rpx;
        }
    }

    &__track-bg {
        position: absolute;
        left: 0;
        right: 0;
        height: 6rpx;
        border-radius: 999rpx;
        background: #e8ece8;

        .ds--readonly & {
            height: 4rpx;
        }
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

        .ds--readonly & {
            height: 4rpx;
            opacity: .75;
        }
    }

    &__track-center {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 2rpx;
        height: 16rpx;
        background: rgba(255, 255, 255, .8);
        border-radius: 2rpx;
        z-index: 1;

        .ds--readonly & {
            height: 12rpx;
        }
    }

    &__thumb {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 36rpx;
        height: 36rpx;
        border-radius: 50%;
        background: #fff;
        border: 3rpx solid #526253;
        box-shadow: 0 4rpx 12rpx rgba(82, 98, 83, .28);
        pointer-events: none;
        z-index: 2;

        // readonly：滑块更小更克制
        .ds--readonly & {
            width: 24rpx;
            height: 24rpx;
            border-width: 2rpx;
            box-shadow: 0 2rpx 8rpx rgba(82, 98, 83, .18);
        }
    }
}
</style>

<style lang="scss" scoped>
.ds {
    background: #fff;
    border-radius: 32rpx;
    padding: $space-4;

    &__head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: $space-4;
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

    &__list {
        display: flex;
        flex-direction: column;
        gap: $space-4;
    }

    &__item {
        display: flex;
        flex-direction: column;
        gap: 12rpx;
    }

    // ── 两端标签 ──
    &__axis {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__axis-left {
        font-size: 22rpx;
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
        font-size: 28rpx;
        font-weight: 500;
        color: #526253;
        min-width: 24rpx;
        text-align: center;
        letter-spacing: -0.5rpx;
    }

    &__axis-right {
        font-size: 22rpx;
        color: $color-ink-soft;
        letter-spacing: 0.5rpx;
        line-height: 1.4;
        text-align: right;
    }

    // ── 轨道 ──
    &__track {
        position: relative;
        height: 48rpx;
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

    // 中心刻度线
    &__track-center {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 2rpx;
        height: 16rpx;
        background: rgba(255, 255, 255, .8);
        border-radius: 2rpx;
        z-index: 1;
    }

    // ── 滑块 ──
    &__thumb {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 36rpx;
        height: 36rpx;
        border-radius: 50%;
        background: #fff;
        border: 3rpx solid #526253;
        box-shadow: 0 4rpx 12rpx rgba(82, 98, 83, .28);
        pointer-events: none;
        z-index: 2;
    }
}
</style>
