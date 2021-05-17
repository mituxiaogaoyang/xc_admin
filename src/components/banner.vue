<template>
    <div class='banner_page'>
        <div class="ceil">
            <div class="search_box">
                <span class="label">状态：</span>
                <el-select v-model="status" clearable placeholder="请选择" @change="getData">
                    <el-option
                    v-for="item in states"
                    :key="item.val"
                    :label="item.label"
                    :value="item.val">
                    </el-option>
                </el-select>
            </div>
            <el-button type="primary" plain @click="addBanner">新增</el-button>
        </div>
         
         <el-table  :data="tableData" border>
             <el-table-column
                label="序号"
                type="index"
                width="60">
            </el-table-column>
            <el-table-column
                prop="title"
                label="名称"
                >
            </el-table-column>
            <el-table-column
                prop="name"
                label="pc图片"
                >
                <template slot-scope="scope">
                    <a :href="scope.row.pcUrl" target="_blank" class="btn_see">背景图</a>丨
                    <a :href="scope.row.pcUrl2" target="_blank" class="btn_see">文字图</a>
                </template>
            </el-table-column>
            <el-table-column
                prop="address"
                label="phone图片"
                >
                <template slot-scope="scope">
                    <a :href="scope.row.phoneUrl" target="_blank" class="btn_see">预览</a>
                </template>
            </el-table-column>
            <el-table-column
                prop="desUrl"
                label="跳转链接">
            </el-table-column>
            <el-table-column
                prop="address"
                label="状态"
                width="120">
                <template slot-scope="scope">
                    <span>{{scope.row.publishState?'已发布':'未发布'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="publishTime"
                label="上次发布时间"
                width="200">
            </el-table-column>
            <el-table-column
                prop="address"
                label="操作"
                width="180">
                <template slot-scope="scope">
                    <el-button @click="publish(scope.row)" type="text" size="small">{{scope.row.publishState?'取消发布':'发布'}}</el-button>
                    <!-- <el-button @click="modify(scope.row)" type="text" size="small">修改</el-button> -->
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
        <el-dialog title="新增" :visible.sync="visibleAdd">
            <div class="line">
            <span class="word">标题 </span>
                <el-input v-model="banner.title" autocomplete="off"></el-input>
            </div>
            <div class="line">
                <span class="word">pc图片 </span>
                <el-upload
                    class="upload-demo upload-demo2"
                    drag
                    :action="uploadSite"
                    :on-success="uploadSuccess"
                    :headers ="headers"
                    :on-error="uploadError"
                    :on-remove="removeUpload"
                    :before-upload='uploadBefore'
                    :file-list="fileList">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">
                        <div class="name">背景图</div>
                        只能上传jpg/png文件，且不超过500kb
                    </div>
                </el-upload>
                <el-upload
                    class="upload-demo upload-demo2 upload-demo22"
                    drag
                    :action="uploadSite"
                    :on-success="uploadSuccess3"
                    :headers ="headers"
                    :on-error="uploadError"
                    :on-remove="removeUpload3"
                    :before-upload='uploadBefore'
                    :file-list="fileList3">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">
                        <div class="name">文字图（1200*534）</div>
                        只能上传jpg/png文件，且不超过500kb
                    </div>
                </el-upload>
            </div>
            <div class="line">
               <span class="word">phone图片 </span>
                <el-upload
                    class="upload-demo "
                    drag
                    :action="uploadSite"
                    :on-success="uploadSuccess2"
                    :headers ="headers"
                    :on-error="uploadError"
                    :on-remove="removeUpload2"
                    :before-upload='uploadBefore'
                    :file-list="fileList2"
                    >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </div>
            <div class="line">
                <span class="word">跳转链接 </span>
                <el-input v-model="banner.desUrl" autocomplete="off"></el-input>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="visibleAdd = false">取 消</el-button>
                <el-button type="primary" @click="submitBanner">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getBanners, states, imgSite, addBanner, publishBanner,deleteBanner} from '@/apis/home';
    import {aliOsSite, refreshToken} from '@/apis/http';
    export default {
        data () {
            return {
                tableData:[],
                visibleAdd: false,
                states: states,
                status: null,
                page:{
                    current: 1,
                    total:1
                },
                banner:{
                    title:'',
                    desUrl:'',
                    pcUrl:'',//背景图
                    pcUrl2:'',//文字图
                    phoneUrl:'',
                    publishState:0,
                    padUrl	:'http://oss.orieange.com/static/banner/8e8410ab3cecd2d6a891f6bcbe064cfc.png',
                    des:'橙魔方'
                },
                uploadSite: imgSite,
                headers:{
                    Authorization:sessionStorage.getItem('accessToken')
                },
                fileList:[],
                fileList2:[],
                fileList3:[]
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
                if(typeof(this.status) === 'number'){
                    obj.publishState = this.status;
                }else{
                    obj.publishState && (delete obj.publishState);
                }
                getBanners(obj).then(res =>{
                    this.page.total = res.totalRecords;
                    const lists = res.items;
                    lists.forEach(list =>{
                        switch(list.dealState){
                            case 0: list.status ='未处理';break;
                            case 1: list.status ='已处理';break;
                            case 2: list.status ='无需处理';break;
                        }
                    });
                    this.tableData = lists;
                });
            },
            addBanner(){
                this.visibleAdd =true;
                this.banner.title  = '';
                this.banner.desUrl= '';
                this.banner.pcUrl = '';//背景图
                this.banner.pcUrl2 = '';//文字图
                this.banner.phoneUrl = '';
                this.fileList = [];
                this.fileList2 = [];
                this.fileList3 = [];
            },
            handleCurrentChange(i){
                this.page.current = i;
                this.getData(i);
            },
            publish(row){
                const state = row.publishState?0:1 ;
                const word = row.publishState?'取消发布':'发布';
                this.$confirm('确定'+word+'?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        publishBanner(row.id,state).then(res =>{
                            this.getData();
                        });
                    }).catch(() => {            
                    });
                
            },
            modify(id){

            },
            remove(id){
                this.$confirm('确定删除该条目?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        deleteBanner(id).then(res =>{
                            this.$message.success('删除成功');
                            this.getData();
                        });
                    
                    }).catch(() => {
                                
                    });
            },
            submitBanner(){
                addBanner({...this.banner}).then(res =>{
                    this.$message.success('新增成功');
                    this.visibleAdd =false;
                    this.getData(this.page.current);

                });
            },
            uploadSuccess(res,file){
                this.banner.pcUrl = aliOsSite + file.response.data;
                this.fileList = [file];
            },
            uploadSuccess2(res,file){
                this.banner.phoneUrl = aliOsSite + file.response.data;
                this.fileList2 = [file];
            },
             uploadSuccess3(res,file){
                this.banner.pcUrl2 = aliOsSite + file.response.data;
                this.fileList3 = [file];
            },
            uploadError(err){
                
                refreshToken().then(res =>{
                    this.headers.Authorization = res;
                });
                
            },
            removeUpload(){
                this.banner.pcUrl ='';
                this.fileList = [];
            },
            removeUpload2(){
                this.banner.phoneUrl ='';
                this.fileList2 = [];
            },
            removeUpload3(){
                this.banner.pcUrl2 ='';
                this.fileList3 = [];
            },
            uploadBefore(){
                this.headers.Authorization = sessionStorage.getItem('accessToken');
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
}
</style>
<style lang="less">
.line{
    margin-top:20px;
    >.word{
        width:80px;
        display: inline-block;
    }
    
}
.upload-demo{
    display: inline-block;
    vertical-align: middle;
    &.upload-demo2{
        .el-upload-dragger{
            width:250px;
        }
    }
    &.upload-demo22{
        margin-left:30px;
    }
}
.el-upload__tip .name{
    font-weight: bold;
    font-size: 15px;
}
.el-upload-dragger{
    height:150px!important;
}
.el-dialog__body{
    padding:20px 50px!important;
}

</style>