<template>
    <view>
        <!-- 触发器：标题旁的小 chip -->
        <view
            class="cs"
            hover-class="cs--press"
            :hover-stay-time="80"
            @tap="open = true"
        >
            <text class="cs__pin">◉</text>
            <text class="cs__label">{{ currentName }}</text>
            <text class="cs__caret">⌄</text>
        </view>

        <!-- 底部 Sheet -->
        <view v-if="open" class="cs-sheet" @tap="open = false">
            <view class="cs-sheet__panel" @tap.stop>
                <view class="cs-sheet__handle"></view>

                <view class="cs-sheet__head">
                    <text class="cs-sheet__title">选择你的城市</text>
                    <text class="cs-sheet__sub">不同城市的室友推荐范围不同</text>
                </view>

                <view class="cs-sheet__list">
                    <view
                        v-for="c in CITIES"
                        :key="c.code"
                        class="cs-sheet__item"
                        :class="{
                            'is-active': c.code === modelValue,
                            'is-disabled': !c.open
                        }"
                        :hover-class="c.open ? 'cs-sheet__item--press' : ''"
                        :hover-stay-time="80"
                        @tap="choose(c)"
                    >
                        <view class="cs-sheet__item-left">
                            <text class="cs-sheet__name">{{ c.name }}</text>
                            <text v-if="!c.open" class="cs-sheet__hint">敬请期待</text>
                        </view>

                        <view v-if="c.code === modelValue" class="cs-sheet__check">
                            <text>✓</text>
                        </view>
                    </view>
                </view>

                <view class="cs-sheet__foot h-safe-bottom">
                    <view class="cs-sheet__cancel" hover-class="cs-sheet__cancel--press" @tap="open = false">
                        <text>关闭</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CITIES, getCityName } from '@/utils/cities.js'

const props = defineProps({
    modelValue: { type: String, default: 'SH' }
})

const emit = defineEmits(['update:modelValue', 'change'])

const open = ref(false)
const currentName = computed(() => getCityName(props.modelValue))

const choose = (c) => {
    if (!c.open) {
        uni.showToast({ title: c.name + ' 即将开放', icon: 'none' })
        return
    }
    if (c.code !== props.modelValue) {
        emit('update:modelValue', c.code)
        emit('change', c.code)
    }
    open.value = false
}
</script>

<style lang="scss" scoped>
// ── 触发器 chip ──
.cs {
    display: inline-flex;
    align-items: center;
    gap: 8rpx;
    padding: 8rpx 20rpx 8rpx 16rpx;
    border-radius: 999rpx;
    background: rgba(28, 30, 28, .04);
    transition: all .15s;

    &--press {
        background: rgba(28, 30, 28, .08);
        transform: scale(0.97);
    }

    &__pin {
        font-size: 18rpx;
        color: $color-primary;
        line-height: 1;
    }

    &__label {
        font-size: 24rpx;
        font-weight: 500;
        color: $color-ink;
        letter-spacing: 1rpx;
    }

    &__caret {
        font-size: 22rpx;
        color: $color-ink-ghost;
        margin-top: -8rpx;
        font-weight: 500;
        line-height: 1;
    }
}

// ── 底部 Sheet ──
.cs-sheet {
    position: fixed;
    inset: 0;
    background: rgba(28, 30, 28, .35);
    backdrop-filter: blur(24rpx);
    -webkit-backdrop-filter: blur(24rpx);
    z-index: 200;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    animation: cs-fade .2s ease-out;

    &__panel {
        width: 100%;
        background: $color-paper;
        border-top-left-radius: 36rpx;
        border-top-right-radius: 36rpx;
        padding: $space-3 $space-4 0;
        animation: cs-slide-up .28s cubic-bezier(.2, .9, .3, 1);
    }

    &__handle {
        width: 80rpx;
        height: 6rpx;
        border-radius: 6rpx;
        background: rgba(28, 30, 28, .12);
        margin: 0 auto $space-3;
    }

    &__head {
        text-align: center;
        margin-bottom: $space-4;
    }

    &__title {
        display: block;
        font-size: 32rpx;
        font-weight: 500;
        color: $color-ink;
        letter-spacing: -0.3rpx;
    }

    &__sub {
        display: block;
        margin-top: 8rpx;
        font-size: 22rpx;
        color: $color-ink-soft;
        letter-spacing: 1rpx;
    }

    &__list {
        max-height: 60vh;
        overflow-y: auto;
        margin-bottom: $space-3;
    }

    &__item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 28rpx $space-3;
        border-radius: 20rpx;
        margin-bottom: 6rpx;
        transition: all .15s;

        &--press {
            background: rgba(28, 30, 28, .04);
            transform: scale(0.99);
        }

        &.is-active {
            background: rgba(82, 98, 83, .08);
        }

        &.is-disabled {
            opacity: .4;
        }
    }

    &__item-left {
        display: flex;
        align-items: baseline;
        gap: 16rpx;
    }

    &__name {
        font-size: 30rpx;
        font-weight: 400;
        color: $color-ink;
        letter-spacing: 0.5rpx;
    }

    .is-active &__name {
        color: $color-primary;
        font-weight: 500;
    }

    &__hint {
        font-size: 20rpx;
        color: $color-ink-ghost;
        letter-spacing: 1.5rpx;
    }

    &__check {
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        background: $color-primary;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22rpx;
        font-weight: 600;
    }

    &__foot {
        padding: $space-2 0 calc(env(safe-area-inset-bottom) + #{$space-3});
    }

    &__cancel {
        height: 88rpx;
        border-radius: 999rpx;
        background: rgba(28, 30, 28, .04);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26rpx;
        color: $color-ink;
        letter-spacing: 3rpx;
        font-weight: 500;
        transition: transform .12s;

        &--press { transform: scale(0.97); }
    }
}

@keyframes cs-fade {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes cs-slide-up {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
}
</style>
