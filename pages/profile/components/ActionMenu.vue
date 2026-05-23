<template>
    <view>
    <view class="me__section">
        <view class="me__section-title">个人</view>

        <view class="me__op" hover-class="me__op--press" :hover-stay-time="80" @tap="$emit('editProfile')">
            <view class="me__op-left">
                <text class="me__op-icon">✎</text>
                <text class="me__op-k">编辑个人资料</text>
            </view>
            <text class="me__op-arrow">›</text>
        </view>

        <view class="me__divider"></view>

        <view class="me__op" hover-class="me__op--press" :hover-stay-time="80" @tap="$emit('myPosts')">
            <view class="me__op-left">
                <text class="me__op-icon">☰</text>
                <text class="me__op-k">我的动态</text>
            </view>
            <text class="me__op-arrow">›</text>
        </view>

        <view class="me__divider"></view>

        <view class="me__op" hover-class="me__op--press" :hover-stay-time="80" @tap="$emit('recommend')">
            <view class="me__op-left">
                <text class="me__op-icon">↗</text>
                <text class="me__op-k">推荐给好友</text>
            </view>
            <text class="me__op-arrow">›</text>
        </view>
    </view>

    <view class="me__section" style="margin-top: 0;">
        <view class="me__section-title">工具</view>

        <view class="me__op" hover-class="me__op--press" :hover-stay-time="80" @tap="$emit('poster')">
            <view class="me__op-left">
                <text class="me__op-icon">▤</text>
                <text class="me__op-k">生成租房海报</text>
            </view>
            <text class="me__op-arrow">›</text>
        </view>

        <view class="me__divider"></view>

        <view class="me__op" hover-class="me__op--press" :hover-stay-time="80" @tap="$emit('recalibrate')">
            <view class="me__op-left">
                <text class="me__op-icon">⌇</text>
                <text class="me__op-k">重新校准匹配维度</text>
            </view>
            <text class="me__op-arrow">›</text>
        </view>
    </view>

    <view class="me__section" style="margin-top: 0;">
        <view class="me__section-title">账户</view>

        <view class="me__op" hover-class="me__op--press" :hover-stay-time="80" @tap="$emit('login')">
            <view class="me__op-left">
                <text class="me__op-icon">🔐</text>
                <text class="me__op-k">{{ isLoggedIn ? '账户设置' : '登录 / 注册' }}</text>
            </view>
            <text class="me__op-arrow">›</text>
        </view>

        <view class="me__divider"></view>

        <view class="me__op" hover-class="me__op--press" :hover-stay-time="80" @tap="$emit('about')">
            <view class="me__op-left">
                <text class="me__op-icon">◎</text>
                <text class="me__op-k">关于 Harmony</text>
            </view>
            <text class="me__op-arrow">›</text>
        </view>
    </view>
    </view>
</template>

<script setup>
defineProps({
    isLoggedIn: { type: Boolean, default: false }
})

defineEmits(['editProfile', 'myPosts', 'recommend', 'poster', 'recalibrate', 'login', 'about'])
</script>

<style lang="scss" scoped>
.me {

    &__section {
        padding: 0 $space-4;

        & + & {
            margin-top: $space-5;
        }
    }

    &__section-title {
        font-size: 20rpx;
        letter-spacing: 3rpx;
        color: $color-ink-ghost;
        font-weight: 400;
        padding: $space-4 0 $space-2;
        text-transform: uppercase;
    }

    &__op {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 34rpx 0;
        transition: opacity $dur-fast $ease-out-expo;

        &--press { opacity: 0.4; }
    }

    &__op-left {
        display: flex;
        align-items: center;
        gap: 24rpx;
    }

    &__op-icon {
        width: 40rpx;
        font-size: 28rpx;
        color: $color-ink-soft;
        text-align: center;
        flex-shrink: 0;
    }

    &__op-k {
        font-size: 28rpx;
        color: $color-ink;
        font-weight: 350;
        letter-spacing: 1rpx;
    }

    &__op-arrow {
        font-size: 36rpx;
        color: $color-ink-ghost;
        font-weight: 200;
    }

    &__divider {
        height: 1rpx;
        background: $color-ink-ghost;
        opacity: 0.15;
        margin: 0 56rpx;
    }
}
</style>