<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input
          placeholder="请输入商品大类名称..."
          v-model="queryForm.query"
          clearable
        ></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="initBigTypeList"
        >搜索</el-button
      >
      <el-button type="primary" :icon="DocumentAdd" @click="handleDialogValue(null)"
        >添加商品大类</el-button
      >
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="#ID" width="80" />
      <el-table-column prop="name" label="商品大类名称" width="200" />
      <el-table-column prop="image" label="商品大类图片" width="200">
        <template v-slot="scope">
          <img
            :src="getServerUrl() + '/image/bigType/' + scope.row.image"
            width="80"
            height="80"
          />
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="商品大类描述" />
      <el-table-column prop="action" label="操作" width="300" fixed="right">
        <template v-slot="scope">
          <el-button type="success" @click="handleImageDialogValue(scope.row)"
            >更换图片</el-button
          >
          <el-button
            type="primary"
            :icon="Edit"
            @click="handleDialogValue(scope.row.id)"
          />
          <el-button
            type="danger"
            :icon="Delete"
            @click="handleDelete(scope.row.id)"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="queryForm.pageNum"
      v-model:page-size="queryForm.pageSize"
      :page-sizes="[10, 20, 30, 40, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
  <Dialog
    v-model="dialogVisible"
    :dialogVisible="dialogVisible"
    :id="id"
    :dialogTitle="dialogTitle"
    @initBigTypeList="initBigTypeList"
  ></Dialog>
  <imageDialog
    v-model="imageDialogVisible"
    :imageDialogValue="imageDialogValue"
    @initBigTypeList="initBigTypeList"
  ></imageDialog>
</template>

<script setup>
//   图标引入
import { Search, Delete, Edit, DocumentAdd } from "@element-plus/icons-vue";
import { ref } from "vue";
import axios, { getServerUrl } from "@/util/axios";
//   组件引入
import Dialog from "./components/dialog";
import imageDialog from "./components/imageDialog";

import { ElMessage, ElMessageBox } from "element-plus";

//   查询参数
const queryForm = ref({
  query: "",
  pageNum: 1,
  pageSize: 10,
});
//   总记录数
const total = ref(0);
//   表单数据
const tableData = ref([]);

const id = ref(-1);

// 添加或修改 商品大类的弹窗的标题内容
const dialogTitle = ref("");

// 添加或修改 商品大类的弹窗
const dialogVisible = ref(false);

// 上传商品大类的 图片的弹窗
const imageDialogVisible = ref(false);

// 给图片组件传递的数据
const imageDialogValue = ref({});
//   1.初始化商品大类列表
const initBigTypeList = async () => {
  const res = await axios.post("/admin/bigType/list", queryForm.value);
  tableData.value = res.data.bigTypeList;
  total.value = res.data.total;
};
// 1.1 调用初始化方法
initBigTypeList();

// 1.2.每页显示多少条的 事件(分页)
const handleSizeChange = (pageSize) => {
  queryForm.value.pageSize = pageSize;
  initBigTypeList();
};
// 1.3.显示第几页的事件(分页)
const handleCurrentChange = (pageNum) => {
  queryForm.value.pageNum = pageNum;
  initBigTypeList();
};

// 2.打开添加或修改 商品大类的弹窗（添加或修改）---》逻辑交给 Dialog组件 处理
const handleDialogValue = (bigTypeId) => {
  if (bigTypeId!=null) {
    id.value = bigTypeId;
    dialogTitle.value = "商品大类修改";
  } else {
    id.value = -1;
    dialogTitle.value = "商品大类添加";
  }
  dialogVisible.value = true;
};
// 3.更换图片---》逻辑交给 imageDialog组件 处理
const handleImageDialogValue = (row) => {
  imageDialogVisible.value = true;
  imageDialogValue.value = JSON.parse(JSON.stringify(row));
};
// 4.删除一条记录
const handleDelete = (id, status) => {
  ElMessageBox.confirm("您确定要删除这条记录吗?", "系统提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let res = await axios.get("admin/bigType/delete/" + id);
      if (res.data.code == 0) {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        initBigTypeList();
      } else {
        ElMessage({
          type: "error",
          message: res.data.msg,
        });
      }
    })
    .catch(() => {});
};
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
