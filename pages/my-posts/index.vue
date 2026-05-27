<template>
    <view class="mp">
        <!-- 顶部 -->
        <view class="mp__nav h-safe-top">
            <view class="mp__nav-bar">
                <text class="mp__back" @tap="back">‹</text>
                <text class="mp__title">我的动态</text>
                <view style="width: 64rpx;"></view>
            </view>
        </view>

        <!-- 概要 -->
        <view class="mp__hero">
            <text class="mp__hero-num">{{ myPosts.length }}</text>
            <text class="mp__hero-label">条发布</text>
        </view>

        <!-- 列表 -->
        <view v-if="loading" class="mp__loading">
            <text>加载中…</text>
        </view>

        <view v-else-if="!myPosts.length" class="mp__empty">
            <text class="mp__empty-icon">○</text>
            <text class="mp__empty-text">还没有发布过帖子</text>
            <view class="mp__empty-cta" hover-class="mp__empty-cta--press" @tap="goPost">
                <text>去发一条</text>
            </view>
        </view>

        <view v-else class="mp__list">
            <view
                v-for="p in myPosts"
                :key="p.id || p._id"
                class="mp__item"
                hover-class="mp__item--press"
                :hover-stay-time="60"
                @tap="openDetail(p)"
            >
                <view class="mp__item-head">
                    <view class="mp__type" :style="{ background: typeBg(p.postType), color: typeColor(p.postType) }">
                        <text>{{ typeLabel(p.postType) }}</text>
                    </view>
                    <text class="mp__time">{{ formatTime(p.created_at) }}</text>
                </view>

                <text class="mp__item-title">{{ p.title }}</text>
                <text v-if="p.content" class="mp__item-desc">{{ p.content }}</text>

                <view class="mp__item-foot">
                    <text class="mp__item-meta" v-if="p.location">{{ p.location }}</text>
                    <text class="mp__item-dot" v-if="p.location && p.budget">·</text>
                    <text class="mp__item-meta" v-if="p.budget">¥{{ p.budget }}/月</text>
                    <view class="mp__del" @tap.stop="confirmDelete(p)">
                        <text>删除</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { PROJECTS as MOCK_PROJECTS, POST_TYPES } from '@/utils/constant'
import { fetchProjects } from '@/api/db.js'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const allPosts = ref([])
const loading = ref(true)

const myId = computed(() => userStore.profile?.id || userStore.uid || '')

const myPosts = computed(() =>
    allPosts.value
        .filter(p => p.authorId === myId.value)
        .sort((a, b) => (b.created_at || 0) - (a.created_at || 0))
)

const typeLabel = (v) => POST_TYPES[v]?.label || '帖子'
const typeColor = (v) => POST_TYPES[v]?.color || '#6B6F6A'
const typeBg = (v) => (POST_TYPES[v]?.color || '#6B6F6A') + '1A'

const formatTime = (ts) => {
    if (!ts) return ''
    const diff = Date.now() - ts
    const minute = 60 * 1000
    const hour = 60 * minute
    const day = 24 * hour
    if (diff < minute) return '刚刚'
    if (diff < hour) return Math.floor(diff / minute) + ' 分钟前'
    if (diff < day) return Math.floor(diff / hour) + ' 小时前'
    if (diff < 7 * day) return Math.floor(diff / day) + ' 天前'
    const d = new Date(ts)
    return `${d.getMonth() + 1}-${d.getDate()}`
}

const load = async () => {
    loading.value = true
    try {
        const data = await fetchProjects()
        allPosts.value = data?.length ? data : []
    } catch (e) {
        allPosts.value = []
    } finally {
        loading.value = false
    }
}

onMounted(load)

const back = () => uni.navigateBack()

const goPost = () => {
    uni.switchTab({ url: '/pages/post/index' })
}

const openDetail = (p) => {
    const pid = p.id || p._id
    if (!pid) return
    uni.navigateTo({ url: `/pages/post-detail/index?id=${pid}` })
}

const confirmDelete = (p) => {
    uni.showModal({
        title: '删除帖子',
        content: '确定要删除这条动态吗？',
        confirmColor: '#c44',
        success: async (res) => {
            if (!res.confirm) return
            const pid = p._id || p.id
            if (!pid) {
                uni.showToast({ title: '帖子 id 缺失', icon: 'none' })
                return
            }

            try {
                const r = await uniCloud.callFunction({
                    name: 'post-op',
                    data: { action: 'delete', postId: pid }
                })
                if (r.result?.code === 0) {
                    // 云端成功后再从本地移除
                    const idx = allPosts.value.findIndex(x => (x._id || x.id) === pid)
                    if (idx >= 0) allPosts.value.splice(idx, 1)
                    uni.showToast({ title: '已删除', icon: 'success' })
                } else {
                    uni.showToast({ title: r.result?.message || '删除失败', icon: 'none' })
                }
            } catch (e) {
                uni.showToast({ title: '云端同步失败', icon: 'none' })
            }
        }
    })
}
</script>

<style lang="scss" scoped>
.mp {
    min-height: 100vh;
    background: $color-paper;
    padding-bottom: 80rpx;

    &__nav {
        background: $color-paper;
    }

    &__nav-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 $space-4;
        height: 88rpx;
    }

    &__back {
        font-size: 52rpx;
        font-weight: 200;
        color: $color-ink;
        width: 64rpx;
        line-height: 88rpx;
    }

    &__title {
        font-size: 30rpx;
        font-weight: 500;
        color: $color-ink;
        letter-spacing: 1rpx;
    }

    &__hero {
        display: flex;
        align-items: baseline;
        gap: 16rpx;
        padding: $space-5 $space-4 $space-3;
    }

    &__hero-num {
        font-size: 88rpx;
        font-weight: 300;
        letter-spacing: -3rpx;
        color: $color-ink;
        line-height: 1;
    }

    &__hero-label {
        font-size: 24rpx;
        color: $color-ink-soft;
        letter-spacing: 2rpx;
    }

    &__loading,
    &__empty {
        padding: $space-7 $space-4;
        text-align: center;
        color: $color-ink-ghost;
        font-size: $font-sm;
        letter-spacing: 1rpx;
    }

    &__empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: $space-3;
        padding-top: 200rpx;
    }

    &__empty-icon {
        font-size: 64rpx;
        opacity: .25;
        line-height: 1;
    }

    &__empty-text {
        color: $color-ink-ghost;
    }

    &__empty-cta {
        margin-top: $space-3;
        padding: 18rpx 48rpx;
        background: $color-ink;
        color: #fff;
        border-radius: 999rpx;
        font-size: $font-sm;
        letter-spacing: 2rpx;
        transition: transform .12s;

        &--press { transform: scale(0.96); }
    }

    &__list {
        padding: 0 $space-4;
    }

    &__item {
        background: #fff;
        border-radius: 28rpx;
        padding: $space-3;
        margin-bottom: $space-3;
        box-shadow: 0 4rpx 20rpx rgba(143, 160, 142, .06);
        transition: transform .12s;

        &--press { transform: scale(0.985); }
    }

    &__item-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: $space-2;
    }

    &__type {
        padding: 6rpx 18rpx;
        border-radius: 999rpx;
        font-size: 20rpx;
        letter-spacing: 1rpx;
    }

    &__time {
        font-size: 20rpx;
        color: $color-ink-ghost;
        letter-spacing: .5rpx;
    }

    &__item-title {
        display: block;
        font-size: 30rpx;
        font-weight: 500;
        line-height: 1.4;
        color: $color-ink;
        margin-bottom: 8rpx;
    }

    &__item-desc {
        display: block;
        font-size: 24rpx;
        color: $color-ink-soft;
        line-height: 1.6;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    &__item-foot {
        margin-top: $space-3;
        padding-top: $space-2;
        border-top: 1rpx solid rgba(28, 30, 28, .05);
        display: flex;
        align-items: center;
        gap: 8rpx;
        font-size: 22rpx;
        color: $color-ink-soft;
    }

    &__item-meta { color: $color-ink-soft; }
    &__item-dot { color: $color-ink-ghost; }

    &__del {
        margin-left: auto;
        padding: 6rpx 18rpx;
        font-size: 22rpx;
        color: #c44;
        letter-spacing: 1rpx;
    }
}
</style>
