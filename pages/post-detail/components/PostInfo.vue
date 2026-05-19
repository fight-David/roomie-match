<template>
    <view class="pi">
        <view class="pi__type" :style="{ background: typeBg(j.postType), color: typeColor(j.postType) }">
            <text class="pi__type-dot"></text>
            <text>{{ typeLabel(j.postType) }}</text>
        </view>

        <text class="pi__title h-display">{{ j.title }}</text>

        <view class="pi__meta">
            <text>{{ j.location }}</text>
            <text v-if="j.budget" class="pi__meta-dot">·</text>
            <text v-if="j.budget">¥{{ j.budget }} / 月</text>
            <text v-if="j.moveIn" class="pi__meta-dot">·</text>
            <text v-if="j.moveIn">{{ j.moveIn }} 入住</text>
        </view>

        <view class="pi__tags">
            <text class="pi__tag" v-for="t in j.tags" :key="t">{{ t }}</text>
        </view>
    </view>
</template>

<script setup>
import { POST_TYPES } from '@/sources/mock.js'

const props = defineProps({
    j: { type: Object, required: true }
})

const typeLabel = (v) => POST_TYPES[v]?.label || '帖子'
const typeColor = (v) => POST_TYPES[v]?.color || '#6B6F6A'
const typeBg = (v) => {
    const c = POST_TYPES[v]?.color || '#6B6F6A'
    return c + '1A'
}
</script>

<style lang="scss" scoped>
.pi {
    padding: $space-2 0;

    &__type {
        display: inline-flex;
        align-items: center;
        gap: 8rpx;
        padding: 6rpx 20rpx;
        border-radius: 999rpx;
        font-size: 20rpx;
        letter-spacing: 1rpx;
    }

    &__type-dot {
        width: 6rpx;
        height: 6rpx;
        border-radius: 50%;
        background: currentColor;
    }

    &__title {
        display: block;
        font-size: 54rpx;
        font-weight: 300;
        letter-spacing: -1.5rpx;
        line-height: 1.25;
        margin-top: $space-2;
        color: $color-ink;
    }

    &__meta {
        margin-top: $space-2;
        color: $color-ink-soft;
        font-size: $font-sm;
        letter-spacing: 1rpx;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8rpx;
    }

    &__meta-dot { color: $color-ink-ghost; }

    &__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 12rpx;
        margin-top: $space-3;
    }

    &__tag {
        font-size: $font-xs;
        color: $color-ink-soft;
        background: $color-whisper;
        padding: 6rpx 18rpx;
        border-radius: $radius-pill;
        letter-spacing: 1rpx;
    }
}
</style>
