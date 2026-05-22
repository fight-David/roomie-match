<template>
    <view class="me">
        <CoverHero :profile="profile" @open-follow="openFollow" />

        <view class="me__body">
            <ActionMenu
                :is-logged-in="isLoggedIn"
                @edit-profile="editProfile"
                @my-posts="myPosts"
                @recommend="recommend"
                @poster="poster"
                @recalibrate="recalibrate"
                @login="handleLogin"
                @about="about"
            />
        </view>

        <Tabbar current="profile" />
    </view>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import Tabbar from '@/components/Tabbar.vue'
import CoverHero from './components/CoverHero.vue'
import ActionMenu from './components/ActionMenu.vue'

const userStore = useUserStore()

const profile = computed(() => userStore.profile)
const isLoggedIn = computed(() => !!userStore.userInfo)

const openFollow = (tab) => {
    uni.navigateTo({ url: `/pages/follow/index?tab=${tab}` })
}

const editProfile = () => {
    uni.navigateTo({ url: '/pages/profile-detail/index?mode=edit' })
}
const myPosts = () => {
    uni.showToast({ title: '动态功能即将上线', icon: 'none' })
}
const recommend = () => {
    uni.showToast({ title: '分享功能即将上线', icon: 'none' })
}
const poster = () => {
    uni.showToast({ title: '海报生成即将上线', icon: 'none' })
}
const recalibrate = () => {
    uni.navigateTo({ url: '/pages/onboarding/index' })
}
const handleLogin = () => {
    if (isLoggedIn.value) {
        uni.showToast({ title: '账户设置即将上线', icon: 'none' })
    } else {
        uni.showToast({ title: '登录功能即将上线', icon: 'none' })
    }
}
const about = () => {
    uni.showToast({ title: 'Harmony v0.1 - 找到合拍的室友', icon: 'none' })
}
</script>

<style lang="scss" scoped>
.me {
    min-height: 100vh;
    background: $color-paper;
    padding-bottom: 160rpx;

    &__body {
        margin-top: -$space-5;
        position: relative;
        z-index: 2;
        padding: $space-5 0;
        background: $color-paper;
        border-radius: 48rpx 48rpx 0 0;
    }
}
</style>

