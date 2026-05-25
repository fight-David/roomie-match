<template>
    <view class="pc" @tap="openDetail">

        <!-- ── 头部：类型 + 删除 ── -->
        <view class="pc__head">
            <view class="pc__type" :style="{ background: typeBg, color: typeColor }">
                <text class="pc__type-dot"></text>
                <text>{{ typeLabel }}</text>
            </view>
            <view class="pc__head-right">
                <text v-if="harmonyScore" class="pc__harmony">{{ harmonyScore }}%</text>
                <text v-if="editable" class="pc__del" @tap.stop="remove">✕</text>
            </view>
        </view>

        <!-- ── 主体 ── -->
        <view class="pc__body">
            <text class="pc__loc" v-if="j.location">{{ j.location }}</text>
            <text class="pc__title h-display">{{ j.title }}</text>
            <text class="pc__content">{{ j.content }}</text>

            <view class="pc__tags" v-if="j.tags?.length">
                <text class="pc__tag" v-for="t in j.tags" :key="t">{{ t }}</text>
            </view>

            <view v-if="j.budget" class="pc__foot">
                <text>¥ {{ j.budget }} / 月 · {{ j.moveIn || '时间待定' }}</text>
            </view>
        </view>
    </view>
</template>

<script setup>
import { computed } from 'vue'
import { POST_TYPES, PEOPLE } from '@/sources/mock.js'
import { useUserStore } from '@/stores/user'

const props = defineProps({
    j: { type: Object, required: true },
    editable: { type: Boolean, default: false }
})

const emit = defineEmits(['open', 'remove'])
const userStore = useUserStore()

const typeLabel = computed(() => POST_TYPES[props.j.postType]?.label || '帖子')
const typeColor = computed(() => POST_TYPES[props.j.postType]?.color || '#6B6F6A')
const typeBg = computed(() => typeColor.value + '1A')

const harmonyScore = computed(() => {
    const me = userStore.profile
    const author = PEOPLE.find(p => p.id === props.j.authorId)
    if (!me?.dims || !author?.dims) return null
    const dims = ['noise', 'schedule', 'tidy', 'social', 'finance', 'pets_vibe']
    let score = 100
    dims.forEach(k => {
        score -= Math.abs((me.dims[k] || 3) - (author.dims[k] || 3)) * 3
    })
    ;(me.limits || []).forEach(t => {
        if ((author.loves || []).includes(t)) score -= 15
    })
    return Math.max(40, Math.min(99, Math.round(score)))
})

const openDetail = () => emit('open', props.j)
const remove = () => emit('remove', props.j)
</script>

<style lang="scss" scoped>
.pc {
    background: #fff;
    border-radius: 32rpx;
    padding: $space-3;
    margin-bottom: $space-3;
    box-shadow: 0 4rpx 20rpx rgba(143, 160, 142, 0.08);
    animation: h-fade-up .5s $ease-out-expo both;

    &__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: $space-2;
    }

    &__head-right {
        display: flex;
        align-items: center;
        gap: 16rpx;
    }

    &__type {
        display: inline-flex;
        align-items: center;
        gap: 8rpx;
        padding: 6rpx 20rpx;
        border-radius: 999rpx;
        font-size: 20rpx;
        letter-spacing: 1rpx;
    }

    &__type-dot {
        width: 6rpx;
        height: 6rpx;
        border-radius: 50%;
        background: currentColor;
    }

    &__harmony {
        color: #526253;
        font-weight: 500;
        font-size: 24rpx;
    }

    &__del {
        font-size: 28rpx;
        color: $color-ink-ghost;
        font-weight: 200;
        padding: 8rpx;
    }

    &__body {
        padding: 0 $space-1;
    }

    &__loc {
        display: block;
        font-size: 22rpx;
        color: $color-ink-ghost;
        letter-spacing: .5rpx;
        margin-bottom: 8rpx;
    }

    &__title {
        display: block;
        font-size: 30rpx;
        font-weight: 600;
        line-height: 1.4;
        color: $color-ink;
        margin-bottom: 12rpx;
    }

    &__content {
        display: block;
        font-size: 24rpx;
        color: $color-ink-soft;
        line-height: 1.6;
        letter-spacing: 0.3rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    &__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10rpx;
        margin-top: $space-2;
    }

    &__tag {
        font-size: 20rpx;
        color: $color-ink-soft;
        background: $color-whisper;
        padding: 4rpx 14rpx;
        border-radius: 999rpx;
    }

    &__foot {
        margin-top: $space-2;
        font-size: 22rpx;
        color: $color-ink-ghost;
        letter-spacing: 0.5rpx;
    }
}
</style>
