<template>
  <div class="header">
    <div class="logo_c">
      <img src="../../assets/douyin.png" alt="" class="logo">
      <span>会员管理系统</span>
    </div>
    <div class="rt">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-edit" command="changePwd">修改密码</el-dropdown-item>
          <el-dropdown-item icon="el-icon-switch-button" command="logout">退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="cl"></div>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="500px">
        <el-form
          :model="pwdList"
          ref="pwdForm"
          label-width="120px"
          label-position="right"
          :rules="rules"
          :status-icon="true"
          style="width: 400px;text-align: center;">
          <el-form-item prop="oPwd" label="原密码" required>
            <el-input type="password" v-model="pwdList.oPwd" placeholder="请输入原密码"></el-input>
          </el-form-item>
          <el-form-item prop="mPwd" label="新密码" required>
            <el-input type="password" v-model="pwdList.mPwd" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item prop="cPwd" label="确认密码" required>
            <el-input type="password" v-model="pwdList.cPwd" placeholder="请再次输入密码"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button type="default" @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm('pwdForm')">确认修改</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
  import {logout} from "../../api/common";
  // import {storage} from "../../api/common";
  import {pwdAlter, pwdVerify} from "../../api/httpService";
  import {Loading} from 'element-ui'
  import {getUser, getToken} from "../../api/auth";

  export default {
      name: 'Header',
      data() {
          const username = getUser() || null;
          // 自定义验证
          const oPwdVerify = (rule, value, callback) => {
              // 密码不能为空，且位8-12位字符
              if (!value){
                  callback(new Error('请输入原密码'));
              } else {
                  if (!/^[a-z0-9]{8,12}$/.test(value)){
                      callback(new Error('请输入8-12位字符密码'))
                  }
                  callback();
              }
          };
          const mPwdVerify = (rule, value, callback) => {
              // 修改密码不能与原密码一致，且必须与确认密码一致
              if (!value){
                  callback(new Error('请输入新密码'));
              } else {
                  if (!/^[a-z0-9]{8,12}$/.test(value)){
                      callback(new Error('请输入8-12位字符密码'))
                  } else if (this.pwdList.oPwd === value){
                      // 如果原密码与修改密码一致
                      callback(new Error('原密码不能与新密码一致'))
                  } else {
                      // 前往验证确认密码cPwd
                      this.$refs['pwdForm'].validateField('cPwd');
                  }
                  callback();
              }
          };
          const cPwdVerify = (rule, value, callback) => {
              if (!value){
                  callback(new Error('请输入确认密码'));
              } else {
                  if (!/^[a-z0-9]{8,12}$/.test(value)){
                      callback(new Error('请输入8-12位字符密码'))
                  } else if (this.pwdList.mPwd !== value){
                      // 如果修改密码与确认密码不一致
                      callback(new Error('新密码与确认密码不一致'))
                  }
                  callback();
              }
          };
          return {
              username: typeof username === 'object' && username.name,
              dialogVisible: false,
              pwdList: {
                  oPwd: '',
                  mPwd: '',
                  cPwd: ''
              },
              rules: {
                  oPwd: [
                      {validator: oPwdVerify, triggle: 'blur'}
                  ],
                  mPwd: [
                      {validator: mPwdVerify, triggle: 'blur'}
                  ],
                  cPwd: [
                      {validator: cPwdVerify, triggle: 'blur'}
                  ],
              }
          }
      },
      methods: {
          handleCommand(command) {
              switch (command) {
                  case 'logout':
                      this.$alert('是否确定退出登录?', '注销', {
                          confirmButtonText: '确定',
                          callback: () => {
                              this.$store.dispatch('Logout',getToken()).then(()=>{
                                  this.$router.replace('/login');
                              })
                          }
                      });
                      break;
                  case 'changePwd':
                      this.dialogVisible = true;
                      this.$nextTick(()=>{
                          this.$refs['pwdForm'].resetFields();
                      });
                      break;
              }
          },
          pwdChange(loading) {  // 修改密码
              pwdAlter(this.pwdList).then(res=>{
                  const resData = res.data;
                  if (resData.code === 200){  // 密码修改成功
                      this.$message({
                          type: 'success',
                          message: resData.message
                      });
                      this.dialogVisible = false;
                      this.$nextTick(()=>{
                          loading.close();
                      })
                  }
              })
          },
          submitForm(name) {
              this.$refs[name].validate(valid=>{
                  if (valid){
                      let loadingInstance = Loading.service({target: 'body'}); // 全局等待层样式
                      pwdVerify().then(res=>{
                          const resData = res.data;
                          if (resData.code === 200){ // 密码正确
                              // 再调密码修改接口
                              this.pwdChange(loadingInstance);
                          }else {
                              this.$message({
                                  type: 'error',
                                  message: '验证失败'
                              });
                              this.$nextTick(()=>{
                                  loadingInstance.close();
                              })
                          }
                      })
                  }
              })
          }
      }
  }
</script>

<style scoped lang="scss">
  .header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    line-height: 50px;
    padding: 0 30px;
    background-color: #2c3a4a;
    .logo_c {
      text-align: left;
      vertical-align: middle;
      min-width: 200px;
      position: relative;
      float: left;
      .logo {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 10px;
      }
      span {
        margin-left: 40px;
        color: #fff;
        font-family: 'Arial','微软雅黑';
      }
    }
    .rt {
      margin-right: 30px;
      float: right;
      .el-dropdown-link {
        color: #fff;
      }
    }
    .cl {
      content: '';
      clear: both;
    }
  }
</style>