<template>
    <view class="h-ring" :style="{ width: size + 'rpx', height: size + 'rpx' }">
        <image class="h-ring__svg" :src="svg" mode="widthFix" />
        <view class="h-ring__center">
            <text class="h-ring__num" :style="{ fontSize: numSize + 'rpx', color: txtColor }">{{ value }}</text>
            <text class="h-ring__pct" :style="{ fontSize: pctSize + 'rpx', color: txtColor }">%</text>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        value: { type: Number, default: 0 },
        size: { type: Number, default: 120 },
        stroke: { type: Number, default: 3 },
        tone: { type: String, default: 'ink' }
    },
    computed: {
        color() {
            if (this.tone === 'primary') return '#526253'
            if (this.tone === 'ghost') return 'rgba(255,255,255,0.92)'
            return '#1C1E1C'
        },
        trackColor() {
            if (this.tone === 'ghost') return 'rgba(255,255,255,0.22)'
            return 'rgba(28,30,28,0.10)'
        },
        txtColor() {
            if (this.tone === 'ghost') return '#ffffff'
            if (this.tone === 'primary') return '#526253'
            return '#1C1E1C'
        },
        svg() {
            const r = 50 - this.stroke
            const c = 2 * Math.PI * r
            const offset = c * (1 - this.value / 100)
            const w = this.stroke
            const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
				<circle cx='50' cy='50' r='${r}' fill='none' stroke='${this.trackColor}' stroke-width='${w}'/>
				<circle cx='50' cy='50' r='${r}' fill='none' stroke='${this.color}' stroke-width='${w}'
					stroke-dasharray='${c.toFixed(2)}' stroke-dashoffset='${offset.toFixed(2)}'
					stroke-linecap='round' transform='rotate(-90 50 50)'/>
			</svg>`
            return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
        },
        numSize() { return Math.round(this.size * 0.32) },
        pctSize() { return Math.round(this.size * 0.16) }
    }
}
</script>

<style lang="scss" scoped>
.h-ring {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &__svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
    }

    &__center {
        position: relative;
        display: flex;
        align-items: baseline;
        line-height: 1;
    }

    &__num {
        font-weight: 300;
        letter-spacing: -1rpx;
    }

    &__pct {
        margin-left: 2rpx;
        opacity: .6;
        font-weight: 300;
    }
}
</style>
