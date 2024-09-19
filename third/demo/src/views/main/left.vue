<template>
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="none"
      text-color="#fff"
      :router="true"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><Avatar /></el-icon>
          <span>账号管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/user">账号列表</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><Switch /></el-icon>
          <span>角色管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/roles">角色列表</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><Switch /></el-icon>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/good">商品列表</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<style></style>
