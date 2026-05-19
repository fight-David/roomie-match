<template>
    <view class="pc">
        <view class="pc__title">评论 · {{ comments.length }}</view>

        <view class="pc__list">
            <view class="pc__row" v-for="(c, i) in comments" :key="i">
                <text class="pc__name">{{ c.name }}</text>
                <text class="pc__text">{{ c.text }}</text>
            </view>
        </view>

        <view class="pc__empty" v-if="comments.length === 0">
            <text>还没有评论，来当第一个吧</text>
        </view>

        <view class="pc__bottom h-safe-bottom">
            <view class="pc__input">
                <input placeholder="说点什么，保持温度…" placeholder-class="pc__ph"
                    v-model="text" @confirm="send" />
            </view>
            <view class="pc__send" :class="{ 'is-on': !!text }" @tap="send">发送</view>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    comments: { type: Array, default: () => [] }
})

const emit = defineEmits(['send'])

const text = ref('')

const send = () => {
    if (!text.value) return
    emit('send', text.value)
    text.value = ''
}
</script>

<style lang="scss" scoped>
.pc {
    margin-top: $space-6;
    padding-bottom: 120rpx;

    &__title {
        font-size: $font-sm;
        color: $color-ink-soft;
        letter-spacing: 2rpx;
        margin-bottom: $space-3;
    }

    &__list {
        border-top: 1rpx solid rgba(28,30,28,.04);
    }

    &__row {
        display: flex;
        gap: $space-2;
        padding: $space-2 0;
        font-size: $font-sm;
        border-bottom: 1rpx solid rgba(28,30,28,.04);

        &:last-child { border: none; }
    }

    &__name {
        color: #526253;
        font-weight: 500;
        flex-shrink: 0;
    }

    &__text {
        color: $color-ink;
        line-height: 1.6;
    }

    &__empty {
        padding: $space-5 0;
        text-align: center;
        color: $color-ink-ghost;
        font-size: $font-sm;
    }

    &__bottom {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        gap: $space-2;
        padding: $space-2 $space-4 calc(env(safe-area-inset-bottom) + #{$space-2});
        background: rgba(255,255,255,.92);
        backdrop-filter: blur(32rpx);
        -webkit-backdrop-filter: blur(32rpx);
        border-top: 1rpx solid rgba(28,30,28,.06);
    }

    &__input {
        flex: 1;
        height: 80rpx;
        padding: 0 $space-3;
        border-radius: $radius-pill;
        background: $color-whisper;
        display: flex;
        align-items: center;
    }

    &__ph {
        color: $color-ink-ghost;
        letter-spacing: 1rpx;
    }

    &__send {
        padding: 0 $space-3;
        height: 80rpx;
        line-height: 80rpx;
        border-radius: $radius-pill;
        color: $color-ink-ghost;
        font-size: $font-body;
        letter-spacing: 2rpx;

        &.is-on {
            color: #526253;
            font-weight: 500;
        }
    }
}
</style>
