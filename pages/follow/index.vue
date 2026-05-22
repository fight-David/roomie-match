<template>
    <view class="fw">
        <view class="fw__head h-safe-top">
            <view class="fw__nav">
                <text class="fw__back" @tap="back">‹</text>
                <text class="fw__title h-display">社交</text>
            </view>
        </view>

        <FollowTab :tabs="tabs" :active="activeTab" @switch="switchTab" />

        <!-- 互相关注 -->
        <FollowList v-if="activeTab === 'mutual'" :list="mutual" mode="mutual"
            empty-text="还没有室友，去发现页认识人吧" />

        <!-- 关注 -->
        <FollowList v-if="activeTab === 'following'" :list="following" mode="following"
            empty-text="你还没有关注任何人" />

        <!-- 粉丝 -->
        <FollowList v-if="activeTab === 'followers'" :list="followers" mode="followers"
            empty-text="还没有人关注你" />
    </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { PEOPLE } from '@/sources/mock.js'
import { useFollowStore } from '@/stores/follow'
import { useUserStore } from '@/stores/user'
import { calcHarmony } from '@/utils/match.js'
import FollowTab from './components/FollowTab.vue'
import FollowList from './components/FollowList.vue'

const followStore = useFollowStore()
const userStore = useUserStore()

const activeTab = ref('mutual')

onLoad((q) => {
    if (q?.tab && ['mutual', 'following', 'followers'].includes(q.tab)) {
        activeTab.value = q.tab
    }
})

const getPerson = (id) => PEOPLE.find(p => p.id === id)
const withHarmony = (p) => p ? { ...p, harmony: calcHarmony(userStore.profile, p).score } : null

const tabs = computed(() => [
    { key: 'mutual', label: '室友', count: followStore.mutualList.length },
    { key: 'following', label: '关注', count: followStore.followingList.length },
    { key: 'followers', label: '粉丝', count: followStore.followersList.length }
])

const mutual = computed(() => {
    const mutualIds = new Set(followStore.mutualList)
    return followStore.followingList
        .filter(f => mutualIds.has(f.id))
        .map(f => getPerson(f.id))
        .filter(Boolean)
        .map(withHarmony)
        .sort((a, b) => b.harmony - a.harmony)
})

const following = computed(() => {
    const mutualIds = new Set(followStore.mutualList)
    return followStore.followingList
        .filter(f => !mutualIds.has(f.id))
        .map(f => getPerson(f.id))
        .filter(Boolean)
        .map(withHarmony)
        .sort((a, b) => b.harmony - a.harmony)
})

const followers = computed(() => {
    return followStore.followersList
        .map(f => getPerson(f.id))
        .filter(Boolean)
        .map(withHarmony)
})

const switchTab = (key) => { activeTab.value = key }
const back = () => uni.navigateBack()
</script>

<style lang="scss" scoped>
.fw {
    min-height: 100vh;
    background: $color-paper;

    &__head {
        padding: $space-3 $space-4 0;
    }

    &__nav {
        display: flex;
        align-items: center;
        height: 80rpx;
        margin-bottom: $space-2;
    }

    &__back {
        font-size: 48rpx;
        color: $color-ink;
        font-weight: 200;
        width: 64rpx;
        padding: 0 $space-1;
        margin-left: -$space-1;
    }

    &__title {
        font-size: 36rpx;
        font-weight: 600;
        letter-spacing: -0.3rpx;
        color: $color-ink;
    }
}
</style>