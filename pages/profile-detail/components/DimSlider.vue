<template>
    <view class="ds">
        <!-- Header -->
        <view class="ds__head">
            <text class="ds__title">生活维度</text>
            <text class="ds__hint">{{ hintText }}</text>
        </view>

        <!-- Radar -->
        <view class="ds__radar">
            <RadarChart :values="values" :labels="labels" :size="320" :max-value="5" tone="primary" />
        </view>

        <!-- List -->
        <view class="ds__list">
            <view class="ds__item" v-for="d in dimList" :key="d.key">
                <!-- label -->
                <view class="ds__item-head">
                    <text class="ds__item-label">
                        {{ d.label }}
                    </text>

                    <text class="ds__item-val">
                        {{ dims[d.key] || 3 }}
                    </text>
                </view>

                <!-- slider -->
                <view class="ds__slider-track" :data-key="d.key" @touchstart="startTrackDrag(d.key)"
                    @touchmove.stop.prevent="moveTrackDrag" @touchend="endTrackDrag">
                    <view class="ds__slider-fill" :style="{
                        width: percentFromValue(
                            dims[d.key] || 3
                        )
                    }" />

                    <view class="ds__slider-thumb" :style="{
                        left: percentFromValue(
                            dims[d.key] || 3
                        )
                    }" />
                </view>

                <!-- labels -->
                <view class="ds__slider-labels">
                    <text class="ds__slider-low">
                        {{ d.bottom }}
                    </text>

                    <text class="ds__slider-high">
                        {{ d.top }}
                    </text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { computed, ref } from 'vue'
import RadarChart from '@/components/RadarChart.vue'
import { DIMENSIONS } from '@/sources/mock.js'

const props = defineProps({
    dims: {
        type: Object,
        default: () => ({})
    }
})

const emit = defineEmits(['update:dims'])

// =========================
// data
// =========================
const dimList = computed(() => DIMENSIONS)

const labels = computed(() =>
    DIMENSIONS.map(d => d.label)
)

const values = computed(() =>
    DIMENSIONS.map(
        d => props.dims[d.key] || 3
    )
)

// =========================
// value => percent
// 1~5 => 0~100%
// =========================
const percentFromValue = (v) => {
    return ((v - 1) / 4) * 100 + '%'
}

// =========================
// hint
// =========================
const hintText = computed(() => {
    const v = values.value

    const max = Math.max(...v)
    const min = Math.min(...v)

    if (max - min <= 1) {
        return '均衡'
    }

    return '偏好鲜明'
})

// =========================
// slider
// =========================
const draggingKey = ref(null)


// 页面左右边距
const sliderLeft = 32

const windowInfo = uni.getWindowInfo()
// slider 宽度
const sliderWidth =
  windowInfo.windowWidth - 64

// 开始拖动
const startTrackDrag = (key) => {
    draggingKey.value = key
}

// 拖动中
const moveTrackDrag = (e) => {
    if (!draggingKey.value) return

    const touch = e.touches?.[0]

    if (!touch) return

    let x = touch.clientX - sliderLeft

    x = Math.max(
        0,
        Math.min(sliderWidth, x)
    )

    const ratio = x / sliderWidth

    const val =
        Math.round(ratio * 4) + 1

    const newDims = {
        ...props.dims,
        [draggingKey.value]: val
    }

    emit('update:dims', newDims)
}

// 结束拖动
const endTrackDrag = () => {
    draggingKey.value = null
}
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

        min-width: 32rpx;

        text-align: center;
    }

    /* =========================
       slider
    ========================= */

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

        background: #e5e9e5;

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

        transition: none;
    }

    &__slider-thumb {
        position: absolute;

        top: 50%;

        transform: translate(-50%, -50%);

        width: 28rpx;

        height: 28rpx;

        border-radius: 50%;

        background: #fff;

        border: 2rpx solid #526253;

        box-shadow: 0 2rpx 8rpx rgba(82, 98, 83, 0.3);

        pointer-events: none;

        touch-action: none;
    }

    /* =========================
       bottom labels
    ========================= */

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