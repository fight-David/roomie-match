<template>
    <view class="pjd">
        <PostHero :src="project.cover" />

        <view class="pjd__body">
            <PostInfo :j="project" />

            <PostAuthor :author="author" :post-type="project.postType" :harmony="project.harmony" @open="openAuthor" />

            <view class="pjd__divider"></view>

            <view class="pjd__body-text">{{ project.content }}</view>

            <PostGallery :images="project.photos || gallery" />

            <PostComments :comments="comments" @send="sendComment" />
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { findProject, findPerson } from '@/sources/mock.js'
import PostHero from './components/PostHero.vue'
import PostInfo from './components/PostInfo.vue'
import PostAuthor from './components/PostAuthor.vue'
import PostGallery from './components/PostGallery.vue'
import PostComments from './components/PostComments.vue'

const project = ref({})
const author = ref({})
const comments = ref([
    { name: 'Noah', text: '我也在找 9 号线附近的，方便一起看房吗？' },
    { name: 'Iris', text: '阳台朝南真不错，我们周末约吗？' }
])

const gallery = [
    'https://images.unsplash.com/photo-1501183638710-841dd1904471?w=900&q=70&auto=format',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=70&auto=format',
    'https://images.unsplash.com/photo-1523413555085-22df6de5b4f1?w=900&q=70&auto=format'
]

onLoad((q) => {
    const p = findProject(q?.id)
    project.value = p
    author.value = findPerson(p.authorId)
})

const openAuthor = (id) => {
    uni.navigateTo({ url: `/pages/profile-detail/index?id=${id}` })
}

const sendComment = (text) => {
    comments.value.push({ name: '我', text })
}
</script>

<style lang="scss" scoped>
.pjd {
    min-height: 100vh;
    padding-bottom: 200rpx;

    &__body {
        padding: $space-5 $space-4;
    }

    &__divider {
        height: 1rpx;
        background: rgba(28, 30, 28, .08);
        margin: $space-5 0;
    }

    &__body-text {
        font-size: $font-body;
        color: $color-ink;
        line-height: 1.85;
        letter-spacing: .5rpx;
    }
}
</style>
