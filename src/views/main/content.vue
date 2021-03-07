<template>
  <div class="content">

    <el-breadcrumb separator="" v-show="$route.meta.title !== '首页'">
      <el-breadcrumb-item :to="{ path: $route.path }" class="content-title">{{ $route.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>

    <router-view/>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .content {
    position: absolute;
    top: 50px;
    left: 200px;
    bottom: 0;
    right: 0;
    overflow-y: auto;
    padding: 5px;
    .el-breadcrumb {
      font-size: 16px;
      padding: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      border-radius: 4px;
      font-weight: 700;
      .content-title {
        border-left: 2px solid darkgreen;
        padding-left: 10px;
      }
    }
  }
</style>