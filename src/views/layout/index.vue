<template>
  <el-container class="app-wrapper">
    <el-aside width="200px" class="sidebar-container"><Menu /></el-aside>
    <el-container>
      <el-header>
        <div class="navbar">
          <Breadcrumb />
          <div class="navbar-right">
            <Avatar />
          </div>
        </div>
      </el-header>
      <el-main>
        <!-- 路由出口 -->
        <router-view></router-view>
      </el-main>
      <el-footer>
        <Footer/>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup>
import Menu from "@/views/layout/menu";
import Breadcrumb from "@/views/layout/header/breadcrumb";
import Avatar from "@/views/layout/header/avatar";
import Footer from "@/views/layout/footer";
</script>

<style lang="scss" scoped>
// aside侧边栏样式  高度100%
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.sidebar-container {
  background-color: #2d3a4b;
  height: 100%;
}
::v-deep .el-container {
  height: 100%;
}
::v-deep ul.el-menu {
  border-right-width: 0px;
}

// header 样式
.navbar {
  width: 100%;
  height: 60px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 16px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
}
:deep(.el-header) {
  padding: 0px;
}
// header  的头像 样式 avatar
.navbar-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
