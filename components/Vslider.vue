




























































































<template>
	<view class="h-vslider">
		<view class="h-vslider__wrap">
			<!-- 左侧文字标注 -->
			<view class="h-vslider__sides">
				<text v-if="topText" class="h-vslider__end h-vslider__end--top">{{ topText }}</text>
				<text v-if="bottomText" class="h-vslider__end h-vslider__end--bottom">{{ bottomText }}</text>
			</view>
			<!-- 轨道 -->
			<view class="h-vslider__track"
				@touchstart="onTouch"
				@touchmove.stop.prevent="onTouch">
				<view class="h-vslider__fill" :style="{ height: pct + '%' }"></view>
				<view class="h-vslider__thumb"
					:style="{ bottom: pct + '%' }">
					<text class="h-vslider__thumb-val">{{ modelValue }}</text>
				</view>
			</view>
			<!-- 刻度点 -->
			<view v-if="ticks.length" class="h-vslider__ticks">
				<view
					v-for="(t, i) in ticks"
					:key="i"
					class="h-vslider__tick"
					:style="{ bottom: (i / (ticks.length - 1)) * 100 + '%' }"
				>
					<view class="h-vslider__tick-dot"
						:class="{ 'is-active': modelValue === min + i * step }"></view>
				</view>
			</view>
		</view>
		<text class="h-vslider__label">{{ label }}{{ suffix ? modelValue + suffix : '' }}</text>
	</view>
</template>

<script>
export default {
	props: {
		modelValue: { type: Number, default: 50 },
		min:        { type: Number, default: 0 },
		max:        { type: Number, default: 100 },
		step:       { type: Number, default: 1 },
		label:      { type: String, default: '' },
		suffix:     { type: String, default: '' },
		ticks:      { type: Array, default: () => [] },
		topText:    { type: String, default: '' },
		bottomText: { type: String, default: '' }
	},
	emits: ['update:modelValue', 'change'],
	computed: {
		pct() {
			return ((this.modelValue - this.min) / (this.max - this.min)) * 100
		}
	},
	methods: {
		async measure() {
			return new Promise(resolve => {
				uni.createSelectorQuery().in(this)
					.select('.h-vslider__track')
					.boundingClientRect(r => resolve(r))
					.exec()
			})
		},
		async onTouch(e) {
			const r = await this.measure()
			if (!r) return
			const t = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]) || {}
			const clientY = (typeof t.clientY === 'number') ? t.clientY
			              : (typeof t.y === 'number')       ? t.y
			              : (typeof t.pageY === 'number')   ? t.pageY
			              : 0
			const y = clientY - r.top
			let raw = (1 - y / r.height) * (this.max - this.min) + this.min
			let v = Math.round(raw / this.step) * this.step
			v = Math.max(this.min, Math.min(this.max, v))
			this.$emit('update:modelValue', v)
			this.$emit('change', v)
		}
	}
}
</script>

<style lang="scss" scoped>
.h-vslider {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 32rpx;
	padding: 40rpx 0;

	&__wrap {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 16rpx;
	}

	/* ---- 左侧两端标注 ---- */
	&__sides {
		position: relative;
		width: 0;
		height: 280rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}

	&__end {
		font-size: 16rpx;
		font-weight: 350;
		color: $color-ink-ghost;
		letter-spacing: 1rpx;
		white-space: nowrap;
		line-height: 1;
		pointer-events: none;
	}

	/* ---- 轨道 ---- */
	&__track {
		position: relative;
		width: 84rpx;
		height: 280rpx;
		border-radius: 999rpx;
		background: #E8EDE9;
	}

	&__fill {
		position: absolute;
		left: 0; right: 0; bottom: 0;
		background: $color-primary;
		border-radius: 999rpx;
		transition: height .08s linear;
	}

	&__thumb {
		position: absolute;
		left: 50%;
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
		background: #fff;
		box-shadow: 0 8rpx 24rpx rgba(82, 98, 83, 0.22);
		transform: translate(-50%, 50%);
		transition: bottom .08s linear;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__thumb-val {
		font-size: 28rpx;
		font-weight: 500;
		color: $color-ink;
	}

	/* ---- 刻度 ---- */
	&__ticks {
		position: absolute;
		left: 50%;
		top: 0;
		bottom: 0;
		width: 0;
		pointer-events: none;
	}

	&__tick {
		position: absolute;
		left: 50%;
		transform: translate(-50%, 50%);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__tick-dot {
		width: 12rpx;
		height: 12rpx;
		border-radius: 50%;
		background: rgba(143, 160, 142, 0.25);
		transition: all 200ms ease;

		&.is-active {
			background: $color-primary;
			width: 16rpx;
			height: 16rpx;
		}
	}

	&__label {
		font-size: 22rpx;
		letter-spacing: 3rpx;
		color: $color-ink-soft;
		text-transform: uppercase;
	}
}
</style>