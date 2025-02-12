<template>
	<view>
		<navbar :isHome = "true"/>
		<view style="margin-top: 130rpx;width: 100%;">
			<view class="weui-cell" style="background:#fff9eb;">
				<view class="weui-cell-hd">
					<image src="/static/ic_myapp.png" style="display:block;width:40rpx;height:40rpx;margin-right:14rpx;"></image>
				</view>
				<view class="weui-cell-bd">
					<text style="color:#be9719;font-size:26rpx;">点击右上角"添加到我的小程序"，方便下次找到！</text>
				</view>
				<view class="weui-cell-ft">
					<image src="/static/modal_closer.png" style="display:block;width:15px;height:15px;"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive, computed} from "vue"
	import { onLoad } from "@dcloudio/uni-app"
	const data = ref("动态数组")
	const changeData = (val) => {
		data.value = val
	}
	const app = getApp()
	onLoad(() => {
		app.globalData.utils.getUserInfo();
		
	})
</script>

<style>
	page {
		background-color: white;
	}
</style>
