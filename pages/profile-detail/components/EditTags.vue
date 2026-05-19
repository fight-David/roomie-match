<template>
    <view class="pfd__card">
        <!-- 热爱 -->
        <view class="pfd__card-head">
            <view class="pfd__leaf pfd__leaf--heart">♥</view>
            <text class="pfd__card-title">热爱</text>
            <text class="pfd__card-hint" @tap="toggleInput('loves')">
                {{ showInput === 'loves' ? '收起' : '添加 ›' }}
            </text>
        </view>
        <view class="pfd__pills">
            <view class="pfd__pill" v-for="(t, i) in loves" :key="t">
                <text>{{ t }}</text>
                <text class="pfd__pill-del" @tap="removeTag('loves', i)">✕</text>
            </view>
        </view>

        <!-- 输入框 -->
        <view class="pfd__add-row" v-if="showInput === 'loves'">
            <input class="pfd__add-input" v-model="newTag" placeholder="输入热爱标签" confirm-type="done"
                @confirm="confirmAdd('loves')" auto-focus />
            <view class="pfd__add-btn" hover-class="pfd__add-btn--press" :hover-stay-time="60" @tap="confirmAdd('loves')">
                <text>确定</text>
            </view>
            <view class="pfd__add-btn pfd__add-btn--ghost" hover-class="pfd__add-btn--press" :hover-stay-time="60"
                @tap="cancelAdd">
                <text>取消</text>
            </view>
        </view>

        <view style="height: 36rpx;"></view>

        <!-- 底线 -->
        <view class="pfd__card-head">
            <view class="pfd__leaf pfd__leaf--ban">⊘</view>
            <text class="pfd__card-title">底线</text>
            <text class="pfd__card-hint" @tap="toggleInput('limits')">
                {{ showInput === 'limits' ? '收起' : '添加 ›' }}
            </text>
        </view>
        <view class="pfd__blacklist">
            <view class="pfd__bl-row" v-for="(t, i) in limits" :key="t">
                <text class="pfd__bl-dot">●</text>
                <text class="pfd__bl-t">{{ t }}</text>
                <text class="pfd__bl-del" @tap="removeTag('limits', i)">✕</text>
            </view>
        </view>

        <!-- 输入框 -->
        <view class="pfd__add-row" v-if="showInput === 'limits'">
            <input class="pfd__add-input" v-model="newTag" placeholder="输入底线标签" confirm-type="done"
                @confirm="confirmAdd('limits')" auto-focus />
            <view class="pfd__add-btn" hover-class="pfd__add-btn--press" :hover-stay-time="60" @tap="confirmAdd('limits')">
                <text>确定</text>
            </view>
            <view class="pfd__add-btn pfd__add-btn--ghost" hover-class="pfd__add-btn--press" :hover-stay-time="60"
                @tap="cancelAdd">
                <text>取消</text>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    loves: { type: Array, default: () => [] },
    limits: { type: Array, default: () => [] }
})

const emit = defineEmits(['update:loves', 'update:limits'])

const showInput = ref(null)  // 'loves' | 'limits' | null，互斥
const newTag = ref('')

const toggleInput = (type) => {
    // 同一点第二次点击收起，否则切换
    if (showInput.value === type) {
        showInput.value = null
    } else {
        showInput.value = type
    }
    newTag.value = ''
}

const cancelAdd = () => {
    newTag.value = ''
    showInput.value = null
}

const confirmAdd = (type) => {
    const val = newTag.value.trim()
    if (!val) return
    if (type === 'loves') {
        emit('update:loves', [...props.loves, val])
    } else {
        emit('update:limits', [...props.limits, val])
    }
    newTag.value = ''
    showInput.value = null
}

const removeTag = (type, index) => {
    if (type === 'loves') {
        const list = [...props.loves]
        list.splice(index, 1)
        emit('update:loves', list)
    } else {
        const list = [...props.limits]
        list.splice(index, 1)
        emit('update:limits', list)
    }
}
</script>

<style lang="scss" scoped>
.pfd {

    &__card {
        background: #fff;
        border-radius: 32rpx;
        padding: $space-4;
    }

    &__card-head {
        display: flex;
        align-items: center;
        gap: 12rpx;
        margin-bottom: $space-3;
    }

    &__card-title {
        font-size: 24rpx;
        color: $color-ink-soft;
        font-weight: 500;
        letter-spacing: 1rpx;
        flex: 1;
    }

    &__card-hint {
        font-size: 20rpx;
        color: $color-ink-ghost;
        letter-spacing: 1rpx;
        min-width: 60rpx;
        text-align: right;
    }

    &__leaf {
        width: 36rpx;
        height: 36rpx;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22rpx;

        &--heart { background: #D9E4D6; color: #526253; }
        &--ban { background: #EADBD7; color: #B85450; }
    }

    &__pills {
        display: flex;
        flex-wrap: wrap;
        gap: 14rpx;
    }

    &__pill {
        display: inline-flex;
        align-items: center;
        gap: 12rpx;
        padding: 14rpx 28rpx;
        border-radius: 999rpx;
        background: #DDE4DA;
        color: $color-primary;
        font-size: 24rpx;
        letter-spacing: 0.5rpx;
    }

    &__pill-del {
        font-size: 22rpx;
        color: rgba($color-primary, 0.4);
        font-weight: 300;
    }

    &__blacklist {
        display: flex;
        flex-direction: column;
        gap: 16rpx;
    }

    &__bl-row {
        display: flex;
        align-items: center;
        gap: 16rpx;
    }

    &__bl-dot {
        color: #B85450;
        font-size: 14rpx;
        line-height: 1;
    }

    &__bl-t {
        font-size: 26rpx;
        color: $color-ink;
        letter-spacing: 0.3rpx;
        flex: 1;
    }

    &__bl-del {
        font-size: 24rpx;
        color: $color-ink-ghost;
        font-weight: 200;
        opacity: 0.5;
    }

    &__add-row {
        display: flex;
        gap: 12rpx;
        margin-top: $space-3;
    }

    &__add-input {
        flex: 1;
        height: 72rpx;
        background: #F3F5F2;
        border-radius: 16rpx;
        padding: 0 $space-3;
        font-size: 26rpx;
        color: $color-ink;
    }

    &__add-btn {
        flex-shrink: 0;
        height: 72rpx;
        padding: 0 $space-4;
        border-radius: 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform $dur-fast $ease-out-expo;
        background: #3F4E3F;

        text {
            font-size: 24rpx;
            color: #fff;
            letter-spacing: 1rpx;
        }

        &--ghost {
            background: #F3F5F2;
            text { color: $color-ink-soft; }
        }

        &--press { transform: scale(0.94); }
    }
}
</style>