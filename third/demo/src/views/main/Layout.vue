<template>
  <div class="common-layout">
    <el-container>
      <el-header class="common-header flex-float">
        <div class="flex">
          <img class="logo" src="../../assets/logo.png" alt="" />
          <h1 class="title">后台管理系统</h1>
        </div>
        <el-button type="danger" @click="loginOut">退出</el-button>
      </el-header>
      <el-container>
        <el-aside class="common-aside">
          <left />
        </el-aside>
        <el-main> <router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Left from "./left.vue";
import router from "@/router";

export default {
  components: { Left },
  name: "layout",
  setup() {
    const store = useStore();
    const loginOut = () => {
      localStorage.removeItem("loginData");
      store.commit("setUserInfo", {});
      router.push({
        path: "/login",
      });
    };
    return {
      loginOut,
    };
  },
};
</script>

<style setup>
.el-container {
  height: 100vh;
  overflow: hidden;
}
.common-header {
  background: rgb(38, 52, 44);
  display: flex;
  justify-content: space-between; /* 在主轴上分散子元素，同时保持交叉轴居中 */
  align-items: center; /* 垂直居中对齐 */
  padding: 0 20px; /* 为按钮留出空间，避免紧贴容器边缘 */
}
.common-aside {
  background: rgb(48, 65, 55);
}
.logo {
  width: 80px;
}
.title {
  color: aliceblue;
  padding: 10px;
  margin: 0; /* 重置外边距 */
}

/* 由于 Element Plus 的 <el-button> 已经是 flex 项目，不需要再次设置 display: flex; */
.flex-float {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex {
  display: flex;
  align-items: center;
}
.el-main {
  background-color: #efefef;
}
</style>
