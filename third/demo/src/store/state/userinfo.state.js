export default {
  state: {
    userInfo:
      (localStorage.getItem("logindata") &&
        JSON.parse(localStorage.getItem("logindata"))) ||
      {},
  },
  mutations: {
    setUserInfo(state, uInfo) {
      state.userInfo = uInfo;
    },
  },
};
