<template>
    <view class="pfd">
        <!-- ===== Nav ===== -->
        <view class="pfd__nav h-safe-top">
            <view class="pfd__nav-bar">
                <text class="pfd__nav-back" @tap="back">‹</text>
                <text class="pfd__nav-title h-display">{{ user.nickname }}</text>
                <text class="pfd__nav-share" @tap="share">↗</text>
            </view>
        </view>

        <!-- ===== Hero ===== -->
        <HeroBanner :user="user" />

        <!-- ===== Body ===== -->
        <view class="pfd__body">
            <RadarCard :dims="user.dims" />
            <TagLists :loves="user.loves" :limits="user.limits" />
            <BioCard :bio="user.bio" :user="user" />
        </view>

        <!-- ===== Bottom Actions ===== -->
        <view class="pfd__bottom">
            <view class="pfd__bottom-inner h-safe-bottom">
                <view class="pfd__btn pfd__btn--ghost" hover-class="pfd__btn--press" :hover-stay-time="80" @tap="save">
                    <text class="pfd__btn-icon">☌</text>
                    <text>收藏</text>
                </view>
                <view class="pfd__btn pfd__btn--solid" hover-class="pfd__btn--press" :hover-stay-time="80"
                    @tap="interested">
                    <text class="pfd__btn-icon">⚡</text>
                    <text>感兴趣</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { PEOPLE } from '@/sources/mock.js'
import HeroBanner from './components/HeroBanner.vue'
import RadarCard from './components/RadarCard.vue'
import TagLists from './components/TagLists.vue'
import BioCard from './components/BioCard.vue'

const user = ref({})

onLoad((query) => {
    const id = query?.id || ''
    const found = PEOPLE.find(p => p.id === id)
    if (found) user.value = found
})

const back = () => uni.navigateBack()
const share = () => {
    uni.showToast({ title: '分享功能即将上线', icon: 'none' })
}
const save = () => {
    uni.showToast({ title: '已收藏', icon: 'none' })
}
const interested = () => {
    uni.showToast({ title: '已发送意向', icon: 'none' })
}
</script>

<style lang="scss" scoped>
.pfd {
    min-height: 100vh;
    background: #F3F5F2;
    padding-bottom: 240rpx;

    /* ---------- Nav ---------- */
    &__nav {
        position: sticky;
        top: 0;
        z-index: 10;
        background: #F3F5F2;
    }

    &__nav-bar {
        display: flex;
        align-items: center;
        padding: 0 $space-3;
        height: 88rpx;
    }

    &__nav-back {
        width: 64rpx;
        height: 88rpx;
        line-height: 88rpx;
        font-size: 48rpx;
        font-weight: 200;
        color: $color-ink;
        text-align: left;
    }

    &__nav-title {
        flex: 1;
        text-align: center;
        font-size: 32rpx;
        font-weight: 500;
        letter-spacing: 0.5rpx;
        color: $color-ink;
    }

    &__nav-share {
        width: 64rpx;
        height: 88rpx;
        line-height: 88rpx;
        text-align: right;
        font-size: 36rpx;
        color: $color-ink;
    }

    /* ---------- Body ---------- */
    &__body {
        padding: $space-3;
        display: flex;
        flex-direction: column;
        gap: $space-3;
    }

    /* ---------- Bottom ---------- */
    &__bottom {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(180deg, rgba(243, 245, 242, 0), #F3F5F2 40%);
        padding-top: $space-5;
    }

    &__bottom-inner {
        display: flex;
        gap: $space-2;
        padding: 0 $space-3 calc(env(safe-area-inset-bottom) + #{$space-3});
    }

    &__btn {
        height: 100rpx;
        border-radius: 28rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12rpx;
        font-size: 26rpx;
        letter-spacing: 3rpx;
        font-weight: 500;
        transition: transform $dur-fast $ease-out-expo;

        &--press {
            transform: scale(0.97);
        }

        &--ghost {
            flex: 0 0 34%;
            background: #fff;
            color: $color-ink;
            box-shadow: 0 4rpx 20rpx rgba(143, 160, 142, 0.1);
        }

        &--solid {
            flex: 1;
            background: #3F4E3F;
            color: #fff;
            box-shadow: 0 12rpx 40rpx rgba(82, 98, 83, 0.32);
        }
    }

    &__btn-icon {
        font-size: 28rpx;
    }
}
</style>
