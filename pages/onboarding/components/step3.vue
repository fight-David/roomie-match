<template>
    <view class="onb__slide">
        <view class="onb__title h-display">热爱和底线</view>

        <!-- ===== Red List ===== -->
        <view class="onb__list-title">
            <view class="onb__dot onb__dot--red"></view>
            <text>热爱</text>
            <text class="onb__count">{{ red.length }}/5</text>
        </view>
        <view class="onb__tags">
            <tag v-for="t in redPool" :key="'r' + t" tone="red" :active="red.includes(t)"
                :class="{ 'is-disabled': !red.includes(t) && red.length >= MAX }"
                @tap="toggle('red', t)">{{ t }}
            </tag>

            <view class="onb__add" hover-class="onb__add--press" :hover-stay-time="80" @tap="openAdd('red')">
                <text class="onb__add-plus">+</text>
                <text class="onb__add-text">自定义</text>
            </view>
        </view>

        <!-- ===== Black List ===== -->
        <view class="onb__list-title" style="margin-top: 64rpx;">
            <view class="onb__dot onb__dot--black"></view>
            <text>底线</text>
            <text class="onb__count">{{ black.length }}/5</text>
        </view>
        <view class="onb__tags">
            <tag v-for="t in blackPool" :key="'b' + t" tone="black" :active="black.includes(t)"
                :class="{ 'is-disabled': !black.includes(t) && black.length >= MAX }"
                @tap="toggle('black', t)">{{ t }}
            </tag>

            <view class="onb__add" hover-class="onb__add--press" :hover-stay-time="80" @tap="openAdd('black')">
                <text class="onb__add-plus">+</text>
                <text class="onb__add-text">自定义</text>
            </view>
        </view>

        <!-- ===== 自定义输入弹窗 ===== -->
        <view v-if="addOpen" class="onb__overlay" @tap="closeAdd">
            <view class="onb__modal" @tap.stop>
                <view class="onb__modal-title">添加{{ addKind === 'red' ? '热爱' : '底线' }}</view>
                <input
                    class="onb__modal-input"
                    :value="addText"
                    @input="e => addText = e.detail.value"
                    placeholder="输入你想添加的内容"
                    placeholder-class="onb__modal-placeholder"
                    maxlength="20"
                    :focus="true"
                />
                <view class="onb__modal-actions">
                    <view class="onb__modal-btn onb__modal-btn--cancel" @tap="closeAdd">取消</view>
                    <view class="onb__modal-btn onb__modal-btn--confirm"
                        :class="{ 'is-disabled': !addText.trim() }"
                        @tap="confirmAdd">添加</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import Tag from '@/components/Tag.vue'
import { RED_TAGS, BLACK_TAGS } from '@/sources/mock.js'
import { ref } from 'vue'

const emit = defineEmits(['updateUserProfile'])

const MAX = 5

const redPool = ref([...RED_TAGS])
const blackPool = ref([...BLACK_TAGS])
const red = ref([])
const black = ref([])
const addOpen = ref(false)
const addKind = ref('red')
const addText = ref('')

const toggle = (kind, t) => {
    const list = kind === 'red' ? red : black
    const idx = list.value.indexOf(t)
    if (idx > -1) {
        list.value.splice(idx, 1)
    } else {
        if (list.value.length >= MAX) return
        list.value.push(t)
    }
    try { uni.vibrateShort({ type: 'light' }) } catch (e) { /* noop */ }
    emit('updateUserProfile', kind === 'red' ? 'loves' : 'limits', [...list.value])
}

const openAdd = (kind) => {
    addKind.value = kind
    addText.value = ''
    addOpen.value = true
}

const closeAdd = () => {
    addOpen.value = false
}

const confirmAdd = () => {
    const t = addText.value.trim()
    if (!t) return
    const pool = addKind.value === 'red' ? redPool : blackPool
    const list = addKind.value === 'red' ? red : black
    if (!pool.value.includes(t)) pool.value.push(t)
    if (!list.value.includes(t) && list.value.length < MAX) {
        list.value.push(t)
        emit('updateUserProfile', addKind.value === 'red' ? 'loves' : 'limits', [...list.value])
    }
    addOpen.value = false
}

</script>

<style lang="scss" scoped>
.onb {

    /* ---------- 红黑榜 ---------- */
    &__list-title {
        display: flex;
        align-items: center;
        margin-top: $space-5;
        margin-bottom: $space-3;
        font-size: $font-sm;
        letter-spacing: 2rpx;
        color: $color-ink;
        gap: 12rpx;
    }

    &__dot {
        width: 10rpx;
        height: 10rpx;
        border-radius: 50%;

        &--red {
            background: $color-red-list;
        }

        &--black {
            background: $color-black-list;
        }
    }

    &__count {
        margin-left: auto;
        font-size: $font-xs;
        color: $color-ink-ghost;
        letter-spacing: 1rpx;
        min-width: 60rpx;
        text-align: right;
        font-variant-numeric: tabular-nums;
    }

    &__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8rpx;
    }

    :deep(.is-disabled) {
        opacity: 0.3;
        pointer-events: none;
    }

    &__add {
        display: inline-flex;
        align-items: center;
        padding: 14rpx 24rpx;
        border-radius: 999rpx;
        border: 2rpx dashed rgba(82, 98, 83, 0.5);
        color: $color-primary;
        font-size: $font-sm;
        letter-spacing: 1rpx;
        transition: transform $dur-fast;

        &--press {
            transform: scale(0.96);
        }
    }

    &__add-plus {
        font-size: 28rpx;
        margin-right: 8rpx;
        font-weight: 200;
    }

    /* ---- 弹窗遮罩 ---- */
    &__overlay {
        position: fixed;
        z-index: 100;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        animation: onb-fade-in 200ms ease;
    }

    &__modal {
        width: 560rpx;
        background: #fff;
        border-radius: 32rpx;
        padding: $space-5;
        animation: onb-scale-in 250ms cubic-bezier(0.16, 0.84, 0.2, 1);
    }

    &__modal-title {
        font-size: $font-body;
        font-weight: 450;
        color: $color-ink;
        text-align: center;
        margin-bottom: $space-4;
        letter-spacing: 1rpx;
    }

    &__modal-input {
        // width: 100%;
        height: 80rpx;
        background: $color-whisper;
        border-radius: 20rpx;
        padding: 0 $space-3;
        font-size: $font-body;
        color: $color-ink;
        letter-spacing: 1rpx;
    }

    &__modal-placeholder {
        color: $color-ink-ghost;
        font-weight: 350;
    }

    &__modal-actions {
        display: flex;
        gap: $space-2;
        margin-top: $space-4;
    }

    &__modal-btn {
        flex: 1;
        height: 80rpx;
        border-radius: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: $font-sm;
        letter-spacing: 2rpx;
        transition: transform 150ms ease;

        &--cancel {
            background: $color-whisper;
            color: $color-ink-soft;
        }

        &--confirm {
            background: $color-ink;
            color: #fff;

            &.is-disabled {
                opacity: 0.4;
            }
        }
    }
}

@keyframes onb-fade-in {
    from { opacity: 0 }
    to   { opacity: 1 }
}

@keyframes onb-scale-in {
    from { transform: scale(0.92); opacity: 0 }
    to   { transform: scale(1); opacity: 1 }
}
</style>