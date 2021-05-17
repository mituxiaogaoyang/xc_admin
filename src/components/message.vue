<template>
    <div class='message_page'>
        <div class="ceil">
            <div class="search_box">
                <span class="label">状态：</span>
                <el-select v-model="status" clearable placeholder="请选择" @change="getData(1)">
                    <el-option
                    v-for="item in statesMessage"
                    :key="item.val"
                    :label="item.label"
                    :value="item.val">
                    </el-option>
                </el-select>
            </div>
        </div>
         <el-table  :data="tableData" border>
             <el-table-column
                type="index"
                label="序号"
                width="50">
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="留言时间"
                width="180">
            </el-table-column>
            <el-table-column
                prop="kindType"
                label="留言类型"
                width="150">
            </el-table-column>
            <el-table-column
                prop="msg"
                label="留言内容"
                show-overflow-tooltip
                >
            </el-table-column>
            <el-table-column
                prop="contact"
                label="联系人"
                width="150">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="联系电话"
                width="150">
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态">

            </el-table-column>
            <el-table-column
                prop="dealTime"
                label="处理时间">
            </el-table-column>
            <el-table-column
                prop="address"
                label="操作"
                width="140">
                <template slot-scope="scope">
                    <el-button @click="deal(scope.row.id,1)" type="text" size="small">处理</el-button>
                    <el-button @click="deal(scope.row.id,2)" type="text" size="small">无需处理</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            layout="prev, pager, next"
            :page-size="10"
            :current-page='page.current'
            @current-change="handleCurrentChange"
            :total="page.total">
        </el-pagination>
    </div>
</template>

<script>
    import {statesMessage, getMessages, dealMessages, publishNews, deleteNews} from '@/apis/home';
    export default {
        data () {
            return {
                tableData:[],
                statesMessage,
                status:null,
                page:{
                    current: 1,
                    total:1
                }
            };
        },
        mounted () {
            this.getData();
            //this.tableData.push();
        },
        methods: {
            getData(i){ 
                const page = i || 1;
                let obj = {
                    currentPage: page
                };
                if(typeof(this.status) === 'number'){
                    obj.dealState = this.status;
                }else{
                    obj.dealState && (delete obj.dealState);
                }
                getMessages(obj).then(res =>{
                    this.page.total = res.totalRecords;
                    const lists = res.items;
                    lists.forEach(list =>{
                        switch(list.dealState){
                            case 0: list.status ='未处理';break;
                            case 1: list.status ='已处理';break;
                            case 2: list.status ='无需处理';break;
                        }
                        switch(list.kind){
                            case 0: list.kindType ='智能硬件';break;
                            case 1: list.kindType ='智慧软件';break;
                            case 2: list.kindType ='解决方案';break;
                        }
                    });
                    this.tableData = lists;
                });
            },
            deal(id,status){
                const word = status ===1?'已处理':'无需处理';
                this.$confirm('确定此留言'+word +'?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        dealMessages(id, status).then(res =>{
                            this.$message.success('操作成功');
                            this.getData();
                        });
                    
                    }).catch(() => {
                                
                    });
            },
            handleCurrentChange(i){
                this.getData(i);
            }
        },
    };
</script>

<style lang='less' scoped>
.message_page{
    
}
</style>