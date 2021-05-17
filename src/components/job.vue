<template>
    <div class='banner_page'>
         <el-button type="primary" plain @click="addJob">新增</el-button>
         <el-table  :data="tableData" border>
             <el-table-column
                type="index"
                label="序号"
                width="50">
            </el-table-column>
            <el-table-column
                prop="title"
                label="职位名称"
                width="240">
            </el-table-column>
            <el-table-column
                prop="name"
                label="发布状态"
                width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.publishState?'已发布':'未发布'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="publishTime"
                label="上次发布时间">
            </el-table-column>
            <el-table-column
                prop="address"
                label="操作"
                width="210">
                <template slot-scope="scope">
                    <el-button @click="publish(scope.row)" type="text" size="small">{{scope.row.publishState?'取消发布':'发布'}}</el-button>
                    <el-button @click="modify(scope.row)" type="text" size="small">修改</el-button>
                    <el-button @click="remove(scope.row.id)" type="text" size="small">删除</el-button>
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
    import {getJobs, publishJob, deleteJob} from '@/apis/home';
    export default {
        data () {
            return {
                tableData:[],
                page:{
                    current: 1,
                    total:1
                },
            };
        },
        mounted () {
            this.getData();
        },
        methods: {
            getData(i){
                const page = i || 1;
                let obj = {
                    currentPage: page
                };
                // if(typeof(this.status) === 'number'){
                //     obj.publishState = this.status;
                // }else{
                //     obj.publishState && (delete obj.publishState);
                // }
                getJobs(obj).then(res =>{
                    this.page.total = res.totalRecords;
                    const lists = res.items;
                    this.tableData = lists;
                });
            },
            handleCurrentChange(i){
                this.getData(i);
            },
            addJob(){
                this.$router.push('/addJob');
            },
            publish(row){
                const state = row.publishState?0:1 ;
                const word = row.publishState?'取消发布':'发布';
                this.$confirm('确定'+word+'?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        publishJob(row.id,state).then(res =>{
                            this.getData();
                        });
                    }).catch(() => {            
                    });
            },
            modify(row){
                if(row.publishState){
                    this.$message.warning('不能编辑已发布内容，如需修改，请取消发布');
                }else{
                    this.$router.push({path:'/addJob',query:{id:row.id}});
                }
            },
            remove(id){
                this.$confirm('确定删除该职位?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        deleteJob(id).then(res =>{
                            this.$message.success('删除成功');
                            this.getData();
                        });
                    
                    }).catch(() => {
                                
                    });
            }
        },
    };
</script>

<style lang='less' scoped>

</style>