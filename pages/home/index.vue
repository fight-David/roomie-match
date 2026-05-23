<template>
  <view class="dis">
    <view class="dis__header">
      <text class="dis__title h-display">发现室友</text>
      <text class="dis__subtitle">根据你的偏好为你推荐</text>
    </view>

    <view class="dis__list">
      <UserCard v-for="p in sorted" :key="p.id" :user="p" :harmony="p.harmony" :focused="focusId === p.id"
        @mouseenter="focusId = p.id" @mouseleave="focusId = null" />
    </view>

    <Tabbar current="home" />
  </view>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { calcHarmony } from '@/utils/match.js'
import { fetchPeople } from '@/api/db.js'
import { PEOPLE as MOCK_PEOPLE } from '@/sources/mock.js'
import UserCard from '@/components/UserCard.vue'
import Tabbar from '@/components/Tabbar.vue'

const userStore = useUserStore()
const focusId = ref(null)
const people = ref([])

onMounted(async () => {
    try {
        const data = await fetchPeople()
        if (data && data.length) {
            people.value = data
        } else {
            people.value = MOCK_PEOPLE
        }
    } catch (e) {
        console.warn('云数据库读取失败，使用 mock 数据', e)
        people.value = MOCK_PEOPLE
    }
})

const sorted = computed(() => {
    const current = userStore.profile
    if (!current) return []
    return people.value
        .filter(user => {
            return current.target_gender === '不限' || user.gender === current.target_gender
        })
        .map(user => {
            const result = calcHarmony(current, user)
            return { ...user, harmony: result.score }
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
}
</style>
