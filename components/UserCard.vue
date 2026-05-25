<template>
    <view class="dis__card" :class="{ 'is-focus': focused }" @tap="openProfile">
        <!-- ===== 肖像区 ===== -->
        <view class="dis__portrait">
            <image class="dis__img" :class="{ 'is-ken': focused }" :src="user.cover" mode="aspectFill" />
            <view class="dis__mask"></view>

            <view v-if="harmony" class="dis__ring">
                <ring :value="harmony" :size="96" :stroke="2" tone="ghost" />
            </view>

            <view class="dis__motto">
                <text class="dis__motto-quote">"</text>
                <text class="dis__motto-text">{{ user.bio }}</text>
            </view>
        </view>

        <!-- ===== 铭牌区 ===== -->
        <view class="dis__plate">
            <view class="dis__name-row">
                <text class="dis__name h-display">{{ user.nickname }}</text>
                <text class="dis__role"> 找{{user.target_gender }}室友</text>
            </view>
            <view class="dis__tags">
                <text class="dis__tag" v-for="t in loves" :key="t">{{ t }}</text>
            </view>
            <view class="dis__meta-sub">
                <text>{{ user.target_districts.join(' · ') }} · ¥{{ user.budget_min }}-{{ user.budget_max }}</text>
            </view>
        </view>
    </view>
</template>

<script setup>
import Ring from './Ring.vue'
import { computed } from 'vue'

const props = defineProps({
    user: { type: Object, default: () => ({}) },
    focused: { type: Boolean, default: false },
    harmony: { type: Number, default: 0 }
})

const loves = computed(() => {
    return (props.user.loves || []).slice(0, 4)
})

const openProfile = () => {
    uni.navigateTo({ url: `/pages/profile-detail/index?id=${props.user.id}` })
}
</script>

<style lang="scss" scoped>
.dis {

    &__card {
        margin-bottom: $space-5;
        padding: $space-3 $space-3 $space-4;
        background: #fff;
        border-radius: 48rpx;
        box-shadow: 0 8rpx 40rpx rgba(143, 160, 142, 0.12);
        animation: h-fade-up .6s $ease-out-expo both;
        transition: transform $dur-base $ease-out-expo, box-shadow $dur-base;

        &.is-focus {
            transform: scale(1.005);
            box-shadow: 0 16rpx 60rpx rgba(143, 160, 142, 0.18);
        }
    }

    /* 肖像区 */
    &__portrait {
        position: relative;
        width: 100%;
        aspect-ratio: 4 / 5;
        border-radius: 36rpx;
        overflow: hidden;
        background: $color-mist;
    }

    &__img {
        width: 100%;
        height: 100%;
        display: block;
        transform: scale(1);
        transition: transform 6s $ease-out-expo;
    }

    &__img.is-ken {
        transform: scale(1.08) translate(-1%, -1.5%);
    }

    &__mask {
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(28, 30, 28, 0) 55%, rgba(28, 30, 28, .4) 100%);
    }

    &__ring {
        position: absolute;
        top: $space-3;
        right: $space-3;
    }

    &__motto {
        position: absolute;
        left: $space-4;
        right: $space-4;
        bottom: $space-4;
        color: #fff;
        font-size: 34rpx;
        font-weight: 300;
        letter-spacing: 0.5rpx;
        line-height: 1.4;
    }

    &__motto-quote {
        font-size: 64rpx;
        font-weight: 300;
        margin-right: 8rpx;
        opacity: .45;
    }

    /* 铭牌区 */
    &__plate {
        padding: $space-3 $space-2 0;
    }

    &__name-row {
        display: flex;
        align-items: baseline;
        gap: 8rpx;
    }

    &__name {
        font-size: 48rpx;
        font-weight: 300;
        letter-spacing: -1rpx;
        color: $color-ink;
    }

    &__role {
        font-size: $font-sm;
        color: $color-ink-soft;
    }

    &__tags {
        display: flex;
        flex-wrap: wrap;
        margin-top: $space-2;
        gap: 12rpx;
    }

    &__tag {
        padding: 10rpx 22rpx;
        border-radius: 20rpx;
        background: #EEF2F0;
        color: $color-primary;
        font-size: 22rpx;
        font-weight: 500;
        letter-spacing: 0.5rpx;
    }

    &__meta-sub {
        margin-top: $space-3;
        font-size: $font-xs;
        color: $color-ink-ghost;
        letter-spacing: 2rpx;
    }

}
</style>