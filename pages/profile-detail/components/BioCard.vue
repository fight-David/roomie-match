<template>
    <view class="pfd__card pfd__card--plain">
        <view class="pfd__about-title h-display">关于我</view>
        <view class="pfd__about-body">
            <text>{{ bio }}</text>
        </view>
        <view class="pfd__meta" v-if="showMeta">
            <view class="pfd__meta-line" v-if="user.target_districts?.length">
                <text class="pfd__meta-label">区域 </text>
                <text> {{ user.target_districts.join(' · ') }}</text>
            </view>
            <view class="pfd__meta-line" v-if="user.target_subways?.length">
                <text class="pfd__meta-label">地铁 </text>
                <text> {{ user.target_subways.join('·') }}号线</text>
            </view>
            <view class="pfd__meta-line" v-if="user.budget_min">
                <text class="pfd__meta-label">预算 </text>
                <text> ¥{{ user.budget_min }}-{{ user.budget_max }}</text>
            </view>
        </view>
    </view>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    bio: { type: String, default: '' },
    user: { type: Object, default: () => ({}) }
})

const showMeta = computed(() => {
    return props.user.target_districts?.length || props.user.target_subways?.length || props.user.budget_min
})
</script>

<style lang="scss" scoped>
.pfd {

    &__card {
        &--plain {
            background: transparent;
            padding: $space-3 $space-2 $space-4;
        }
    }

    &__about-title {
        font-size: 30rpx;
        font-weight: 600;
        color: $color-ink;
        margin-bottom: $space-2;
    }

    &__about-body {
        font-size: 26rpx;
        line-height: 1.7;
        color: $color-ink-soft;
        letter-spacing: 0.2rpx;
    }

    &__meta {
        margin-top: $space-3;
        display: flex;
        flex-direction: column;
        gap: 10rpx;
    }

    &__meta-line {
        font-size: 20rpx;
        color: $color-ink-ghost;
        letter-spacing: 2rpx;
    }

    &__meta-label {
        color: $color-ink-soft;
        font-weight: 500;
    }
}
</style>