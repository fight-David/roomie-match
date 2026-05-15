<template>
	<view
		class="h-tag"
		:class="[
			'h-tag--' + tone,
			{ 'is-active': active, 'is-large': large }
		]"
		hover-class="h-tag--press"
		:hover-stay-time="80"
		@click.stop="onTap">
		<view class="h-tag__dot" v-if="tone !== 'plain'"></view>
		<text class="h-tag__text"><slot /></text>
	</view>
</template>

<script>
export default {
	props: {
		tone:   { type: String, default: 'plain' }, // plain / red / black
		active: { type: Boolean, default: false },
		large:  { type: Boolean, default: false }
	},
	emits: ['tap'],
	methods: {
		onTap() {
			this.$emit('tap')
		}
	}
}
</script>

<style lang="scss" scoped>
.h-tag {
	display: inline-flex;
	align-items: center;
	padding: 14rpx 28rpx;
	border-radius: $radius-pill;
	background: $color-whisper;
	color: $color-ink-soft;
	font-size: $font-sm;
	margin: 8rpx;
	letter-spacing: 0;
	transition: background-color $dur-fast $ease-out-expo,
	            color           $dur-fast $ease-out-expo;
	border: 1rpx solid transparent;
	line-height: 1;
	will-change: background-color, color;
	box-sizing: border-box;

	&--press { opacity: .7; }

	&__dot {
		width: 10rpx;
		height: 10rpx;
		border-radius: 50%;
		margin-right: 12rpx;
		background: currentColor;
		opacity: .6;
	}

	&__text {
		line-height: 1;
	}

	&.is-large {
		padding: 18rpx 36rpx;
		font-size: $font-body;
	}

	&--red {
		background: $color-red-list-bg;
		color: $color-red-list;
	}
	&--black {
		background: $color-black-list-bg;
		color: $color-black-list;
	}

	&.is-active {
		background: $color-primary !important;
		color: #fff !important;
	}
}
</style>
