<template>
    <view v-if="images.length" class="pg">
        <image v-for="(g, i) in images" :key="i" class="pg__img" :src="g" mode="aspectFill" />
    </view>
</template>

<script setup>
defineProps({
    images: { type: Array, default: () => [] }
})
</script>

<style lang="scss" scoped>
.pg {
    margin-top: $space-4;
    display: flex;
    flex-wrap: wrap;
    gap: $space-1;

    &__img {
        width: calc((100% - #{$space-1 * 2}) / 3);
        aspect-ratio: 1;
        height: 200rpx;
        border-radius: $radius-sm;
        background: $color-mist;
    }
}
</style>
