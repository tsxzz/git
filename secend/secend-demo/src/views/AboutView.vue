<template>
  <div class="about">
    <h3>VUE3的生命周期</h3>
    <div id="dom">{{ msg }}</div>
    <!-- v-on事件名="事件方法"绑定事件 -->
    <!-- 事件及方法直接声明在setup中 -->
    <button v-on:click="handleClick">Click me</button>
    <!-- v-modle：双向绑定 -->
    <!-- blur:失去焦点
    force：获得焦点
    change：改变内容 -->
    <input type="text" placeholder="输入姓名" v-model="userName" /><br />
    <input
      type="text"
      placeholder="输入电话"
      v-model="userPhone"
      @focus="handFocus"
      @blur="handBlur"
      @input="handInput"
    /><br />
    <textarea
      placeholder="清输入你的建议"
      cols="30"
      rows="10"
      v-model="userInput"
    ></textarea>
    <p>{{ userName }}--{{ userInput }}--{{ userPhone }}</p>
    <button>提交</button>
  </div>
</template>
<script>
import {
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
} from "vue";

export default {
  name: "about",
  setup() {
    const data = reactive({
      msg: "你好呀！",
      userName: "",
      userInput: "",
      userPhone: "",
    });
    //数据渲染之前
    onBeforeMount(() => {
      console.log("onBeforeMount", document.querySelector("#dom"));
    });
    //数据渲染之后
    onMounted(() => {
      console.log("onMount", document.querySelector("#dom"));
      setTimeout(() => {
        data.msg = "hello";
      }, 2000);
    });
    onBeforeUpdate(() => {
      console.log("onBeforeUpdate");
    });
    //dom更新前
    onUpdated(() => {
      console.log("onUpdated");
    });
    //dom更新后

    const handleClick = () => {
      alert("你好！");
    };
    const handFocus = () => {
      console.log("获得焦点");
    };
    const handBlur = () => {
      console.log("失去焦点");
      if (data.userPhone === null || data.userPhone === "") {
        alert("手机号必填");
      }
      //手机号正则验证
      if (!/^1[3-9]\d{9}$/.test(data.userPhone)) {
        alert("手机号格式不对");
      }
    };
    const handInput = () => {};
    return {
      ...toRefs(data),
      handleClick,
      handFocus,
      handBlur,
      handInput,
    };
  },
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
