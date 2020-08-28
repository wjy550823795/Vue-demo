<template>
  <div>
    <el-container>
      <el-aside>
        <el-menu
          style="height: 100%;"
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">管理导航</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/college">学院管理</el-menu-item>
              <el-menu-item index="1-2">绩效管理</el-menu-item>
              <el-menu-item index="1-3">人员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="el-header">
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-button type="button" class="el-button el-button--text" style="font-size: 28px;">
              <i class="el-icon-s-fold"></i>
            </el-button>
          </el-radio-group>
          <div>
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </div>
        </el-header>
        <el-main>
          <router-view style="height:100%" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style>
.el-header {
  height: 64px;
  box-shadow: rgba(0, 21, 41, 0.08) 0px 1px 4px;
  background-color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
<script>
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>