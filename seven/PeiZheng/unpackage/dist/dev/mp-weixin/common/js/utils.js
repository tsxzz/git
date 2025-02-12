"use strict";
const common_vendor = require("../vendor.js");
class Utils {
  constructor() {
    this.baseUrl = "http://159.75.169.224:7300/pz";
  }
  getUserInfo() {
    common_vendor.index.login({
      success: (res) => {
        console.log(res);
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
        console.log(response);
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
}
const Utils$1 = new Utils();
exports.Utils = Utils$1;
