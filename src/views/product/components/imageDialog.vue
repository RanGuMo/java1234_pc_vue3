<template>
  <!-- model-value="imageDialogVisible" 显示与隐藏 -->
  <el-dialog
    model-value="imageDialogVisible"
    title="商品图片更换"
    width="30%"
    @close="handleClose"
    center
  >
    <el-form
      ref="formRef"
      :model="form"
      label-width="100px"
      style="text-align: center"
    >
     <!--action 图片上传的接口 -->
      <el-upload
        :headers="headers"
        class="avatar-uploader"
        :action="getServerUrl() + '/admin/product/uploadImage'"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">确认更换</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, defineProps, ref, watch } from "vue";
import axios, { getServerUrl } from "@/util/axios";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

// 1.子组件声明接收 props 属性 imageDialogValue为父组件传过来的row
const props = defineProps({
  imageDialogValue: {
    type: Object,
    default: () => {},
    required: true,
  },
});
// 2.设置请求头信息，必须携带token
const headers = ref({
  token: window.localStorage.getItem("token"),
});

// 3.form表单数据
const form = ref({
  id: -1,
  proPic: "",
});
// form表单的 ref
const formRef = ref(null);


const imageUrl = ref("");

// 监听父组件传来的 imageDialogValue ，有值就马上绑定 form和imageUrl
watch(
  () => props.imageDialogValue,
  () => {
    form.value = props.imageDialogValue;
    imageUrl.value = getServerUrl() + "/image/product/" + form.value.proPic;
  },
  { deep: true, immediate: true }
);
// 自定义事件
const emits = defineEmits(["update:modelValue", "initProductList"]);


// 弹窗的关闭事件，这个是可以修改父组件中的 imageDialogVisible为false，从而关闭自身的弹窗
const handleClose = () => {
  emits("update:modelValue", false);
};

// 图片上传成功的回调
const handleAvatarSuccess = (res) => {
  imageUrl.value = getServerUrl() + res.data.src;
  form.value.proPic = res.data.title;
};
// 图片上传前的校验 只能是jpg类型，且不能大于2M
const beforeAvatarUpload = (file) => {
  const isJPG = file.type === "image/jpeg";
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    ElMessage.error("图片必须是jpg格式");
  }
  if (!isLt2M) {
    ElMessage.error("图片大小不能超过2M!");
  }
  return isJPG && isLt2M;
};

// 点击了确定更换图片按钮
const handleConfirm = async () => {
  let result = await axios.post("/admin/product/save", form.value);
  let data = result.data;
  if (data.code == 0) {
    ElMessage.success("执行成功！");
    formRef.value.resetFields();
    emits("initProductList");
    handleClose();
  } else {
    ElMessage.error(data.msg);
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
