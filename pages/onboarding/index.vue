<template>
    <view class="onb">
        <view class="onb__nav h-safe-top">
            <view class="onb__nav-bar">
                <text class="onb__nav-back" v-if="step > 1" @tap="prev">‹</text>
                <view v-if="isRecalibrate" class="onb__nav-close" @tap="close">✕</view>
                <view v-else class="onb__nav-placeholder"></view>
                <text class="onb__nav-step">{{ step }} / 5</text>
                <view class="onb__nav-placeholder"></view>
            </view>
            <view class="onb__progress">
                <view class="onb__progress-fill" :style="{ width: (step) * 20 + '%' }"></view>
            </view>
        </view>

        <view class="onb__stage">
            <view class="onb__slide" :key="step">
                <step1 v-show="step == 1" :model-value="userStore.profile" @updateUserProfile="updateUserProfile"></step1>
                <step2 v-show="step == 2" :model-value="userStore.profile" @updateUserProfile="updateUserProfile"></step2>
                <step3 v-show="step == 3" :model-value="userStore.profile" @updateUserProfile="updateUserProfile"></step3>
                <step4 v-show="step == 4" :model-value="userStore.profile" @updateUserProfile="updateUserProfile"></step4>
                <step5 v-show="step == 5" :model-value="userStore.profile" @updateUserProfile="updateUserProfile"></step5>
            </view>
        </view>

        <view class="onb__foot">
            <view class="onb__cta" :class="{ 'is-disabled': !canNext }" hover-class="onb__cta--press"
                :hover-stay-time="80" @tap="next">
                <text>{{ isRecalibrate ? '保存' : (step === 5 ? '欢迎进入' : '下一步') }}</text>
                <text class="onb__cta-arrow">→</text>
            </view>
        </view>
    </view>
</template>
<script setup>
import { computed, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app'
import step1 from './components/step1.vue';
import step2 from './components/step2.vue';
import step3 from './components/step3.vue';
import step4 from './components/step4.vue';
import step5 from './components/step5.vue';
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const step = ref(1)
const isRecalibrate = ref(false)

onLoad((query) => {
  if (query.mode === 'recalibrate') {
    isRecalibrate.value = true
  }
})

const profile = computed(() => userStore.profile)

const updateUserProfile = (key, v) => {
    userStore.setProfile({ [key]: v })
}

const canNext = computed(() => {
    const p = profile.value;

    switch (step.value) {
        case 1:
            return !!p?.target_gender;;

        case 2:
            const hasDistricts = p?.target_districts && p.target_districts.length > 0;
            const hasSubways = p?.target_subways && p.target_subways.length > 0;
            return !!(hasDistricts || hasSubways);

        case 3:
            return true;

        case 4:
            return true;

        case 5:
            const hasGender = !!p?.gender;
            const hasNickname = !!p?.nickname;
            const hasPhotos = p?.photos && p.photos.length > 0;
            return !!(hasNickname || hasGender || hasPhotos);

        default:
            return true;
    }
});

const prev = () => {
    if (step.value > 0) step.value--
    else if (isRecalibrate.value) {
      uni.navigateBack()
    } else {
      uni.navigateBack()
    }
}

const close = () => {
  uni.navigateBack()
}

const next = async () => {
    if (!canNext.value) return
    if (step.value < 5) step.value++
    else {
        uni.showLoading({ title: '保存中...', mask: true })

        try {
            const saveResult = await uniCloud.callFunction({
                name: 'login',
                data: {
                    action: 'saveProfile',
                    uid: userStore.uid,
                    profile: {
                        nickname: userStore.profile.nickname || '',
                        bio: userStore.profile.bio || '',
                        gender: userStore.profile.gender || '',
                        target_gender: userStore.profile.target_gender,
                        target_districts: userStore.profile.target_districts || [],
                        target_subways: userStore.profile.target_subways || [],
                        budget_min: userStore.profile.budget_min || 0,
                        budget_max: userStore.profile.budget_max || 0,
                        dims: userStore.profile.dims || {},
                        loves: userStore.profile.loves || [],
                        limits: userStore.profile.limits || [],
                        photos: userStore.profile.photos || [],
                        cover: userStore.profile.cover || '',
                        onboarding_done: true
                    }
                }
            })
            console.log('save result:', JSON.stringify(saveResult))
        } catch (e) {
            console.error('save error:', e)
        }

        uni.hideLoading()

        uni.reLaunch({ url: '/pages/persona/index' })
    }
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

    &__nav-close {
        width: 64rpx;
        height: 88rpx;
        line-height: 88rpx;
        font-size: 36rpx;
        font-weight: 200;
        color: $color-ink-soft;
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
        animation: onb-slide-up 400ms cubic-bezier(0.16, 0.84, 0.2, 1) both;
    }

    /* step 前进/返回方向动画 */
    &__slide--forward {
        animation-name: onb-slide-up;
    }

    &__slide--back {
        animation-name: onb-slide-down;
    }

    @keyframes onb-slide-up {
        from {
            opacity: 0;
            transform: translateY(40rpx);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes onb-slide-down {
        from {
            opacity: 0;
            transform: translateY(-40rpx);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
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
