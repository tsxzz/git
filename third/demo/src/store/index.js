import { createStore } from "vuex";
import number from "./state/num.state";
import uInfo from "./state/userinfo.state";
export default createStore({
  //数据多的情况下，分模块
  modules: {
    number,
    uInfo,
  },
});
