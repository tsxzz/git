<template>
  <div class="login_wrap">
    <div class="from_wrap">
      <el-form
        ref="fromRef"
        :model="loginData"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-form-item
          label="用户名"
          prop="username"
          :rules="[
            {
              required: true,
              message: '此项为必填项',
              trigger: 'blur',
            },
          ]"
        >
          <el-input v-model="loginData.username"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :rules="[
            {
              required: true,
              message: '此项为必填项',
              trigger: 'blur',
            },
          ]"
        >
          <el-input type="password" v-model="loginData.password"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="login_btn" @click="handleLogin"
        >登录</el-button
      >
      <h1>{{ num }}</h1>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { datePickTypes } from "element-plus";
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { loginApi } from "@/util/request";
export default {
  name: "login",
  setup() {
    const stoer = useStore();
    const count = stoer.state.count;
    const data = reactive({
      loginData: {
        username: "",
        password: "",
      },
      num: count,
      numStatus: stoer.getters.countStatus,
    });

    const handleLogin = () => {
      // stoer.commit("setUserInfo", data.loginData);
      // localStorage.setItem("logindata", JSON.stringify(data.loginData));
      // //跳转/user
      // router.push({
      //   path: "/user",
      // });
      loginApi(data.loginData).then((res) => {
        console.log(res.data);
        if (res.data) {
          stoer.commit("setUserInfo", res.data);
          localStorage.setItem("loginData", JSON.stringify(res.data));
          //跳转
          router.push({
            path: "/",
          });
        }
      });
    };
    //vuex修改语法
    // console.log("修改之前的值", stoer.getters["number/countStatus"]);
    // const handClick = () => {
    //   //stoer.commit("number/setCount", 100);
    //   stoer
    //     .dispatch("number/setCountPromise", 100)
    //     .then((res) => {
    //       alert("修改成功");
    //     })
    //     .catch((error) => {
    //       alert(error);
    //     });
    //   console.log(stoer.state.number.count);
    //   console.log("修改后getters", stoer.getters["number/countStatus"]);
    // };
    return {
      ...toRefs(data),
      handleLogin,
    };
  },
};
</script>

<style>
.login_wrap {
  width: 100%;
  height: 100vh;
  background-color: rgb(77, 77, 229);
  position: relative;
}
.from_wrap {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  background-color: #fff;
  padding: 30px 50px;
  border: 5px;
}
.login_btn {
  margin: 10px auto;
  display: block;
}
</style>
