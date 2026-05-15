<template>
  <view class="onb__slide">
    <!-- 标题：更紧凑，去副标题省空间 -->
    <view class="onb__header">
      <view class="onb__title h-display">你想住在哪里？</view>
    </view>

        <!-- ========== 热门区域 - 紧凑标签网格 ========== -->
    <view class="onb__section">
      <view class="onb__section-label">
        热门区域
        <text class="onb__label-count">{{ selectedAreas.length }}/3</text>
      </view>
      <view class="onb__tags">
        <view
          v-for="a in areas"
          :key="a"
          class="onb__tag"
          :class="{
            'is-selected': selectedAreas.includes(a),
            'is-disabled': !selectedAreas.includes(a) && selectedAreas.length >= MAX_SELECT
          }"
          hover-class="onb__tag--press"
          :hover-stay-time="60"
          @tap="toggleArea(a)"
        >
          <text class="onb__tag-text">{{ a }}</text>
          <view v-if="selectedAreas.includes(a)" class="onb__tag-dot"></view>
        </view>
      </view>
    </view>

    <!-- ========== 地铁偏好 - 极小标签横向滚动 ========== -->
    <view class="onb__section">
      <view class="onb__section-label onb__section-label--scroll">
        地铁偏好
        <text class="onb__label-count">{{ selectedMetro.length }}/3</text>
        <text class="onb__label-arrow">→</text>
      </view>
      <scroll-view
        class="onb__metro-scroll"
        scroll-x
        :show-scrollbar="false"
      >
        <view class="onb__metro-inner">
          <view
            v-for="m in metroLines"
            :key="m"
            class="onb__metro-chip"
            :class="{
              'is-on': selectedMetro.includes(m),
              'is-disabled': !selectedMetro.includes(m) && selectedMetro.length >= MAX_SELECT
            }"
            hover-class="onb__metro-chip--press"
            :hover-stay-time="60"
            @tap="toggleMetro(m)"
          >
            <text class="onb__metro-num">{{ m.replace('号线', '') }}</text>
            <text class="onb__metro-suffix">号线</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- ========== 预算 ========== -->
    <view class="onb__section onb__section--tight">
      <view class="onb__section-label">预算 · 元/月</view>
      <view class="onb__budget-box">
        <view class="onb__budget-display">
          <text class="onb__budget-value">¥{{ budgetMin }} — ¥{{ budgetMax }}</text>
        </view>
        <view class="onb__budget-slider">
          <view class="onb__budget-track">
            <view
              class="onb__budget-fill"
              :style="{ left: rangePctL + '%', right: (100 - rangePctR) + '%' }"
            ></view>
            <view
              class="onb__budget-thumb"
              :style="{ left: rangePctL + '%' }"
              @touchstart="startThumb('L', $event)"
              @touchmove.stop.prevent="moveThumb('L', $event)"
              @touchend="endThumb"
            ></view>
            <view
              class="onb__budget-thumb"
              :style="{ left: rangePctR + '%' }"
              @touchstart="startThumb('R', $event)"
              @touchmove.stop.prevent="moveThumb('R', $event)"
              @touchend="endThumb"
            ></view>
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

    <!-- ========== 底部文案 ========== -->
    <view class="onb__footer-text">
      <text class="onb__footer-phrase">也可以先认识人，再一起找房</text>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'

const emit = defineEmits(['updateUserProfile'])

const MAX_SELECT = 3

// —— 热门区域 ——
const areas = ['静安', '徐汇', '闵行', '黄浦', '宝山', '长宁', '杨浦', '浦东', '普陀']
const selectedAreas = ref([])

const toggleArea = (area) => {
    const idx = selectedAreas.value.indexOf(area)
    if (idx > -1) {
        selectedAreas.value.splice(idx, 1)
    } else {
        if (selectedAreas.value.length >= MAX_SELECT) return
        selectedAreas.value.push(area)
    }
    try { uni.vibrateShort({ type: 'light' }) } catch (e) { /* noop */ }
    emit('updateUserProfile', 'target_districts', [...selectedAreas.value])
}

// —— 地铁偏好 ——
const metroLines = [
    '1号线', '2号线', '3号线', '4号线',
    '6号线', '7号线', '8号线', '9号线',
    '10号线', '11号线', '12号线', '13号线',
    '15号线', '17号线', '18号线', '浦江线'
]
const selectedMetro = ref([])

const toggleMetro = (m) => {
    const idx = selectedMetro.value.indexOf(m)
    if (idx > -1) {
        selectedMetro.value.splice(idx, 1)
    } else {
        if (selectedMetro.value.length >= MAX_SELECT) return
        selectedMetro.value.push(m)
    }
    try { uni.vibrateShort({ type: 'light' }) } catch (e) { /* noop */ }
    emit('updateUserProfile', 'target_subways', [...selectedMetro.value])
}

// —— 预算 ——
const budgetMin = ref(3000)
const budgetMax = ref(6500)
const _draggingThumb = ref(null)
const _rangeRect = ref(null)

const rangeMin = computed(() => 1000)
const rangeMax = computed(() => 12000)
const rangePctL = computed(() => {
    return ((budgetMin.value - rangeMin.value) / (rangeMax.value - rangeMin.value)) * 100
})
const rangePctR = computed(() => {
    return ((budgetMax.value - rangeMin.value) / (rangeMax.value - rangeMin.value)) * 100
})

const startThumb = (which, e) => {
    _draggingThumb.value = which
    _rangeRect.value = null
    const query = uni.createSelectorQuery()
    query
        .select('.onb__budget-track')
        .boundingClientRect((r) => {
            _rangeRect.value = r
        })
        .exec()
}

const moveThumb = (which, e) => {
    const r = _rangeRect.value
    if (!r) return
    const t = e.touches[0] || e.changedTouches?.[0] || {}
    const clientX = t.clientX ?? t.pageX ?? 0
    const x = Math.max(0, Math.min(r.width, clientX - r.left))
    const pct = x / r.width
    const raw = rangeMin.value + pct * (rangeMax.value - rangeMin.value)
    const v = Math.round(raw / 100) * 100
    if (which === 'L') {
        budgetMin.value = Math.min(v, budgetMax.value - 200)
    } else {
        budgetMax.value = Math.max(v, budgetMin.value + 200)
    }
}

const endThumb = () => {
    _draggingThumb.value = null
    emit('updateUserProfile', 'budget_min', budgetMin.value)
    emit('updateUserProfile', 'budget_max', budgetMax.value)
}
</script>

<style lang="scss" scoped>
.onb {
  /* ---- Header 更紧凑 ---- */
  &__header {
    padding-top: $space-1;
    padding-bottom: $space-4;
    text-align: center;
  }

  /* ---- Sections 间距压缩 ---- */
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
    display: inline-block;
    font-size: 12rpx;
    font-weight: 400;
    color: $color-ink-ghost;
    margin-left: 6rpx;
    letter-spacing: 1rpx;
  }

  &__label-arrow {
    display: inline-block;
    font-size: 14rpx;
    font-weight: 300;
    color: $color-ink-ghost;
    margin-left: 4rpx;
    opacity: 0.5;
    animation: onb-arrow-pulse 2s ease-in-out infinite;
  }

  /* ==============================================
     热门区域 — 紧凑标签网格
     去掉呼吸动画 / 大 padding / check 圆点，
     用更薄的胶囊式标签，每行 3 个刚刚好
     ============================================== */
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
    transition: all 200ms cubic-bezier(0.16, 0.84, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;

    &--press {
      transform: scale(0.965);
    }

        &.is-selected {
      border-color: $color-primary;
      background: #F2F7F3;
    }

    &.is-disabled {
      opacity: 0.35;
    }
  }

  &__tag-text {
    font-size: 26rpx;
    font-weight: 430;
    color: $color-ink;
    letter-spacing: 2rpx;
    line-height: 1;
  }

  &__tag-dot {
    position: absolute;
    top: 6rpx;
    right: 6rpx;
    width: 10rpx;
    height: 10rpx;
    border-radius: 50%;
    background: $color-primary;
    opacity: 0;
    transform: scale(0.3);
    transition: all 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .is-selected &__tag-dot {
    opacity: 1;
    transform: scale(1);
  }

        /* ==============================================
     地铁偏好 — 极小标签横向滚动
     高度极低，从左往右滑
     ============================================== */
  &__metro-scroll {
    width: 100%;
    overflow: hidden;
  }

    &__metro-inner {
    display: flex;
    gap: 8rpx;
    padding: 4rpx 0;
    white-space: nowrap;
  }

  &__metro-chip {
    flex-shrink: 0;
    display: flex;
    align-items: baseline;
    padding: 9rpx 16rpx;
    border-radius: 999rpx;
    background: rgba(197, 199, 198, 0.45);
    border: 1rpx solid transparent;
    transition: all 180ms cubic-bezier(0.16, 0.84, 0.2, 1);

    &--press {
      transform: scale(0.94);
    }

        &.is-on {
      background: $color-ink;
      border-color: $color-ink;
    }

    &.is-disabled {
      opacity: 0.3;
    }
  }

  &__metro-num {
    font-size: 20rpx;
    font-weight: 500;
    color: $color-ink-soft;
    letter-spacing: 0.3rpx;
    line-height: 1.2;
    transition: color 180ms ease;
    font-variant-numeric: tabular-nums;
  }

  &__metro-suffix {
    font-size: 14rpx;
    font-weight: 350;
    color: $color-ink-ghost;
    margin-left: 1rpx;
    transition: color 180ms ease;
  }

  .is-on &__metro-num {
    color: #fff;
  }

  .is-on &__metro-suffix {
    color: rgba(255, 255, 255, 0.55);
  }

  /* ---- 预算 ---- */
  &__budget-box {
    background: #fff;
    border-radius: 28rpx;
    padding: $space-3 $space-4 $space-4;
    box-shadow: 0 2rpx 12rpx rgba(143, 160, 142, 0.04);
  }

  &__budget-display {
    text-align: center;
    margin-bottom: $space-3;
  }

  &__budget-value {
    font-size: 48rpx;
    font-weight: 300;
    letter-spacing: -1rpx;
    color: $color-ink;
    line-height: 1;
  }

  &__budget-slider {
    padding: 0 4rpx;
  }

  &__budget-track {
    position: relative;
    width: 100%;
    height: 6rpx;
    background: #E8EDE9;
    border-radius: 999rpx;
  }

  &__budget-fill {
    position: absolute;
    top: 0;
    bottom: 0;
    background: $color-primary;
    border-radius: 999rpx;
    transition: width 0.1s ease, right 0.1s ease;
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
  }

  &__budget-scale {
    display: flex;
    justify-content: space-between;
    margin-top: $space-1;
    padding: 0 2rpx;
    font-size: 16rpx;
    color: $color-ink-ghost;
    letter-spacing: 0.2rpx;
  }

  /* ---- 底部文案 ---- */
  &__footer-text {
    margin-top: $space-4;
    text-align: center;
    padding-bottom: $space-1;
  }

    &__footer-phrase {
    font-size: 20rpx;
    font-weight: 350;
    color: $color-ink-soft;
    letter-spacing: 3rpx;
    opacity: 0.5;
    line-height: 1.6;
  }
}

/* ---- 箭头暗示脉冲 ---- */
@keyframes onb-arrow-pulse {
  0%, 100% {
    transform: translateX(0);
    opacity: 0.4;
  }
  50% {
    transform: translateX(4rpx);
    opacity: 0.8;
  }
}
</style>