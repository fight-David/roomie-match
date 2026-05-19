<template>
    <view class="ph">
        <image class="ph__img" :src="src" mode="aspectFill" />
        <view class="ph__mask"></view>
        <view class="ph__nav">
            <view class="ph__back" @tap="back">‹</view>
        </view>
    </view>
</template>

<script setup>
defineProps({
    src: { type: String, default: '' }
})

const back = () => uni.navigateBack()
</script>

<style lang="scss" scoped>
.ph {
    position: relative;
    height: 640rpx;
    overflow: hidden;
    background: $color-ink;

    &__img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
    }

    &__mask {
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(28,30,28,.28) 0%, rgba(28,30,28,0) 40%);
    }

    &__nav {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 50;
        padding: 80rpx $space-4 0;
    }

    &__back {
        font-size: 52rpx;
        color: #fff;
        font-weight: 200;
        width: 64rpx;
        height: 64rpx;
        line-height: 64rpx;
        text-align: center;
    }
}
</style>
