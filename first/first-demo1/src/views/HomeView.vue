<template>
  <div>
    <h1>Hello world!</h1>
    <p v-text="data.name"></p>
  </div>
</template>
<script>
import { reactive } from "vue";
export default {
  name: "home",
  setup() {
    const date = reactive({
      name: "xiaohong",
      age: 20,
    });
    return {
      ...toRaw(data),
    };
  },
};
</script>
