<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--白色内容页-->
    <div class="page_content">
      <div class="flex">
        <div class="input_box">
          <el-input
            v-model="keyWord"
            placeholder="搜索关键字"
            class="input-with-select"
          >
            <template #append>
              <el-button @click="searchList"
                ><el-icon><Search /></el-icon
              ></el-button>
            </template>
          </el-input>
        </div>
        <el-button type="primary" @click="addRoles">注册角色</el-button>
      </div>
      <!--角色列表-->
      <el-table :data="rolesList" style="width: 100%">
        <el-table-column prop="roleName" label="角色名称" />
        <el-table-column prop="roleDesc" label="角色描述" />
        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" @click="editRoles(scope.row)">
              编辑
            </el-button>
            <el-button type="danger" @click="delRoles(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from "vue";
import { rolesListApi } from "@/util/request";
export default {
  name: "roles",
  setup() {
    const data = reactive({
      keyWord: "",
      rolesList: [],
    });
    const getRolesList = () => {
      rolesListApi().then((res) => {
        data.rolesList = res.data;
      });
    };
    getRolesList();
    return {
      ...toRefs(data),
    };
  },
};
</script>

<style scoped>
.input_box {
  width: 20%;
  margin-right: 20px;
}
</style>
