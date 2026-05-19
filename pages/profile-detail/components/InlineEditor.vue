<template>
    <view class="ie">
        <view class="ie__row" v-if="!isEditing" hover-class="ie__row--press" :hover-stay-time="60" @tap="startEdit">
            <text class="ie__label">{{ label }}</text>
            <view class="ie__value-wrap">
                <text class="ie__value" :class="{ 'is-empty': !displayText }">{{ displayText || placeholder }}</text>
                <text class="ie__arrow">›</text>
            </view>
        </view>
        <view class="ie__edit" v-else>
            <view class="ie__edit-head">
                <text class="ie__edit-title">{{ label }}</text>
                <text class="ie__edit-empty" @tap="clearValue">清除</text>
            </view>

            <!-- 文本输入 -->
            <input v-if="type === 'text'" class="ie__input" :value="tempValue" @input="onInput"
                :placeholder="placeholder" :maxlength="maxlength" confirm-type="done" @confirm="confirmEdit" auto-focus />

            <!-- 多行文本 -->
            <textarea v-if="type === 'textarea'" class="ie__textarea" :value="tempValue" @input="onInput"
                :placeholder="placeholder" :maxlength="maxlength" auto-focus />

            <!-- 性别（单选，无确认） -->
            <view v-if="type === 'gender'" class="ie__options">
                <view class="ie__option" :class="{ 'is-active': tempValue === '男' }" hover-class="ie__option--press"
                    :hover-stay-time="60" @tap="pick('男')">
                    <text>男</text>
                </view>
                <view class="ie__option" :class="{ 'is-active': tempValue === '女' }" hover-class="ie__option--press"
                    :hover-stay-time="60" @tap="pick('女')">
                    <text>女</text>
                </view>
            </view>

            <!-- 目标性别（单选，无确认） -->
            <view v-if="type === 'target_gender'" class="ie__options">
                <view class="ie__option" :class="{ 'is-active': tempValue === '男' }" hover-class="ie__option--press"
                    :hover-stay-time="60" @tap="pick('男')">
                    <text>男室友</text>
                </view>
                <view class="ie__option" :class="{ 'is-active': tempValue === '女' }" hover-class="ie__option--press"
                    :hover-stay-time="60" @tap="pick('女')">
                    <text>女室友</text>
                </view>
                <view class="ie__option" :class="{ 'is-active': tempValue === '不限' }" hover-class="ie__option--press"
                    :hover-stay-time="60" @tap="pick('不限')">
                    <text>不限</text>
                </view>
            </view>

            <!-- 预算 -->
            <view v-if="type === 'budget'" class="ie__budget">
                <view class="ie__budget-row">
                    <text class="ie__budget-label">最低</text>
                    <view class="ie__budget-input-wrap">
                        <text class="ie__budget-sign">¥</text>
                        <input class="ie__budget-input" :value="budgetMin" @input="onBudgetMin" type="number" />
                    </view>
                </view>
                <view class="ie__budget-row">
                    <text class="ie__budget-label">最高</text>
                    <view class="ie__budget-input-wrap">
                        <text class="ie__budget-sign">¥</text>
                        <input class="ie__budget-input" :value="budgetMax" @input="onBudgetMax" type="number" />
                    </view>
                </view>
            </view>

            <!-- 确认/取消（仅 text / textarea / budget 显示） -->
            <view class="ie__actions" v-if="showActions">
                <view class="ie__act ie__act--cancel" hover-class="ie__act--press" :hover-stay-time="60"
                    @tap="cancelEdit">
                    <text>取消</text>
                </view>
                <view class="ie__act ie__act--confirm" hover-class="ie__act--press" :hover-stay-time="60"
                    @tap="confirmEdit">
                    <text>确定</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
    name: { type: String, default: '' },
    label: { type: String, required: true },
    modelValue: { type: [String, Number, Array, Object], default: null },
    placeholder: { type: String, default: '未设置' },
    type: { type: String, default: 'text' },
    maxlength: { type: Number, default: 100 },
    activeName: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'save', 'start-edit'])

const editing = ref(false)
const tempValue = ref('')
const budgetMin = ref('')
const budgetMax = ref('')

const isEditing = computed(() => editing.value && props.activeName === props.name)

// 只有 text / textarea / budget 需要确定/取消
const showActions = computed(() =>
    ['text', 'textarea', 'budget'].includes(props.type)
)

const displayText = computed(() => {
    const v = props.modelValue
    if (v == null || v === '') return ''
    if (Array.isArray(v)) return v.join(' · ')
    if (typeof v === 'object') {
        if (v.budget_min || v.budget_max) {
            return `¥${v.budget_min}-${v.budget_max}`
        }
    }
    return String(v)
})

// 当 activeName 变了且不是自己时，折叠
watch(() => props.activeName, (val) => {
    if (val !== props.name) {
        editing.value = false
    }
})

const startEdit = () => {
    // 通知父组件我要展开
    emit('start-edit', props.name)
    editing.value = true
    if (props.type === 'budget') {
        const bm = props.modelValue
        budgetMin.value = String(bm?.budget_min || '')
        budgetMax.value = String(bm?.budget_max || '')
    } else {
        tempValue.value = String(props.modelValue || '')
    }
}

const cancelEdit = () => {
    editing.value = false
}

const onInput = (e) => {
    tempValue.value = e.detail.value
}

const onBudgetMin = (e) => {
    budgetMin.value = e.detail.value
}
const onBudgetMax = (e) => {
    budgetMax.value = e.detail.value
}

const pick = (val) => {
    tempValue.value = val
    editing.value = false
    emit('update:modelValue', tempValue.value)
    emit('save')
}

const clearValue = () => {
    tempValue.value = ''
    budgetMin.value = ''
    budgetMax.value = ''
}

const confirmEdit = () => {
    editing.value = false
    let val = tempValue.value
    if (props.type === 'budget') {
        val = {
            budget_min: parseInt(budgetMin.value) || 0,
            budget_max: parseInt(budgetMax.value) || 0
        }
    }
    emit('update:modelValue', val)
    emit('save')
}
</script>

<style lang="scss" scoped>
.ie {

    // ——— 展示态 ———
    &__row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 32rpx $space-4;
        background: #fff;
        transition: opacity $dur-fast;

        &--press { opacity: 0.5; }
    }

    &__label {
        font-size: 24rpx;
        color: $color-ink-soft;
        font-weight: 500;
        letter-spacing: 1rpx;
        flex-shrink: 0;
        min-width: 80rpx;
    }

    &__value-wrap {
        display: flex;
        align-items: center;
        gap: 12rpx;
        flex: 1;
        justify-content: flex-end;
        max-width: 70%;
    }

    &__value {
        font-size: 26rpx;
        color: $color-ink;
        text-align: right;
        line-height: 1.4;

        &.is-empty {
            color: $color-ink-ghost;
            font-weight: 300;
        }
    }

    &__arrow {
        font-size: 32rpx;
        color: $color-ink-ghost;
        font-weight: 200;
        flex-shrink: 0;
    }

    // ——— 编辑态 ———
    &__edit {
        background: #fff;
        padding: $space-4;
        border-radius: 24rpx;
    }

    &__edit-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: $space-3;
    }

    &__edit-title {
        font-size: 26rpx;
        font-weight: 500;
        color: $color-ink;
    }

    &__edit-empty {
        font-size: 22rpx;
        color: $color-ink-ghost;
        letter-spacing: 1rpx;
    }

    &__input {
        height: 88rpx;
        width: auto;
        background: #F3F5F2;
        border-radius: 16rpx;
        padding: 0 $space-3;
        font-size: 28rpx;
        color: $color-ink;
    }

    &__textarea {
        height: 200rpx;
        width: auto;
        background: #F3F5F2;
        border-radius: 16rpx;
        padding: $space-3;
        font-size: 26rpx;
        color: $color-ink;
        line-height: 1.6;
        resize: none;
    }

    &__options {
        display: flex;
        gap: 16rpx;
    }

    &__option {
        flex: 1;
        height: 88rpx;
        border-radius: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #F3F5F2;
        font-size: 28rpx;
        color: $color-ink-soft;
        transition: all $dur-fast $ease-out-expo;

        &.is-active {
            background: #3F4E3F;
            color: #fff;
        }

        &--press { transform: scale(0.95); }
    }

    &__budget {
        display: flex;
        flex-direction: column;
        gap: 20rpx;
    }

    &__budget-row {
        display: flex;
        align-items: center;
        gap: 20rpx;
    }

    &__budget-label {
        font-size: 24rpx;
        color: $color-ink-soft;
        width: 60rpx;
        flex-shrink: 0;
    }

    &__budget-input-wrap {
        flex: 1;
        display: flex;
        align-items: center;
        background: #F3F5F2;
        border-radius: 16rpx;
        padding: 0 $space-3;
        height: 80rpx;
        gap: 8rpx;
    }

    &__budget-sign {
        font-size: 28rpx;
        color: $color-ink-ghost;
    }

    &__budget-input {
        flex: 1;
        height: 100%;
        font-size: 28rpx;
        color: $color-ink;
    }

    &__actions {
        display: flex;
        gap: 16rpx;
        margin-top: $space-4;
    }

    &__act {
        flex: 1;
        height: 80rpx;
        border-radius: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26rpx;
        transition: transform $dur-fast $ease-out-expo;

        &--cancel {
            background: #F3F5F2;
            color: $color-ink-soft;
        }

        &--confirm {
            background: #3F4E3F;
            color: #fff;
        }

        &--press { transform: scale(0.95); }
    }
}
</style>