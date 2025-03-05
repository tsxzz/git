<template>
	<view>
		<view class="od-banner">
			<image
				class="od-banner-icon"
				src="/static/od_bg_icon.png"
				mode="widthFix"
			/>
			<view class="od-jd od-jd-0">
				<view class="od-jd-out">
					<view class="od-jd-in"></view>
				</view>
				<view class="vp-flex od-jd-text">
                <view class="vp-flex_1">
                    <text class="od-jd-st-0">填写订单</text>
                </view>
                <view class="vp-flex_1">
                    <text class="od-jd-st-10">在线支付</text>
                </view>
                <view class="vp-flex_1">
                    <text class="od-jd-st-20">专人服务</text>
                </view>
                <view class="vp-flex_1">
                    <text class="od-jd-st-30">服务完成</text>
                </view>
            </view>
			</view>
		</view>
		<view class="pub-box">
			<view class="pub-box-bd">
				<view class="weui-cell weui-cell_input">
					<view class="weui-cell__hd">
						<image class="serv-icon" :src="service.icon_image ? service.icon_image_url : '../../static/avatar.jpg'"></image>
					</view>
					<view class="weui-cell__bd">
						<text class="serv-name">{{ service.name }}</text>
					</view>
					<view class="weui-cell__ft">
						<view class="f5 ic_info" @click="handleTap">服务内容</view>
					</view>
				</view>
			</view>
		</view>
		<block v-if="service.stype == 10 || service.stype == 15 || service.stype == 20">
			<view class="pub-box">
				<view class="pub-box-bd">
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">
							<view class="weui-label">就诊医院</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<picker @change="onHospitalChange" :value="hospital_index" :range="hospitals"
									range-key="name">
									<input type="text" :disabled="true" placeholder="请选择要就诊的医院"
										:value="hospitals[hospital_index].name" placeholder-class="vp-placeholder" />
								</picker>
							</view>
						</view>
					</view>
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">
							<view class="weui-label">就诊时间</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<dtPicker @dtPickerChanged="onStartTimeChanged" :timestamp="order.starttime"
									placeholder="请选择就诊时间"></dtPicker>
							</view>
						</view>
					</view>
					<view class="weui-cell weui-cell_input" @click="onClientChange">
						<view class="weui-cell__hd"> 
							<view class="weui-label">就诊人</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<input type="text" 
								class="weui-input" 
								placeholder-class="vp-placeholder" 
								style="text-align: right;" 
								:disabled="true" 
								placeholder="请选择就诊人"
								:value="client.name">
							</view>
						</view>
					</view>
					<block v-if="service.stype == 15">
                    <!-- 接送陪诊 -->
                    <view class="weui-cell weui-cell_input">
                        <view class="weui-cell__hd">接送地址</view>
                        <view class="weui-cell__bd">
                            <input class="weui-input" name="receiveAddress" style="text-align: right"
                                placeholder-class="vp-placeholder" placeholder="请填写就诊人所在地址" v-model="order.receiveAddress" />
                        </view>
                    </view>
                </block>

                <view class="weui-cell weui-cell_input">
                    <view class="weui-cell__hd">联系电话</view>
                    <view class="weui-cell__bd">
                        <input class="weui-input" type="number" name="tel" style="text-align: right"
                            placeholder-class="vp-placeholder" placeholder="请填写您的联系电话" v-model="order.tel" />
                    </view>
                </view>
				</view>
			</view>
		</block>
		<block v-if="service.stype == 30 || service.stype == 40">
			<!-- 送取结果,代跑取药 -->
			<view class="pub-box">
				<view class="pub-box-bd">
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">
							<view class="weui-label">所在医院</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<picker @change="onHospitalChange" :value="hospital_index" :range="hospitals"
									range-key="name">
									<input type="text" :disabled="true" placeholder="请选择就诊所在医院"
										:value="hospitals[hospital_index].name" placeholder-class="vp-placeholder" />
								</picker>
							</view>
						</view>
					</view>

					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">
							<view class="weui-label">服务时间</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<dtPicker @dtPickerChanged="onStartTimeChanged" :timestamp="order.starttime"
									placeholder="请选择期望服务时间"></dtPicker>
							</view>
						</view>
					</view>

					<view class="weui-cell weui-cell_input" @click="onAddressChange">
						<view class="weui-cell__hd">
							<view class="weui-label">收件信息</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<input class="weui-input" :disabled="true" style="text-align: right"
								placeholder-class="vp-placeholder" placeholder="请选择收件信息" :value="
																order.address.userName
																	? order.address.userName + '(' + order.address.cityName + order.address.countyName + order.address.detailInfo + ')'
																	: ''
															" />
							<!-- {{order.address?(order.address.userName+'('+order.address.telNumber+')'):''}} -->
						</view>
					</view>
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">联系电话</view>
						<view class="weui-cell__bd">
							<input class="weui-input" type="number" name="tel" style="text-align: right"
								placeholder-class="vp-placeholder" placeholder="请填写您的联系电话" v-model="order.tel" />
						</view>
					</view>
				</view>
			</view>
		</block>
		<view class="pub-box">
            <view class="pub-box-tt">服务需求</view>
            <view class="pub-box-bd">
                <view class="weui-cell weui-cell_input">
                    <view class="weui-cell__bd">
                        <textarea name="demand" auto-height placeholder="请简单描述您要就诊的科室.."
                            placeholder-class="vp-placeholder" style="min-height: 150rpx" v-model="order.demand" />
                    </view>
                </view>
            </view>
        </view>
		<view style="height: 300rpx"></view>
		<!-- 悬浮提交按钮 -->
		<view class="vp-foot">
			<view style="background: #ffffff; padding: 20rpx">
				<view class="xieyi" style="text-align: center">
					<text :class="'is_xieyi ' + (is_xieyi ? 'is_xieyi_on' : '')" @click="onXieyiChange">我已阅读并同意</text>
					<navigator :url="cfg.page_xy">《用户协议》</navigator>
					<text>和</text>
					<navigator :url="cfg.page_fw">《服务协议》</navigator>
				</view>
				<view>
					<button :class="'btnp ' + (is_xieyi ? '' : 'btnp-disabled')" @click="submit">
						确认下单
						<block v-if="order.price > 0">（支付{{ order.price }}元）</block>
					</button>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center" :is-mask-click="false" background-color="#fff">
			<view class="popup-content">
				<view class="group">
					<input class="uni-input" type="tel" v-model="validMobile.phone" placeholder="手机号" />
				</view>
				<view class="group">
					<input class="uni-input" v-model="validMobile.validCode" placeholder="验证码" />
					<text class="valid-text" @click="countdownChange">{{countdown.validText}}</text>
				</view>
			</view>
			<view class="btns">
				<view class="cancal" @click="cancal">取消</view>
				<view class="ok" @click="ok">确定</view>
			</view>
    	</uni-popup>
		<uni-popup ref="qrcodePopup" type="center" :is-mask-click="false" background-color="#fff">
			<view class="pay-box">
				<image
					@click="payment"
					src="../../static/modal_closer.png"
					mode="scaleToFill"
					style="display:block;width:30rpx;height:30rpx"
				></image>
				<view class="text-center">微信支付</view>
				<canvas id="qrcode" canvas-id="qrcode" style="width: 300rpx;height: 300rpx;"></canvas>
				<view class="text-center">请用本人扫描以上二维码</view>
			</view>
		</uni-popup>
	</view>
</template>
<script setup>
	import { ref, reactive, computed,toRaw} from "vue"
	import { onLoad } from "@dcloudio/uni-app"
	import UQRCode from '@uqrcode/js';
	//页面服务详情
	const service = ref([])
	// 医院数据源
	const hospitals = ref([])
	// 选中的医院
	const hospital_index = ref(0)
	//订单数据
	const order = ref({
		price: '',
		starttime: '',
		address: {
			userName: '',
			cityName: '',
			countyName: '',
			detailInfo: '',
		},
		receiveAddress: '',
		tel: '',
		demand: '',
	})

	const cfg = reactive({
		page_xy: '',
	})
	// 手机验证
	const validMobile = reactive({
		phone: '',
        validCode: '',
	})
	const countdown = reactive({
		validText: '获取验证码',
        time: 60,
        isCountdown: false,
	})
	const popup = ref() 
	// 陪诊人
	const client = reactive({
		name:''
	})

	// 是否同意协议
	const is_xieyi = ref(false)

	// 二维码
	const qrcodePopup = ref()
	// 表单的暴露
	let subOrder;
	const app = getApp()
	onLoad(option => {
		main_load(option,service,hospitals);
		console.log(service.value);
		console.log('option',option);
	})
	//获取页面数据
	const main_load = (option,service,hospitals) => {
		app.globalData.utils.getServicelist(option,service,hospitals)
		const hospitalData = toRaw(hospitals.value)
                if(option.hid > 0){
                    //自动选中
                    for(let i = 0; i < hospitalData.length; i++){
						if(hospitalData[i].id == option.hid)
						hospital_index.value = i;
						order.value.price = hospitalData[i].service_price
						break;
                }
	}
	}
	//弹框
	const handleTap = () => {
        uni.showModal({
            title: '提示',
            content: '服务内容：' + service.name,
            showCancel: false
        });
    }
	//医院picker 选择
	const onHospitalChange = (e) => {
		const value = parseInt(e.detail.value)
		hospital_index.value = value
		order.value.price = toRaw(hospitals.value)[value].service_price
	}
	// 修改日期的回调
	const onStartTimeChanged = (e) => {
        order.value.starttime = e.detail.value
    }
	// 选择就诊人
	const onClientChange = () =>{
		uni.navigateTo({
		  url: '../clients/index?act=select'
		})
	}
	// 创建监听事件
	uni.$on('clientChange', (data) => {
		console.log(data);
		client.name = data.name;
		client.age = data.age;
		client.id = data.user_id;
		client.sex = data.sex;
		client.mobile = data.mobile;
	})
	// 选择事件
	const onXieyiChange = () => {
		is_xieyi.value = !is_xieyi.value
	}
	// 选择收件地址事件
	const onAddressChange = () => {
		console.log('收货地址事件');
		uni.chooseAddress({
			success: res => {
				// 确保 order.address 不为 undefined
				if (!order.value.address) {
					order.value.address = {			
						userName: '',
						cityName: '',
						countyName: '',
						detailInfo: ''} // 初始化为空对象
				}
				order.value.address.userName = res.userName;
				order.value.address.cityName = res.cityName;
				order.value.address.countyName = res.countyName;
				order.value.address.detailInfo = res.detailInfo;	
			},
			fail: res => {
				console.log(res,'err');
			}
		})
	}
	// 确认下单
	const submit = () => {
		console.log(order.value.starttime);
		if(!is_xieyi.value){
			return uni.showToast({
				title: '请先阅读并用户协议和服务协议',
				duration: 1000
			})
		}
		const orderData = toRaw(order.value)
		console.log(orderData);
		
		const serviceData = toRaw(service.value)
		const hospitalData = toRaw(hospitals.value)
		const clientData = toRaw(client)

		orderData.service_code = serviceData.code
		orderData.service_name = serviceData.name
		orderData.service_id = serviceData.id
		orderData.service_stype = serviceData.stype


		// 医院的校验
		if(serviceData.stype < 100){
			if(hospital_index.value == 0){
				return uni.showToast({
                    title: '请选择医院',
                    icon: 'none',
                    duration: 1000
                })
			}
			orderData.hospital_id = hospitalData[hospital_index.value].id
			orderData.hospital_name = hospitalData[hospital_index.value].name
		}

		// 服务时间的校验
		if(!order.value.starttime){
			return uni.showToast({
				title: '请选择时间',
				icon: 'none',
				duration: 1000
			})
		}

		// 页面不同的校验
		if(serviceData.stype == 10 || serviceData.stype == 15 || serviceData.stype == 20){
			// 就诊人
			if(!clientData.id){
				return uni.showToast({
				title: '请选择就诊人',
				icon: 'none',
				duration: 1000
			})
			}
			orderData.client = {}
			orderData.client.name = clientData.name
			orderData.client.age = clientData.age
			orderData.client.mobile = clientData.mobile
			orderData.client.sex = clientData.sex
			
			// 接送地址
			if(serviceData.stype == 15){
				if(!orderData.receiveAddress){
					return uni.showToast({
						title: '请填写就诊人所在地址',
						icon: 'none',
						duration: 1000
					})
				}
			}
		}
		if(serviceData.stype == 30 || serviceData.stype == 40){
			// 收件地址
			if(!orderData.address.userName){
				return uni.showToast({
                    title: '请填写收件人信息',
                    icon: 'none',
                    duration: 1000
                })
			}
		}
		if(!orderData.tel){
			return uni.showToast({
                title: '请填写您的联系方式',
                icon: 'none',
                duration: 1000
            })
		}
		subOrder = orderData;
		console.log(orderData, '订单数据');
		// 判断用户是否存在
		if(!uni.getStorageSync('token')){
			popup.value.open('center')
		}else{
			// 下单操作
			creatOrder(subOrder);
		}
	}
	// 验证码弹框取消
	const cancal = () => {
		// 关闭弹窗
		popup.value.close()
	}
	// 验证码弹框确认
	const ok = () => {
		if(!validMobile.phone || !validMobile.validCode){
			return uni.showToast({
                title: '请检查填写数据',
                icon: 'none',
                duration: 1000
            })
		}
		// 验证短信
		app.globalData.utils.verifyOTP(validMobile);
		creatOrder(subOrder)
        popup.value.close()
	}
	let flag = false
	const countdownChange = () => {
		// 手机号是否存在
		if(!validMobile.phone){
			return uni.showToast({
				title: '请填写手机号',
				icon: 'none',
				duration: 1000
			})
		}
		if(flag) return
		const time = setInterval(() => {
			if(countdown.time <= 0){
                countdown.validText = '获取验证码'
				countdown.time = 60
				clearInterval(time)
				flag = false
			}else{
				countdown.time -= 1;
				countdown.validText = `剩余(${countdown.time}s)`
				console.log(countdown.time);
			}
		},1000)
		flag = true
		// 获取验证码
		app.globalData.utils.getOTP(validMobile);
	}
	// 下单逻辑
	const creatOrder = (orderData) => {
		console.log(orderData);
		app.globalData.utils.setOrder(orderData,qrcodePopup);
	}
	// 关闭微信支付二维码
	const payment = () => {
		uni.switchTab({ url: '../order/index' })
	}
</script>

<style>
 @import './index.css'  
</style>
