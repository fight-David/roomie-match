<template>
    <view class="fl">
        <view v-if="list.length === 0" class="fl__empty">
            <text>{{ emptyText }}</text>
        </view>

        <view class="fl__item" v-for="p in list" :key="p.id" @tap="openProfile(p.id)">
            <image class="fl__ava" :src="p.cover" mode="aspectFill" />
            <view class="fl__body">
                <text class="fl__name">{{ p.nickname }}</text>
                <text class="fl__meta">{{ p.target_districts?.join(' · ') }}</text>
                <text class="fl__harmony">{{ p.harmony }}% 匹配</text>
            </view>
            <view class="fl__action" v-if="mode === 'followers'" @tap.stop="followBack(p.id)">
                <text class="fl__action-btn fl__action-btn--back">回关</text>
            </view>
            <view class="fl__action" v-else-if="mode === 'following'" @tap.stop="confirmUnfollow(p)">
                <text class="fl__action-btn fl__action-btn--following">已关注</text>
            </view>
            <view class="fl__action" v-else-if="mode === 'mutual'" @tap.stop="sendMessage(p)">
                <text class="fl__action-btn fl__action-btn--chat">发私信</text>
            </view>
        </view>

        <!-- 取消关注确认弹窗 -->
        <view v-if="unfollowTarget" class="fl__modal" @tap="unfollowTarget = null">
            <view class="fl__modal-sheet" @tap.stop>
                <text class="fl__modal-title">取消关注</text>
                <text class="fl__modal-text">确定不再关注 {{ unfollowTarget.nickname }} 吗？</text>
                <view class="fl__modal-actions">
                    <view class="fl__modal-btn fl__modal-btn--ghost" @tap="unfollowTarget = null">再想想</view>
                    <view class="fl__modal-btn fl__modal-btn--solid" @tap="doUnfollow">取消关注</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'
import { useFollowStore } from '@/stores/follow'
import { useMessageStore } from '@/stores/message'

const props = defineProps({
    list: { type: Array, default: () => [] },
    mode: { type: String, default: 'mutual' },
    emptyText: { type: String, default: '暂无' }
})

const followStore = useFollowStore()
const messageStore = useMessageStore()
const unfollowTarget = ref(null)

const openProfile = (id) => {
    uni.navigateTo({ url: `/pages/profile-detail/index?id=${id}` })
}

const followBack = (id) => {
    followStore.follow(id)
}

const confirmUnfollow = (p) => {
    unfollowTarget.value = p
}

const doUnfollow = () => {
    if (unfollowTarget.value) {
        followStore.unfollow(unfollowTarget.value.id)
        unfollowTarget.value = null
    }
}

const sendMessage = (p) => {
    const convId = messageStore.createConversation(p.id, p.nickname, p.cover)
    uni.navigateTo({ url: `/pages/message/index?convId=${convId}` })
}
</script>

<style lang="scss" scoped>
.fl {
    padding: 0 $space-4;

    &__empty {
        text-align: center;
        padding: $space-7 0;
        color: $color-ink-ghost;
        font-size: 24rpx;
        letter-spacing: 1rpx;
    }

    &__item {
        display: flex;
        align-items: center;
        gap: $space-2;
        padding: $space-2 0;
        border-bottom: 1rpx solid rgba(28, 30, 28, 0.04);

        &:last-child { border: none; }
    }

    &__ava {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        flex-shrink: 0;
    }

    &__body {
        flex: 1;
        min-width: 0;
    }

    &__name {
        display: block;
        font-size: 26rpx;
        font-weight: 500;
        color: $color-ink;
    }

    &__meta {
        display: block;
        font-size: 20rpx;
        color: $color-ink-ghost;
        margin-top: 2rpx;
    }

    &__harmony {
        display: block;
        font-size: 18rpx;
        color: $color-primary;
        margin-top: 2rpx;
        font-weight: 450;
    }

    &__action {
        flex-shrink: 0;
    }

    &__action-btn {
        display: inline-block;
        padding: 10rpx 24rpx;
        border-radius: 999rpx;
        font-size: 22rpx;
        letter-spacing: 1rpx;
        font-weight: 450;

        &--back {
            background: $color-primary;
            color: #fff;
        }

        &--following {
            background: $color-whisper;
            color: $color-ink-soft;
        }

        &--chat {
            background: $color-ink;
            color: #fff;
        }
    }

    /* 弹窗 */
    &__modal {
        position: fixed;
        inset: 0;
        background: rgba(28, 30, 28, 0.32);
        backdrop-filter: blur(16rpx);
        -webkit-backdrop-filter: blur(16rpx);
        z-index: 300;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__modal-sheet {
        width: 560rpx;
        background: #fff;
        border-radius: $radius-lg;
        padding: $space-5 $space-4 $space-4;
    }

    &__modal-title {
        display: block;
        font-size: 32rpx;
        font-weight: 600;
        color: $color-ink;
        text-align: center;
        letter-spacing: -0.3rpx;
    }

    &__modal-text {
        display: block;
        margin-top: $space-2;
        font-size: 24rpx;
        color: $color-ink-soft;
        text-align: center;
        line-height: 1.6;
        letter-spacing: 0.5rpx;
    }

    &__modal-actions {
        display: flex;
        gap: $space-2;
        margin-top: $space-4;
    }

    &__modal-btn {
        flex: 1;
        height: 80rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 999rpx;
        font-size: 24rpx;
        letter-spacing: 1rpx;

        &--ghost {
            background: $color-whisper;
            color: $color-ink;
        }

        &--solid {
            background: $color-ink;
            color: #fff;
        }
    }
}
</style>
