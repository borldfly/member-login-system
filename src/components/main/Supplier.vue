<template>
    <div class="supplier">
        <el-form :inline="true" :model="searchForm" ref="searchSForm" class="demo-form">
            <el-form-item prop="supplier">
                <el-input v-model="searchForm.supplier" placeholder="供应商名称"></el-input>
            </el-form-item>
            <el-form-item prop="contact" v-if="!isDialog">
                <el-input v-model="searchForm.contact" placeholder="联系人"></el-input>
            </el-form-item>
            <el-form-item prop="phone" v-if="!isDialog">
                <el-input v-model="searchForm.phone" placeholder="联系电话"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="supplierSearch()" icon="el-icon-search">查询</el-button>
                <el-button type="primary" v-if="!isDialog" @click="handleAdd('editSupplierForm')" icon="el-icon-plus">新增</el-button>
                <el-button type="default" v-if="!isDialog" @click="reset('searchSForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table
            :data="supplierList"
            height="calc(100vh - 220px)"
            border
            stripe
            @row-click="handleRowClick"
            :header-cell-style="{'text-align': 'center'}"
            :cell-style="{'text-align': 'center'}">
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column prop="supplier" label="供应商名称"></el-table-column>
            <el-table-column prop="contact" label="联系人"></el-table-column>
            <el-table-column prop="phone" label="联系电话" v-if="!isDialog"></el-table-column>
            <el-table-column prop="remark" label="备注" v-if="!isDialog"></el-table-column>
            <el-table-column
                fixed="right"
                label="操作" v-if="!isDialog">
                <template slot-scope="scope">
                    <el-button type="default" size="small" @click="editSupplier(scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="delSupplier(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            :layout="!isDialog ? 'total, sizes, prev, pager, next, jumper' : 'prev, pager, next'"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20]"
            :page-size="pageSize"
            :total="total"
            class="block">
        </el-pagination>
        <el-dialog title="供应商编辑" :visible.sync="dialogFormVisible" width="500px" fullscreen>
            <el-form
                :model="editForm"
                ref="editSupplierForm"
                label-width="100px"
                label-position="right"
                :rules="rules">
                <el-form-item prop="supplier" label="供应商名称">
                    <el-input v-model="editForm.supplier" placeholder="请输入供应商名称" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="contact" label="联系人">
                    <el-input v-model="editForm.contact" placeholder="请输入联系人" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="联系方式">
                    <el-input v-model="editForm.phone" placeholder="请输入联系方式" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="remark" label="备注">
                    <el-input type="textarea" v-model="editForm.remark" placeholder="请输入备注信息"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="default" size="small" @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" size="small" @click="isAdd ? addData('editSupplierForm') : updateData('editSupplierForm')">{{ isAdd ? '新 增' : '修 改' }}</el-button>
                <el-button type="primary" size="small" @click="reset('editSupplierForm')">重 置</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        addSupplier,
        getSupplierConditionQuery,
        getSupplierList,
        getSupplierById,
        getSupplierListByPage,
        updateSupplier,
        deleteSupplier
    } from "../../api/httpService";

    export default {
        props: {
            isDialog: {
                type: Boolean,
                default: false
            },
            formName: {
                type: String
            }
        },
        name: "Supplier",
        data() {
            return {
                supplierList: [], //供应商列表数据
                total: 0, // 列表总条数
                searchForm: {
                    supplier: '',
                    contact: '',
                    phone: ''
                },
                currentPage: 1,  //当前页数
                pageSize: 10,
                dialogFormVisible: false,
                editForm: {  // 供应商编辑数据
                    supplier: '',
                    contact: '',
                    phone: '',
                    remark: ''
                },
                rules: {
                    supplier: [
                        {required: true, message: '供应商名称不能为空'}
                    ],
                    contact: [
                        {required: true, message: '联系人不能为空'}
                    ]
                },
                supplierId: null,
                isAdd: true
            }
        },
        created() {
            this.initData();
        },
        methods: {
            // 初始化查询供应商数据
            initData() {
                getSupplierList().then(res=>{
                    const resData = res.data;
                    if (resData.code === 200){
                        this.supplierList = resData.data;
                        this.total = resData.data.length;
                        this.queryByPage();
                    }
                })
            },
            // 查询
            supplierSearch() {
                if (!this.searchForm.supplier && !this.searchForm.contact && !this.searchForm.phone){
                    this.$message({
                        type: 'warning',
                        message: '查询条件不能全为空'
                    });
                    return;
                } else {
                    getSupplierConditionQuery(this.searchForm).then(res=>{
                        const resData = res.data;
                        if (resData.code === 200){
                            this.supplierList = resData.data.row;
                            this.total = resData.data.row.length;
                        }
                    })
                }
            },
            // 新增
            handleAdd(name) {
                this.isAdd = true;
                this.dialogFormVisible = true;
                this.$nextTick(()=>{
                    this.$refs[name].resetFields();
                })
            },
            // 搜索重置
            reset(name) {
                this.$refs[name].resetFields();
            },
            editSupplier(row) {
                this.supplierId = row.id;
                this.handleAdd('editSupplierForm');
                this.isAdd = false;
                getSupplierById(row.id).then(res=>{
                    const resData = res.data;
                    if (resData.code === 200){
                        this.editForm = resData.data;
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '查询失败'
                        })
                    }
                },error => {
                    this.$message({
                        type: 'warning',
                        message: '查询失败，失败原因：' + error
                    })
                })
            },
            delSupplier(row) {
                this.$confirm('是否确认删除此供应商','请确认',{
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    showClose: false
                }).then(()=>{
                    deleteSupplier(row.id).then(res=>{
                        const resData = res.data;
                        if (resData.code === 200){
                            this.$message({
                                type: 'success',
                                message: resData.message
                            })
                            this.initData();
                        } else {
                            this.$message({
                                type: 'warning',
                                message: '删除失败，请于对应开发人员联系'
                            })
                        }
                    },error => {
                        this.$message({
                            type: 'warning',
                            message: '删除失败，错误原因：' + error
                        })
                    })
                }).catch(action=>{  // 取消逻辑
                })
            },
            queryByPage() { // 分页查询
                getSupplierListByPage(this.currentPage,this.pageSize).then(res=>{
                    const resData = res.data;
                    if (resData.code === 200){
                        this.supplierList = resData.data.row;
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '查询失败'
                        })
                    }
                },error => {
                    this.$message({
                        type: 'warning',
                        message: '查询失败，失败原因：' + error
                    })
                })
            },
            handleSizeChange(val) {
                this.currentPage = 1;
                this.pageSize = val;
                this.queryByPage();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.queryByPage();
            },
            addData(name) {
                this.$refs[name].validate(valid=>{
                    if (!valid){
                        return;
                    } else {
                        addSupplier(this.editForm).then(res=>{
                            const resData = res.data;
                            if (resData.code === 200){
                                this.$message({
                                    type: 'success',
                                    message: resData.message
                                })
                                this.dialogFormVisible = false;
                                this.initData();
                            }
                        },error => {
                            this.$message({
                                type: 'success',
                                message: '错误原因：' + error
                            })
                        })
                    }
                })
            },
            updateData(name) {
                this.$refs[name].validate(valid=>{
                    if (!valid){
                        return;
                    } else {
                        updateSupplier(this.supplierId, this.editForm).then(res=>{
                            const resData = res.data;
                            if (resData.code === 200){
                                this.$message({
                                    type: 'success',
                                    message: resData.message
                                })
                                this.dialogFormVisible = false;
                                this.initData();
                            }
                        },error => {
                            this.$message({
                                type: 'success',
                                message: '错误原因：' + error
                            })
                        })
                    }
                })
            },
            // 点击行触发事件
            handleRowClick(row, column, event) {
                this.$emit('getSupplierName', row.supplier, this.formName); //
            }
        }
    }
</script>

<style scoped>
    .demo-form,.block {
        margin-top: 10px;
        text-align: left;
    }
</style>