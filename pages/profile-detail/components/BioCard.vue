<template>
    <view class="bio-card">
        <view class="bio-card__title">关于我</view>
        <view class="bio-card__body">
            <text>{{ bio }}</text>
        </view>
        <view v-if="showMeta" class="bio-card__meta">
            <view v-if="user.target_districts && user.target_districts.length" class="bio-card__meta-line">
                <text class="bio-card__meta-label">区域</text>
                <text>{{ user.target_districts.join(' · ') }}</text>
            </view>
            <view v-if="user.target_subways && user.target_subways.length" class="bio-card__meta-line">
                <text class="bio-card__meta-label">地铁</text>
                <text>{{ user.target_subways.join('·') }}号线</text>
            </view>
            <view v-if="user.budget_min" class="bio-card__meta-line">
                <text class="bio-card__meta-label">预算</text>
                <text>¥{{ user.budget_min }}-{{ user.budget_max }}</text>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        bio: {
            type: String,
            default: ''
        },
        user: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        showMeta() {
            return (this.user.target_districts && this.user.target_districts.length) ||
                (this.user.target_subways && this.user.target_subways.length) ||
                this.user.budget_min
        }
    }
}
</script>

<style lang="scss" scoped>
.bio-card {
    background: transparent;
    padding: 30rpx 20rpx 40rpx;

    &__title {
        font-size: 30rpx;
        font-weight: 600;
        color: #333;
        margin-bottom: 20rpx;
    }

    &__body {
        font-size: 26rpx;
        line-height: 1.7;
        color: #666;
    }

    &__meta {
        margin-top: 30rpx;
    }

    &__meta-line {
        font-size: 24rpx;
        color: #999;
        margin-bottom: 10rpx;
    }

    &__meta-label {
        color: #666;
        font-weight: 500;
        margin-right: 8rpx;
    }
}
</style>