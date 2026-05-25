<template>
    <view v-if="images.length" class="pg">
        <swiper
            class="pg__swiper"
            :current="current"
            circular
            @change="onChange"
        >
            <swiper-item v-for="(src, i) in images" :key="i" @tap="preview(i)">
                <image class="pg__img" :src="src" mode="aspectFill" />
            </swiper-item>
        </swiper>

        <!-- 计数器 -->
        <view class="pg__counter" v-if="images.length > 1">
            <text>{{ current + 1 }} / {{ images.length }}</text>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    images: { type: Array, default: () => [] }
})

const current = ref(0)

const onChange = (e) => {
    current.value = e.detail.current
}

const preview = (index) => {
    uni.previewImage({
        current: props.images[index],
        urls: props.images
    })
}
</script>

<style lang="scss" scoped>
.pg {
    position: relative;
    width: 100%;

    &__swiper {
        width: 100%;
        height: 600rpx;
    }

    &__img {
        width: 100%;
        height: 100%;
        background: $color-ink;
    }

    &__counter {
        position: absolute;
        bottom: $space-3;
        right: $space-3;
        padding: 6rpx 20rpx;
        border-radius: $radius-pill;
        background: rgba(0, 0, 0, .3);
        backdrop-filter: blur(12rpx);
        -webkit-backdrop-filter: blur(12rpx);
        z-index: 5;

        text {
            font-size: 20rpx;
            color: rgba(255, 255, 255, .85);
            letter-spacing: 1rpx;
        }
    }
}
</style>
