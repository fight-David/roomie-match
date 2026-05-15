<template>
  <view class="onb__slide">
    <!-- ====== 标题 ====== -->
    <view class="onb__title h-display">关于你</view>
    <view class="onb__lede">让未来的室友先认识你</view>

    <!-- ====== 照片网格（最多 6 张，每张 ≤2MB） ====== -->
    <view class="onb__photos-section">
      <view class="onb__photos-label">
        <text>生活照片</text>
        <text class="onb__photos-count">{{ photos.length }}/6</text>
      </view>
      <view v-if="photos.length > 0" class="onb__photos-hint">第一张将作为你的封面</view>
      <view class="onb__photos-grid">
        <view
          v-for="(p, i) in photos"
          :key="i"
          class="onb__photo-cell"
          :class="{ 'is-cover': i === 0 }"
          hover-class="onb__photo-cell--press"
          :hover-stay-time="80"
          @tap="removePhoto(i)"
        >
          <image class="onb__photo-img" :src="p" mode="aspectFill" />
          <view class="onb__photo-remove">✕</view>
          <view v-if="i === 0" class="onb__photo-cover">封面</view>
        </view>
        <view
          v-if="photos.length < 6"
          class="onb__photo-cell onb__photo-cell--add"
          hover-class="onb__photo-cell--press"
          :hover-stay-time="80"
          @tap="addPhoto"
        >
          <text class="onb__photo-add-icon">+</text>
        </view>
      </view>
    </view>

    <!-- ====== 昵称 ====== -->
    <view class="onb__field">
      <input
        class="onb__input"
        :value="nickname"
        @input="e => nickname = e.detail.value"
        placeholder="你的名字或昵称"
        placeholder-class="onb__input-placeholder"
        maxlength="20"
      />
    </view>

    <!-- ====== 介绍 ====== -->
    <view class="onb__field">
      <textarea
        class="onb__textarea"
        :value="bio"
        @input="e => bio = e.detail.value"
        placeholder="用几句话介绍一下自己…&#10;生活习惯、兴趣爱好、理想中的合租氛围"
        placeholder-class="onb__textarea-placeholder"
        maxlength="200"
      />
      <text class="onb__textarea-count">{{ bio.length }}/200</text>
    </view>

    <!-- ====== 跳过提示 ====== -->
    <!-- <view class="onb__skip-hint">
      <text class="onb__skip-text">也可以先跳过，之后再完善</text>
    </view> -->
  </view>
</template>

<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['updateUserProfile'])

const MAX_PHOTOS = 6
const MAX_SIZE = 2 * 1024 * 1024  // 2MB

const photos = ref([])
const nickname = ref('')
const bio = ref('')

// —— 校验文件大小 ——
const checkSize = (path) => {
  return new Promise((resolve) => {
    uni.getFileInfo({
      filePath: path,
      success: (res) => {
        if (res.size > MAX_SIZE) {
          uni.showToast({
            title: '图片超过 2MB，请截图后上传',
            icon: 'none',
            duration: 3000
          })
          resolve(false)
        } else {
          resolve(true)
        }
      },
      fail: () => resolve(true)  // 获取不到大小就放过
    })
  })
}

// —— 添加照片 ——
const addPhoto = async () => {
  const remain = MAX_PHOTOS - photos.value.length
  uni.chooseImage({
    count: remain,
    sizeType: ['compressed'],
    sourceType: ['album'],
    success: async (res) => {
      const valid = []
      for (const p of res.tempFilePaths) {
        const ok = await checkSize(p)
        if (ok) valid.push(p)
      }
      if (valid.length) {
        photos.value = [...photos.value, ...valid]
        emit('updateUserProfile', 'photos', [...photos.value])
        emit('updateUserProfile', 'avatar', photos.value[0] || '')
      }
    }
  })
}

// —— 删除照片 ——
const removePhoto = (i) => {
  photos.value.splice(i, 1)
  emit('updateUserProfile', 'photos', [...photos.value])
  emit('updateUserProfile', 'avatar', photos.value[0] || '')
}

// —— 实时同步 ——
watch(nickname, (v) => emit('updateUserProfile', 'nickname', v))
watch(bio, (v) => emit('updateUserProfile', 'bio', v))
</script>

<style lang="scss" scoped>
.onb {

  /* ---- 照片网格 ---- */
  &__photos-section {
    margin-top: $space-6;
    margin-bottom: $space-4;
  }

  &__photos-label {
    display: flex;
    align-items: baseline;
    gap: 8rpx;
    margin-bottom: $space-1;
    font-size: $font-xs;
    font-weight: 500;
    letter-spacing: 4rpx;
    color: $color-ink-ghost;
    text-transform: uppercase;
  }

  &__photos-count {
    font-weight: 300;
    letter-spacing: 1rpx;
    font-size: 12rpx;
  }

  &__photos-hint {
    font-size: 18rpx;
    color: $color-ink-ghost;
    letter-spacing: 1rpx;
    margin-bottom: $space-2;
    font-weight: 350;
  }

  &__photos-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10rpx;
  }

  &__photo-cell {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    border-radius: 20rpx;
    overflow: hidden;
    background: #fff;
    border: 1.5rpx solid rgba(143, 160, 142, 0.1);
    transition: transform 180ms cubic-bezier(0.16, 0.84, 0.2, 1);

    &--press {
      transform: scale(0.96);
    }

    &--add {
      display: flex;
      align-items: center;
      justify-content: center;
      background: $color-whisper;
      border: 1.5rpx dashed rgba(143, 160, 142, 0.3);
    }

    &.is-cover {
      border-color: $color-primary;
      border-width: 2rpx;
    }
  }

  &__photo-img {
    width: 100%;
    height: 100%;
  }

  &__photo-remove {
    position: absolute;
    top: 4rpx;
    right: 4rpx;
    width: 36rpx;
    height: 36rpx;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 18rpx;
    line-height: 36rpx;
    text-align: center;
    font-weight: 300;
  }

  &__photo-cover {
    position: absolute;
    bottom: 4rpx;
    left: 4rpx;
    padding: 4rpx 12rpx;
    border-radius: 8rpx;
    background: $color-primary;
    color: #fff;
    font-size: 16rpx;
    font-weight: 400;
    letter-spacing: 1rpx;
    line-height: 1.4;
  }

  &__photo-add-icon {
    font-size: 48rpx;
    font-weight: 200;
    color: $color-ink-ghost;
    line-height: 1;
  }

  /* ---- 输入框 ---- */
  &__field {
    margin-bottom: $space-3;
  }

  &__input {
    width: 100%;
    height: 88rpx;
    background: #fff;
    border-radius: 24rpx;
    padding: 0 $space-3;
    font-size: $font-body;
    color: $color-ink;
    letter-spacing: 1rpx;
    border: 1.5rpx solid rgba(143, 160, 142, 0.1);
    transition: border-color 200ms ease;

    &:focus {
      border-color: $color-primary;
    }
  }

  &__input-placeholder {
    color: $color-ink-ghost;
    font-weight: 350;
    letter-spacing: 1rpx;
    font-size: $font-body;
  }

  &__textarea {
    width: 100%;
    height: 200rpx;
    background: #fff;
    border-radius: 24rpx;
    padding: $space-3;
    font-size: $font-sm;
    color: $color-ink;
    letter-spacing: 1rpx;
    line-height: 1.6;
    border: 1.5rpx solid rgba(143, 160, 142, 0.1);
    transition: border-color 200ms ease;
    resize: none;

    &:focus {
      border-color: $color-primary;
    }
  }

  &__textarea-placeholder {
    color: $color-ink-ghost;
    font-weight: 350;
    letter-spacing: 1rpx;
    font-size: $font-sm;
    line-height: 1.6;
  }

  &__textarea-count {
    display: block;
    text-align: right;
    font-size: 12rpx;
    color: $color-ink-ghost;
    margin-top: 6rpx;
    letter-spacing: 1rpx;
    font-variant-numeric: tabular-nums;
  }

  /* ---- 跳过提示 ---- */
  &__skip-hint {
    text-align: center;
    margin-top: $space-3;
    padding-bottom: $space-1;
  }

  &__skip-text {
    font-size: 20rpx;
    font-weight: 350;
    color: $color-ink-soft;
    letter-spacing: 3rpx;
    opacity: 0.5;
    line-height: 1.6;
  }
}
</style>