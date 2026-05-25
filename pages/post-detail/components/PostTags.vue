<template>
    <view class="pt" v-if="tags?.length">
        <text class="pt__tag" v-for="t in tags" :key="t">{{ t }}</text>
    </view>
</template>

<script setup>
defineProps({
    tags: { type: Array, default: () => [] }
})
</script>

<style lang="scss" scoped>
.pt {
    display: flex;
    flex-wrap: wrap;
    gap: 10rpx;
    margin-bottom: $space-4;

    &__tag {
        font-size: $font-xs;
        color: $color-ink-soft;
        background: $color-whisper;
        padding: 8rpx 20rpx;
        border-radius: $radius-pill;
        letter-spacing: 1rpx;
    }
}
</style>
