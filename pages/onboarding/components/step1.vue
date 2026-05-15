<template>
    <view class="onb__slide">
        <view class="onb__title h-display">Looking For</view>
        <view class="onb__pref">
            <view v-for="g in genders" :key="g.v" class="onb__pref-card" :class="{ 'is-on': gender === g.v }"
                hover-class="onb__pref-card--press" :hover-stay-time="80" @tap="onChoose(g.v)">
                <view class="onb__pref-icon">{{ g.icon }}</view>
                <view class="onb__pref-label h-display">{{ g.label }}</view>
                <view class="onb__pref-hint">{{ g.hint }}</view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue';
const gender = ref('')

const genders = ref([
    { v: 0, icon: '♀', label: 'Women', hint: '与女性合租' },
    { v: 1, icon: '♂', label: 'Men', hint: '与男性合租' },
    { v: 2, icon: '✶', label: 'Everyone', hint: '对性别无所谓' },
])

const emit = defineEmits(['updateUserProfile'])

const onChoose = (v) => {
    gender.value = v
    try { uni.vibrateShort({ type: 'light' }) } catch (e) { }
    emit('updateUserProfile', 'target_gender', v)
}

</script>

<style lang="scss" scoped>
.onb {

    /* ---------- Step 0: 性别 ---------- */
    &__pref {
        margin-top: $space-7;
        display: flex;
        gap: $space-3;
    }

    &__pref-card {
        flex: 1;
        background: #fff;
        border-radius: 40rpx;
        padding: $space-4 $space-2;
        box-shadow: 0 8rpx 40rpx rgba(143, 160, 142, 0.08);
        border: 2rpx solid transparent;
        transition: all $dur-base $ease-out-expo;
        display: flex;
        flex-direction: column;
        align-items: center;

        &--press {
            transform: scale(0.97);
        }

        &.is-on {
            border-color: $color-primary;
            background: $color-primary-ghost;
        }
    }

    &__pref-icon {
        font-size: 56rpx;
        font-weight: 200;
        color: $color-primary;
        margin-bottom: $space-2;
        line-height: 1;
    }

    &__pref-label {
        font-size: 32rpx;
        font-weight: 500;
        letter-spacing: -0.3rpx;
        color: $color-ink;
    }

    &__pref-hint {
        margin-top: 6rpx;
        font-size: 20rpx;
        color: $color-ink-soft;
        letter-spacing: 1rpx;
    }

}
</style>
