<template>
    <div class="goods">
        <el-form
            :inline="true"
            ref="searchGoods"
            :model="searchForm"
            style="text-align: left;margin-top: 10px;">
            <el-form-item prop="name">
                <el-input v-model="searchForm.name" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="searchForm.code" placeholder="请输入商品编码"></el-input>
            </el-form-item>
            <el-form-item prop="supplierName">
                <!--
                    注意：监听组件上的原生事件，需要用到.native，否则事件无效!!!
                 -->
                <el-input v-model="searchForm.supplierName" placeholder="请选择供应商" readonly @click.native="getSupplierNameByForm('searchForm')"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData()" icon="el-icon-search">搜索</el-button>
                <el-button type="primary" @click="handleAdd('editGoods')" icon="el-icon-plus">新增</el-button>
                <el-button type="default" @click="reset('searchGoods')">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table
            :data="list"
            height="calc(100vh - 220px)"
            border
            stripe
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            style="width: 100%">
            <el-table-column type="index" label="序号" width="90"></el-table-column>
            <el-table-column prop="name" label="商品名称"></el-table-column>
            <el-table-column prop="code" label="商品编码"></el-table-column>
            <el-table-column prop="spec" label="商品规格" width="90"></el-table-column>
            <el-table-column prop="retailPrice" label="零售价"></el-table-column>
            <el-table-column prop="purcharsePrice" label="进货价"></el-table-column>
            <el-table-column prop="storageNum" label="库存数量"></el-table-column>
            <el-table-column prop="supplierName" label="供应商"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="default" size="small" @click="editGoods(scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="delGoods(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handSizeChange"
            @current-change="handCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10,20,50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            class="block"></el-pagination>
        <el-dialog title="商品编辑" :visible.sync="dialogFormVisible" width="500px">
            <el-form
                :model="editForm"
                ref="editGoods"
                label-width="100px"
                label-position="right"
                style="width: 300px;"
                :rules="rules">
                <el-form-item prop="name" label="商品名称">
                    <el-input v-model="editForm.name" placeholder="请输入商品名称" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="code" label="商品编码">
                    <el-input v-model="editForm.code" placeholder="请输入商品编码" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="spec" label="商品规格">
                    <el-input v-model="editForm.spec" placeholder="请输入商品规格" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="retailPrice" label="零售价">
                    <el-input v-model="editForm.retailPrice" placeholder="请输入零售价" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="purcharsePrice" label="进货价">
                    <el-input v-model="editForm.purcharsePrice" placeholder="请输入进货价" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="storageNum" label="库存数量">
                    <el-input v-model="editForm.storageNum" placeholder="请输入库存数量" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="supplierName" label="供应商">
                    <el-input v-model="editForm.supplierName" placeholder="请选择供应商" autocomplete="off" readonly @click.native="getSupplierNameByForm('editForm')"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button type="default" size="small" @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" size="small" @click="isAdd ? addGoods('editGoods') : updateGoods('editGoods')">{{ isAdd ? "新 增" : "修 改" }}</el-button>
                <el-button type="default" size="small" @click="reset('editGoods')">重 置</el-button>
            </div>
        </el-dialog>

        <el-dialog title="选择供应商" :visible.sync="supplierVisible" width="500px">
            <supplier :isDialog="true" :formName="formName" @getSupplierName="getSupplierName"></supplier>
        </el-dialog>
    </div>
</template>

<script>
import {
    addGoods,
    updateGoods,
    deleteGoods,
    getGoodList,
    getGoodsListByPage,
    getGoodsConditionQuery,
    getGoodsById} from "../../api/httpService"
import supplier from '@/views/main/supplier'
export default {
    components: {supplier},
    data() {
        return {
            list: [], // 商品列表
            searchForm: {  // 查询条件
                name: '',
                code: '',
                supplierName: ''
            },
            currentPage: 1,
            pageSize: 10,
            total: 0,
            editForm: {  // 编辑商品
                name: '',
                code: '',
                spec: '',
                retailPrice: '',
                purcharsePrice: '',
                storageNum: '',
                supplierName: ''
            },
            rules: {
                name: [
                    {required: true, message: '商品名称不能为空', triggle: 'blur'}
                ],
                code: [
                    {required: true, message: '商品编码不能为空', triggle: 'blur'}
                ]
            },
            dialogFormVisible: false,
            supplierVisible: false,
            isAdd: true,
            goodsId: null,
            supplierForm: {
                supplierName: ''
            },
            sCurrPage: 1,
            sPageSize: 10,
            formName: ''
        }
    },
    created() {
        this.initData();
    },
    methods: {
        initData() {
            getGoodList().then(res=>{
                const resData = res.data;
                if (resData.code === 200){
                    this.list = resData.data;
                    this.total = this.list.length;
                }
            })
        },
        // 搜索
        searchData() {
            if (!this.searchForm.name && !this.searchForm.code && !this.searchForm.supplierName){
                this.$message({
                    type: 'error',
                    message: '请输入搜索条件'
                })
                return;
            } else {
                getGoodsConditionQuery(this.searchForm).then(res=>{
                    const resData = res.data;
                    if (resData.code === 200){
                        this.$message({
                            type: 'success',
                            message: resData.message
                        })
                        this.list = resData.data.row;
                    }else {
                        this.$message({
                            type: 'warning',
                            message: '搜索失败'
                        })
                    }
                },error => {
                    this.$message({
                        type: 'danger',
                        message: '搜索失败，失败原因：' + error
                    })
                })
            }
        },
        // 新增商品
        handleAdd(name) {
            this.isAdd = true;
            this.dialogFormVisible = true;
            this.$nextTick(()=>{
                this.$refs[name].resetFields();
            });
        },
        reset(name) {
            this.$refs[name].resetFields();
        },
        // 编辑商品
        editGoods(row) {
            this.handleAdd('editGoods');
            this.isAdd = false;
            this.goodsId = row.id;
            getGoodsById(row.id).then(res=>{
                const resData = res.data;
                if (resData.code === 200){
                    this.editForm = resData.data;
                }
            })
        },
        // 删除商品
        delGoods(row) {
            deleteGoods(row.id).then(res=>{
                const resData = res.data;
                if (resData.code === 200){
                    this.$message({
                        type: 'success',
                        message: resData.message
                    })
                } else {
                    this.$message({
                        type: 'warning',
                        message: '删除失败'
                    })
                }
            },error=>{
                this.$message({
                    type: 'danger',
                    message: '删除失败，失败原因：' + error
                })
            })
        },
        queryDataByPaging() {
            getGoodsListByPage(this.currentPage,this.pageSize).then(res=>{
                const resData = res.data;
                if (resData.code === 200){
                    this.list = resData.data.row;
                } else {
                    this.$message({
                        type: 'warning',
                        message: '查询失败'
                    })
                }
            },error=>{
                this.$message({
                    type: 'warning',
                    message: '查询失败，失败原因：' + error
                })
            })
        },
        // 单页页码数切换事件 [10,20]
        handSizeChange(val) {
            this.pageSize = val;
            this.queryDataByPaging();
        },
        // 页码切换 1,2,...
        handCurrentChange(val) {
            this.currentPage = val;
            this.queryDataByPaging();
        },
        // 新增商品
        addGoods(name) {
            this.$refs[name].validate(valid=>{
                if (valid){
                    addGoods(this.editForm).then(res=>{
                        const resData = res.data;
                        if (resData.code === 200){
                            this.$message({
                                type: 'success',
                                message: resData.message
                            });
                            this.initData();
                            this.dialogFormVisible = false;
                        } else {
                            this.$message({
                                type: 'success',
                                message: '新增失败'
                            });
                        }
                    })
                } else {
                    return;
                }
            })
        },
        // 修改商品
        updateGoods(name) {
            this.$refs[name].validate(valid=>{
                if (valid){
                    updateGoods(this.goodsId, this.editForm).then(res=>{
                        const resData = res.data;
                        if (resData.code === 200){
                            this.$message({
                                type: 'success',
                                message: resData.message
                            });
                            this.initData();
                            this.dialogFormVisible = false;
                        } else {
                            this.$message({
                                type: 'success',
                                message: '新增失败'
                            });
                        }
                    })
                } else {
                    return;
                }
            })
        },
        getSupplierNameByForm(name) {
            this.supplierVisible = true;
            this.formName = name; // 用来区分针对哪个表的赋值
        },
        // 获取供应商
        // 子组件传递父组件的值必须以function形式传递
        getSupplierName(name,name1) {
            this[name1].supplierName = name;
            this.supplierVisible = false;
        }
    }
}
</script>

<style scoped>
    .block {
        text-align: left;
        margin-top: 10px;
    }
</style>