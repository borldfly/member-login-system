<template>
    <div class="staff">
        <el-form
            :inline="true"
            :model="staffData"
            ref="staffSearch"
            class="m-top"
            >
            <el-form-item prop="account">
                <el-input v-model="staffData.account" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="name">
                <el-input v-model="staffData.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search()" icon="el-icon-search">搜索</el-button>
                <el-button type="primary" @click="handleAdd('editForm')" icon="el-icon-plus">新增</el-button>
                <el-button type="default" @click="reset('staffSearch')">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table
            :data="staffList"
            height="500px"
            border
            stripe
            :header-cell-style="{'text-align': 'center'}"
            :cell-style="{'text-align': 'center'}"
            >
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column prop="account" label="账号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>x
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="phone" label="电话"></el-table-column>
            <el-table-column prop="salary" label="薪酬"></el-table-column>
            <el-table-column prop="entryTime" label="入职时间"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="default" size="small" @click="editAdd(scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="delStaff(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="currentPage"
            :page-size="pageSize"
            :page-sizes="[10,20,50]"
            :total="total"
            class="m-top"
            >
        </el-pagination>
        <el-dialog :visible.sync="staffFormVisible" title="员工编辑" width="500px">
            <el-form ref="editForm" :model="editStaff" label-width="120px" label-position="right" style="width: 340px;" :rules="rules">
                <el-form-item prop="account" label="账号">
                    <el-input v-model="editStaff.account" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item prop="name" label="姓名">
                    <el-input v-model="editStaff.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item prop="age" label="年龄">
                    <el-input v-model="editStaff.age" placeholder="请输入年龄"></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="电话">
                    <el-input v-model="editStaff.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="salary" label="薪资">
                    <el-input v-model="editStaff.salary" placeholder="请输入薪资"></el-input>
                </el-form-item>
                <el-form-item prop="entryTime" label="入职日期">
                    <el-date-picker type="date" v-model="editStaff.entryTime" placeholder="请选择入职日期"></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button type="default" size="small" @click="staffFormVisible = false">取消</el-button>
                <el-button type="primary" size="small" @click="edit('editForm')">确定</el-button>
                <el-button type="default" size="small" @click="reset('editForm')">重置</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        addStaff,
        deleteStaff,
        getStaffList,
        getStaffConditionQuery,
        getStaffListByPage,
        getStaffById,
        updateStaff
    } from "../../api/httpService";

    export default {
        name: "Staff",
        data() {
            return {
                staffData: { // 搜索信息
                    account: '',
                    name: ''
                },
                staffList: [], // 员工列表
                currentPage: 1, // 当前页码
                pageSize: 10, // 单页条数
                total: 0, // 总页数
                staffFormVisible: false, // 新增对话框
                editStaff: {
                    account: '',
                    name: '',
                    age: '',
                    phone: '',
                    salary: '',
                    entryTime: ''
                },
                rules: {
                    account: [
                        {required: true, message: '账号不能为空', triggle: 'blur'}
                    ],
                    name: [
                        {required: true, message: '姓名不能为空', triggle: 'blur'}
                    ]
                },
                staffId: null
            }
        },
        created() {
            this.initData();
        },
        methods: {
            initData() {
                getStaffList().then(res => {
                    const resData = res.data;
                    if (resData.code === 200){
                        this.staffList = resData.data;
                        this.total = resData.data.length;
                    }
                })
            },
            search() {  // 条件搜索
                if (!this.staffData.account && !this.staffData.name){
                    this.$message({
                        type: 'error',
                        message: '请输入搜索条件'
                    });
                } else {
                    getStaffConditionQuery(this.staffData).then(res => {
                        const resData = res.data;
                        if (resData.code === 200){
                            this.staffList = resData.data.row;
                        }
                    })
                }
            },
            handleAdd(name) {
                this.staffFormVisible = true;
                this.$nextTick(()=>{
                    this.$refs[name].resetFields();
                })
            },
            queryByPaging() {
                getStaffListByPage(this.currentPage,this.pageSize).then(res=>{
                    const resData = res.data;
                    if (resData.code === 200){
                        this.staffList = resData.data.row;
                    }
                })
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.queryByPaging();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.queryByPaging();
            },
            reset(name) {
                this.$refs[name].resetFields();
            },
            editAdd(row) {
                this.handleAdd('editForm');
                getStaffById(row.id).then(res=>{
                    const resData = res.data;
                    if (resData.code === 200){
                        this.editStaff = resData.data;
                    }
                })
                this.staffId = row.id;
            },
            delStaff(row) {
                deleteStaff(row.id).then(res => {
                    const resData = res.data;
                    if (resData.code === 200){
                        this.$message({
                            type: 'success',
                            message: resData.message
                        })
                        this.initData(); // 数据初始化
                    }
                })
            },
            edit(name) {
                this.$refs[name].validate(valid=>{
                    if (valid) {
                        if (this.staffId){ // 如果存在，则为修改
                            updateStaff(this.staffId, this.editStaff).then(res=>{
                                const resData = res.data;
                                if (resData.code === 200){
                                    this.$message({
                                        type: 'success',
                                        message: resData.message
                                    })
                                    this.staffFormVisible = false;
                                    this.initData();
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: '修改失败'
                                    })
                                }
                            },error => {
                                this.$message({
                                    type: 'warning',
                                    message: '修改失败'
                                })
                            })
                        } else {
                            addStaff(this.editStaff).then(res=>{
                                const resData = res.data;
                                if (resData.code === 200){
                                    this.$message({
                                        type: 'success',
                                        message: resData.message
                                    });
                                    this.staffFormVisible = false;
                                    this.initData();
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: '新增失败'
                                    })
                                }
                            })
                        }
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .m-top {
        margin-top: 10px;
        text-align: left;
    }
</style>