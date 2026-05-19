<template>
    <view class="pfd__card" hover-class="pfd__card--press" :hover-stay-time="80" @tap="$emit('edit')">
        <view class="pfd__card-row">
            <text class="pfd__card-label">{{ label }}</text>
            <view class="pfd__card-value-wrap">
                <text class="pfd__card-value" :class="{ 'is-empty': !displayText }">{{ displayText || placeholder }}</text>
                <text class="pfd__card-arrow">›</text>
            </view>
        </view>
    </view>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    label: { type: String, required: true },
    display: { type: [String, Number, Array], default: null },
    placeholder: { type: String, default: '未设置' }
})

defineEmits(['edit'])

const displayText = computed(() => {
    if (props.display == null || props.display === '') return ''
    if (Array.isArray(props.display)) return props.display.join(' · ')
    return String(props.display)
})
</script>

<style lang="scss" scoped>
.pfd {

    &__card {
        background: #fff;
        border-radius: 24rpx;
        padding: $space-4 $space-4;
        transition: transform $dur-fast $ease-out-expo, box-shadow $dur-fast $ease-out-expo;

        &--press {
            transform: scale(0.985);
            box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
        }
    }

    &__card-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: $space-2;
    }

    &__card-label {
        font-size: 24rpx;
        color: $color-ink-soft;
        font-weight: 500;
        letter-spacing: 1rpx;
        flex-shrink: 0;
        min-width: 80rpx;
    }

    &__card-value-wrap {
        display: flex;
        align-items: center;
        gap: 12rpx;
        flex: 1;
        justify-content: flex-end;
        max-width: 70%;
    }

    &__card-value {
        font-size: 26rpx;
        color: $color-ink;
        letter-spacing: 0.5rpx;
        text-align: right;
        line-height: 1.4;

        &.is-empty {
            color: $color-ink-ghost;
            font-weight: 300;
        }
    }

    &__card-arrow {
        font-size: 32rpx;
        color: $color-ink-ghost;
        font-weight: 200;
        flex-shrink: 0;
    }
}
</style>