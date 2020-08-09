<template>
  <div class="aside">
    <el-menu
        :default-active="index"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="isRouter">
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/management">
        <i class="el-icon-user-solid"></i>
        <span slot="title">会员管理</span>
      </el-menu-item>
      <el-menu-item index="/supplier">
        <i class="el-icon-s-goods"></i>
        <span slot="title">供应商管理</span>
      </el-menu-item>
      <el-menu-item index="/goods">
        <i class="el-icon-s-goods"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
      <el-menu-item index="/staff">
        <i class="el-icon-user-solid"></i>
        <span slot="title">员工管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
      name: 'Aside',
      data() {
          return {
              index: this.$router.history.current.path || 'home',
              isRouter: true
          }
      },
      methods: {
          handleOpen() {
          },
          handleClose() {
          }
      }
  }
</script>

<style lang="scss" scoped>
  .aside {
    position: absolute;
    top: 50px;
    left: 0px;
    bottom: 0px;
    width: 200px;
    overflow: hidden;
    background-color: #555c66;
    .el-menu {
      width: 200px;
      .el-menu-item {
        text-align: left;
      }
    }
  }
</style>