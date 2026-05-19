<template>
    <view v-if="open" class="pm" @tap="close">
        <view class="pm__sheet" @tap.stop>
            <view class="pm__head">
                <text class="pm__title h-display">发一条帖子</text>
                <text class="pm__close" @tap="close">×</text>
            </view>

            <scroll-view scroll-y class="pm__body">
                <view class="pm__field">
                    <text class="pm__field-k">类型</text>
                    <view class="pm__type-picker">
                        <view v-for="t in typeOptions" :key="t.v" class="pm__type-opt"
                            :class="{ 'is-on': form.postType === t.v }" @tap="form.postType = t.v">
                            <text>{{ t.label }}</text>
                        </view>
                    </view>
                </view>

                <view class="pm__field">
                    <text class="pm__field-k">TITLE</text>
                    <input class="pm__field-input" v-model="form.title" placeholder="一句话说你想找什么样的人" />
                </view>

                <view class="pm__field">
                    <text class="pm__field-k">LOCATION</text>
                    <input class="pm__field-input" v-model="form.location" placeholder="9号线 · 徐家汇 / 不限" />
                </view>

                <view v-if="form.postType !== 'pure_match'" class="pm__field-row">
                    <view class="pm__field">
                        <text class="pm__field-k">BUDGET</text>
                        <input class="pm__field-input" v-model.number="form.budget" type="number" placeholder="4200" />
                    </view>
                    <view class="pm__field">
                        <text class="pm__field-k">MOVE IN</text>
                        <input class="pm__field-input" v-model="form.moveIn" placeholder="8月 / 即可" />
                    </view>
                </view>

                <view class="pm__field">
                    <text class="pm__field-k">TAGS（空格分隔）</text>
                    <input class="pm__field-input" v-model="form.tagsText" placeholder="养猫 阳台 晨型" />
                </view>

                <view class="pm__field">
                    <text class="pm__field-k">CONTENT</text>
                    <textarea class="pm__field-area" v-model="form.content" :maxlength="500"
                        placeholder="跟人聊聊你的生活和期待..." />
                </view>
            </scroll-view>

            <view class="pm__foot h-safe-bottom">
                <view class="pm__btn pm__btn--ghost" @tap="close">取消</view>
                <view class="pm__btn pm__btn--solid" :class="{ 'is-disabled': !canSubmit }" @tap="submit">
                    发布
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'

const props = defineProps({
    open: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'submit'])

const typeOptions = [
    { v: 'have_room', label: '有房招友' },
    { v: 'seek_room', label: '搭子找房' },
    { v: 'pure_match', label: '先认识人' }
]

const form = reactive({
    postType: 'have_room',
    title: '',
    location: '',
    budget: '',
    moveIn: '',
    tagsText: '',
    content: ''
})

const canSubmit = computed(() => form.title && form.location)

const close = () => {
    emit('close')
}

const submit = () => {
    if (!canSubmit.value) return
    emit('submit', {
        postType: form.postType,
        title: form.title,
        location: form.location,
        budget: Number(form.budget) || 0,
        moveIn: form.moveIn || '',
        tags: form.tagsText.trim().split(/\s+/).filter(Boolean),
        content: form.content
    })
}

// 每次打开时重置表单
watch(() => props.open, (val) => {
    if (!val) {
        form.postType = 'have_room'
        form.title = ''
        form.location = ''
        form.budget = ''
        form.moveIn = ''
        form.tagsText = ''
        form.content = ''
    }
})
</script>

<style lang="scss" scoped>
.pm {
    position: fixed;
    inset: 0;
    background: rgba(28, 30, 28, .32);
    backdrop-filter: blur(32rpx);
    -webkit-backdrop-filter: blur(32rpx);
    z-index: 200;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    animation: h-fade-up .24s $ease-out-expo both;

    &__sheet {
        width: 100%;
        background: $color-paper;
        border-top-left-radius: 48rpx;
        border-top-right-radius: 48rpx;
        max-height: 92vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        animation: h-fade-up .32s $ease-out-expo both;
    }

    &__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: $space-4 $space-4 $space-2;
    }

    &__title {
        font-size: 36rpx;
        font-weight: 600;
        letter-spacing: -0.3rpx;
    }

    &__close {
        font-size: 48rpx;
        color: $color-ink-ghost;
        font-weight: 200;
        padding: 0 $space-2;
    }

    &__body {
        padding: $space-3 $space-4 0;
        flex: 1;
    }

    &__type-picker {
        display: flex;
        gap: $space-2;
    }

    &__type-opt {
        flex: 1;
        height: 80rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: $radius-md;
        background: #fff;
        color: $color-ink-soft;
        font-size: 24rpx;
        box-shadow: $shadow-ambient-sm;
        border: 2rpx solid transparent;

        &.is-on {
            border-color: #526253;
            color: #526253;
            background: rgba(82, 98, 83, 0.08);
        }
    }

    &__field {
        margin-bottom: $space-4;
        flex: 1;
    }

    &__field-row {
        display: flex;
        gap: $space-3;
    }

    &__field-k {
        display: block;
        font-size: 20rpx;
        letter-spacing: 3rpx;
        color: $color-ink-ghost;
        margin-bottom: 12rpx;
        text-transform: uppercase;
    }

    &__field-input,
    &__field-area {
        width: 100%;
        background: #fff;
        border-radius: $radius-md;
        padding: 24rpx $space-3;
        font-size: 26rpx;
        color: $color-ink;
        box-shadow: $shadow-ambient-sm;
    }

    &__field-area {
        min-height: 200rpx;
    }

    &__foot {
        display: flex;
        gap: $space-2;
        padding: $space-3 $space-4 calc(env(safe-area-inset-bottom) + #{$space-3});
    }

    &__btn {
        flex: 1;
        height: 96rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 999rpx;
        font-size: 26rpx;
        letter-spacing: 2rpx;

        &--ghost {
            background: $color-whisper;
            color: $color-ink;
            flex: 0 0 40%;
        }

        &--solid {
            background: #526253;
            color: #fff;
            box-shadow: 0 12rpx 40rpx rgba(82, 98, 83, .28);
        }

        &.is-disabled {
            background: $color-stone;
            color: #fff;
            box-shadow: none;
        }
    }
}
</style>
