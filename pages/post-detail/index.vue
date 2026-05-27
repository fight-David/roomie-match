<template>
    <view class="pjd">

        <!-- ===== 顶部图片区 ===== -->
        <view class="pjd__gallery-wrap" v-if="allImages.length">
            <PostGallery :images="allImages" />

            <!-- 浮层返回 -->
            <view class="pjd__back h-safe-top" @tap="back">
                <text class="pjd__back-icon">‹</text>
            </view>
        </view>

        <!-- 无图时顶部导航栏 -->
        <view v-else class="pjd__nav h-safe-top">
            <view class="pjd__nav-bar">
                <text class="pjd__nav-back" @tap="back">‹</text>
            </view>
        </view>

        <!-- ===== 主体内容 ===== -->
        <view class="pjd__body">

            <!-- 帖子类型徽章（主体内显眼位置） -->
            <view class="pjd__type-badge" :style="badgeStyle">
                <text class="pjd__type-dot"></text>
                <text>{{ typeLabel }}</text>
            </view>

            <PostHeader :post="project" />
            <PostTags :tags="project.tags" />

            <view class="pjd__rule"></view>

            <PostAuthor :author="author" :role-label="typeLabel" :harmony="harmonyScore" @open="openAuthor" />

            <view class="pjd__rule"></view>

            <text class="pjd__content">{{ project.content }}</text>

            <PostComments :comments="comments" />
        </view>

        <!-- ===== 底部：评论输入 + 联系按钮 ===== -->
        <view class="pjd__footer h-safe-bottom">
            <view class="pjd__input-wrap">
                <input class="pjd__input" placeholder="说点什么…" placeholder-class="pjd__input-ph" v-model="commentText"
                    @confirm="sendComment" confirm-type="send" />
                <text class="pjd__send" :class="{ 'is-on': !!commentText }" @tap="sendComment">发送</text>
            </view>
        </view>

    </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { PROJECTS as MOCK_PROJECTS, PEOPLE } from '@/sources/mock.js'
import { POST_TYPES } from '@/utils/constant'
import { findProject, findPerson, fetchComments } from '@/api/db.js'
import { useUserStore } from '@/stores/user'
import { calcHarmony } from '@/utils/match.js'
import PostGallery from './components/PostGallery.vue'
import PostHeader from './components/PostHeader.vue'
import PostTags from './components/PostTags.vue'
import PostAuthor from './components/PostAuthor.vue'
import PostComments from './components/PostComments.vue'

const userStore = useUserStore()
const project = ref({})
const author = ref({})
const commentText = ref('')
const comments = ref([])

// 所有图片：优先 photos 数组，兜底 cover，无图则空数组
const allImages = computed(() => {
    const p = project.value
    if (p.photos?.length) return p.photos
    if (p.cover) return [p.cover]
    return []
})

const typeLabel = computed(() => POST_TYPES[project.value.postType]?.label || '帖子')
const typeColor = computed(() => POST_TYPES[project.value.postType]?.color || '#6B6F6A')

const badgeStyle = computed(() => ({
    background: typeColor.value,
    color: '#fff',
    borderColor: 'transparent'
}))

// 实时计算 harmony（统一用 utils/match.js）
const harmonyScore = computed(() => {
    const me = userStore.profile
    const other = author.value
    if (!me?.dims || !other?.dims) return null
    try {
        return calcHarmony(me, other).score
    } catch {
        return null
    }
})

onLoad(async (q) => {
    try {
        const p = await findProject(q?.id)
        if (p) {
            project.value = p
            const a = await findPerson(p.authorId)
            author.value = a || PEOPLE.find(x => x.id === p.authorId) || {}
        } else {
            throw new Error('not found')
        }
    } catch {
        const fallback = MOCK_PROJECTS?.find(x => x.id === q?.id) || MOCK_PROJECTS?.[0] || {}
        project.value = fallback
        author.value = PEOPLE.find(x => x.id === fallback.authorId) || {}
    }

    // 加载评论
    loadComments(project.value.id)
})

const loadComments = async (postId) => {
    if (!postId) return
    try {
        const data = await fetchComments(postId)
        comments.value = (data || []).sort((a, b) => (a.created_at || 0) - (b.created_at || 0))
    } catch (e) {
        console.warn('加载评论失败', e)
        comments.value = []
    }
}

const back = () => uni.navigateBack()

const openAuthor = (id) => {
    if (!id) return
    uni.navigateTo({ url: `/pages/profile-detail/index?id=${id}` })
}

const sendComment = async () => {
    const t = commentText.value.trim()
    if (!t) return

    const postId = project.value.id
    if (!postId) {
        uni.showToast({ title: '帖子信息缺失', icon: 'none' })
        return
    }

    const name = userStore.profile?.nickname || '我'

    // 乐观更新：先在本地显示
    const optimistic = { name, text: t, _temp: true }
    comments.value.push(optimistic)
    commentText.value = ''

    try {
        const res = await uniCloud.callFunction({
            name: 'post-op',
            data: { action: 'addComment', postId, name, text: t }
        })
        if (res.result?.code === 0) {
            // 用云端返回的数据替换乐观项
            const idx = comments.value.indexOf(optimistic)
            if (idx >= 0) comments.value.splice(idx, 1, res.result.data)
        } else {
            throw new Error(res.result?.message || '评论失败')
        }
    } catch (e) {
        // 失败回滚
        const idx = comments.value.indexOf(optimistic)
        if (idx >= 0) comments.value.splice(idx, 1)
        uni.showToast({ title: '评论失败', icon: 'none' })
    }
}
</script>

<style lang="scss" scoped>
.pjd {
    min-height: 100vh;
    background: $color-paper;
    padding-bottom: 160rpx;

    // ── 有图时：图片浮层容器 ──
    &__gallery-wrap {
        position: relative;
        width: 100%;
        background: $color-ink;
    }

    &__back {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 20;
        padding: 80rpx 0 0 $space-4;
        width: 120rpx;
    }

    &__back-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 72rpx;
        height: 72rpx;
        border-radius: 50%;
        background: rgba(0, 0, 0, .32);
        backdrop-filter: blur(16rpx);
        -webkit-backdrop-filter: blur(16rpx);
        font-size: 48rpx;
        font-weight: 200;
        color: #fff;
        line-height: 72rpx;
        text-align: center;
    }

    &__type-badge {
        display: inline-flex;
        align-items: center;
        gap: 10rpx;
        padding: 10rpx 24rpx;
        border-radius: $radius-pill;
        font-size: 22rpx;
        font-weight: 500;
        letter-spacing: 2rpx;
        margin-bottom: $space-3;
        box-shadow: 0 6rpx 20rpx rgba(82, 98, 83, .18);
    }

    &__type-dot {
        width: 10rpx;
        height: 10rpx;
        border-radius: 50%;
        background: #fff;
        opacity: .9;
    }

    // ── 无图时：顶部导航栏 ──
    &__nav {
        background: $color-paper;
        border-bottom: 1rpx solid rgba(28, 30, 28, .06);
    }

    &__nav-bar {
        display: flex;
        align-items: center;
        padding: 0 $space-4;
        height: 88rpx;
        gap: $space-3;
    }

    &__nav-back {
        font-size: 52rpx;
        font-weight: 200;
        color: $color-ink;
        width: 64rpx;
        height: 88rpx;
        line-height: 88rpx;
        flex-shrink: 0;
    }

    // ── 主体 ──
    &__body {
        padding: $space-5 $space-4 0;
    }

    // ── 分割线 ──
    &__rule {
        height: 1rpx;
        background: rgba(28, 30, 28, .07);
        margin: $space-4 0;
    }

    // ── 正文 ──
    &__content {
        display: block;
        font-size: $font-body;
        color: $color-ink;
        line-height: 1.9;
        letter-spacing: .5rpx;
    }

    // ── 底部 Footer ──
    &__footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        gap: $space-2;
        padding: $space-2 $space-4 calc(env(safe-area-inset-bottom) + #{$space-2});
        background: rgba(237, 240, 236, .92);
        backdrop-filter: blur(32rpx);
        -webkit-backdrop-filter: blur(32rpx);
        border-top: 1rpx solid rgba(28, 30, 28, .06);
    }

    &__input-wrap {
        flex: 1;
        height: 80rpx;
        display: flex;
        align-items: center;
        background: #fff;
        border-radius: $radius-pill;
        padding: 0 $space-2 0 $space-3;
        gap: $space-2;
        box-shadow: 0 2rpx 12rpx rgba(28, 30, 28, .06);
    }

    &__input {
        flex: 1;
        height: 100%;
        font-size: $font-sm;
        color: $color-ink;
    }

    &__input-ph {
        color: $color-ink-ghost;
        letter-spacing: 1rpx;
    }

    &__send {
        // width: 56rpx;
        height: 56rpx;
        padding: 10rpx 40rpx;
        border-radius: $radius-pill;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: $font-sm;
        font-weight: 500;
        color: $color-ink-ghost;
        transition: all .15s;
        flex-shrink: 0;
        line-height: 56rpx;
        text-align: center;

        &.is-on {
            background: #526253;
            color: #fff;
        }
    }

    &__contact {
        height: 80rpx;
        padding: 0 $space-4;
        border-radius: $radius-pill;
        background: $color-ink;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        text {
            font-size: $font-sm;
            font-weight: 500;
            color: #fff;
            letter-spacing: 3rpx;
        }
    }
}
</style>
