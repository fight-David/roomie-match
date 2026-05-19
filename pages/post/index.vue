<template>
    <view class="pro">
        <view class="pro__top h-safe-top">
            <view class="pro__header">
                <view class="pro__brand">
                    <text class="pro__brand-logo">☰</text>
                    <text class="pro__brand-name h-display">RoomieMatch</text>
                </view>
                <text class="pro__bell">◎</text>
            </view>

            <PostFilters ref="filtersRef" @filter="onFilter" />

            <view v-if="isFiltering" class="pro__hint">
                <text>{{ filteredList.length }} 个同频的人</text>
            </view>
        </view>

        <scroll-view scroll-y class="pro__scroll">
            <PostCard v-for="j in filteredList" :key="j.id" :j="j" :editable="j.authorId === currentUserId"
                @open="openProject" @remove="removePost" />

            <view v-if="filteredList.length === 0" class="pro__empty">
                <text>没有同频的人，换个关键词试试？</text>
            </view>

            <view class="pro__end">
                <text>— 共 {{ filteredList.length }} 条 —</text>
            </view>
        </scroll-view>

        <view class="pro__fab" hover-class="pro__fab--press" @tap="modalOpen = true">
            <text class="pro__fab-icon">+</text>
        </view>

        <PostModal :open="modalOpen" @close="modalOpen = false" @submit="submitPost" />

        <Tabbar current="projects" />
    </view>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { PROJECTS } from '@/sources/mock.js'
import { useUserStore } from '@/stores/user'
import PostCard from './components/PostCard.vue'
import PostFilters from './components/PostFilters.vue'
import PostModal from './components/PostModal.vue'
import Tabbar from '@/components/Tabbar.vue'

const userStore = useUserStore()
const filtersRef = ref(null)
const modalOpen = ref(false)

const currentUserId = computed(() => userStore.profile?.id || 'p01')

// 本地可变帖子列表
const posts = ref([...PROJECTS])

// 筛选状态
const filterState = reactive({
    keyword: '',
    type: 'all',
    tags: []
})

const isFiltering = computed(() =>
    filterState.keyword || filterState.type !== 'all' || filterState.tags.length > 0
)

const onFilter = (f) => {
    filterState.keyword = f.keyword
    filterState.type = f.type
    filterState.tags = f.tags
}

const filteredList = computed(() => {
    const kw = filterState.keyword.trim().toLowerCase()
    return posts.value.filter(p => {
        if (filterState.type !== 'all' && p.postType !== filterState.type) return false

        if (filterState.tags.length) {
            const hit = filterState.tags.every(t =>
                (p.tags || []).some(x => x.includes(t)) ||
                (p.location || '').includes(t) ||
                (p.title || '').includes(t) ||
                (p.content || '').includes(t)
            )
            if (!hit) return false
        }

        if (kw) {
            const match =
                (p.title || '').toLowerCase().includes(kw) ||
                (p.content || '').toLowerCase().includes(kw) ||
                (p.location || '').toLowerCase().includes(kw) ||
                (p.tags || []).some(t => t.toLowerCase().includes(kw))
            if (!match) return false
        }

        return true
    })
})

const openProject = (j) => {
    uni.navigateTo({ url: `/pages/post-detail/index?id=${j.id}` })
}

const removePost = (j) => {
    const idx = posts.value.findIndex(p => p.id === j.id)
    if (idx >= 0) posts.value.splice(idx, 1)
}

const submitPost = (formData) => {
    const newPost = {
        id: 'j' + Date.now(),
        authorId: currentUserId.value,
        authorName: userStore.profile?.nickname || '我',
        harmony: 100,
        cover: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=70&auto=format',
        ...formData
    }
    posts.value.unshift(newPost)
    modalOpen.value = false
    uni.showToast({ title: '已发布', icon: 'success' })
}
</script>

<style lang="scss" scoped>
.pro {
    min-height: 100vh;
    padding-bottom: 180rpx;

    &__top {
        padding: $space-3 $space-4 0;
    }

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 80rpx;
        margin-bottom: $space-3;
    }

    &__brand {
        display: flex;
        align-items: center;
        gap: 16rpx;
    }

    &__brand-logo {
        font-size: 32rpx;
        color: $color-ink-soft;
        font-weight: 300;
    }

    &__brand-name {
        font-size: 36rpx;
        font-weight: 600;
        letter-spacing: -0.3rpx;
        color: $color-ink;
    }

    &__bell {
        font-size: 36rpx;
        color: $color-ink-soft;
    }

    &__hint {
        font-size: 22rpx;
        color: $color-ink-ghost;
        letter-spacing: 1rpx;
        margin-top: $space-2;
    }

    &__scroll {
        height: calc(100vh - 480rpx);
        padding: $space-3 $space-4 0;
    }

    &__empty {
        padding: $space-7 0;
        text-align: center;
        color: $color-ink-ghost;
        font-size: $font-sm;
    }

    &__end {
        text-align: center;
        padding: $space-4 0 $space-5;
        color: $color-ink-ghost;
        font-size: 20rpx;
        letter-spacing: 4rpx;
    }

    &__fab {
        position: fixed;
        right: $space-4;
        bottom: calc(env(safe-area-inset-bottom) + 160rpx);
        width: 112rpx;
        height: 112rpx;
        border-radius: 50%;
        background: #526253;
        box-shadow: 0 12rpx 40rpx rgba(82, 98, 83, 0.32);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform $dur-fast $ease-out-expo;
        z-index: 90;

        &--press { transform: scale(0.92); }
    }

    &__fab-icon {
        color: #fff;
        font-size: 64rpx;
        font-weight: 200;
        line-height: 1;
        margin-top: -6rpx;
    }
}
</style>
