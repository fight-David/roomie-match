<template>
	<view class="h-tabbar">
		<view class="h-tabbar__inner">
			<view
				v-for="(t, i) in items"
				:key="t.path"
				class="h-tabbar__item"
				:class="{ 'is-active': current === t.path }"
				@tap="go(t)">
				<text class="h-tabbar__label">{{ t.label }}</text>
				<view class="h-tabbar__dot" v-if="current === t.path"></view>
			</view>
		</view>
		<view class="h-tabbar__safe"></view>
	</view>
</template>

<script>
export default {
	props: {
		current: { type: String, default: 'discovery' }
	},
	data() {
		return {
			items: [
				{ path: 'discovery', label: 'Discover', url: '/pages/discovery/discovery' },
				{ path: 'projects',  label: 'Projects', url: '/pages/projects/projects'   },
				{ path: 'matches',   label: 'Matches',  url: '/pages/matches/matches'     },
				{ path: 'me',        label: 'Me',       url: '/pages/me/me'               }
			]
		}
	},
	methods: {
		go(t) {
			if (t.path === this.current) return
			uni.redirectTo({
				url: t.url,
				fail: () => uni.reLaunch({ url: t.url })
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.h-tabbar {
	position: fixed;
	left: 0; right: 0; bottom: 0;
	background: rgba(255, 255, 255, 0.88);
	backdrop-filter: blur(32rpx);
	-webkit-backdrop-filter: blur(32rpx);
	border-top: 1rpx solid rgba(28, 30, 28, 0.06);
	z-index: 100;

	&__inner {
		display: flex;
		height: 96rpx;
		padding: 0 $space-4;
	}

	&__item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		transition: all $dur-base $ease-out-expo;
	}

	&__label {
		font-size: $font-sm;
		color: $color-ink-ghost;
		letter-spacing: 2rpx;
		transition: color $dur-base $ease-out-expo;
	}

	&__dot {
		position: absolute;
		bottom: 12rpx;
		width: 8rpx;
		height: 8rpx;
		border-radius: 50%;
		background: $color-primary;
	}

	&__item.is-active .h-tabbar__label {
		color: $color-ink;
		font-weight: 500;
	}

	&__safe {
		height: env(safe-area-inset-bottom);
	}
}
</style>
