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
      <el-button type="primary" class="login_btn">登录</el-button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  name: "login",
  setup() {
    const data = reactive({
      loginData: {
        username: "",
        password: "",
      },
    });
    return {
      ...toRefs(data),
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
