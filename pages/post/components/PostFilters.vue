<template>
    <view class="pf">
        <!-- 搜索 -->
        <view class="pf__search">
            <text class="pf__search-icon">⌕</text>
            <input class="pf__search-input" v-model="keyword" placeholder="你在找一个什么样的人？"
                placeholder-class="pf__search-ph" confirm-type="search" @input="onInput" @confirm="search" />
            <text v-if="keyword" class="pf__search-clear" @tap="clear">×</text>
        </view>

        <!-- 类型 + 标签 chips -->
        <scroll-view scroll-x class="pf__chips" show-scrollbar="false">
            <view class="pf__chips-inner">
                <view v-for="t in postTypes" :key="t.v" class="pf__chip pf__chip--type"
                    :class="{ 'is-on': type === t.v }" hover-class="pf__chip--press" :hover-stay-time="60"
                    @tap="pickType(t.v)">
                    <text>{{ t.label }}</text>
                </view>
            </view>
        </scroll-view>

        <!-- 类型 + 标签 chips -->
        <scroll-view scroll-x class="pf__chips" show-scrollbar="false">
            <view class="pf__chips-inner">
                <view v-for="s in sugs" :key="s" class="pf__chip" :class="{ 'is-on': activeTags.includes(s) }"
                    hover-class="pf__chip--press" :hover-stay-time="60" @tap="toggleTag(s)">
                    <text style="white-space:unset">{{ s }}</text>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['filter'])

const keyword = ref('')
const type = ref('all')
const activeTags = ref([])
let debounce = null

const postTypes = [
    { v: 'all', label: '全部' },
    { v: 'have_room', label: '有房招友' },
    { v: 'seek_room', label: '搭子找房' },
    { v: 'pure_match', label: '先认识人' }
]

const sugs = ['9号线', '10号线', '12号线', '静安', '张江', '养猫', '养花', '阳台', '晨型', '设计师', '程序员', '先认识']

const resultCount = ref(0)

const emitFilter = () => {
    emit('filter', {
        keyword: keyword.value,
        type: type.value,
        tags: activeTags.value
    })
}

const onInput = () => {
    clearTimeout(debounce)
    debounce = setTimeout(emitFilter, 260)
}

const search = () => emitFilter()
const clear = () => { keyword.value = ''; emitFilter() }

const pickType = (v) => { type.value = v; emitFilter() }

const toggleTag = (s) => {
    const idx = activeTags.value.indexOf(s)
    if (idx >= 0) activeTags.value.splice(idx, 1)
    else activeTags.value.push(s)
    try { uni.vibrateShort({ type: 'light' }) } catch (e) { }
    emitFilter()
}

const setResultCount = (n) => { resultCount.value = n }

defineExpose({ setResultCount })
</script>

<style lang="scss" scoped>
.pf {

    &__search {
        height: 92rpx;
        border-radius: 999rpx;
        background: #fff;
        box-shadow: $shadow-ambient-sm;
        display: flex;
        align-items: center;
        padding: 0 $space-3;
        margin-bottom: $space-3;
    }

    &__search-icon {
        font-size: 36rpx;
        color: $color-ink-soft;
        margin-right: $space-2;
    }

    &__search-input {
        flex: 1;
        font-size: 26rpx;
        color: $color-ink;
    }

    &__search-ph {
        color: $color-ink-ghost;
        letter-spacing: 0.5rpx;
    }

    &__search-clear {
        color: $color-ink-ghost;
        font-size: 40rpx;
        padding: 0 12rpx;
    }

    &__chips {
        white-space: nowrap;
        margin-bottom: $space-2;
    }

    &__chips-inner {
        display: inline-flex;
        gap: 12rpx;
        padding-right: $space-4;
        align-items: center;
    }

    &__chip-sep {
        width: 2rpx;
        height: 36rpx;
        background: rgba(28, 30, 28, 0.1);
        margin: 0 8rpx;
    }

    &__chip {
        padding: 14rpx 28rpx;
        border-radius: 999rpx;
        background: #fff;
        color: $color-ink-soft;
        font-size: 24rpx;
        letter-spacing: 0.5rpx;
        border: 1.5rpx solid transparent;
        transition: all $dur-fast $ease-out-expo;

        &--press {
            opacity: .6;
        }

        &.is-on {
            background: $color-ink;
            color: #fff;
            border-color: $color-ink;
        }
    }

    &__chip--type.is-on {
        background: #526253;
        border-color: #526253;
    }

    &__hint {
        font-size: 22rpx;
        color: $color-ink-ghost;
        letter-spacing: 1rpx;
    }
}
</style>
