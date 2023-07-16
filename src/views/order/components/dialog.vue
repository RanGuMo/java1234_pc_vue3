<template>
  <el-dialog
    model-value="dialogVisible"
    title="订单商品详情"
    width="40%"
    @close="handleClose"
  >
    <!-- 订单商品详情列表 -->
    <el-table :data="tableData" stripe style="width: 100%"> 
        <el-table-column type="index" width="50"/>
        <el-table-column prop="goodsPic" label="商品图片" >
        <template v-slot="scope">
            <img :src="getServerUrl()+'/image/product/'+scope.row.goodsPic" width="80" height="80"/>
        </template>
        </el-table-column>
        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
        <el-table-column prop="goodsPrice" label="商品价格" width="100"></el-table-column>
        <el-table-column prop="goodsNumber" label="商品数量" width="100"></el-table-column>
     </el-table>
  </el-dialog>
</template>

<script setup>
import axios,{getServerUrl} from "@/util/axios";
import { watch,ref } from "vue";

const emits = defineEmits(["update:modelValue"]);
const handleClose = () => {
  emits("update:modelValue", false);
};

const props = defineProps({
  id: {
    type: Number,
    default: -1,
    required: true,
  },
});
watch(
  () => props.id,
  () => {
    // console.log("id="+props.id);
    if (props.id === -1) return;
    initOrderDetailData(props.id);
  }
);
const tableData = ref([]);

const initOrderDetailData = async (id) => {
  let res = await axios.get("/admin/orderDetail/list/" + id);
    if (res.data.code === 0) {
    console.log(res.data.list,"商品详情。。。");
    tableData.value = res.data.list;
  }
};
</script>

<style scoped></style>
