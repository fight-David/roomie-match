<script>
export default {
	onLaunch: function () {
		console.log('App Launch')
	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	}
}
</script>

<style lang="scss">
/* ---------- Reset ---------- */
page {
	background: #F7FAF8;
	color: #1C1E1C;
	font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', sans-serif;
	font-size: 28rpx;
	line-height: 1.6;
	letter-spacing: 0.2rpx;
}

.h-display {
	font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', sans-serif;
}

.h-body {
	font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', sans-serif;
}

view,
text,
image,
scroll-view,
button {
	box-sizing: border-box;
}

button::after {
	border: none;
}

/* ---------- Utility ---------- */
.h-card {
	background: #fff;
	border-radius: 48rpx;
	box-shadow: 0 2rpx 12rpx rgba(143, 160, 142, 0.06);
}

.h-pill {
	display: inline-flex;
	align-items: center;
	padding: 10rpx 24rpx;
	border-radius: 999rpx;
	background: #EEF2F0;
	color: #6B6F6A;
	font-size: 24rpx;
	line-height: 1;
}

.h-title-display {
	font-size: 72rpx;
	font-weight: 300;
	letter-spacing: -1rpx;
	color: #1C1E1C;
}

.h-title-h1 {
	font-size: 56rpx;
	font-weight: 500;
	letter-spacing: -0.5rpx;
}

.h-muted {
	color: #6B6F6A;
}

.h-ghost {
	color: #A4A7A1;
}

/* ---------- Safe area ---------- */
.h-safe-top {
	padding-top: calc(env(safe-area-inset-top) + 24rpx);
}

.h-safe-bottom {
	padding-bottom: calc(env(safe-area-inset-bottom) + 24rpx);
}

/* ---------- Animations ---------- */
@keyframes h-fade-up {
	from {
		opacity: 0;
		transform: translateY(24rpx);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes h-breath {

	0%,
	100% {
		transform: scale(1);
		opacity: 1;
	}

	50% {
		transform: scale(1.03);
		opacity: .88;
	}
}
</style>
