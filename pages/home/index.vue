<template>
  <view class="dis">
    <view class="dis__header">
      <view class="dis__title-row">
        <text class="dis__title h-display">发现室友</text>
        <CitySwitcher :model-value="currentCity" @change="onCityChange" />
      </view>
      <text class="dis__subtitle">{{ subtitle }}</text>
    </view>

    <!-- 骨架屏 -->
    <view v-if="loading" class="dis__sk">
      <view v-for="i in 3" :key="i" class="dis__sk-card">
        <view class="dis__sk-cover"></view>
        <view class="dis__sk-body">
          <view class="dis__sk-line dis__sk-line--name"></view>
          <view class="dis__sk-line dis__sk-line--bio"></view>
          <view class="dis__sk-line dis__sk-line--meta"></view>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view v-else-if="!people.length" class="dis__empty">
      <text class="dis__empty-icon">☁</text>
      <text class="dis__empty-text">还没有合适的室友</text>
    </view>

    <!-- 列表 -->
    <view v-else class="dis__list">
      <UserCard v-for="p in sorted" :key="p.id" :user="p" :harmony="p.harmony" :focused="focusId === p.id"
        @click="goDetail(p)" @mouseenter="focusId = p.id" @mouseleave="focusId = null" />
    </view>

    <Tabbar current="home" />
  </view>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { calcHarmony } from '@/utils/match.js'
import { fetchPeople } from '@/api/db.js'
import { getCityName, DEFAULT_CITY_CODE } from '@/utils/cities.js'
import UserCard from '@/components/UserCard.vue'
import CitySwitcher from '@/components/CitySwitcher.vue'
import Tabbar from '@/components/Tabbar.vue'

const userStore = useUserStore()
const focusId = ref(null)
const people = ref([])
const loading = ref(true)

const currentCity = computed(() => userStore.profile?.city || DEFAULT_CITY_CODE)
const subtitle = computed(() => `${getCityName(currentCity.value)} · 根据你的偏好为你推荐`)

const onCityChange = (code) => {
  userStore.setCity(code)
}

const goDetail = (p) => {
  uni.navigateTo({ url: `/pages/profile-detail/index?id=${p.id}` })
}

onMounted(async () => {
  try {
    const data = await fetchPeople(currentCity.value)
    people.value = data && data.length ? data : []
  } catch (e) {
    console.warn('云数据库读取失败', e)
    people.value = []
  } finally {
    loading.value = false
  }
})

const sorted = computed(() => {
  const current = userStore.profile
  if (!current) return []
  if (!people.value?.length) return []
  return people.value
      .filter(user => {
          // 排除自己
          if (user.id === current.id) return false
          if (user.wx_uid && user.wx_uid === current.id) return false

          // 排除拉黑的人
          const uid = user.id || user.wx_uid || user._id
          if (userStore.blockedIds?.includes(uid)) return false

          // 城市筛选（用户没设 city 默认归到上海，避免老数据被全部过滤掉）
          const userCity = user.city || DEFAULT_CITY_CODE
          if (userCity !== currentCity.value) return false

          // 性别筛选
          const tg = current.target_gender
          if (!tg || tg === '不限') return true
          return user.gender === tg
      })
    .map(user => {
      try {
        const result = calcHarmony(current, user)
        return { ...user, harmony: result.score }
      } catch (e) {
        console.warn('calcHarmony error:', e, user.id)
        return { ...user, harmony: 0 }
      }
    })
    .sort((a, b) => b.harmony - a.harmony)
})
</script>

<style lang="scss" scoped>
.dis {
  min-height: 100vh;
  background: $color-paper;
  padding: 0 $space-3 140rpx;

  &__header {
    padding: $space-7 $space-2 $space-3;
  }

  &__title-row {
    display: flex;
    align-items: center;
    gap: 20rpx;
    flex-wrap: wrap;
  }

  &__title {
    font-size: 72rpx;
    font-weight: 350;
    letter-spacing: -2rpx;
    color: $color-ink;
    line-height: 1.1;
  }

  &__subtitle {
    display: block;
    margin-top: $space-2;
    font-size: $font-sm;
    color: $color-ink-soft;
    letter-spacing: 2rpx;
    font-weight: 350;
  }

    &__list {
    padding-bottom: $space-6;
  }

  /* ---- 骨架屏 ---- */
  &__sk {
    padding: 0 $space-2;
  }

  &__sk-card {
    background: #fff;
    border-radius: 32rpx;
    overflow: hidden;
    margin-bottom: $space-4;
    box-shadow: 0 4rpx 24rpx rgba(143, 160, 142, 0.06);
  }

  &__sk-cover {
    width: 100%;
    height: 320rpx;
    background: linear-gradient(90deg, #eceeec 25%, #f5f7f5 50%, #eceeec 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s ease-in-out infinite;
  }

  &__sk-body {
    padding: $space-3;
  }

  &__sk-line {
    height: 20rpx;
    border-radius: 8rpx;
    background: linear-gradient(90deg, #eceeec 25%, #f5f7f5 50%, #eceeec 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s ease-in-out infinite;
    margin-bottom: 12rpx;

    &--name {
      width: 40%;
      height: 28rpx;
    }

    &--bio {
      width: 70%;
    }

    &--meta {
      width: 50%;
    }
  }

  /* ---- 空状态 ---- */
  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: $space-7;
  }

  &__empty-icon {
    font-size: 80rpx;
    opacity: 0.3;
    margin-bottom: $space-4;
  }

  &__empty-text {
    font-size: $font-sm;
    color: $color-ink-ghost;
    letter-spacing: 2rpx;
  }
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
