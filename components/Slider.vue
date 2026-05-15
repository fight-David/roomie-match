<template>
	<view class="h-slider">
		<view class="h-slider__head">
			<text class="h-slider__label">{{ label }}</text>
			<text class="h-slider__value">{{ modelValue }}</text>
		</view>
		<view class="h-slider__track"
			@touchstart="onTouch"
			@touchmove.stop.prevent="onTouch">
			<view class="h-slider__fill" :style="{ width: modelValue + '%' }"></view>
			<view class="h-slider__thumb" :style="{ left: modelValue + '%' }"></view>
			<view class="h-slider__ticks">
				<view class="h-slider__tick" v-for="i in 9" :key="i"></view>
			</view>
		</view>
		<view class="h-slider__hint">
			<text>{{ hint }}</text>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		modelValue: { type: Number, default: 50 },
		label:      { type: String, default: '' },
		hint:       { type: String, default: '' }
	},
	emits: ['update:modelValue', 'change'],
	methods: {
		async measure() {
			return new Promise(resolve => {
				const q = uni.createSelectorQuery().in(this)
				q.select('.h-slider__track').boundingClientRect(r => {
					resolve(r)
				}).exec()
			})
		},
		async onTouch(e) {
			const r = await this.measure()
			if (!r) return
			const t = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]) || {}
			const pageX = t.pageX ?? t.clientX ?? t.x ?? 0
			const x = pageX - r.left
			let v = Math.round((x / r.width) * 100)
			v = Math.max(0, Math.min(100, v))
			this.$emit('update:modelValue', v)
			this.$emit('change', v)
		}
	}
}
</script>

<style lang="scss" scoped>
.h-slider {
	padding: $space-3 0;

	&__head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: $space-3;
	}

	&__label {
		font-size: $font-h3;
		font-weight: 400;
		letter-spacing: -0.5rpx;
		color: $color-ink;
	}

	&__value {
		font-size: $font-h2;
		font-weight: 200;
		color: $color-primary;
		letter-spacing: -1rpx;
		font-variant-numeric: tabular-nums;
	}

	&__track {
		position: relative;
		height: 80rpx;
		display: flex;
		align-items: center;
	}

	&__fill {
		position: absolute;
		left: 0; top: 50%;
		height: 4rpx;
		background: $color-primary;
		transform: translateY(-50%);
		transition: width .08s linear;
		border-radius: 2rpx;
	}

	&__ticks {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		pointer-events: none;
	}

	&__tick {
		width: 1rpx;
		height: 12rpx;
		background: rgba(28, 30, 28, .12);
	}

	&__thumb {
		position: absolute;
		top: 50%;
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		background: #fff;
		border: 2rpx solid $color-primary;
		box-shadow: $shadow-ambient-md;
		transform: translate(-50%, -50%);
		transition: transform .12s $ease-out-expo;
	}

	&__hint {
		margin-top: $space-2;
		font-size: $font-sm;
		color: $color-ink-ghost;
		letter-spacing: 2rpx;
	}
}
</style>
    