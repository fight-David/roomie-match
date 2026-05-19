<template>
    <view class="pa" @tap="open">
        <image class="pa__ava" :src="author.cover" mode="aspectFill" />
        <view class="pa__body">
            <text class="pa__name">{{ author.nickname }}</text>
            <text class="pa__role">{{ roleText }}</text>
        </view>
        <view class="pa__ring">
            <text class="pa__harmony">{{ harmony }}%</text>
        </view>
    </view>
</template>

<script setup>
import { computed } from 'vue'
import { POST_TYPES } from '@/sources/mock.js'

const props = defineProps({
    author: { type: Object, required: true },
    postType: { type: String, default: '' },
    harmony: { type: Number, default: 0 }
})

const emit = defineEmits(['open'])

const roleText = computed(() => {
    const t = POST_TYPES[props.postType]
    return t ? t.label : '室友'
})

const open = () => emit('open', props.author.id)
</script>

<style lang="scss" scoped>
.pa {
    display: flex;
    align-items: center;
    gap: $space-3;
    padding: $space-3;
    background: #fff;
    border-radius: $radius-lg;
    box-shadow: $shadow-ambient-sm;

    &__ava {
        width: 96rpx;
        height: 96rpx;
        border-radius: 50%;
        flex-shrink: 0;
    }

    &__body { flex: 1; }

    &__name {
        display: block;
        font-size: $font-h3;
        font-weight: 500;
        color: $color-ink;
    }

    &__role {
        display: block;
        font-size: $font-sm;
        color: $color-ink-soft;
        margin-top: 4rpx;
    }

    &__ring {
        width: 72rpx;
        height: 72rpx;
        border-radius: 50%;
        border: 4rpx solid #526253;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    &__harmony {
        font-size: 20rpx;
        font-weight: 600;
        color: #526253;
    }
}
</style>
