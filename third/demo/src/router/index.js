import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index.js";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //登陆页面
    {
      path: "/login",
      name: "login",
      component: () => import("../views/pages/login.vue"),
    },
    {
      path: "/",
      name: "Layout",
      component: () => import("../views/main/Layout.vue"), // 修正路径拼写
      redirect: "/index",
      children: [
        {
          path: "/index",
          name: "index",
          component: () => import("../views/pages/index.vue"),
        },
        {
          path: "/roles",
          name: "roles",
          component: () => import("../views/pages/roles.vue"),
        },
        {
          path: "/user",
          name: "user",
          component: () => import("../views/pages/user.vue"),
        },
      ],
    },
  ],
});

//路由守卫
router.beforeEach((to, from, next) => {
  /**
   * to:从哪个页面
   * from：到那个页面
   * next：执行next（）才会进行跳转
   * 判断是否登陆
   */
  console.log("store", store.state.uInfo);
  const uInfo = store.state.uInfo.userInfo;
  console.log(uInfo);

  if (!uInfo.username) {
    if (to.path === "/login") {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});
export default router;
