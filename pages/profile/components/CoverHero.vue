<template>
    <view class="me__hero">
        <image class="me__hero-img" :src="profile.cover || profile.photos?.[0]" mode="aspectFill" />
        <view class="me__hero-mask"></view>
        <view class="me__hero-content">
            <view class="me__hero-avatar">
                <image class="me__hero-avatar-img" :src="profile.cover || profile.photos?.[0]" mode="aspectFill" />
            </view>
            <view class="me__hero-id">
                <text class="me__hero-name">{{ profile.nickname || '未设置昵称' }}</text>
                <text class="me__hero-bio">{{ profile.bio || '还没有自我介绍' }}</text>
            </view>
            <view class="me__hero-badges" v-if="profile.gender || profile.age">
                <text class="me__hero-badge">{{ profile.gender || '' }}</text>
                <text class="me__hero-badge" v-if="profile.age">{{ profile.age }}</text>
            </view>

            <!-- 关注数据入口 -->
            <view class="me__hero-stats">
                <view class="me__hero-stat" @tap="$emit('openFollow', 'mutual')">
                    <text class="me__hero-stat-num">{{ stats.mutual }}</text>
                    <text class="me__hero-stat-label">室友</text>
                </view>
                <view class="me__hero-stat" @tap="$emit('openFollow', 'following')">
                    <text class="me__hero-stat-num">{{ stats.following }}</text>
                    <text class="me__hero-stat-label">关注</text>
                </view>
                <view class="me__hero-stat" @tap="$emit('openFollow', 'followers')">
                    <text class="me__hero-stat-num">{{ stats.followers }}</text>
                    <text class="me__hero-stat-label">粉丝</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { computed } from 'vue'
import { useFollowStore } from '@/stores/follow'

defineProps({
    profile: { type: Object, default: () => ({}) }
})

defineEmits(['openFollow'])

const followStore = useFollowStore()

const stats = computed(() => ({
    mutual: followStore.mutualList.length,
    following: followStore.followingList.length,
    followers: followStore.followersList.length
}))
</script>

<style lang="scss" scoped>
.me {

    &__hero {
        position: relative;
        width: 100%;
        height: 70vh;
        overflow: hidden;
    }

    &__hero-img {
        width: 100%;
        height: 100%;
        display: block;
    }

    &__hero-mask {
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg,
            rgba(28, 30, 28, 0.08) 40%,
            rgba(28, 30, 28, 0.5) 70%,
            rgba(28, 30, 28, 0.85) 100%
        );
    }

    &__hero-content {
        position: absolute;
        left: $space-4;
        right: $space-4;
        bottom: $space-7;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    &__hero-avatar {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        overflow: hidden;
        border: 3rpx solid rgba(255, 255, 255, 0.6);
        margin-bottom: $space-3;
        background: rgba(255, 255, 255, 0.12);
    }

    &__hero-avatar-img {
        width: 100%;
        height: 100%;
        display: block;
    }

    &__hero-id {
        margin-bottom: $space-2;
    }

    &__hero-name {
        display: block;
        font-size: 56rpx;
        font-weight: 400;
        color: #fff;
        letter-spacing: -1rpx;
        line-height: 1.15;
        text-shadow: 0 2rpx 20rpx rgba(0, 0, 0, 0.3);
    }

    &__hero-bio {
        display: block;
        margin-top: 12rpx;
        font-size: 26rpx;
        font-weight: 300;
        color: rgba(255, 255, 255, 0.75);
        letter-spacing: 0.5rpx;
        line-height: 1.5;
        text-shadow: 0 1rpx 12rpx rgba(0, 0, 0, 0.2);
    }

    &__hero-badges {
        display: flex;
        gap: 12rpx;
        margin-top: 4rpx;
        margin-bottom: $space-3;
    }

    &__hero-badge {
        padding: 6rpx 20rpx;
        border-radius: 999rpx;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(8rpx);
        -webkit-backdrop-filter: blur(8rpx);
        color: rgba(255, 255, 255, 0.9);
        font-size: 20rpx;
        letter-spacing: 1rpx;
        font-weight: 400;
    }

    &__hero-stats {
        display: flex;
        gap: $space-5;
        margin-top: $space-1;
    }

    &__hero-stat {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rpx;
    }

    &__hero-stat-num {
        font-size: 32rpx;
        font-weight: 500;
        color: #fff;
        letter-spacing: 0.5rpx;
    }

    &__hero-stat-label {
        font-size: 20rpx;
        color: rgba(255, 255, 255, 0.6);
        letter-spacing: 1rpx;
    }
}
</style>