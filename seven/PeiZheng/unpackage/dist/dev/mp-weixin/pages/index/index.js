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
    const slides = common_vendor.ref([]);
    const nav2s = common_vendor.ref([]);
    const navs = common_vendor.ref([]);
    const hospitals = common_vendor.ref([]);
    const app = getApp();
    common_vendor.onLoad(() => {
      app.globalData.utils.getUserInfo();
      app.globalData.utils.getAre(slides);
      app.globalData.utils.getShotcutkey(nav2s);
      app.globalData.utils.getShotcutkeys(navs);
      app.globalData.utils.getHospital(hospitals);
    });
    const onNav2Tap = (e) => {
      const nav = common_vendor.toRaw(nav2s.value)[e.currentTarget.dataset.index];
      jump(nav);
    };
    const onNavTop = (e) => {
      const nav = common_vendor.toRaw(navs.value)[e.currentTarget.dataset.index];
      jump(nav);
    };
    const jump = (nav, type) => {
      if (nav.stype == 1) {
        common_vendor.index.navigateTo({ url: nav.stype_link });
      }
    };
    const onHospital = (e) => {
      console.log(e.currentTarget.dataset.hid);
      common_vendor.index.navigateTo({ url: "../hospital/index?hid=" + e.currentTarget.dataset.hid });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          isHome: true
        }),
        b: common_assets._imports_0,
        c: common_assets._imports_0$1,
        d: slides.value && slides.value.length > 0
      }, slides.value && slides.value.length > 0 ? {
        e: common_vendor.f(slides.value, (item, index, i0) => {
          return {
            a: item.pic_image_url,
            b: index,
            c: index
          };
        })
      } : {}, {
        f: nav2s.value && nav2s.value.length > 0
      }, nav2s.value && nav2s.value.length > 0 ? {
        g: common_vendor.f(nav2s.value, (item, index, i0) => {
          return {
            a: item.pic_image_url,
            b: common_vendor.o(onNav2Tap, index),
            c: index,
            d: index
          };
        })
      } : {}, {
        h: navs.value && navs.value.length > 0
      }, navs.value && navs.value.length > 0 ? {
        i: common_vendor.f(navs.value, (item, index, i0) => {
          return {
            a: item.pic_image_url,
            b: common_vendor.t(item.title),
            c: common_vendor.s("color:" + (item.tcolor ? _ctx.iitem.tcolor : "")),
            d: common_vendor.o(onNavTop, index),
            e: index,
            f: index
          };
        })
      } : {}, {
        j: common_vendor.f(hospitals.value, (item, k0, i0) => {
          return {
            a: item.avatar ? item.avatar_url : "/static/avatar.jpg",
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.rank),
            d: common_vendor.t(item.label),
            e: common_vendor.t(item.intro),
            f: common_vendor.o(onHospital, item.id),
            g: item.id,
            h: item.id
          };
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
