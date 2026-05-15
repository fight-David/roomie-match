<template>
  	<view class="dis">

      
      </view>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const updateProfile = () => {
  userStore.setProfile({
    gender: '男室友'
  })
}
</script>

<style lang="scss" scoped>
	/*每个页面公共css */
</style>
