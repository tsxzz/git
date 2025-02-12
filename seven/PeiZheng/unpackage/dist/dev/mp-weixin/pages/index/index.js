"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_navbar2 = common_vendor.resolveComponent("navbar");
  _easycom_navbar2();
}
const _easycom_navbar = () => "../../components/navbar/navbar.js";
if (!Math) {
  _easycom_navbar();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.ref("动态数组");
    const app = getApp();
    common_vendor.onLoad(() => {
      app.globalData.utils.getUserInfo();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          isHome: true
        }),
        b: common_assets._imports_0,
        c: common_assets._imports_1
      };
    };
  }
};
wx.createPage(_sfc_main);
