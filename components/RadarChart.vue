<template>
	<view class="h-radar" :style="{ width: sizeRpx, height: sizeRpx }">
		<canvas class="h-radar__canvas" :canvas-id="cid" :id="cid" :style="{ width: sizeRpx, height: sizeRpx }" />
		<view class="h-radar__label" v-for="(a, i) in axes" :key="i" :style="{ left: a.lx + '%', top: a.ly + '%' }">
			<text>{{ a.label }}</text>
		</view>
	</view>
</template>

<script>
let seq = 0

export default {
	props: {
		size: { type: Number, default: 480 },
		values: { type: Array, default: () => [] },
		labels: { type: Array, default: () => [] },
		tone: { type: String, default: 'primary' },
		maxValue: { type: Number, default: 100 }
	},
	data() {
		return { cid: 'hradar_' + (++seq) }
	},
	computed: {
		sizeRpx() { return this.size + 'rpx' },
		axes() {
			const n = this.values.length
			return this.labels.map((l, i) => {
				const deg = (360 / n) * i - 90
				const rad = deg * Math.PI / 180
				return {
					label: l,
					lx: 50 + Math.cos(rad) * 50,
					ly: 50 + Math.sin(rad) * 50
				}
			})
		}
	},
	watch: {
		values: { handler: 'render', deep: true },
		labels: { handler: 'render', deep: true },
		size: 'render',
		tone: 'render'
	},
	mounted() {
		this.$nextTick(() => {
			setTimeout(() => this.render(), 30)
		})
	},
	methods: {
		render() {
			const ctx = uni.createCanvasContext(this.cid, this)
			if (!ctx) return

			const info = uni.getSystemInfoSync()
			const ww = info.windowWidth || 375
			const sizePx = this.size * ww / 750
			const cx = sizePx / 2, cy = sizePx / 2
			const radius = sizePx * 0.36
			const n = this.values.length

			const strokeColor = this.tone === 'primary' ? '#526253' : '#1C1E1C'
			const fillColor = this.tone === 'primary' ? 'rgba(82,98,83,0.18)' : 'rgba(28,30,28,0.15)'
			const gridColor = '#C4C8C0'

			// clear
			ctx.clearRect(0, 0, sizePx, sizePx)

				// Grid rings
				;[0.33, 0.66, 1].forEach(r => {
					ctx.beginPath()
					ctx.arc(cx, cy, radius * r, 0, 2 * Math.PI)
					ctx.setStrokeStyle(gridColor)
					ctx.setLineWidth(1)
					ctx.setGlobalAlpha(0.5)
					ctx.stroke()
				})

			// Axes
			ctx.setGlobalAlpha(0.6)
			for (let i = 0; i < n; i++) {
				const deg = (360 / n) * i - 90
				const rad = deg * Math.PI / 180
				ctx.beginPath()
				ctx.moveTo(cx, cy)
				ctx.lineTo(cx + Math.cos(rad) * radius, cy + Math.sin(rad) * radius)
				ctx.setStrokeStyle(gridColor)
				ctx.setLineWidth(0.8)
				ctx.stroke()
			}
			ctx.setGlobalAlpha(1)

			// Polygon
			ctx.beginPath()
			this.values.forEach((v, i) => {
				const deg = (360 / n) * i - 90
				const rad = deg * Math.PI / 180
				const r = radius * (v / this.maxValue)
				const x = cx + Math.cos(rad) * r
				const y = cy + Math.sin(rad) * r
				if (i === 0) ctx.moveTo(x, y)
				else ctx.lineTo(x, y)
			})
			ctx.closePath()
			ctx.setFillStyle(fillColor)
			ctx.fill()
			ctx.setStrokeStyle(strokeColor)
			ctx.setLineWidth(1.6)
			ctx.setLineJoin('round')
			ctx.stroke()

			// Dots
			this.values.forEach((v, i) => {
				const deg = (360 / n) * i - 90
				const rad = deg * Math.PI / 180
				const r = radius * (v / this.maxValue)
				const x = cx + Math.cos(rad) * r
				const y = cy + Math.sin(rad) * r
				ctx.beginPath()
				ctx.arc(x, y, 2.6, 0, 2 * Math.PI)
				ctx.setFillStyle(strokeColor)
				ctx.fill()
			})

			ctx.draw()
		}
	}
}
</script>

<style lang="scss" scoped>
.h-radar {
	position: relative;
	display: inline-block;

	&__canvas {
		display: block;
	}

	&__label {
		position: absolute;
		transform: translate(-50%, -50%);
		font-size: $font-xs;
		color: $color-ink-soft;
		white-space: nowrap;
		letter-spacing: 1rpx;
	}
}
</style>
