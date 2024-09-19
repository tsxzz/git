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
        <el-button type="primary" @click="dialogFormEVisible = true"
          >注册角色</el-button
        >
      </div>
      <!--角色列表-->
      <el-table :data="rolesList" style="width: 100%">
        <el-table-column prop="roleName" label="角色名称" />
        <el-table-column prop="roleDesc" label="角色描述" />
        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template #default="scope">
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
    <!--新建编辑弹窗表单-->
    <el-dialog
      v-model="dialogFormEVisible"
      @close="clearForm"
      :title="FormData.id ? '编辑角色' : '新建角色'"
    >
      <!--表单-->
      <!--
      | 参数名   | 参数说明 | 备注                  |
      | -------- | -------- | --------------------- |
      | :id      | 角色 ID  | 不能为空`携带在url中` |
      | roleName | 角色名称 | 不能为空              |
      | roleDesc | 角色描述 | 可以为空              |
      -->
      <el-form ref="userForm" :model="FormData" :rules="rules">
        <el-form-item label="角色名称:" prop="roleName">
          <el-input v-model="FormData.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色描述:" prop="roleDesc">
          <el-input v-model="FormData.roleDesc" placeholder="请输入角色描述" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="flex_form">
          <el-button>取 消</el-button>
          <el-button type="primary" @click="submitForm(userForm)"
            >确 定</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from "vue";
import {
  rolesListApi,
  addRolesApi,
  editRolesApi,
  rolesDelateApi,
} from "@/util/request";
export default {
  name: "roles",
  setup() {
    const data = reactive({
      keyWord: "",
      rolesList: [],
      dialogFormEVisible: false,
      FormData: {
        roleName: "",
        roleDesc: "",
      },
      rules: {
        roleName: {
          required: true,
          message: "此项为必填项",
          trigger: "blur",
        },
        roleDesc: {
          required: true,
          message: "此项为必填项",
          trigger: "blur",
        },
      },
    });
    const getRolesList = () => {
      rolesListApi().then((res) => {
        data.rolesList = res.data;
      });
    };
    getRolesList();
    const editRoles = (row) => {
      data.dialogFormEVisible = true;
      const { roleName, roleDesc, id } = row;
      data.FormData = {
        id,
        roleName,
        roleDesc,
      };
    };
    const submitForm = (formEl) => {
      formEl.validate((res) => {
        if (!res) {
          return;
        }
        //提交表单
        if (data.FormData.id) {
          editRolesApi(data.FormData).then((res) => {
            data.dialogFormEVisible = false;
            getRolesList();
          });
        } else {
          addRolesApi(data.FormData).then((res) => {
            if (res.data) {
              data.dialogFormEVisible = false;
              getRolesList();
            }
          });
        }
      });
    };
    const delRoles = (row) => {
      rolesDelateApi(row).then((res) => {
        getRolesList();
      });
    };
    const clearForm = () => {
      data.FormData = {
        roleName: "",
        roleDesc: "",
      };
    };
    const userForm = ref();
    return {
      ...toRefs(data),
      editRoles,
      delRoles,
      userForm,
      submitForm,
      clearForm,
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
