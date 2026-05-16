<template>
    <view class="pst">
        <view class="pst__placeholder">
            <text class="pst__emoji">⌛</text>
            <text class="pst__text">帖子功能即将上线</text>
        </view>
        <Tabbar current="post" />
    </view>
</template>

<script setup>
import Tabbar from '@/components/Tabbar.vue'
</script>

<style lang="scss" scoped>
.pst {
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
