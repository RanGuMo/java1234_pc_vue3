<template>
  <el-breadcrumb separator="/">
    <!-- 1、遍历面包屑路由 -->
    <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
        <!-- 2、如果是最后一个 加上不跳转的样式 -->
      <span class="no-redirect" v-if="index == breadcrumbList.length - 1">
        {{ item.name }}</span
      >
      <!-- 3、不是最后一个路由 加 跳转的样式，并且可以跳转 -->
      <span class="redirect" v-else @click="handleRedirect(item.path)">
        {{ item.name }}</span
      >
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
console.log(route.matched);
const breadcrumbList = ref([]);

// 1、面包屑的 路由点击跳转
const handleRedirect = (path) => {
  router.push(path);
};
// 2、初始化路由
const initBreadcrumbList = () => {
  breadcrumbList.value = route.matched;
};

// 3、监听路由，立即执行监听，深度监听
watch(
  route,
  () => {
    initBreadcrumbList();
  },
  { deep: true, immediate: true }
);
</script>
<style lang="scss" scoped>
.no-redirect {
  cursor: text;
}
.redirect {
  color: #666;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: #304156;
  }
}
</style>
