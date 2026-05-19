<template>
    <view class="pg">
        <swiper
            class="pg__swiper"
            :current="currentIndex"
            indicator-dots
            indicator-color="rgba(255,255,255,0.35)"
            indicator-active-color="#fff"
            circular
            @change="onSwiper"
        >
            <swiper-item v-for="(url, i) in photos" :key="i">
                <view class="pg__slide" :style="{ backgroundImage: 'url(' + url + ')' }">
                </view>
            </swiper-item>

            <swiper-item v-if="editable">
                <view class="pg__slide pg__slide--add" hover-class="pg__slide--press" :hover-stay-time="60"
                    @tap="$emit('addPhoto')">
                    <text class="pg__add-icon">+</text>
                    <text class="pg__add-text">添加照片</text>
                </view>
            </swiper-item>
        </swiper>

        <view
            v-if="editable && currentIndex < photos.length"
            class="pg__del"
            hover-class="pg__del--press"
            :hover-stay-time="60"
            @tap="$emit('removePhoto', currentIndex)"
        >
            <text class="pg__del-icon">✕</text>
        </view>

        <view class="pg__counter">
            <text>{{ photos.length ? currentIndex + 1 : 0 }}/{{ photos.length }}</text>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    photos: { type: Array, default: () => [] },
    cover: { type: String, default: '' },
    editable: { type: Boolean, default: false }
})

defineEmits(['addPhoto', 'removePhoto'])

const currentIndex = ref(0)

const onSwiper = (e) => {
    currentIndex.value = e.detail.current
}
</script>

<style lang="scss" scoped>
.pg {
    position: relative;
    width: 100%;
    height: 60vh;
    min-height: 400rpx;
    overflow: hidden;
    background: #3F4E3F;

    &__swiper {
        width: 100%;
        height: 100%;
    }

    &__slide {
        width: 100%;
        height: 100%;
        background: #3F4E3F;
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;

        &--add {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #4E5E4F;
            gap: 16rpx;
            transition: opacity $dur-fast;
        }

        &--press { opacity: 0.6; }
    }

    &__add-icon {
        font-size: 64rpx;
        color: rgba(255, 255, 255, 0.5);
        font-weight: 200;
    }

    &__add-text {
        font-size: 22rpx;
        color: rgba(255, 255, 255, 0.4);
        letter-spacing: 2rpx;
    }

    &__del {
        position: absolute;
        top: 24rpx;
        right: 24rpx;
        width: 56rpx;
        height: 56rpx;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.35);
        backdrop-filter: blur(8rpx);
        -webkit-backdrop-filter: blur(8rpx);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform $dur-fast, opacity $dur-fast;
        z-index: 5;

        &--press { transform: scale(0.85); opacity: 0.6; }
    }

    &__del-icon {
        font-size: 28rpx;
        color: #fff;
        font-weight: 300;
    }

    &__counter {
        position: absolute;
        bottom: 24rpx;
        right: 24rpx;
        padding: 6rpx 20rpx;
        border-radius: 999rpx;
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(8rpx);
        -webkit-backdrop-filter: blur(8rpx);
        z-index: 5;
    }

    &__counter text {
        font-size: 20rpx;
        color: rgba(255, 255, 255, 0.8);
        letter-spacing: 1rpx;
    }
}
</style>