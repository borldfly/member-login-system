<template>
  <div class="management" ref="management">
    <!--
      表格数据 :data
      样式设置:
        表头样式 header-cell-style
        表体样式 cell-style
    -->
    <el-form ref="searchForm" :model="search" class="demo-form-inline filter" :inline="true">
      <!--
        设置重置步骤:
          1.新增ref属性，便于找到对应元素
          2.在表单项 el-form-item中添加对应的prop属性，指定对应的值
      -->
      <el-form-item prop="cardNum">
        <el-input v-model="search.cardNum" placeholder="请输入会员卡号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="search.name" placeholder="请输入会员姓名"></el-input>
      </el-form-item>
      <el-form-item prop="cardNum">
        <el-input v-model="search.cardNum" placeholder="请输入会员卡号"></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select v-model="search.payType" placeholder="请选择支付类型" style="width: 200px;">
          <el-option v-for="(item,index) in payTypeOptions" :key="index" :label="item.name" :value="item.type"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <!--<el-col :span="18">
          <el-form-item prop="date1">-->
            <el-date-picker type="date" placeholder="选择日期" v-model="search.birthday" style="width: 200px"></el-date-picker>
          <!--</el-form-item>-->
        <!--</el-col>-->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitQuery()" icon="el-icon-search">查询</el-button>
        <el-button type="primary" @click="handleAdd('editForm')" icon="el-icon-plus">新增</el-button>
        <el-button type="default" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="dataList"
        height="calc(100vh - 220px)"
        border
        stripe
        :header-cell-style="{'text-align': 'center'}"
        :cell-style="{'text-align': 'center'}"
        style="width: 100%">
      <!--
          对象属性名prop对应对象的值，label对应表头名称，type="index"即按索引顺序排列 width对应列宽的大小
       -->
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="cardNum" label="会员卡号" width="150"></el-table-column>
      <el-table-column prop="name" label="会员姓名"></el-table-column>
      <el-table-column prop="birthday" label="会员生日"></el-table-column>
      <el-table-column prop="phone" label="会员手机号"></el-table-column>
      <el-table-column prop="integral" label="会员积分"></el-table-column>
      <el-table-column prop="money" label="可用余额"></el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template slot-scope="scope">
          <span>{{ scope.row.payType | payTypeTransfer }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址" width="200"></el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="250">
        <template slot-scope="scope">
          <el-button @click="updateMem(scope.row)" type="default" size="small">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteMem(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--<span class="demonstration">完整功能</span>-->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="block">
    </el-pagination>

    <el-dialog title="会员编辑" :visible.sync="dialogFormVisible" width="500px" fullscreen>
      <el-form
          ref="editForm"
          :model="form"
          label-position="right"
          :label-width="formLabelWidth"
          style="width: 300px"
      >
        <el-form-item label="会员卡号" :label-width="formLabelWidth" prop="cardNum"
            :rules="[
              {required: true,message: '卡号不能为空'},
              {type: 'number',message: '卡号必须为数字'}
            ]">
          <el-input v-model.number="form.cardNum" autocomplete="off" placeholder="请输入会员卡号"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name"
            :rules="[
              {required: true,message: '姓名不能为空'}
            ]"
        >
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入会员姓名"></el-input>
        </el-form-item>
        <el-form-item label="会员生日" prop="birthday">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 180px"></el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model.number="form.phone" autocomplete="off" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额" prop="money"
          :rules="[
              {required: true,message: '开卡金额不能为空'}
          ]">
          <el-input v-model.number="form.money" autocomplete="off" placeholder="请输入开卡金额"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" required prop="payType">
          <el-select v-model="form.payType" placeholder="请选择支付类型">
            <el-option v-for="item in payTypeOptions" :label="item.name" :key="item.name" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" prop="address">
          <el-input type="textarea" v-model="form.address" autocomplete="off" placeholder="请输入会员地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="formEdit('editForm')">{{ isAdd ? '新 增' : '修 改' }}</el-button>
        <el-button type="primary" @click="resetForm('editForm')">重 置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getList,getMemberList,getConditionQuery,addMember,queryMember,updateMember,deleteMember} from '../../api/httpService'

const payTypeOptions = [
    {type: 1, name: '现金'},
    {type: 2, name: '支付宝'},
    {type: 3, name: '微信'},
    {type: 4, name: '银行卡'}
];

export default {
    name: 'Management',
    data() {
        return {
            dataList: [],
            pageSize: 10,
            total: 0,
            currentPage: 1,
            payTypeOptions,
            search: {
                cardNum: '',
                name: '',
                payType: '',
                birthday: ''
            },
            dialogFormVisible: false, // 对话框的显示与隐藏 false:隐藏；true:显示
            formLabelWidth: '120px',
            form: {
                cardNum: '',
                name: '',
                payType: '',
                birthday: '',
                phone: '',
                money: ''
            },
            isAdd: true, // 是否新增
            id: null
        }
    },
    created() {
        // 初始化查询数据
        this.init();
    },
    mounted() {
        console.log(document.getElementsByClassName('content')[0].offsetHeight);
    },
    methods: {
        init() {
            getList().then(res => {
                var resData = res.data;
                if (resData.code === 200){
                    this.total = resData.data.length;
                    this.queryMemberList();
                }
            },error => {
                this.$message('错误原因：' + error)
            });
        },
        updateMem(row) {
            // console.log(row);
            this.id = row.id; // 会员id
            this.handleAdd('editForm');
            this.isAdd = false;
            queryMember(row.id).then(res=>{
                const resData = res.data;
                if (resData.code === 200){
                    this.form = resData.data;
                }else {
                    this.$message({
                        type: 'warning',
                        message: '查询失败'
                    })
                }
            },error => {
                this.$message({
                    type: 'warning',
                    message: '删除失败，失败原因：' + error
                })
            })
        },
        deleteMem(row) {
            this.$confirm('是否确认删除此会员','请确认',{
                distinguishCancelAndClose: true,
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                showClose: false
            }).then(()=>{
                deleteMember(row.id).then(res=>{
                    var resData = res.data;
                    if (resData.code === 200){
                        this.$message({
                            type: 'success',
                            message: resData.message
                        })
                        this.init();
                    }else {
                        this.$message({
                            type: 'warning',
                            message: '删除失败'
                        })
                    }
                },error => {
                    this.$message({
                        type: 'warning',
                        message: '删除失败，失败原因：' + error
                    })
                })
            }).catch(()=>{  // 取消逻辑
            });
        },
        handleAdd(name) {
            this.isAdd = true;
            this.dialogFormVisible = true;
            // DOM渲染完毕后，重置表单
            this.$nextTick(()=>{
                this.$refs[name].resetFields();
            });
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.currentPage = 1;
            this.queryMemberList()
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.queryMemberList();
        },
        // 分页查询会员列表
        queryMemberList() {
            // 默认查第一页数据
            getMemberList(this.currentPage, this.pageSize).then(res => {
                const resData = res.data;
                if (resData.code === 200){
                    this.dataList = resData.data.row;
                }
            },error => {
                this.$message('错误原因：' + error)
            })
        },
        // 条件查询
        submitQuery() {
            if (!this.search.cardNum && !this.search.name && !this.search.payType && !this.search.birthday){
                this.$message('请先输入查询条件');
                return;
            }
            getConditionQuery(this.search).then(res=>{
                const resData = res.data;
                if (resData.code === 200){
                    this.dataList = resData.data.row;
                }
            },error => {
                this.$message('错误原因：' + error)
            })
        },
        // 重置表单
        resetForm(name) {
            // console.log('重置',name);
            this.$refs[name].resetFields();
        },
        // 数据新增
        formEdit(name) {
            // DOM渲染完毕后重置表单
            this.$refs[name].validate(valid=>{
                if (!valid){
                    return;
                } else {
                    this.isAdd ?
                        // 新增会员
                        addMember(this.form).then(res => {
                            var resData = res.data;
                            if (resData.code === 200){
                                this.$message({
                                    type: 'success',
                                    message: resData.message
                                });
                                this.dialogFormVisible = false;
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: '新增失败'
                                });
                            }
                        },error => {
                            this.$message({
                                type: 'warning',
                                message: '新增失败，原因：' + error
                            });
                        }) :
                        // 修改会员
                        updateMember(this.id,this.form).then(res=>{
                            var resData = res.data;
                            if (resData.code === 200){
                                this.$message({
                                    type: 'success',
                                    message: resData.message
                                });
                                this.dialogFormVisible = false;
                                this.init();
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: '修改失败'
                                });
                            }
                        },error => {
                            this.$message({
                                type: 'warning',
                                message: '修改失败，原因：' + error
                            });
                        })
                }
            })
        }
    },
    filters: {
        // 支付类型转换
        payTypeTransfer(type) {
            const payObj = payTypeOptions.find(item => item.type === type);
            return payObj.name || null;
        }
    }
}
</script>

<style lang="scss" scoped>
    .management {
      margin-top: 10px;
      .filter {
        text-align: left;
      }
      .search_input {
        width: 200px;
        &:nth-child(2) {
          margin-left: 8px;
        }
      }
      .block {
        margin-top: 10px;
        text-align: left;
      }
    }
</style>

<!-- 自定义验证 -->