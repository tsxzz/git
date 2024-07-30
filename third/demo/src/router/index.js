import { createRouter, createWebHistory } from "vue-router";
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
      redirect: "/roles",
      children: [
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

export default router;
