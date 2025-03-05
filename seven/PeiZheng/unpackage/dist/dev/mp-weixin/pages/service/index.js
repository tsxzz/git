"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_dtPicker2 = common_vendor.resolveComponent("dtPicker");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_dtPicker2 + _easycom_uni_popup2)();
}
const _easycom_dtPicker = () => "../../components/dtPicker/dtPicker.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_dtPicker + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const service = common_vendor.ref([]);
    const hospitals = common_vendor.ref([]);
    const hospital_index = common_vendor.ref(0);
    const order = common_vendor.ref({
      price: "",
      starttime: "",
      address: {
        userName: "",
        cityName: "",
        countyName: "",
        detailInfo: ""
      },
      receiveAddress: "",
      tel: "",
      demand: ""
    });
    const cfg = common_vendor.reactive({
      page_xy: ""
    });
    const validMobile = common_vendor.reactive({
      phone: "",
      validCode: ""
    });
    const countdown = common_vendor.reactive({
      validText: "获取验证码",
      time: 60,
      isCountdown: false
    });
    const popup = common_vendor.ref();
    const client = common_vendor.reactive({
      name: ""
    });
    const is_xieyi = common_vendor.ref(false);
    const qrcodePopup = common_vendor.ref();
    let subOrder;
    const app = getApp();
    common_vendor.onLoad((option) => {
      main_load(option, service, hospitals);
      console.log(service.value);
      console.log("option", option);
    });
    const main_load = (option, service2, hospitals2) => {
      app.globalData.utils.getServicelist(option, service2, hospitals2);
      const hospitalData = common_vendor.toRaw(hospitals2.value);
      if (option.hid > 0) {
        for (let i = 0; i < hospitalData.length; i++) {
          if (hospitalData[i].id == option.hid)
            hospital_index.value = i;
          order.value.price = hospitalData[i].service_price;
          break;
        }
      }
    };
    const handleTap = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "服务内容：" + service.name,
        showCancel: false
      });
    };
    const onHospitalChange = (e) => {
      const value = parseInt(e.detail.value);
      hospital_index.value = value;
      order.value.price = common_vendor.toRaw(hospitals.value)[value].service_price;
    };
    const onStartTimeChanged = (e) => {
      order.value.starttime = e.detail.value;
    };
    const onClientChange = () => {
      common_vendor.index.navigateTo({
        url: "../clients/index?act=select"
      });
    };
    common_vendor.index.$on("clientChange", (data) => {
      console.log(data);
      client.name = data.name;
      client.age = data.age;
      client.id = data.user_id;
      client.sex = data.sex;
      client.mobile = data.mobile;
    });
    const onXieyiChange = () => {
      is_xieyi.value = !is_xieyi.value;
    };
    const onAddressChange = () => {
      console.log("收货地址事件");
      common_vendor.index.chooseAddress({
        success: (res) => {
          if (!order.value.address) {
            order.value.address = {
              userName: "",
              cityName: "",
              countyName: "",
              detailInfo: ""
            };
          }
          order.value.address.userName = res.userName;
          order.value.address.cityName = res.cityName;
          order.value.address.countyName = res.countyName;
          order.value.address.detailInfo = res.detailInfo;
        },
        fail: (res) => {
          console.log(res, "err");
        }
      });
    };
    const submit = () => {
      console.log(order.value.starttime);
      if (!is_xieyi.value) {
        return common_vendor.index.showToast({
          title: "请先阅读并用户协议和服务协议",
          duration: 1e3
        });
      }
      const orderData = common_vendor.toRaw(order.value);
      console.log(orderData);
      const serviceData = common_vendor.toRaw(service.value);
      const hospitalData = common_vendor.toRaw(hospitals.value);
      const clientData = common_vendor.toRaw(client);
      orderData.service_code = serviceData.code;
      orderData.service_name = serviceData.name;
      orderData.service_id = serviceData.id;
      orderData.service_stype = serviceData.stype;
      if (serviceData.stype < 100) {
        if (hospital_index.value == 0) {
          return common_vendor.index.showToast({
            title: "请选择医院",
            icon: "none",
            duration: 1e3
          });
        }
        orderData.hospital_id = hospitalData[hospital_index.value].id;
        orderData.hospital_name = hospitalData[hospital_index.value].name;
      }
      if (!order.value.starttime) {
        return common_vendor.index.showToast({
          title: "请选择时间",
          icon: "none",
          duration: 1e3
        });
      }
      if (serviceData.stype == 10 || serviceData.stype == 15 || serviceData.stype == 20) {
        if (!clientData.id) {
          return common_vendor.index.showToast({
            title: "请选择就诊人",
            icon: "none",
            duration: 1e3
          });
        }
        orderData.client = {};
        orderData.client.name = clientData.name;
        orderData.client.age = clientData.age;
        orderData.client.mobile = clientData.mobile;
        orderData.client.sex = clientData.sex;
        if (serviceData.stype == 15) {
          if (!orderData.receiveAddress) {
            return common_vendor.index.showToast({
              title: "请填写就诊人所在地址",
              icon: "none",
              duration: 1e3
            });
          }
        }
      }
      if (serviceData.stype == 30 || serviceData.stype == 40) {
        if (!orderData.address.userName) {
          return common_vendor.index.showToast({
            title: "请填写收件人信息",
            icon: "none",
            duration: 1e3
          });
        }
      }
      if (!orderData.tel) {
        return common_vendor.index.showToast({
          title: "请填写您的联系方式",
          icon: "none",
          duration: 1e3
        });
      }
      subOrder = orderData;
      console.log(orderData, "订单数据");
      if (!common_vendor.index.getStorageSync("token")) {
        popup.value.open("center");
      } else {
        creatOrder(subOrder);
      }
    };
    const cancal = () => {
      popup.value.close();
    };
    const ok = () => {
      if (!validMobile.phone || !validMobile.validCode) {
        return common_vendor.index.showToast({
          title: "请检查填写数据",
          icon: "none",
          duration: 1e3
        });
      }
      app.globalData.utils.verifyOTP(validMobile);
      creatOrder(subOrder);
      popup.value.close();
    };
    let flag = false;
    const countdownChange = () => {
      if (!validMobile.phone) {
        return common_vendor.index.showToast({
          title: "请填写手机号",
          icon: "none",
          duration: 1e3
        });
      }
      if (flag)
        return;
      const time = setInterval(() => {
        if (countdown.time <= 0) {
          countdown.validText = "获取验证码";
          countdown.time = 60;
          clearInterval(time);
          flag = false;
        } else {
          countdown.time -= 1;
          countdown.validText = `剩余(${countdown.time}s)`;
          console.log(countdown.time);
        }
      }, 1e3);
      flag = true;
      app.globalData.utils.getOTP(validMobile);
    };
    const creatOrder = (orderData) => {
      console.log(orderData);
      app.globalData.utils.setOrder(orderData, qrcodePopup);
    };
    const payment = () => {
      common_vendor.index.switchTab({ url: "../order/index" });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$5,
        b: service.value.icon_image ? service.value.icon_image_url : "../../static/avatar.jpg",
        c: common_vendor.t(service.value.name),
        d: common_vendor.o(handleTap),
        e: service.value.stype == 10 || service.value.stype == 15 || service.value.stype == 20
      }, service.value.stype == 10 || service.value.stype == 15 || service.value.stype == 20 ? common_vendor.e({
        f: hospitals.value[hospital_index.value].name,
        g: common_vendor.o(onHospitalChange),
        h: hospital_index.value,
        i: hospitals.value,
        j: common_vendor.o(onStartTimeChanged),
        k: common_vendor.p({
          timestamp: order.value.starttime,
          placeholder: "请选择就诊时间"
        }),
        l: client.name,
        m: common_vendor.o(onClientChange),
        n: service.value.stype == 15
      }, service.value.stype == 15 ? {
        o: order.value.receiveAddress,
        p: common_vendor.o(($event) => order.value.receiveAddress = $event.detail.value)
      } : {}, {
        q: order.value.tel,
        r: common_vendor.o(($event) => order.value.tel = $event.detail.value)
      }) : {}, {
        s: service.value.stype == 30 || service.value.stype == 40
      }, service.value.stype == 30 || service.value.stype == 40 ? {
        t: hospitals.value[hospital_index.value].name,
        v: common_vendor.o(onHospitalChange),
        w: hospital_index.value,
        x: hospitals.value,
        y: common_vendor.o(onStartTimeChanged),
        z: common_vendor.p({
          timestamp: order.value.starttime,
          placeholder: "请选择期望服务时间"
        }),
        A: order.value.address.userName ? order.value.address.userName + "(" + order.value.address.cityName + order.value.address.countyName + order.value.address.detailInfo + ")" : "",
        B: common_vendor.o(onAddressChange),
        C: order.value.tel,
        D: common_vendor.o(($event) => order.value.tel = $event.detail.value)
      } : {}, {
        E: order.value.demand,
        F: common_vendor.o(($event) => order.value.demand = $event.detail.value),
        G: common_vendor.n("is_xieyi " + (is_xieyi.value ? "is_xieyi_on" : "")),
        H: common_vendor.o(onXieyiChange),
        I: cfg.page_xy,
        J: cfg.page_fw,
        K: order.value.price > 0
      }, order.value.price > 0 ? {
        L: common_vendor.t(order.value.price)
      } : {}, {
        M: common_vendor.n("btnp " + (is_xieyi.value ? "" : "btnp-disabled")),
        N: common_vendor.o(submit),
        O: validMobile.phone,
        P: common_vendor.o(($event) => validMobile.phone = $event.detail.value),
        Q: validMobile.validCode,
        R: common_vendor.o(($event) => validMobile.validCode = $event.detail.value),
        S: common_vendor.t(countdown.validText),
        T: common_vendor.o(countdownChange),
        U: common_vendor.o(cancal),
        V: common_vendor.o(ok),
        W: common_vendor.sr(popup, "8d94f2a8-2", {
          "k": "popup"
        }),
        X: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        }),
        Y: common_vendor.o(payment),
        Z: common_assets._imports_0$1,
        aa: common_vendor.sr(qrcodePopup, "8d94f2a8-3", {
          "k": "qrcodePopup"
        }),
        ab: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
