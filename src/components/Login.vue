<template>
  <div class="login" @keyup.enter="submitForm('form')">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="login-form">
      <h2>会员登录系统</h2>
      <el-form-item label="账号" prop="name">
        <el-input v-model="form.name" type="text" :placeholder="nameTips"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" :placeholder="pwdTips" @keyup.enter="submitForm('form')"></el-input>
      </el-form-item>
      <el-form-item>
        <!--<el-button type="primary" @click="submitForm('form')">登录</el-button>-->
        <!--利用vuex状态保存数据-->
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
        <el-button @click="resetForm('form')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
      /***************************************  自定义验证  ***********************************/
      var nameValid = (rule, value, callback) => {
          if (!value){
              this.$message({
                  type: 'error',
                  message: '请输入账号'
              });
              return false;
          }
          callback();
      };
      var passValid = (rule, value, callback) => {
          if (!value){
              this.$message({
                  type: 'error',
                  message: '请输入密码'
              });
              return false;
          }
          // 判断6位数密码
          callback();
      };
      return {
          form: {
              name: '',
              password: ''
          },
          nameTips: '请输入账号',
          pwdTips: '请输入6位数字密码',
          rules: {
              name:[
                  { required: true, message: '请输入账号', triggle: 'blur' },
                  { validator: nameValid }
              ],
              password: [
                  { required: true, message: '请输入密码', triggle: 'blur' },
                  { validator: passValid, type: 'number'}
              ]
          }
      }
  },
  methods: {
      submitForm(name) {
          /**
           * valid: 是否通过校验
           */
          this.$refs[name].validate((valid) => {
              if (valid) { // 初步验证通过
                  // 提交数据验证
                  var nValue = Number(this.form.password);
                  if (this.form.password.length != 6 || isNaN(nValue) || !Number.isInteger(nValue)) {
                      this.$message({
                          type: 'info',
                          message: '验证失败，请输入6位数字密码'
                      });
                  }  else {
                      let that = this;
                      this.$message({
                          type: 'success',
                          message: '验证成功',
                          duration: 100,
                          onClose() {
                              that.$store.dispatch('toLogin', that.form).then((res)=>{
                                  that.$store.dispatch('Login', res.token).then(()=>{
                                      // 路由传参
                                      that.$router.push({path:'/home',query:{name:"test"}});
                                  })
                              })
                          }
                      });
                  }
              } else {
                  return false;
              }
          });
      },
      resetForm(name) {
          this.$refs[name].resetFields(); // 数据重置
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .login-form {
    width: 300px;
    background-color: #ccc;
    padding: 30px;
    margin: 160px auto;
    text-align: center;
    border-radius: 20px;
    h2 {
      font-weight: 900;
    }
  }
</style>
