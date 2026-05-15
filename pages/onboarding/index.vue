<template>
    <view class="onb">
        <!-- step 1 找什么室友 -->

        <view class="onb__nav h-safe-top">
            <view class="onb__nav-bar">
                <text class="onb__nav-back" v-if="step > 1" @tap="prev">‹</text>
                <view v-else class="onb__nav-placeholder"></view>
                <text class="onb__nav-step">{{ step }} / 5</text>
                <view class="onb__nav-placeholder"></view>
            </view>
            <view class="onb__progress">
                <view class="onb__progress-fill" :style="{ width: (step) * 20 + '%' }"></view>
            </view>
        </view>


        <view class="onb__stage">
            <!-- step ... -->
            <step1 v-if="step == 1" @updateUserProfile="updateUserProfile"></step1>

            <step2 v-if="step == 2" @updateUserProfile="updateUserProfile"></step2>

            <step3 v-if="step == 3" @updateUserProfile="updateUserProfile"></step3>

            <step4 v-if="step == 4" @updateUserProfile="updateUserProfile"></step4>

            <step5 v-if="step == 5" @updateUserProfile="updateUserProfile"></step5>

        </view>

        <view class="onb__foot">
            <view class="onb__cta" :class="{ 'is-disabled': !canNext }" hover-class="onb__cta--press"
                :hover-stay-time="80" @tap="next">
                <text>{{ step === 5 ? '欢迎进入' : '下一步' }}</text>
                <text class="onb__cta-arrow">→</text>
            </view>
        </view>
    </view>
</template>
m
<script setup>
import { computed, ref } from 'vue';
import step1 from './components/step1.vue';
import step2 from './components/step2.vue';
import step3 from './components/step3.vue';
import step4 from './components/step4.vue';
import step5 from './components/step5.vue';
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const step = ref(1)

const profile = computed(() => userStore.profile)

const updateUserProfile = (key, v) => {
    userStore.setProfile({ [key]: v })
}

const canNext = computed(() => {
    const p = profile.value; // 简化引用

    switch (step.value) {
        case 1:
            // 性别必填
            return p?.target_gender != null;

        case 2:
            // 区域 (target_districts) 或 地铁 (target_subways) 必须至少有一个
            // 假设它们是数组，检查长度；如果是其他类型，检查是否存在
            const hasDistricts = p?.target_districts && p.target_districts.length > 0;
            const hasSubways = p?.target_subways && p.target_subways.length > 0;
            return !!(hasDistricts || hasSubways);

        case 3:
            // // 爱好 (loves) 或 限制 (limits) 必须至少有一个
            // const hasLoves = p?.loves && p.loves.length > 0;
            // const hasLimits = p?.limits && p.limits.length > 0;
            // return !!(hasLoves || hasLimits);
            return true
        case 4:
            // 默认允许下一步
            return true;

        case 5:
            // 昵称、头像、照片数组 至少有一个
            const hasNickname = !!p?.nickname;
            const hasPhotos = p?.photos && p.photos.length > 0;
            return !!(hasNickname || hasPhotos);

        default:
            return true;
    }
});

const prev = () => {
    if (step.value > 0) step.value--
    else uni.navigateBack()
}

const next = () => {
    if (!canNext.value) return
    if (step.value < 5) step.value++
    else uni.reLaunch({ url: '/pages/discovery/discovery' })
}


</script>

<style lang="scss">
.onb__title {
    font-size: 72rpx;
    font-weight: 400;
    letter-spacing: -2rpx;
    line-height: 1.1;
    text-align: center;
    color: $color-ink;
}

.onb__lede {
    margin-top: $space-3;
    text-align: center;
    color: $color-ink-soft;
    font-size: $font-sm;
    line-height: 1.6;
    letter-spacing: 0.5rpx;
    padding: 0 $space-5;
}

.onb {
    min-height: 100vh;
    background: $color-paper;
    display: flex;
    flex-direction: column;

    /* ---------- Nav & progress ---------- */
    &__nav-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 88rpx;
        padding: 0 $space-3;
    }

    &__nav-back {
        width: 64rpx;
        height: 88rpx;
        line-height: 88rpx;
        font-size: 56rpx;
        font-weight: 200;
        color: $color-ink;
        text-align: center;
    }

    &__nav-placeholder {
        width: 64rpx;
    }

    &__nav-step {
        font-size: $font-xs;
        letter-spacing: 4rpx;
        color: $color-ink-ghost;
    }

    &__progress {
        height: 2rpx;
        background: rgba(28, 30, 28, .06);
        margin: 0 $space-4;
    }

    &__progress-fill {
        height: 100%;
        background: $color-primary;
        transition: width $dur-slow $ease-out-expo;
    }

    /* ---------- Stage ---------- */
    &__stage {
        flex: 1;
        padding: $space-5 $space-4 $space-4;
    }

    &__slide {
        animation: h-fade-up $dur-slow $ease-out-expo both;
    }



    /* ---------- CTA ---------- */
    &__foot {
        padding: $space-3 $space-4 calc(env(safe-area-inset-bottom) + #{$space-4});
        background: linear-gradient(180deg, rgba(247, 250, 248, 0) 0%, rgba(247, 250, 248, .92) 30%, $color-paper 100%);
    }

    &__cta {
        height: 112rpx;
        border-radius: 999rpx;
        background: $color-ink;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: $font-body;
        letter-spacing: 3rpx;
        font-weight: 500;
        box-shadow: 0 16rpx 48rpx rgba(28, 30, 28, 0.28);
        transition: transform $dur-fast $ease-out-expo, opacity $dur-base;

        &--press {
            transform: scale(0.985);
        }

        &.is-disabled {
            background: $color-stone;
            box-shadow: none;
            opacity: .5;
        }
    }

    &__cta-arrow {
        margin-left: 16rpx;
        font-weight: 200;
    }
}
</style>
