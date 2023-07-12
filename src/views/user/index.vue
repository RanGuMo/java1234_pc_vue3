<template>
  <el-card>
    <!-- gutter 表示间隙 指定列之间的间距 -->
    <el-row :gutter="20" class="header">
      <!-- 搜索区域 -->
      <el-col :span="7">
        <el-input
          placeholder="请输入用户昵称..."
          v-model="queryForm.query"
          clearable
        ></el-input>
      </el-col>
      <el-button type="primary" :icon="Search">搜索</el-button>
    </el-row>

    <!-- 内容区域 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="#ID" width="80" />
      <el-table-column prop="nickName" label="用户昵称" width="200" />
      <el-table-column prop="avatarUrl" label="头像">
        <template v-slot="scoped">
            <img :src="scoped.row.avatarUrl" width="50" height="50" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="openid" label="openID"/>
        <el-table-column prop="registerDate" label="注册日期" width="200" />
        <el-table-column prop="lastLoginDate" label="最后登录日期" width="200" />
    </el-table>

    <!-- 分页器 -->
    <!--   :small="true"  分页器会变小
      :disabled="true"    分页器会禁用，不能点击
      :background="true"   每个页码 都会添加背景色，蓝色 -->
    <el-pagination
      v-model:current-page="queryForm.pageNum"
      v-model:page-size="queryForm.pageSize"
      :page-sizes="[10, 20, 30, 40, 50]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script setup>
// 引入图标
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";
import axios from "@/util/axios";
// 查询条件
const queryForm = ref({
    query: "", // 查询条件
    pageNum: 1, // 第几页
    pageSize:10  // 每页显示的条数
});
// 表格展示的数据
const tableData = ref([])
const total = ref(0) //总页数

// 1.获取初始化的表格数据
const initUserList = async () => {
    // 1.1 发起请求获取数据
    const res = await axios.post('/admin/user/list',queryForm.value);
    // 1.2.赋值给tableData 以及 total
    tableData.value = res.data.userList;
    total.value = res.data.total;
}
// 2.调用初始化方法
initUserList();

// 3.每页显示多少条 的改变事件
const handleSizeChange = (pageSize) => {
    queryForm.value.pageNum = 1;
    queryForm.value.pageSize = pageSize;
    initUserList();
}
// 3.切换页数的改变事件
const handleCurrentChange = (pageNum) => {
    queryForm.value.pageNum = pageNum;
    initUserList();
}

</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}
.el-pagination {
  padding-top: 15px;
  box-sizing: border-box;
}
</style>
