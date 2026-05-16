<template>
    <view class="prf">
        <view class="prf__placeholder">
            <text class="prf__emoji">👤</text>
            <text class="prf__text">个人主页即将上线</text>
        </view>
        <Tabbar current="profile" />
    </view>
</template>

<script setup>
import Tabbar from '@/components/Tabbar.vue'
</script>

<style lang="scss" scoped>
.prf {
    min-height: 100vh;
    background: $color-paper;

    &__placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 50vh 0 0;
        transform: translateY(-50%);
    }

    &__emoji {
        font-size: 64rpx;
        margin-bottom: $space-3;
    }

    &__text {
        font-size: $font-sm;
        color: $color-ink-ghost;
        letter-spacing: 2rpx;
    }
}
</style>
