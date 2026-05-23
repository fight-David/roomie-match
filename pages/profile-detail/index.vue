<template>
    <view class="pfd">
        <!-- ===== Nav ===== -->
        <view class="pfd__nav h-safe-top">
            <view class="pfd__nav-bar">
                <text class="pfd__nav-back" @tap="back">‹</text>
                <text class="pfd__nav-title">{{ isEditMode ? '编辑个人资料' : user.nickname }}</text>
                <text class="pfd__nav-action" @tap="isEditMode ? saveProfile() : share()">
                    {{ isEditMode ? '保存' : '↗' }}
                </text>
            </view>
        </view>

        <!-- ===== 照片画廊 ===== -->
        <PhotoGallery
            :photos="allPhotos"
            :editable="isEditMode"
            @add-photo="addPhoto"
            @remove-photo="removePhoto"
        />

        <!-- ===== Body ===== -->
        <view class="pfd__body">

            <!-- ── 编辑模式 ── -->
            <template v-if="isEditMode">
                                <!-- 昵称 / 简介 -->
                <view class="pfd__section">
                    <InlineEditor name="nickname" label="昵称" v-model="user.nickname" placeholder="输入昵称"
                        type="text" :maxlength="20" :active-name="activeField"
                        @start-edit="activeField = $event" @save="onSave" />
                    <InlineEditor name="bio" label="简介" v-model="user.bio" placeholder="写一段自我介绍…"
                        type="textarea" :maxlength="200" :active-name="activeField"
                        @start-edit="activeField = $event" @save="onSave" />
                </view>

                <!-- 性别 / 目标 -->
                <view class="pfd__section">
                    <InlineEditor name="gender" label="我的性别" v-model="user.gender" placeholder="选择性别"
                        type="gender" :active-name="activeField"
                        @start-edit="activeField = $event" @save="onSave" />
                    <InlineEditor name="target_gender" label="寻找" v-model="user.target_gender" placeholder="不限"
                        type="target_gender" :active-name="activeField"
                        @start-edit="activeField = $event" @save="onSave" />
                </view>

                <!-- 预算 / 区域 -->
                <view class="pfd__section">
                    <InlineEditor name="budget" label="预算" :model-value="{ budget_min: user.budget_min, budget_max: user.budget_max }"
                        placeholder="设置预算" type="budget" :active-name="activeField"
                        @start-edit="activeField = $event"
                        @update:model-value="onBudgetUpdate" @save="onSave" />
                    <InlineEditor name="districts" label="区域" v-model="user.target_districts" placeholder="选择区域"
                        type="text" :active-name="activeField"
                        @start-edit="activeField = $event" @save="onSave" />
                    <InlineEditor name="subways" label="地铁" v-model="user.target_subways" placeholder="选择地铁线"
                        type="text" :active-name="activeField"
                        @start-edit="activeField = $event" @save="onSave" />
                </view>

                <!-- 维度滑块 -->
                <DimSlider :dims="user.dims" @update:dims="onDimsUpdate" />

                                <!-- 标签 -->
                <EditTags
                    :loves="user.loves"
                    :limits="user.limits"
                    @update:loves="val => user.loves = val"
                    @update:limits="val => user.limits = val"
                />
            </template>

            <!-- ── 查看模式 ── -->
            <template v-else>
                <RadarCard :dims="user.dims" />
                <TagLists :loves="user.loves" :limits="user.limits" />
                <BioCard :bio="user.bio" :user="user" />
            </template>

        </view>

        <!-- ===== Bottom ===== -->
        <view class="pfd__bottom">
            <view class="pfd__bottom-inner h-safe-bottom">
                <template v-if="isEditMode">
                    <view class="pfd__btn pfd__btn--ghost" hover-class="pfd__btn--press" :hover-stay-time="80" @tap="discard">
                        <text>放弃</text>
                    </view>
                    <view class="pfd__btn pfd__btn--solid" hover-class="pfd__btn--press" :hover-stay-time="80" @tap="saveProfile">
                        <text>保存</text>
                    </view>
                </template>
                                <template v-else>
                    <FollowButton :user-id="user.id" />
                    <ChatButton
                        :user-id="user.id"
                        :user-name="user.nickname"
                        :user-avatar="user.cover"
                    />
                </template>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { PEOPLE } from '@/sources/mock.js'
import { findPerson } from '@/api/db.js'
import { useUserStore } from '@/stores/user'
import PhotoGallery from './components/PhotoGallery.vue'
import InlineEditor from './components/InlineEditor.vue'
import DimSlider from './components/DimSlider.vue'
import EditTags from './components/EditTags.vue'
import RadarCard from './components/RadarCard.vue'
import TagLists from './components/TagLists.vue'
import BioCard from './components/BioCard.vue'
import FollowButton from './components/FollowButton.vue'
import ChatButton from './components/ChatButton.vue'

const userStore = useUserStore()
const user = ref({})
const mode = ref('view')

const isEditMode = computed(() => mode.value === 'edit')

const allPhotos = computed(() => {
    if (!user.value?.photos?.length && !user.value?.cover) return []
    const list = user.value.cover ? [user.value.cover, ...(user.value.photos || [])] : [...(user.value.photos || [])]
    return [...new Set(list)]
})

onLoad(async (query) => {
    if (query?.mode === 'edit') {
        mode.value = 'edit'
        user.value = JSON.parse(JSON.stringify(userStore.profile))
    } else if (query?.id) {
        try {
            const found = await findPerson(query.id)
            if (found) {
                user.value = found
            } else {
                user.value = PEOPLE.find(p => p.id === query.id) || {}
            }
        } catch (e) {
            user.value = PEOPLE.find(p => p.id === query.id) || {}
        }
    }
})

const activeField = ref('')

// ——— 通用操作 ———
const back = () => uni.navigateBack()
const share = () => uni.showToast({ title: '分享功能即将上线', icon: 'none' })

// ——— 编辑保存 ———
const saveProfile = async () => {
    // 确保 cover 和 photos 同步
    if (allPhotos.value.length > 0) {
        user.value.cover = allPhotos.value[0]
        user.value.photos = allPhotos.value.slice(1)
    }
    userStore.setProfile({ ...user.value })

    // 同步到云端
    await userStore.saveProfile()

    uni.showToast({ title: '已保存', icon: 'success' })
    setTimeout(() => uni.navigateBack(), 600)
}

const discard = () => uni.navigateBack()

// ——— 字段编辑 ———
const onSave = () => {
    // InlineEditor emit save 后自动更新了 v-model，无需额外处理
}

const onBudgetUpdate = (val) => {
    user.value.budget_min = val.budget_min || user.value.budget_min
    user.value.budget_max = val.budget_max || user.value.budget_max
}

const onDimsUpdate = (dims) => {
    user.value.dims = { ...dims }
}

// ——— 照片操作 ———
const addPhoto = () => {
    uni.chooseImage({
        count: 1,
        success: (res) => {
            const tempPath = res.tempFilePaths[0]
            if (!user.value.photos) user.value.photos = []
            user.value.photos.push(tempPath)
            // 如果还没有 cover，把第一张设为 cover
            if (!user.value.cover) {
                user.value.cover = tempPath
            }
        }
    })
}

const removePhoto = (index) => {
    const list = [...allPhotos.value]
    list.splice(index, 1)
    // 更新 cover 和 photos
    if (list.length > 0) {
        user.value.cover = list[0]
        user.value.photos = list.slice(1)
    } else {
        user.value.cover = ''
        user.value.photos = []
    }
}
</script>

<style lang="scss" scoped>
.pfd {
    min-height: 100vh;
    background: #EDF0EC;
    padding-bottom: 240rpx;

    &__nav {
        position: sticky;
        top: 0;
        z-index: 10;
        background: #EDF0EC;
    }

    &__nav-bar {
        display: flex;
        align-items: center;
        padding: 0 $space-3;
        height: 88rpx;
    }

    &__nav-back {
        width: 64rpx;
        height: 88rpx;
        line-height: 88rpx;
        font-size: 48rpx;
        font-weight: 200;
        color: $color-ink;
        text-align: left;
    }

    &__nav-title {
        flex: 1;
        text-align: center;
        font-size: 28rpx;
        font-weight: 450;
        letter-spacing: 0.5rpx;
        color: $color-ink;
    }

    &__nav-action {
        width: 64rpx;
        height: 88rpx;
        line-height: 88rpx;
        text-align: right;
        font-size: 28rpx;
        color: $color-primary;
        font-weight: 500;
    }

    &__body {
        padding: $space-3;
        display: flex;
        flex-direction: column;
        gap: 16rpx;
    }

    &__section {
        display: flex;
        flex-direction: column;
        gap: 2rpx;
        background: #EDF0EC;
        border-radius: 24rpx;
        overflow: hidden;
    }

    &__bottom {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(180deg, rgba(237, 240, 236, 0), #EDF0EC 40%);
        padding-top: $space-5;
    }

    &__bottom-inner {
        display: flex;
        gap: $space-2;
        padding: 0 $space-3 calc(env(safe-area-inset-bottom) + #{$space-3});
    }

    &__btn {
        height: 100rpx;
        border-radius: 28rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12rpx;
        font-size: 26rpx;
        letter-spacing: 3rpx;
        font-weight: 500;
        transition: transform $dur-fast $ease-out-expo;

        &--press {
            transform: scale(0.97);
        }

        &--ghost {
            flex: 0 0 34%;
            background: #fff;
            color: $color-ink;
            box-shadow: 0 4rpx 20rpx rgba(143, 160, 142, 0.1);
        }

        &--solid {
            flex: 1;
            background: #3F4E3F;
            color: #fff;
            box-shadow: 0 12rpx 40rpx rgba(82, 98, 83, 0.32);
        }
    }

    &__btn-icon {
        font-size: 28rpx;
    }
}
</style>
