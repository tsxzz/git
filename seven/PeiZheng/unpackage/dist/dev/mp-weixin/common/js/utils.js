"use strict";
const common_vendor = require("../vendor.js");
class Utils {
  constructor() {
    this.baseUrl = "http://159.75.169.224:7300/pz";
  }
  request(option = {
    showLoding: false
  }) {
    if (!option.url) {
      return false;
    }
    if (option.showLoding) {
      this.showLoding();
    }
    common_vendor.index.request({
      url: this.baseUrl + option.url,
      data: option.data ? option.data : {},
      header: option.header ? option.header : {},
      method: option.method ? option.method : "GET",
      success: (response) => {
        common_vendor.index.hideLoading();
        if (response.data.code != 1e4) {
          if (option.fail && typeof option.fail == "function") {
            option.fail(response);
          }
        } else {
          if (option.success && typeof option.success == "function") {
            option.success(response.data);
          }
        }
      },
      fail: (response) => {
        common_vendor.index.hideLoading();
      }
    });
  }
  //创建一个加载的效果
  showLoding() {
    const isShowLoading = common_vendor.index.getStorage("isShowLoading");
    if (isShowLoading) {
      common_vendor.index.hideLoading();
      common_vendor.index.setStorageSync("isShowLoading", false);
    }
    common_vendor.index.showLoding({
      title: "加载中。。。",
      complet: function() {
        common_vendor.index.setStorageSync("isShowLoading", true);
      },
      fail: function() {
        common_vendor.index.setStorageSync("isShowLoading", false);
      }
    });
  }
  //登录的接口
  getUserInfo() {
    common_vendor.index.login({
      success: (res) => {
        this.request({
          url: "/auth/wxLogin",
          data: {
            code: res.code
          },
          success: (res2) => {
            console.log("res", res2);
          }
        });
      }
    });
  }
  //获取地区的接口
  getAre(slides) {
    this.request({
      url: "/app/init",
      success: (res) => {
        const { id } = res.data.area;
        this.request({
          url: "/Index/index",
          data: {
            aid: id
          },
          success: ({ data }) => {
            console.log(data);
            slides.value = data.slides;
          }
        });
      }
    });
  }
  //获取快捷键的接口
  getShotcutkey(nav2s) {
    this.request({
      url: "/app/init",
      success: (res) => {
        const { id } = res.data.area;
        this.request({
          url: "/Index/index",
          data: {
            aid: id
          },
          success: ({ data }) => {
            nav2s.value = data.nav2s;
          }
        });
      }
    });
  }
  //获取多个快捷键的接口
  getShotcutkeys(navs) {
    this.request({
      url: "/app/init",
      success: (res) => {
        const { id } = res.data.area;
        this.request({
          url: "/Index/index",
          data: {
            aid: id
          },
          success: ({ data }) => {
            navs.value = data.navs;
            console.log(data);
          }
        });
      }
    });
  }
  //获取医院列表
  getHospital(hospitals) {
    console.log("医院");
    this.request({
      url: "/app/init",
      success: (res) => {
        const { id } = res.data.area;
        this.request({
          url: "/Index/index",
          data: {
            aid: id
          },
          success: ({ data }) => {
            hospitals.value = data.hospitals;
            console.log(hospitals.value);
          }
        });
      }
    });
  }
  //获取服务列表
  getServicelist(option, service, hospitals) {
    console.log("服务");
    this.request({
      url: "/Service/order",
      data: {
        svid: option.svid
      },
      success: (res) => {
        console.log(res);
        service.value = res.data.service;
        hospitals.value = res.data.hospitals;
      }
    });
  }
  //获取服务对象、
  getServicePeople(clients) {
    console.log("获取服务对象");
    this.request({
      url: "/User/clients",
      success: (res) => {
        console.log(res);
        clients.value = res.data.clients;
      }
    });
  }
  // 获取验证码
  getOTP(validMobile) {
    console.log("获取验证码");
    this.request({
      url: "/get/code",
      method: "POST",
      data: {
        tel: validMobile.phone
      },
      success: (res) => {
        common_vendor.index.showToast({
          title: "验证码发送成功，请尽快填写！",
          icon: "none",
          duration: 1e3
        });
      },
      fail: (res) => {
        common_vendor.index.showToast({
          title: res.msg,
          icon: "none",
          duration: 1e3
        });
      }
    });
  }
  // 验证验证码
  verifyOTP(validMobile) {
    console.log("验证验证码");
    this.request({
      url: "/user/authentication",
      method: "POST",
      data: {
        tel: validMobile.phone,
        code: validMobile.validCode
      },
      success: (res) => {
        common_vendor.index.setStorageSync("token", res.data.token);
        common_vendor.index.showToast({
          title: "验证码验证成功！",
          icon: "success",
          duration: 1e3
        });
      },
      fail: (res) => {
        common_vendor.index.showToast({
          title: res.msg,
          icon: "none",
          duration: 1e3
        });
      }
    });
  }
  // 创建订单
  setOrder(orderData, qrcodePopup) {
    this.request({
      url: "/pay/createOrder",
      method: "POST",
      header: {
        token: common_vendor.index.getStorageSync("token")
      },
      data: orderData,
      success: (res) => {
        qrcodePopup.value.open("center");
        const qr = new common_vendor.UQRCode();
        qr.data = res.wx_code;
        qr.size = 150;
        qr.make();
        var canvasContext = common_vendor.index.createCanvasContext("qrcode");
        qr.canvasContext = canvasContext;
        qr.drawCanvas();
      },
      fail: (res) => {
      }
    });
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
  getstateOrder(filt, list) {
    this.request({
      url: "/order/list",
      method: "GET",
      header: {
        token: common_vendor.index.getStorageSync("token")
      },
      data: {
        state: filt.value
        // 1：待支付，2：已支付，3：已完成
      },
      success: (res) => {
        console.log(res);
        list.value = res.data;
      },
      fail: (res) => {
        common_vendor.index.showToast({
          title: res.msg,
          icon: "none",
          duration: 1e3
        });
      }
    });
  }
  // 获取订单详情页
  getOrderDetail(params, order) {
    console.log(params, "params");
    this.request({
      url: "/order/detail",
      method: "GET",
      header: {
        token: common_vendor.index.getStorageSync("token")
      },
      data: {
        oid: params.oid
      },
      success: (res) => {
        console.log(res);
        order.value = res.data;
      },
      fail: (res) => {
        console.log(res.msg);
      }
    });
  }
  // 获取医院详情
  getHospitalDetail(params, hospital, services) {
    this.request({
      url: "/Hospital/index",
      method: "GET",
      header: {
        token: common_vendor.index.getStorageSync("token")
      },
      data: {
        hid: params.hid
        // 医院id
      },
      success: (res) => {
        console.log(res);
        hospital.value = res.data.hospital;
        services.value = res.data.services;
      },
      fail: (res) => {
        console.log(res.msg);
      }
    });
  }
  // 获取用户详情
  getUser(mine, statistic) {
    this.request({
      url: "/User/index",
      method: "GET",
      header: {
        token: common_vendor.index.getStorageSync("token")
      },
      success: (res) => {
        console.log(res);
        mine.value = res.data.mine;
        statistic.value = res.data.statistic;
      },
      fail: (res) => {
        console.log(res.msg);
      }
    });
  }
}
const Utils$1 = new Utils();
exports.Utils = Utils$1;
