<template>
    <view class="onb__slide">
        <view class="onb__title h-display">生活节奏</view>

        <view class="onb__radar-wrap">
            <RadarChart :values="values" :labels="labels" :size="480" :max-value="5" />
        </view>

        <view class="onb__vsliders">
            <view class="onb__vsliders-row">
                <Vslider v-for="i in [0, 1, 2]" :key="'s' + i" :min="1" :max="5" :model-value="values[i]"
                    @update:modelValue="v => updateDim(i, v)" :label="dims[i].label" :top-text="dims[i].top"
                    :bottom-text="dims[i].bottom" />
            </view>
            <view class="onb__vsliders-row">
                <Vslider v-for="i in [3, 4, 5]" :key="'s' + i" :min="1" :max="5" :model-value="values[i]"
                    @update:modelValue="v => updateDim(i, v)" :label="dims[i].label" :top-text="dims[i].top"
                    :bottom-text="dims[i].bottom" />
            </view>
        </view>
    </view>
</template>

<script setup>
import { DIMENSIONS } from '@/sources/mock.js'
import RadarChart from '@/components/RadarChart.vue'
import Vslider from '@/components/Vslider.vue'
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) }
})
const emit = defineEmits(['updateUserProfile'])

const dims = ref([...DIMENSIONS])
const dimKeys = ['schedule', 'tidy', 'social', 'noise', 'finance', 'pets_vibe']

// 从已有 profile 的 dims 取初始值
const initialDims = props.modelValue?.dims || {}
const values = ref(dimKeys.map(key => initialDims[key] || 3))

const labels = computed(() => { return dims.value.map(d => d.label) })

const updateDim = (i, v) => {
    values.value[i] = v
    // 构建完整的 dims 对象
    const dimsObj = {}
    dimKeys.forEach((key, idx) => { dimsObj[key] = values.value[idx] })
    emit('updateUserProfile', 'dims', dimsObj)
}

</script>

<style lang="scss" scoped>
.onb {
    &__radar-wrap {
        margin-top: $space-5;
        display: flex;
        justify-content: center;
    }

    &__vsliders {
        margin-top: $space-3;
        display: flex;
        flex-direction: column;
        gap: $space-2;
    }

    &__vsliders-row {
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
    }

    /* ---------- Step 2: 红黑榜 ---------- */
    &__list-title {
        display: flex;
        align-items: center;
        margin-top: $space-5;
        margin-bottom: $space-3;
        font-size: $font-sm;
        letter-spacing: 2rpx;
        color: $color-ink;
        gap: 12rpx;
    }

    &__dot {
        width: 10rpx;
        height: 10rpx;
        border-radius: 50%;

        &--red {
            background: $color-red-list;
        }

        &--black {
            background: $color-black-list;
        }
    }

    &__count {
        margin-left: auto;
        font-size: $font-xs;
        color: $color-ink-ghost;
        letter-spacing: 1rpx;
        min-width: 60rpx;
        text-align: right;
        font-variant-numeric: tabular-nums;
    }

    &__tags {
        display: flex;
        flex-wrap: wrap;
        margin-left: -8rpx;
    }

    &__add {
        display: inline-flex;
        align-items: center;
        padding: 14rpx 24rpx;
        margin: 8rpx;
        border-radius: 999rpx;
        border: 2rpx dashed rgba(82, 98, 83, 0.5);
        color: $color-primary;
        font-size: $font-sm;
        letter-spacing: 1rpx;
        transition: transform $dur-fast;

        &--press {
            transform: scale(0.96);
        }
    }

    &__add-plus {
        font-size: 28rpx;
        margin-right: 8rpx;
        font-weight: 200;
    }
}
</style>