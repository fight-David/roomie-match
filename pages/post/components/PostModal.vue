<template>
    <view v-if="open" class="pm" @tap="close">
        <view class="pm__sheet" @tap.stop>
            <!-- ── 顶部 ── -->
            <view class="pm__head">
                <text class="pm__title">发一条帖子</text>
                <text class="pm__close" @tap="close">×</text>
            </view>

            <!-- ── 表单主体 ── -->
            <scroll-view scroll-y class="pm__body" :enhanced="true" :show-scrollbar="false">

                <!-- 类型选择 -->
                <view class="pm__field">
                    <text class="pm__field-k">类型</text>
                    <view class="pm__type-picker">
                        <view
                            v-for="t in typeOptions"
                            :key="t.v"
                            class="pm__type-opt"
                            :class="{ 'is-on': form.postType === t.v }"
                            @tap="form.postType = t.v"
                        >
                            <text>{{ t.label }}</text>
                        </view>
                    </view>
                </view>

                <!-- 图片上传 -->
                <view class="pm__field">
                    <view class="pm__field-hd">
                        <text class="pm__field-k">照片</text>
                        <text class="pm__field-hint">{{ form.photos.length }}/9</text>
                    </view>

                    <view class="pm__photos">
                        <view
                            class="pm__photo"
                            v-for="(p, i) in form.photos"
                            :key="i"
                        >
                            <image class="pm__photo-img" :src="p" mode="aspectFill" @tap="preview(i)" />
                            <view class="pm__photo-del" @tap.stop="removePhoto(i)">
                                <text>×</text>
                            </view>
                        </view>

                        <view
                            v-if="form.photos.length < 9"
                            class="pm__photo pm__photo--add"
                            hover-class="pm__photo--press"
                            :hover-stay-time="80"
                            @tap="addPhoto"
                        >
                            <text class="pm__photo-plus">+</text>
                            <text class="pm__photo-tip">添加</text>
                        </view>
                    </view>
                </view>

                <!-- 标题 -->
                <view class="pm__field">
                    <text class="pm__field-k">标题</text>
                    <input class="pm__field-input" v-model="form.title" placeholder="一句话说你想找什么样的人" />
                </view>

                <!-- 位置 -->
                <view class="pm__field">
                    <text class="pm__field-k">位置</text>
                    <input class="pm__field-input" v-model="form.location" placeholder="9号线 · 徐家汇 / 不限" />
                </view>

                <!-- 预算 + 入住 -->
                <view v-if="form.postType !== 'pure_match'" class="pm__field-row">
                    <view class="pm__field pm__field--half">
                        <text class="pm__field-k">预算</text>
                        <input class="pm__field-input" v-model.number="form.budget" type="number" placeholder="4200" />
                    </view>
                    <view class="pm__field pm__field--half">
                        <text class="pm__field-k">入住</text>
                        <input class="pm__field-input" v-model="form.moveIn" placeholder="8月 / 即可" />
                    </view>
                </view>

                <!-- 标签 -->
                <view class="pm__field">
                    <text class="pm__field-k">标签</text>
                    <input class="pm__field-input" v-model="form.tagsText" placeholder="养猫 阳台 晨型（空格分隔）" />
                </view>

                <!-- 内容 -->
                <view class="pm__field">
                    <text class="pm__field-k">详细描述</text>
                    <textarea
                        class="pm__field-area"
                        v-model="form.content"
                        :maxlength="500"
                        placeholder="跟人聊聊你的生活和期待…"
                    />
                    <text class="pm__field-counter">{{ (form.content || '').length }}/500</text>
                </view>

            </scroll-view>

            <!-- ── 底部 ── -->
            <view class="pm__foot h-safe-bottom">
                <view class="pm__btn pm__btn--ghost" hover-class="pm__btn--press" @tap="close">取消</view>
                <view
                    class="pm__btn pm__btn--solid"
                    :class="{ 'is-disabled': !canSubmit }"
                    hover-class="pm__btn--press"
                    @tap="submit"
                >发布</view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'
import { useUserStore } from '@/stores/user'

const props = defineProps({
    open: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'submit'])
const userStore = useUserStore()

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
    content: '',
    photos: []
})

const canSubmit = computed(() => form.title && form.location)

const close = () => emit('close')

// ── 图片操作 ──
const addPhoto = () => {
    const remain = 9 - form.photos.length
    if (remain <= 0) return

    uni.chooseImage({
        count: remain,
        success: async (res) => {
            uni.showLoading({ title: '上传中…', mask: true })
            try {
                for (const tempPath of res.tempFilePaths) {
                    const url = await uploadOne(tempPath)
                    form.photos.push(url)
                }
            } catch (e) {
                console.error('上传失败', e)
                uni.showToast({ title: '上传失败', icon: 'none' })
            } finally {
                uni.hideLoading()
            }
        }
    })
}

const uploadOne = (tempPath) => {
    return new Promise((resolve, reject) => {
        const ext = tempPath.split('.').pop() || 'jpg'
        const cloudPath = `posts/${userStore.uid || 'anon'}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}.${ext}`
        uniCloud.uploadFile({
            filePath: tempPath,
            cloudPath,
            success: (res) => resolve(res.fileID),
            fail: (e) => reject(e)
        })
    })
}

const removePhoto = (i) => form.photos.splice(i, 1)

const preview = (i) => {
    uni.previewImage({
        current: form.photos[i],
        urls: form.photos
    })
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
        content: form.content,
        photos: [...form.photos],
        cover: form.photos[0] || ''
    })
}

// 关闭时重置
watch(() => props.open, (val) => {
    if (!val) {
        form.postType = 'have_room'
        form.title = ''
        form.location = ''
        form.budget = ''
        form.moveIn = ''
        form.tagsText = ''
        form.content = ''
        form.photos = []
    }
})
</script>

<style lang="scss" scoped>
.pm {
    position: fixed;
    inset: 0;
    background: rgba(28, 30, 28, .35);
    backdrop-filter: blur(24rpx);
    -webkit-backdrop-filter: blur(24rpx);
    z-index: 200;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    animation: h-fade-up .24s $ease-out-expo both;

    &__sheet {
        width: 100%;
        background: $color-paper;
        border-top-left-radius: 40rpx;
        border-top-right-radius: 40rpx;
        position: relative;
        height: 88vh;
        animation: h-fade-up .32s $ease-out-expo both;
    }

    // ── 顶部 ──
    &__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: $space-4 $space-4 $space-3;
        position: relative;
        background: $color-paper;
        border-top-left-radius: 40rpx;
        border-top-right-radius: 40rpx;

        &::after {
            content: '';
            position: absolute;
            left: $space-4;
            right: $space-4;
            bottom: 0;
            height: 1rpx;
            background: rgba(28, 30, 28, .06);
        }
    }

    &__title {
        font-size: 32rpx;
        font-weight: 500;
        letter-spacing: -0.3rpx;
        color: $color-ink;
    }

    &__close {
        font-size: 44rpx;
        color: $color-ink-ghost;
        font-weight: 200;
        padding: 0 $space-2;
        line-height: 1;
    }

    // ── 表单 ──
    &__body {
        position: absolute;
        top: 120rpx;
        left: 0;
        right: 0;
        bottom: 180rpx;
        padding: $space-4;
        box-sizing: border-box;
    }

    &__field {
        margin-bottom: $space-4;

        &--half { flex: 1; margin-bottom: 0; }
    }

    &__field-row {
        display: flex;
        gap: $space-3;
        margin-bottom: $space-4;
    }

    &__field-hd {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        margin-bottom: 14rpx;
    }

    &__field-k {
        display: block;
        font-size: 22rpx;
        color: $color-ink-soft;
        letter-spacing: 2rpx;
        margin-bottom: 14rpx;
        text-transform: uppercase;
    }

    &__field-hint {
        font-size: 20rpx;
        color: $color-ink-ghost;
        letter-spacing: 1rpx;
    }

    &__field-input {
        width: 100%;
        height: 88rpx;
        padding: 0 $space-3;
        font-size: 28rpx;
        color: $color-ink;
        background: #fff;
        border-radius: 20rpx;
        box-sizing: border-box;
        box-shadow: 0 2rpx 12rpx rgba(28, 30, 28, .04);
    }

    &__field-area {
        width: 100%;
        min-height: 200rpx;
        padding: $space-3;
        font-size: 28rpx;
        line-height: 1.7;
        color: $color-ink;
        background: #fff;
        border-radius: 20rpx;
        box-sizing: border-box;
        box-shadow: 0 2rpx 12rpx rgba(28, 30, 28, .04);
    }

    &__field-counter {
        display: block;
        text-align: right;
        font-size: 20rpx;
        color: $color-ink-ghost;
        margin-top: 8rpx;
        letter-spacing: 1rpx;
    }

    // ── 类型选择 ──
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
        background: #fff;
        border-radius: 16rpx;
        font-size: 24rpx;
        color: $color-ink-soft;
        letter-spacing: 1rpx;
        transition: all .15s;
        box-shadow: 0 2rpx 12rpx rgba(28, 30, 28, .04);

        &.is-on {
            background: #526253;
            color: #fff;
            box-shadow: 0 6rpx 20rpx rgba(82, 98, 83, .25);
        }
    }

    // ── 照片九宫格 ──
    &__photos {
        display: flex;
        flex-wrap: wrap;
        gap: 12rpx;
    }

    &__photo {
        position: relative;
        width: calc((100% - 24rpx) / 3);
        aspect-ratio: 1;
        border-radius: 16rpx;
        overflow: hidden;
        background: $color-mist;

        &--add {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8rpx;
            background: #fff;
            border: 1.5rpx dashed rgba(28, 30, 28, .15);
            box-shadow: 0 2rpx 12rpx rgba(28, 30, 28, .04);
            transition: all .15s;
        }

        &--press {
            transform: scale(0.96);
            background: $color-whisper;
        }
    }

    &__photo-img {
        width: 100%;
        height: 100%;
    }

    &__photo-del {
        position: absolute;
        top: 8rpx;
        right: 8rpx;
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        background: rgba(0, 0, 0, .55);
        backdrop-filter: blur(8rpx);
        -webkit-backdrop-filter: blur(8rpx);
        display: flex;
        align-items: center;
        justify-content: center;

        text {
            font-size: 24rpx;
            color: #fff;
            font-weight: 300;
            line-height: 1;
        }
    }

    &__photo-plus {
        font-size: 48rpx;
        color: $color-ink-ghost;
        font-weight: 200;
        line-height: 1;
    }

    &__photo-tip {
        font-size: 20rpx;
        color: $color-ink-ghost;
        letter-spacing: 1rpx;
    }

    // ── 底部按钮 ──
    &__foot {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        gap: $space-2;
        padding: $space-3 $space-4 calc(env(safe-area-inset-bottom) + #{$space-3});
        border-top: 1rpx solid rgba(28, 30, 28, .04);
        background: $color-paper;
        box-sizing: border-box;
    }

    &__btn {
        flex: 1;
        height: 96rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 999rpx;
        font-size: 26rpx;
        letter-spacing: 3rpx;
        font-weight: 500;
        transition: transform .12s;

        &--ghost {
            background: $color-whisper;
            color: $color-ink;
            flex: 0 0 32%;
        }

        &--solid {
            background: #526253;
            color: #fff;
            box-shadow: 0 12rpx 32rpx rgba(82, 98, 83, .28);
        }

        &--press { transform: scale(0.97); }

        &.is-disabled {
            background: $color-stone;
            color: #fff;
            box-shadow: none;
            opacity: .6;
        }
    }
}
</style>
