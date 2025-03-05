import UQRCode from '@uqrcode/js';
class Utils {
    constructor(){
        this.baseUrl = 'http://159.75.169.224:7300/pz'
    }
    request(option = {
        showLoding: false
    }){
        //判断url是否存在
        if(!option.url){
            return false;
        }
        if(option.showLoding){
            this.showLoding()
        }
        uni.request({
            url: this.baseUrl + option.url,
            data: option.data ? option.data : {},
            header: option.header ? option.header: {},
            method: option.method ? option.method: 'GET',
            success: (response) => {
                uni.hideLoading()
                //后端返回数据异常
                if(response.data.code != 10000){
                    if(option.fail && typeof option.fail == 'function'){
                        option.fail(response)
                    }
                }else{
                    //返回数据正常
                    if(option.success && typeof option.success == 'function'){
                        option.success(response.data)
                    }
                }
            },
            fail: (response) => {
                uni.hideLoading()
            }
        })
    }
    //创建一个加载的效果
    showLoding() {
        const isShowLoading = uni.getStorage('isShowLoading')
        if(isShowLoading){
            uni.hideLoading()
            uni.setStorageSync('isShowLoading',false)
        }
        uni.showLoding({
            title: '加载中。。。',
            complet: function(){
                uni.setStorageSync('isShowLoading', true)
            },
            fail: function(){
                uni.setStorageSync('isShowLoading', false)
            }
        })
    }
    //登录的接口
    getUserInfo() {
        uni.login({
            success: res => {
                this.request({
                    url: '/auth/wxLogin',
                    data: {
                        code: res.code
                    },
                    success: res => {
                        console.log('res',res); 
                    }
                })
            }
        })
    }
    //获取地区的接口
    getAre(slides){
        this.request({
            url: '/app/init',
			success: res => {
                const { id } = res.data.area;
                //id获取当前数据
                this.request({
                    url: '/Index/index',
                    data: {
                        aid: id
                    },
                    success: ({ data }) => {
                        // 更新 slides 响应式变量
                        console.log(data);
                        slides.value = data.slides;  // 将返回的数据赋值给 slides
                    }
                })
			}
        })
    }
    //获取快捷键的接口
    getShotcutkey(nav2s){
        this.request({
            url: '/app/init',
			success: res => {
                const { id } = res.data.area;
                //id获取当前数据
                this.request({
                    url: '/Index/index',
                    data: {
                        aid: id
                    },
                    success: ({ data }) => {
                        //更新响nav2s响应式变量
                        nav2s.value = data.nav2s;
                    }
                })
			}
        })
    }
    //获取多个快捷键的接口
    getShotcutkeys(navs){
        this.request({
            url: '/app/init',
			success: res => {
                const { id } = res.data.area;
                //id获取当前数据
                this.request({
                    url: '/Index/index',
                    data: {
                        aid: id
                    },
                    success: ({ data }) => {
                        //更新响nav响应式变量
                        navs.value = data.navs;
                        console.log(data);
                        
                    }
                })
			}
        })
    }
    //获取医院列表
    getHospital(hospitals){
        console.log('医院');
        this.request({
            url: '/app/init',
			success: res => {
                const { id } = res.data.area;
                //id获取当前数据
                this.request({
                    url: '/Index/index',
                    data: {
                        aid: id
                    },
                    success: ({ data }) => {
                        //更新响nav响应式变量
                        hospitals.value = data.hospitals;
                        console.log(hospitals.value);
                    }
                })
			}
        })
    }
    //获取服务列表
    getServicelist(option,service,hospitals){
        console.log('服务');
        this.request({
            url: '/Service/order',
            data: {
                svid: option.svid,
            },
            success: res => {
                console.log(res);
                service.value = res.data.service;
                hospitals.value = res.data.hospitals;
            }
        })
    }

    //获取服务对象、
    getServicePeople(clients){
        console.log('获取服务对象');
        this.request({
            url: '/User/clients',   
            success: res => {
                console.log(res);
                clients.value = res.data.clients;
            }
        })
    }

    // 获取验证码
    getOTP(validMobile){
        console.log('获取验证码');
        this.request({
            url: '/get/code',
            method: 'POST',
            data: {
                tel: validMobile.phone,
            },
            success: res => {
                uni.showToast({
                    title: '验证码发送成功，请尽快填写！',
                    icon: 'none',
                    duration: 1000
                })
            },
            fail: res => {
                uni.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 1000
                })
            }
        })
    }
    // 验证验证码
    verifyOTP(validMobile){
        console.log('验证验证码');
        this.request({
            url: '/user/authentication',
            method: 'POST',
            data: {
                tel: validMobile.phone,
                code: validMobile.validCode, 
            },
            success: res => {
                uni.setStorageSync('token', res.data.token)
                // 下单的方法
                uni.showToast({
                    title: '验证码验证成功！',
                    icon:'success',
                    duration: 1000
                })
            },
            fail: res => {
                uni.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 1000
                })
            }
        })
    }
    // 创建订单
    setOrder(orderData,qrcodePopup){
        this.request({
            url: '/pay/createOrder',
            method: 'POST',
            header: {
                token: uni.getStorageSync('token')
            },
            data: orderData,
            success: res => {
                qrcodePopup.value.open('center')
                // 获取uQRCode实例
                const qr = new UQRCode();
                // 设置二维码内容
                qr.data = res.wx_code;
                // 设置二维码大小，必须与canvas设置的宽高一致
                qr.size = 150;
                // 调用制作二维码方法
                qr.make();
                // 获取canvas上下文
                var canvasContext = uni.createCanvasContext('qrcode'); // 如果是组件，this必须传入
                // 设置uQRCode实例的canvas上下文
                qr.canvasContext = canvasContext;
                // 调用绘制方法将二维码图案绘制到canvas上
                qr.drawCanvas();
            },
            fail: res => {} 
        })
    }

    // // 获取订单列表
    // getOrderlist(){
    //     this.request({
    //         url: '/order/list',
    //         method: "GET",
    //         header: {
    //             token: uni.getStorageSync('token')
    //         },
    //         success: res => {
    //             console.log(res);
    //         },
    //         fail: res => {}
    //     })
    // }

    // 获取某个状态下的订单列表
    getstateOrder(filt,list){
        this.request({
            url: '/order/list',
            method: "GET",
            header: {
                token: uni.getStorageSync('token')
            },
            data: {
                state: filt.value // 1：待支付，2：已支付，3：已完成
            },
            success: res => {
                console.log(res);
                list.value =  res.data
            },
            fail: res => {
                uni.showToast({
                    title: res.msg,
                    icon:'none',
                    duration: 1000
                })
            }
        })
    }
        
    // 获取订单详情页
    getOrderDetail(params,order){
        console.log(params,'params');
        this.request({
            url: '/order/detail',
            method: "GET",
            header: {
                token: uni.getStorageSync('token')
            },
            data: {
                oid: params.oid,
            },
            success: res => {
                console.log(res);
                order.value =  res.data
            },
            fail: res => {
                console.log(res.msg);
            }
        })
    }
    // 获取医院详情
    getHospitalDetail(params,hospital,services){
        this.request({
            url: '/Hospital/index',
            method: "GET",
            header: {
                token: uni.getStorageSync('token')
            },
            data: {
                hid: params.hid, // 医院id
            },
            success: res => {
                console.log(res);
                hospital.value =  res.data.hospital
                services.value = res.data.services
            },
            fail: res => {
                console.log(res.msg);
            }
        })
    }
        // 获取用户详情
        getUser(mine,statistic){
            this.request({
                url: '/User/index',
                method: "GET",
                header: {
                    token: uni.getStorageSync('token')
                },
                success: res => {
                    console.log(res);
                    mine.value = res.data.mine;
                    statistic.value = res.data.statistic
                },
                fail: res => {
                    console.log(res.msg);
                }
            })
        }
}
export default new Utils()