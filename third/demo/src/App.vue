<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style>
body,
html {
  padding: 0;
  margin: 0;
}
.flex-float {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex {
  display: flex;
  align-items: center;
}
.page_content {
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 20px;
  background-color: #ffff;
  margin-top: 30px;
}
</style>
