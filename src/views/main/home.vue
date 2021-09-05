<template>
  <div class="home">
    <h1>欢迎来到会员登录平台!</h1>
    <el-button class="btn" type="primary" @click="copy" size="mini" :data-clipboard-text="cliptips">copy</el-button>
  </div>
</template>

<script>
import clipboardMixins from '@/mixins/clipboardMixins';
export default {
  name: "Home",
  mixins: [clipboardMixins],
  data() {
    return {
      cliptips: '这是我要复制的内容'
    };
  },
  methods: {
    copy() {
      //测试一键复制组件clipboard
      this.clipboard('.btn').then(res => {
        console.log(res.result);
      },err => {
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>