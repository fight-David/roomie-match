<template>
    <view class="pa">

        <!-- 氛围光晕 -->
        <view class="pa__ambient">
            <view class="pa__orb pa__orb--1"></view>
            <view class="pa__orb pa__orb--2"></view>
        </view>

        <scroll-view scroll-y class="pa__scroll">
            <view class="pa__body h-safe-top">

                <text class="pa__eyebrow">你的室友人格</text>

                <view class="pa__title-wrap">
                    <text class="pa__title h-display">「{{ personaTitle }}」</text>
                </view>

                <PersonaBars :dims="profile.dims" :animating="animating" />

                <view class="pa__rule"></view>

                <PersonaSimilar :people="similarPeople" @open="goProfile" />

            </view>
        </scroll-view>

        <!-- 底部 CTA -->
        <view class="pa__foot h-safe-bottom">
            <view class="pa__cta" hover-class="pa__cta--press" :hover-stay-time="80" @tap="enter">
                <text class="pa__cta-label">开始探索</text>
                <text class="pa__cta-arrow">→</text>
            </view>
        </view>

    </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { fetchPeople } from '@/api/db.js'
import { calcHarmony } from '@/utils/match.js'
import { buildPersonaTitle } from '@/utils/persona.js'
import PersonaBars from './components/PersonaBars.vue'
import PersonaSimilar from './components/PersonaSimilar.vue'

const userStore = useUserStore()
const animating = ref(false)
const allPeople = ref([])

const profile = computed(() => userStore.profile || {})

const personaTitle = computed(() => buildPersonaTitle(profile.value))

const similarPeople = computed(() => {
    const me = profile.value
    if (!me?.dims || !allPeople.value.length) return []

    const myId = userStore.uid || me.id

    return allPeople.value
        .filter(u => {
            const uid = u.wx_uid || u.id || u._id
            return uid !== myId
        })
        .map(u => {
            try {
                return { ...u, _harmony: calcHarmony(me, u).score }
            } catch {
                return { ...u, _harmony: 0 }
            }
        })
        .sort((a, b) => b._harmony - a._harmony)
        .slice(0, 3)
})

onMounted(async () => {
    setTimeout(() => { animating.value = true }, 300)
    try {
        const data = await fetchPeople()
        allPeople.value = data || []
    } catch {
        allPeople.value = []
    }
})

const goProfile = (p) => {
    const id = p.wx_uid || p.id || p._id
    if (!id) return
    uni.navigateTo({ url: `/pages/profile-detail/index?id=${id}` })
}

const enter = () => {
    uni.reLaunch({ url: '/pages/home/index' })
}
</script>

<style lang="scss" scoped>
.pa {
    min-height: 100vh;
    background: $color-paper;
    position: relative;
    overflow: hidden;

    &__ambient {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 0;
    }

    &__orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(80rpx);
        opacity: .25;

        &--1 {
            width: 700rpx;
            height: 700rpx;
            background: $color-primary-ghost;
            top: -200rpx;
            right: -200rpx;
        }

        &--2 {
            width: 500rpx;
            height: 500rpx;
            background: $color-primary-soft;
            bottom: 20%;
            left: -150rpx;
        }
    }

    &__scroll {
        position: relative;
        z-index: 1;
        height: 100vh;
    }

    &__body {
        padding: $space-7 $space-5 200rpx;
    }

    &__eyebrow {
        display: block;
        font-size: 22rpx;
        color: $color-ink-ghost;
        letter-spacing: 4rpx;
        margin-bottom: $space-2;
    }

    &__title-wrap {
        margin-bottom: $space-6;
    }

    &__title {
        font-size: 52rpx;
        font-weight: 300;
        letter-spacing: -1rpx;
        color: $color-ink;
        line-height: 1.2;
    }

    &__rule {
        height: 1rpx;
        background: rgba(28, 30, 28, .07);
        margin: $space-5 0;
    }

    &__foot {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        padding: $space-3 $space-5 calc(env(safe-area-inset-bottom) + #{$space-3});
        background: linear-gradient(180deg, rgba(237, 240, 236, 0), $color-paper 40%);
        z-index: 10;
    }

    &__cta {
        width: 100%;
        height: 112rpx;
        border-radius: $radius-pill;
        background: $color-ink;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16rpx;
        box-shadow: 0 16rpx 48rpx rgba(28, 30, 28, .16);
        transition: transform .12s;

        &--press { transform: scale(0.985); }
    }

    &__cta-label {
        font-size: $font-body;
        font-weight: 500;
        color: #fff;
        letter-spacing: 4rpx;
    }

    &__cta-arrow {
        font-size: 32rpx;
        color: rgba(255, 255, 255, .6);
        font-weight: 200;
    }
}
</style>
