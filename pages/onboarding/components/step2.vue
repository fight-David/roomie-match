<template>
  <view class="onb__slide">
    <!-- 标题 -->
    <view class="onb__header">
      <view class="onb__title-row">
        <view class="onb__title h-display">你想住在哪里？</view>
        <CitySwitcher :model-value="currentCity" @change="onCityChange" />
      </view>
    </view>

    <!-- 热门区域 -->
    <view class="onb__section">
      <view class="onb__section-label">
        热门区域
        <text class="onb__label-count">{{ selectedAreas.length }}/3</text>
      </view>

      <view class="onb__tags">
        <view v-for="a in areas" :key="a" class="onb__tag" :class="{
          'is-selected': selectedAreas.includes(a),
          'is-disabled':
            !selectedAreas.includes(a) &&
            selectedAreas.length >= MAX_SELECT
        }" hover-class="onb__tag--press" :hover-stay-time="60" @tap="toggleArea(a)">
          <text class="onb__tag-text">{{ a }}</text>

          <view v-if="selectedAreas.includes(a)" class="onb__tag-dot" />
        </view>
      </view>
    </view>

    <!-- 地铁偏好 -->
    <view class="onb__section">
      <view class="onb__section-label onb__section-label--scroll">
        地铁偏好
        <text class="onb__label-count">
          {{ selectedMetro.length }}/3
        </text>
        <text class="onb__label-arrow">→</text>
      </view>

      <scroll-view class="onb__metro-scroll" scroll-x :show-scrollbar="false">
        <view class="onb__metro-inner">
          <view v-for="m in metroLines" :key="m" class="onb__metro-chip" :class="{
            'is-on': selectedMetro.includes(m),
            'is-disabled':
              !selectedMetro.includes(m) &&
              selectedMetro.length >= MAX_SELECT
          }" hover-class="onb__metro-chip--press" :hover-stay-time="60" @tap="toggleMetro(m)">
            <text class="onb__metro-num">
              {{ m.replace('号线', '') }}
            </text>

            <text class="onb__metro-suffix">
              号线
            </text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 预算 -->
    <view class="onb__section onb__section--tight">
      <view class="onb__section-label">
        预算 · 元/月
      </view>

      <view class="onb__budget-box">
        <view class="onb__budget-display">
          <text class="onb__budget-value">
            ¥{{ budgetMin }} — ¥{{ budgetMax }}
          </text>
        </view>

        <view class="onb__budget-slider">
          <view class="onb__budget-track" @touchmove.stop.prevent="moveThumb" @touchend="endThumb">
            <view class="onb__budget-fill" :style="{
              left: rangePctL + '%',
              right: (100 - rangePctR) + '%'
            }" />

            <!-- 左 -->
            <view class="onb__budget-thumb" :style="'left:' + rangePctL + '%;'" @touchstart="startThumb('L')" />

            <!-- 右 -->
            <view class="onb__budget-thumb" :style="'left:' + rangePctR + '%;'" @touchstart="startThumb('R')" />
          </view>

          <view class="onb__budget-scale">
            <text>1k</text>
            <text>4k</text>
            <text>8k</text>
            <text>12k</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部 -->
    <view class="onb__footer-text">
      <text class="onb__footer-phrase">
        也可以先认识人，再一起找房
      </text>
    </view>
  </view>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import CitySwitcher from '@/components/CitySwitcher.vue'
import { getDistricts, getSubwayLines, DEFAULT_CITY_CODE } from '@/utils/cities.js'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['updateUserProfile'])

const MAX_SELECT = 3

// =========================
// 城市（联动区域 + 地铁）
// =========================
const currentCity = computed(() => props.modelValue?.city || DEFAULT_CITY_CODE)

const onCityChange = (code) => {
  // 切换城市时，清空已选的区域和地铁（因为不属于新城市）
  selectedAreas.value = []
  selectedMetro.value = []
  emit('updateUserProfile', 'city', code)
  emit('updateUserProfile', 'target_districts', [])
  emit('updateUserProfile', 'target_subways', [])
}

// =========================
// 热门区域（来自城市配置）
// =========================
const areas = computed(() => getDistricts(currentCity.value))

const selectedAreas = ref(
  props.modelValue?.target_districts
    ? [...props.modelValue.target_districts]
    : []
)

const toggleArea = (area) => {
  const idx = selectedAreas.value.indexOf(area)

  if (idx > -1) {
    selectedAreas.value.splice(idx, 1)
  } else {
    if (selectedAreas.value.length >= MAX_SELECT) return
    selectedAreas.value.push(area)
  }

  try {
    uni.vibrateShort({
      type: 'light'
    })
  } catch (e) { }

  emit(
    'updateUserProfile',
    'target_districts',
    [...selectedAreas.value]
  )
}

// =========================
// 地铁偏好
// =========================
const metroLines = computed(() => getSubwayLines(currentCity.value))

const selectedMetro = ref(
  props.modelValue?.target_subways
    ? [...props.modelValue.target_subways]
    : []
)

const toggleMetro = (m) => {
  const idx = selectedMetro.value.indexOf(m)

  if (idx > -1) {
    selectedMetro.value.splice(idx, 1)
  } else {
    if (selectedMetro.value.length >= MAX_SELECT) return
    selectedMetro.value.push(m)
  }

  try {
    uni.vibrateShort({
      type: 'light'
    })
  } catch (e) { }

  emit(
    'updateUserProfile',
    'target_subways',
    [...selectedMetro.value]
  )
}

// =========================
// 预算
// =========================
const budgetMin = ref(
  props.modelValue?.budget_min || 3000
)

const budgetMax = ref(
  props.modelValue?.budget_max || 6500
)

const _draggingThumb = ref(null)

const rangeMin = computed(() => 1000)
const rangeMax = computed(() => 12000)

const rangePctL = computed(() => {
  return (
    ((budgetMin.value - rangeMin.value) /
      (rangeMax.value - rangeMin.value)) *
    100
  )
})

const rangePctR = computed(() => {
  return (
    ((budgetMax.value - rangeMin.value) /
      (rangeMax.value - rangeMin.value)) *
    100
  )
})

// =========================
// slider 宽度计算
// =========================
const systemInfo = uni.getSystemInfoSync()

const pagePadding = 32
const sliderInnerPadding = 40

const trackLeft =
  pagePadding + sliderInnerPadding

const trackWidth =
  systemInfo.windowWidth -
  trackLeft * 2

// =========================
// 拖动
// =========================
const startThumb = (which) => {
  _draggingThumb.value = which
}

const moveThumb = (e) => {
  const which = _draggingThumb.value

  if (!which) return

  const touch = e.touches?.[0]

  if (!touch) return

  let x = touch.clientX - trackLeft

  x = Math.max(
    0,
    Math.min(trackWidth, x)
  )

  const pct = x / trackWidth

  let raw =
    rangeMin.value +
    pct *
    (rangeMax.value - rangeMin.value)

  let v = Math.round(raw / 100) * 100

  if (which === 'L') {
    if (v > budgetMax.value - 200) {
      v = budgetMax.value - 200
    }

    budgetMin.value = Math.max(
      rangeMin.value,
      v
    )
  } else {
    if (v < budgetMin.value + 200) {
      v = budgetMin.value + 200
    }

    budgetMax.value = Math.min(
      rangeMax.value,
      v
    )
  }
}

const endThumb = () => {
  _draggingThumb.value = null

  emit(
    'updateUserProfile',
    'budget_min',
    budgetMin.value
  )

  emit(
    'updateUserProfile',
    'budget_max',
    budgetMax.value
  )
}
</script>

<style lang="scss" scoped>
.onb {
  &__header {
    padding-top: $space-1;
    padding-bottom: $space-4;
    text-align: center;
  }

  &__title-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-2;
  }

  &__section {
    margin-bottom: $space-6;
  }

  &__section--tight {
    margin-bottom: $space-3;
  }

  &__section-label {
    font-size: $font-xs;
    font-weight: 500;
    letter-spacing: 4rpx;
    color: $color-ink-ghost;
    text-transform: uppercase;
    margin-bottom: $space-2;
    padding-left: 4rpx;
  }

  &__label-count {
    margin-left: 6rpx;
    font-size: 12rpx;
    color: $color-ink-ghost;
  }

  &__label-arrow {
    margin-left: 4rpx;
    opacity: 0.5;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10rpx;
  }

  &__tag {
    position: relative;
    min-width: calc(33.333% - 7rpx);
    flex: 1 0 auto;

    padding: 16rpx 6rpx;

    background: #fff;

    border-radius: 20rpx;

    border: 1.5rpx solid rgba(143, 160, 142, 0.15);

    display: flex;
    align-items: center;
    justify-content: center;

    transition: all 200ms;

    &--press {
      transform: scale(0.965);
    }

    &.is-selected {
      border-color: $color-primary;
      background: #f2f7f3;
    }

    &.is-disabled {
      opacity: 0.35;
    }
  }

  &__tag-text {
    font-size: 26rpx;
    color: $color-ink;
  }

  &__tag-dot {
    position: absolute;
    top: 6rpx;
    right: 6rpx;

    width: 10rpx;
    height: 10rpx;

    border-radius: 50%;

    background: $color-primary;
  }

  &__metro-scroll {
    width: 100%;
  }

  &__metro-inner {
    display: flex;
    gap: 8rpx;
    white-space: nowrap;
  }

  &__metro-chip {
    flex-shrink: 0;

    display: flex;
    align-items: baseline;

    padding: 9rpx 16rpx;

    border-radius: 999rpx;

    background: rgba(197, 199, 198, 0.45);

    &--press {
      transform: scale(0.94);
    }

    &.is-on {
      background: $color-ink;
    }

    &.is-disabled {
      opacity: 0.3;
    }
  }

  &__metro-num {
    font-size: 20rpx;
    color: $color-ink-soft;
  }

  &__metro-suffix {
    font-size: 14rpx;
    margin-left: 2rpx;
    color: $color-ink-ghost;
  }

  .is-on &__metro-num {
    color: #fff;
  }

  .is-on &__metro-suffix {
    color: rgba(255, 255, 255, 0.6);
  }

  &__budget-box {
    background: #fff;

    border-radius: 28rpx;

    padding:
      $space-3 $space-4 $space-4;

    box-shadow: 0 2rpx 12rpx rgba(143, 160, 142, 0.04);
  }

  &__budget-display {
    text-align: center;
    margin-bottom: $space-3;
  }

  &__budget-value {
    font-size: 48rpx;
    font-weight: 300;
    color: $color-ink;
  }

  &__budget-slider {
    padding: 0 4rpx;
  }

  &__budget-track {
    position: relative;

    width: 100%;
    height: 6rpx;

    background: #e8ede9;

    border-radius: 999rpx;
  }

  &__budget-fill {
    position: absolute;
    top: 0;
    bottom: 0;

    background: $color-primary;

    border-radius: 999rpx;

    transition: none;
  }

  &__budget-thumb {
    position: absolute;

    top: 50%;

    width: 42rpx;
    height: 42rpx;

    border-radius: 50%;

    background: #fff;

    border: 2.5rpx solid $color-primary;

    box-shadow: 0 4rpx 14rpx rgba(82, 98, 83, 0.16);

    transform: translate(-50%, -50%);

    touch-action: none;
  }

  &__budget-scale {
    display: flex;
    justify-content: space-between;

    margin-top: $space-1;

    font-size: 16rpx;

    color: $color-ink-ghost;
  }

  &__footer-text {
    margin-top: $space-4;
    text-align: center;
  }

  &__footer-phrase {
    font-size: 20rpx;
    color: $color-ink-soft;
    opacity: 0.5;
  }
}
</style>