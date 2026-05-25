<template>
    <view class="welcome">
        <!-- 氛围光晕 -->
        <view class="welcome__ambient">
            <view class="welcome__orb welcome__orb--1"></view>
            <view class="welcome__orb welcome__orb--2"></view>
            <view class="welcome__orb welcome__orb--3"></view>
        </view>

        <!-- 主体 -->
        <view class="welcome__body">
            <view class="welcome__emblem h-display">⦿</view>

            <view class="welcome__title-wrap">
                <text class="welcome__title h-display">找到适合</text>
                <text class="welcome__title h-display welcome__title--accent">一起生活的人</text>
            </view>

            <view class="welcome__divider"></view>

            <view class="welcome__lede">
                <text class="welcome__lede-line welcome__lede-line--fade">比起房子，</text>
                <text class="welcome__lede-line">更重要的是一起住的人。</text>
            </view>
        </view>

        <!-- 底部 -->
        <view class="welcome__foot">
            <view class="welcome__cta" hover-class="welcome__cta--press" :hover-stay-time="80" @tap="goOnboarding">
                <text class="welcome__cta-label">开始匹配</text>
                <view class="welcome__cta-arrow">
                    <text>→</text>
                </view>
            </view>
            <text class="welcome__hint">只需几步，找到合拍的室友</text>
        </view>
    </view>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useMessageStore } from '@/stores/message'
import { useFollowStore } from '@/stores/follow'

const userStore = useUserStore()
const messageStore = useMessageStore()
const followStore = useFollowStore()

const goOnboarding = async () => {
    uni.showLoading({ title: '登录中...', mask: true })

    try {
        const result = await userStore.login()

        // 加载关系数据
        await Promise.all([
            messageStore.loadConversations(),
            followStore.loadRelations()
        ])

        if (result.isNewUser) {
            uni.reLaunch({ url: '/pages/onboarding/index' })
        } else {
            uni.reLaunch({ url: '/pages/home/index' })
        }
    } catch (e) {
        console.error('登录失败', e)
        uni.showToast({ title: '登录失败: ' + (e.message || e.errMsg || '未知错误'), icon: 'none' })
    } finally {
        uni.hideLoading()
    }
}
</script>

<style lang="scss" scoped>
.welcome {
    min-height: 100vh;
    background: $color-paper;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;

    /* ---------- 氛围光晕 ---------- */
    &__ambient {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 0;
    }

    &__orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(80rpx);
        opacity: .35;

        &--1 {
            width: 600rpx;
            height: 600rpx;
            background: $color-primary-ghost;
            top: -180rpx;
            right: -120rpx;
        }

        &--2 {
            width: 400rpx;
            height: 400rpx;
            background: $color-primary-soft;
            bottom: 30%;
            left: -100rpx;
        }

        &--3 {
            width: 300rpx;
            height: 300rpx;
            background: $color-primary-ghost;
            bottom: 10%;
            right: 10%;
        }
    }

    /* ---------- 主体 ---------- */
    &__body {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: $space-7 $space-5 $space-5;
        position: relative;
        z-index: 1;
    }

    &__emblem {
        font-size: 48rpx;
        color: $color-primary;
        margin-bottom: $space-6;
        opacity: .5;
        letter-spacing: 0;
    }

    &__title-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__title {
        font-size: $font-display;
        font-weight: 300;
        letter-spacing: -2rpx;
        line-height: 1.15;
        color: $color-ink;
        text-align: center;

        &--accent {
            color: $color-primary;
        }
    }

    &__divider {
        width: 48rpx;
        height: 2rpx;
        background: $color-primary-soft;
        margin: $space-5 auto;
        opacity: .25;
    }

    &__lede {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__lede-line {
        font-size: $font-sm;
        color: $color-ink-soft;
        line-height: 1.8;
        letter-spacing: 1rpx;
        text-align: center;

        &--fade {
            color: $color-ink-ghost;
        }
    }

    /* ---------- 底部 CTA ---------- */
    &__foot {
        padding: $space-3 $space-5 calc(env(safe-area-inset-bottom) + #{$space-5});
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__cta {
        width: 100%;
        height: 112rpx;
        border-radius: $radius-pill;
        background: $color-ink;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12rpx;
        box-shadow: 0 16rpx 48rpx rgba(28, 30, 28, 0.16);
        transition: transform $dur-fast $ease-out-expo, box-shadow $dur-base;

        &--press {
            transform: scale(0.985);
            box-shadow: 0 8rpx 24rpx rgba(28, 30, 28, 0.1);
        }
    }

    &__cta-label {
        font-size: $font-body;
        font-weight: 500;
        color: #fff;
        letter-spacing: 4rpx;
    }

    &__cta-arrow {
        width: 48rpx;
        height: 48rpx;
        border-radius: 50%;
        background: rgba(255, 255, 255, .1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32rpx;
        color: #fff;
        font-weight: 200;
        transition: transform $dur-fast $ease-out-expo;

        .welcome__cta--press & {
            transform: translateX(4rpx);
        }
    }

    &__hint {
        margin-top: $space-3;
        font-size: $font-xs;
        color: $color-ink-ghost;
        letter-spacing: 2rpx;
    }
}
</style>