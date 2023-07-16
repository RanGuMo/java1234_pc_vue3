<template>
  <el-dialog
    model-value="imageDialogVisible"
    title="商品大类图片更换"
    width="30%"
    @close="handleClose"
    center
  >
    <el-form
      ref="formRef"
      label-width="100px"
      style="text-align: center"
    >
    <!--:action="getServerUrl() + '/admin/bigType/uploadImage'"
    点击选中图片 就会通过该url 上传到服务器中，headers 来设置请求头信息  -->
      <el-upload
        :headers="headers"
        class="avatar-uploader"
        :action="getServerUrl() + '/admin/bigType/uploadImage'"
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

const tableData = ref([]);

const props = defineProps({
  imageDialogValue: {
    type: Object,
    default: () => {},
    required: true,
  },
});

// 1.头像上传需要请求头携带 token
const headers = ref({
  token: window.localStorage.getItem("token"),
});

// 接收父组件传过来的 bigType 对象，用于调用接口
const form = ref({
  image:''
});

const formRef = ref(null);

const imageUrl = ref("");

// 如果传来 bigType 对象，就立马赋值给form，并且更改
watch(
  () => props.imageDialogValue,
  () => {
    form.value = props.imageDialogValue;
    imageUrl.value = getServerUrl() + "/image/bigType/" + form.value.image;
    console.log(form.value.image,"form.value........")
  },
  { deep: true, immediate: true }
);

const emits = defineEmits(["update:modelValue", "initBigTypeList"]);

// 关闭弹窗
const handleClose = () => {
  emits("update:modelValue", false);
  formRef.value.resetFields();
};
// 2、头像上传成功后，就会触发该方法，可以通过res拿到结果，进行头像的回显
const handleAvatarSuccess = (res) => {
  console.log(res,"res....................................")
  imageUrl.value = getServerUrl() + res.data.src; //图片地址
  form.value.image = res.data.title; // 图片标题名字
};

// 0.头像上传前的判断，只能是jpg格式，且大小不能超过2M
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

// 4、点击更换图片的 按钮
const handleConfirm = async () => {
  // console.log(form.value,"form.value....................................")
  let result = await axios.post("/admin/bigType/save", form.value);
  let data = result.data;
  if (data.code == 0) {
    ElMessage.success("执行成功！");
    emits("initBigTypeList"); //调用父组件的 初始化方法
    handleClose(); // 关闭弹窗
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
