<template>
    <view class="ph">
        <text class="ph__title">{{ post.title }}</text>
        <view class="ph__meta">
            <text class="ph__meta-item" v-if="post.location">{{ post.location }}</text>
            <text class="ph__meta-dot" v-if="post.location && post.budget">·</text>
            <text class="ph__meta-item" v-if="post.budget">¥{{ post.budget }}/月</text>
            <text class="ph__meta-dot" v-if="post.moveIn">·</text>
            <text class="ph__meta-item" v-if="post.moveIn">{{ post.moveIn }}入住</text>
        </view>
    </view>
</template>

<script setup>
defineProps({
    post: { type: Object, required: true }
})
</script>

<style lang="scss" scoped>
.ph {
    margin-bottom: $space-3;

    &__title {
        display: block;
        font-size: 38rpx;
        font-weight: 400;
        letter-spacing: -0.5rpx;
        line-height: 1.4;
        color: $color-ink;
    }

    &__meta {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8rpx;
        margin-top: 10rpx;
    }

    &__meta-item {
        font-size: $font-sm;
        color: $color-ink-soft;
        letter-spacing: .5rpx;
    }

    &__meta-dot {
        color: $color-ink-ghost;
        font-size: $font-sm;
    }
}
</style>
