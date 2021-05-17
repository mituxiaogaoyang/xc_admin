<template>
    <div class='banner_page'>
        <div class="ceil">
            <div class="search_box">
                <span class="label">类型：</span>
                <el-select v-model="typeNews" clearable  placeholder="请选择" @change="getData(1)">
                    <el-option
                    v-for="item in types"
                    :key="item.val"
                    :label="item.label"
                    :value="item.val">
                    </el-option>
                </el-select>
                <span class="label">状态：</span>
                <el-select v-model="status" clearable placeholder="请选择" @change="getData(1)">
                    <el-option
                    v-for="item in states"
                    :key="item.val"
                    :label="item.label"
                    :value="item.val">
                    </el-option>
                </el-select>
            </div>
            <el-button type="primary" plain class="btn_add" @click="addNews">新增</el-button>
        </div>
        
        <el-table  :data="tableData" border>
            <el-table-column
                label="序号"
                type="index"
                width="50">
            </el-table-column>
            <el-table-column
                prop="type"
                label="类型"
                width="120">
            </el-table-column>
            <el-table-column
                prop="author"
                label="作者"
                width="150">
            </el-table-column>
            <el-table-column
                prop="title"
                show-overflow-tooltip
                width="200"
                label="标题">
            </el-table-column>
            <el-table-column
                prop="desc"
                show-overflow-tooltip
                label="简介">
            </el-table-column>
            <el-table-column
                label="访问地址"
                width="120">
                <template slot-scope="scope">
                    <router-link :to="'/newsDetail/'+scope.row.id"  target="_blank" class="btn_see">去看看</router-link>
                    <!-- <span class="word_noSite" v-else>无访问地址</span> v-if="scope.row.publishState"-->
                </template>
            </el-table-column>
            <el-table-column
                label="状态"
                width="120">
                <template slot-scope="scope">
                    <span>{{scope.row.publishState?'已发布':'未发布'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="publishTime"
                label="上次发布时间"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                width="160"
                label="操作">
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
    import {kindsNews, states, getNews, publishNews, deleteNews} from '@/apis/home';
    export default {
        data () {
            return {
                tableData:[],
                typeNews: null,
                types:kindsNews,
                states: states,
                status: null,
                page:{
                    current: 1,
                    total:1
                }
            };
        },
        mounted () {
            this.getData();
        },
        methods: {
            getData(i){ //i -currentpage
                const page = i || 1;
                let obj = {
                    currentPage: page
                };
                if(this.typeNews){
                    obj.kind = this.typeNews;
                }else{
                    obj.kind && (delete obj.kind);
                }
                if(typeof(this.status) === 'number'){
                    obj.publishState = this.status;
                }else{
                    obj.publishState && (delete obj.publishState);
                }
                getNews(obj).then(res =>{
                    const lists = res.items;
                    lists.forEach(list =>{
                        switch(list.kind){
                            case 1 : list.type ='新橙快报';break;
                            case 2 : list.type ='北斗资讯';break;
                            case 3 : list.type ='应急管理 ';break;
                            case 4 : list.type ='智慧交通';break;
                            case 5 : list.type ='精准城市';break;
                            case 6 : list.type ='国土地灾';break;
                            case 7 : list.type ='员工风采';break;
                            case 8 : list.type ='服务公告';break;
                        }
                    });
                    this.page.total = res.totalRecords;
                    this.tableData = lists;
                });
            },
            handleCurrentChange(i){
                this.page.current = i;
                this.getData(i);
            },
            addNews(){
                this.$router.push('/addNews');
            },
            publish(row){
                const state = row.publishState?0:1 ;
                const word = row.publishState?'取消发布':'发布';
                this.$confirm('确定'+word+'?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        publishNews(row.id,state).then(res =>{
                            this.getData(this.page.current);
                        });
                    }).catch(() => {            
                    });
                
            },
            modify(row){
                if(row.publishState){
                    this.$message.warning('不能编辑已发布内容，如需修改，请取消发布');
                }else{
                    this.$router.push({path:'/addNews',query:{id:row.id}});
                }
            },
            remove(id){
                this.$confirm('确定删除该新闻?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        deleteNews(id).then(res =>{
                            this.$message.success('删除成功');
                            this.getData(this.page.current);
                        });
                    
                    }).catch(() => {
                                
                    });
            }
        },
    };
</script>

<style lang='less' scoped>
.banner_page{
    .ceil{
        display: flex;
        justify-content: space-between;
    }
    .btn_see{
        text-decoration: none;
        color:rgba(224, 177, 95, 0.7);
        font-size: 14px;
    }
    .word_noSite{
        color:#999;
        font-size: 14px;
    }
}
</style>
<style lang="less">
    .el-select{
        margin-right: 30px;
        .el-input .el-input__inner{
            border-width: 1px;
        }
    }
</style>