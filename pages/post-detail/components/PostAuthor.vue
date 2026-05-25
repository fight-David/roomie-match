<template>
    <view class="pa" @tap="openAuthor">
        <image class="pa__ava" :src="avatar" mode="aspectFill" />
        <view class="pa__info">
            <text class="pa__name">{{ author.nickname }}</text>
            <text class="pa__role">{{ roleLabel }}</text>
        </view>
        <view class="pa__harmony" v-if="harmony">
            <text class="pa__num">{{ harmony }}</text>
            <text class="pa__pct">%</text>
        </view>
    </view>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    author: { type: Object, required: true },
    roleLabel: { type: String, default: '' },
    harmony: { type: Number, default: null }
})

const emit = defineEmits(['open'])

const avatar = computed(() => props.author.cover || props.author.photos?.[0] || '')

const openAuthor = () => emit('open', props.author.id)
</script>

<style lang="scss" scoped>
.pa {
    display: flex;
    align-items: center;
    gap: $space-3;

    &__ava {
        width: 88rpx;
        height: 88rpx;
        border-radius: 50%;
        flex-shrink: 0;
        background: $color-mist;
    }

    &__info { flex: 1; }

    &__name {
        display: block;
        font-size: $font-body;
        font-weight: 500;
        color: $color-ink;
        letter-spacing: .5rpx;
    }

    &__role {
        display: block;
        font-size: $font-xs;
        color: $color-ink-soft;
        margin-top: 4rpx;
        letter-spacing: 1rpx;
    }

    &__harmony {
        display: flex;
        align-items: baseline;
        gap: 2rpx;
        flex-shrink: 0;
    }

    &__num {
        font-size: 36rpx;
        font-weight: 300;
        color: #526253;
        letter-spacing: -1rpx;
    }

    &__pct {
        font-size: $font-xs;
        color: #526253;
        opacity: .7;
    }
}
</style>
