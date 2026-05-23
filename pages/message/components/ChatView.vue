<template>
    <view class="cv">
        <view class="cv__head">
            <text class="cv__back" @tap="$emit('close')">‹</text>
            <image class="cv__ava" :src="conversation.peerAvatar" mode="aspectFill" />
            <text class="cv__name">{{ conversation.peerName }}</text>
        </view>

        <scroll-view scroll-y class="cv__body" :scroll-top="scrollTop" scroll-with-animation @scroll="onScroll">
            <view v-for="(m, i) in conversation.messages" :key="i" class="cv__msg"
                :class="{ 'is-me': m.from === 'me' }">
                <view class="cv__bubble">
                    <text>{{ m.text }}</text>
                </view>
                <text class="cv__time">{{ m.time }}</text>
            </view>
            <view style="height:1rpx;"></view>
        </scroll-view>

        <view class="cv__foot h-safe-bottom">
            <view class="cv__input">
                <input ref="inputRef" v-model="text" placeholder="说点什么…" placeholder-class="cv__ph"
                    confirm-type="send" @confirm="send" />
            </view>
            <view class="cv__send" :class="{ 'is-on': !!text }" @tap="send">
                <text>→</text>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'

const props = defineProps({
    conversation: { type: Object, required: true }
})

const emit = defineEmits(['close', 'send'])

const text = ref('')
const scrollTop = ref(0)
const inputRef = ref(null)

const scrollToBottom = () => {
    scrollTop.value = 0
    nextTick(() => {
        scrollTop.value = 999999
    })
}

const onScroll = (e) => {
    // 不做特殊处理
}

// 初次进入和消息变化时都滚到底部
// 用 immediate + 延迟确保 DOM 已渲染
watch(() => props.conversation?.messages?.length, () => {
    setTimeout(scrollToBottom, 100)
}, { immediate: true })

const send = () => {
    if (!text.value) return
    emit('send', text.value)
    text.value = ''
    scrollToBottom()
    // 聚焦输入框
    nextTick(() => {
        const el = document.querySelector('.cv__input input')
        if (el) el.focus()
    })
}
</script>

<style lang="scss" scoped>
.cv {
    position: fixed;
    inset: 0;
    background: #fff;
    z-index: 200;
    display: flex;
    flex-direction: column;

    &__head {
        display: flex;
        align-items: center;
        gap: $space-2;
        padding: 20rpx $space-4 $space-2;
        border-bottom: 1rpx solid rgba(28, 30, 28, 0.04);
    }

    &__back {
        font-size: 52rpx;
        color: $color-ink;
        font-weight: 200;
        padding: 0 $space-1;
        margin-left: -$space-1;
    }

    &__ava {
        width: 56rpx;
        height: 56rpx;
        border-radius: 50%;
        flex-shrink: 0;
    }

    &__name {
        font-size: 28rpx;
        font-weight: 500;
        color: $color-ink;
    }

    &__body {
        flex: 1;
        padding: $space-3 $space-4;
        overflow-y: auto;
    }

    &__msg {
        display: flex;
        flex-direction: column;
        gap: 4rpx;
        margin-bottom: $space-3;
        align-items: flex-start;

        &.is-me {
            align-items: flex-end;

            .cv__bubble {
                background: $color-ink;
                color: #fff;
                border-bottom-right-radius: 4rpx;
            }
        }
    }

    &__bubble {
        max-width: 70%;
        padding: 20rpx 28rpx;
        border-radius: $radius-lg;
        background: $color-whisper;
        font-size: 26rpx;
        color: $color-ink;
        line-height: 1.5;
        letter-spacing: 0.3rpx;
        // border-bottom-left-radius: 4rpx;
    }

    &__time {
        font-size: 18rpx;
        color: $color-ink-ghost;
        padding: 0 8rpx;
    }

    &__foot {
        display: flex;
        align-items: center;
        gap: $space-2;
        padding: $space-2 $space-4 calc(env(safe-area-inset-bottom) + #{$space-2});
        border-top: 1rpx solid rgba(28, 30, 28, 0.04);
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
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $color-ink-ghost;
        font-size: 36rpx;
        font-weight: 200;
        transition: all $dur-fast $ease-out-expo;

        &.is-on {
            background: $color-ink;
            color: #fff;
        }
    }
}
</style>
