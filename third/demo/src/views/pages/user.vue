<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--白色内容页-->
    <div class="page_content">
      <div class="flex">
        <div class="input_box">
          <el-input
            v-model="searchParams.query"
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
        <el-button type="primary" @click="addUser">新建用户</el-button>
      </div>
      <!--表格-->
      <el-table :data="userList" style="width: 100%">
        <el-table-column prop="username" label="姓名" width="180" />
        <el-table-column prop="email" label="邮箱" width="180" />
        <el-table-column prop="mobile" label="电话" />
        <el-table-column prop="role_name" label="角色" />
        <el-table-column prop="mg_state" label="状态">
          <!--插槽-->
          <template #default="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @click="switchChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" @click="editRow(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" @click="delateRow(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        v-model:currentPage="searchParams.pagenum"
        :total="total"
        v-model:page-size="searchParams.pagesize"
        :page-sizes="[2, 3, 5, 6]"
        :current-page="searchParams.currentPage"
        @size-change="searchList"
        @current-change="searchList"
      />
    </div>
    <!--新建弹窗-->
    <el-dialog v-model="dialogFormVisible" title="新建用户">
      <!--表单-->
      <!--
      | 参数名   | 参数说明 | 备注     |
      | -------- | -------- | -------- |
      | username | 用户名称 | 不能为空 |
      | password | 用户密码 | 不能为空 |
      | email    | 邮箱     | 可以为空 |
      | mobile   | 手机号   | 可以为空 |
      -->
      <el-form ref="userForm" :model="FormData" :rules="rules">
        <el-form-item label="用户名称:" prop="username">
          <el-input v-model="FormData.username" placeholder="输入用户名" />
        </el-form-item>
        <el-form-item label="用户密码:" prop="password">
          <el-input
            type="password"
            v-model="FormData.password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="FormData.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="手机号:" prop="mobile">
          <el-input v-model="FormData.mobile" placeholder="请输入手机号" />
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
    <!--编辑弹窗-->
    <el-dialog v-model="dialogFormEVisible" title="编辑用户">
      <!--表单-->
      <!--
      | 参数名   | 参数说明 | 备注     |
      | email    | 邮箱     | 可以为空 |
      | mobile   | 手机号   | 可以为空 |
      -->
      <el-form ref="userForm2" :model="FormData2" :rules="rules2">
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="FormData2.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="手机号:" prop="mobile">
          <el-input v-model="FormData2.mobile" placeholder="请输入手机号" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="flex_form">
          <el-button>取 消</el-button>
          <el-button type="primary" @click="submitEForm(userForm2)"
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
  userListApi,
  userAddApi,
  userChangeStateApi,
  userChangeApi,
  userDelateApi,
} from "@/util/request";
export default {
  name: "users",
  setup() {
    const data = reactive({
      keyWord: "",
      searchParams: {
        query: "",
        pagesize: 5,
        pagenum: 1,
      },
      total: 0,
      userList: [],
      dialogFormVisible: false,
      dialogFormEVisible: false,
      FormData: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      FormData2: {
        id: "",
        email: "",
        mobile: "",
      },
      rules: {
        username: [
          { required: true, message: "此项为必填项", trigger: "blur" },
        ],
        password: [
          { required: true, message: "此项为必填项", trigger: "blur" },
        ],
        email: [
          {
            required: false,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "请填写正确邮箱",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: false,
            pattern: /^1[3456789]\d{9}$/,
            message: "请填写正确的手机号",
            trigger: "blur",
          },
        ],
      },
      rules2: {
        email: [
          {
            required: false,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "请填写正确邮箱",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: false,
            pattern: /^1[3456789]\d{9}$/,
            message: "请填写正确的手机号",
            trigger: "blur",
          },
        ],
      },
    });
    const searchList = () => {
      // 模拟搜索
      userListApi(data.searchParams).then((res) => {
        if (res.data) {
          console.log(res.data); // 假设返回的res.data为搜索结果
          data.userList = res.data.users;
          data.total = res.data.total;
        }
      });
    };

    const addUser = () => {
      // 模拟跳转到新建用户页面
      console.log("添加用户");
      data.dialogFormVisible = true;
    };
    //新增提交
    const submitForm = (formEl) => {
      formEl.validate((res) => {
        if (!res) {
          return;
        } //验证通过
        userAddApi(data.FormData).then((res) => {
          if (res.data) {
            data.dialogFormVisible = false;
            data.FormData = {
              username: "",
              password: "",
              email: "",
              mobile: "",
            };
          }
          //重新更新
          searchList();
        });
      });
    };
    //修改提交
    const submitEForm = (formEl) => {
      formEl.validate((res) => {
        if (!res) {
          return;
        }
        userChangeApi(data.FormData2).then((res) => {
          searchList();
          data.dialogFormEVisible = false;
        });
      });
    };
    searchList();
    const userForm = ref();
    const userForm2 = ref();
    //状态更改
    const switchChange = (row) => {
      console.log("操作的那条数据", row);
      userChangeStateApi(row).then((res) => {
        if (res.data) {
          //重新更新
          searchList();
        }
      });
    };

    const editRow = (row) => {
      console.log("编辑的数据", row);
      const { email, mobile, id } = row;
      //展示编辑表单
      data.dialogFormEVisible = true;
      data.FormData2.id = id;
      data.FormData2.email = email;
      data.FormData2.mobile = mobile;
    };

    //删除
    const delateRow = (row) => {
      console.log("删除的数据", row);
      userDelateApi(row).then(() => {
        if (res.data) {
          searchList();
        }
      });
    };
    return {
      ...toRefs(data),
      searchList,
      addUser,
      userForm,
      userForm2,
      submitForm,
      submitEForm,
      switchChange,
      editRow,
      delateRow,
    };
  },
};
</script>

<style scoped>
.input_box {
  width: 20%;
  margin-right: 20px;
}
.flex_form {
  display: flex;
  justify-content: flex-end;
}
</style>
