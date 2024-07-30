<template>
  <h1>Hello world!!</h1>
  <p v-text="name"></p>
  <!-- v-text的简写 -->
  <P>{{ name }}</P>
  <!-- v-html -->
  <p>{{ info }}</p>
  <p v-html="info"></p>
  <!-- 属性名字 -->
  <p :data="dataVal" @click="tochange" :class="{ active: isActive }">
    属性data
  </p>
  <!-- 类名绑定 可以叠加class使用 -->
  <p class="text" :class="{ red: isRed }">我是红色</p>
  <!-- v-if判断语句 这个隐藏是元素未渲染到页面 -->
  <!-- v-show 这个隐藏是样式的隐藏-->
  <p v-if="!isTrue">展示v-if</p>
  <p v-show="!isTrue">展示v-show</p>

  <ul>
    <li v-for="(item, index) in userList" :key="index">
      学生名字 ： {{ item.username }} 学生年龄 : {{ item.age }}
    </li>
  </ul>
  <p></p>
</template>
<script>
import { reactive, toRefs } from "vue";
export default {
  name: "home",
  setup() {
    const data = reactive({
      name: "小崔",
      age: 20,
      info: "<i>斜体字html标签</i>",
      dataVal: 20,
      isRed: true,
      isTrue: true,
      userList: [
        {
          username: "小崔",
          age: 20,
        },
        {
          username: "小n",
          age: 22,
        },
        {
          username: "小c",
          age: 21,
        },
        {
          username: "小d",
          age: 21,
        },
      ],
    });
    const isActive = false;
    const tochange = () => {
      isActive = !isActive;
    };
    return {
      ...toRefs(data),
      isActive,
      tochange,
    };
  },
};
</script>
<style>
.active {
  color: red;
  font-weight: bold;
}
.red {
  color: red;
}
</style>
