<template>
    <div class="supplier">
        <el-table
            :data="tableData"
            :span-method="objectSpanMethod"
            border
            style="width: 100%">
            <el-table-column
                prop="id"
                label="ID" 
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="amount1"
                label="数值 1（元）">
            </el-table-column>
            <el-table-column
                prop="amount2"
                label="数值 2（元）">
            </el-table-column>
            <el-table-column
                prop="amount3"
                label="数值 3（元）">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <i class="el-icon-delete" @click="deleteOperation(scope.row)" style="color: #18Ff33;cursor: pointer;"></i>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
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
    data() {
        return {
            tableData: [], //供应商列表数据
            total: 0, // 列表总条数
            searchForm: {
                supplier: '',
                contact: '',
                phone: ''
            },
            currentPage: 1,  //当前页数
            pageSize: 10,
            dialogFormVisible: false
        }
    },
    mounted() {
        this.initData();
    },
    methods: {
        initData() {
            setTimeout(() => {
                let renderData = {
                    id: '12987122',
                    name: '王小虎',
                    amount1: '234',
                    amount2: '3.2',
                    amount3: 10,
                    objValue: [
                        {
                            objName: 'xxxx1',
                            objNo: 'xxxx2',
                            objVal: 'xxxx3'
                        },
                        {
                            objName: 'x1',
                            objNo: 'x2',
                            objVal: 'x3'
                        }
                    ]
                };
                let renderDataCopy = JSON.parse(JSON.stringify(renderData));
                Reflect.deleteProperty(renderDataCopy,'objValue');
                this.tableData = [];
                if(Array.isArray(renderData.objValue)) {
                    if(renderData.objValue.length) {
                        renderData.objValue.forEach(item => {
                            this.tableData.push({
                                ...renderDataCopy, 
                                ...item
                            });
                        });
                    }else { //如果render不为0
                        this.tableData = [Object.assign({},renderData,{
                            objName: '',
                            objNo: '',
                            objVal: ''
                        })];
                    }
                }else {
                    //判断id是否为null
                    if(!!renderData.id) {
                        this.tableData = [Object.assign({},renderData,{
                            objName: '',
                            objNo: '',
                            objVal: ''
                        })];
                    }else {
                        this.tableData = [];
                    }
                }
            },200);
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex !== 4 && columnIndex !== 5) {
                let num = this.tableData.length;
                if (rowIndex % num === 0) {
                    return {
                        rowspan: num,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
        },
        exportScope(scope) {
            console.log(scope);
        },
        deleteOperation(rowData) {
            console.log(rowData);
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