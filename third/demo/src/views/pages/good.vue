<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
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
    </div>
    <!--表格-->
    <el-table :data="goodsList" style="width: 100%">
      <el-table-column prop="goods_name" label="商品名称" width="180" />
      <el-table-column prop="goods_price" label="价格(￥)" width="180" />
      <el-table-column prop="goods_weight" label="商品重量" />
      <el-table-column prop="goods_state" label="状态">
        <!--插槽-->
        <template #default="scope">
          <p>{{ switchStade(scope.row.goods_state) }}</p>
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
</template>

<script>
import { reactive, toRefs, ref } from "vue";
import { goodsListApi } from "@/util/request";
export default {
  name: "goods",
  setup() {
    const data = reactive({
      searchParams: {
        query: "",
        pagesize: 5,
        pagenum: 1,
      },
      total: 0,
      goodsList: [],
    });
    const searchList = () => {
      // 模拟搜索
      goodsListApi(data.searchParams).then((res) => {
        if (res.data) {
          console.log(res.data); // 假设返回的res.data为搜索结果
          data.goodsList = res.data.goods;
          data.total = res.data.total;
        }
      });
    };
    const switchStade = (state) => {
      switch (state) {
        case 0:
          return "未通过";
          break;
        case 1:
          return "审核中";
          break;
        case 2:
          return "已通过";
          break;
      }
    };

    searchList();
    return {
      ...toRefs(data),
      searchList,
      switchStade,
    };
  },
};
</script>

<style scoped lang="less"></style>
