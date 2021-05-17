<template>
    <div class='newsAdd'>
        <div class="line2">
            <div class="box">
                <span class="label">类型：</span>
                <el-select v-model="typeNews" clearable  placeholder="请选择">
                    <el-option
                    v-for="item in types"
                    :key="item.val"
                    :label="item.label"
                    :value="item.val">
                    </el-option>
                </el-select>
            </div>
            <div class="box">
                <span class="label">作者：</span>
                <el-input v-model="author" autocomplete="off"></el-input>
            </div>
        </div>
        <div class="line">
            标题 ：
            <el-input v-model="title" autocomplete="off"></el-input>
        </div>
        <div class="line line_upload">
            封面图片 ：
            <el-upload
                class="upload-demo"
                :action="uploadSite"
                :on-success="uploadSuccess"
                :headers ="headers"
                :on-error="uploadError"
                :on-remove="removeUpload"
                :before-upload='uploadBefore'
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </div>
        <div class="line">
            <span class="word_desc">简介 ：</span>        
            <el-input  type="textarea" placeholder="请输入内容" v-model="desc"></el-input>
        </div>
        <div class="line">
            内容：
            <div ref="editor"></div>
        </div>
        <div class="btn_box">
            <el-button plain @click="cancelAdd">取消</el-button>
            <el-button type="primary" plain @click="submitNews(0)">确认</el-button>
            <el-button type="warning" plain @click="submitNews(1)">发布</el-button>
            <el-button type="info" plain @click="previewNews">预览</el-button>
        </div>
    </div>
</template>

<script>
    import Editor from 'wangeditor';
    import {kindsNews, imgSite, addNews, updateNews,getNewsInfo} from '@/apis/home';
    import {aliOsSite, refreshToken} from '@/apis/http';
    export default {
        components: {

        },
        data () {
            return {
                typeNews: null,
                types:kindsNews,
                author: '',
                title: '',
                desc:'',
                uploadSite: imgSite,
                headers:{
                    Authorization:sessionStorage.getItem('accessToken')
                },
                fileList:[],
                coverUrl:'',
            };
        },
        mounted () {
            //初始化富文本编辑器
            const editor = new Editor(this.$refs.editor);
            editor.customConfig.zIndex = 100;
            editor.customConfig.uploadImgServer = imgSite; // 上传图片到服务器
            editor.customConfig.uploadImgHeaders  = {
                Authorization: sessionStorage.getItem('accessToken')
            };
            editor.customConfig.uploadFileName = 'file';
            editor.customConfig.onchange = (html) => {
                this.editorContent = html;
            };
            editor.customConfig.customAlert =  (info) => {
                this.$message.info(info);
            };
            editor.customConfig.uploadImgHooks = {
                before:function (xhr, editor, files) {
   
                },
                success: function (xhr, editor, result) {
                    console.log('upload image success');
                },
                fail: function (xhr, editor, result) {
                    console.log(result);
                },
                error:function (xhr, editor) {
                    refreshToken().then(res =>{
                        editor.customConfig.uploadImgHeaders.Authorization = res;
                    });
                },
                customInsert: function (insertImg, result, editor) {
                    const url = aliOsSite + result.data ;
                    insertImg(url);
                }
            };
            editor.create();
            //
            const id = this.$route.query.id;
            if(id){//修改
                this.idUpdate = id;
                getNewsInfo(id).then(res =>{
                    this.typeNews = res.kind;
                    this.author = res.author;
                    this.title = res.title;
                    this.desc = res.desc;
                    this.editorContent =res.content;
                    this.coverUrl = res.url;
                    const coverName = res.url.split('portal/')[1];
                    this.fileList = [{name:coverName,url:res.url}];
                    editor.txt.html(res.content);
                });
            }
        },
        methods: {
            cancelAdd(){
                this.$router.push('./news');
            },
            submitNews(isPublish){
                const kind = this.typeNews ;
                const author = this.author;
                const title = this.title;
                const desc = this.desc;
                const content = this.editorContent;
                const publishState = isPublish ;
                const url =this.coverUrl;
                if(kind && author && title && desc && content&& url){
                    if(this.idUpdate){ //update
                        const id = this.idUpdate;
                        updateNews({author,content,desc,kind,title,publishState,id,url}).then(res =>{
                            this.$message.success(publishState?'修改并发布成功':'修改成功');
                            this.$router.push('./news');
                        });
                    }else{
                        addNews({author,content,desc,kind,title,publishState,url}).then(res =>{
                            this.$message.success(publishState?'发布成功':'新添成功');
                            this.$router.push('./news');
                        });
                    }
                    
                }else{
                    this.$message.error('请填完所有内容');
                }
            },
            previewNews(){
                console.log(this.editorContent);
                const title = this.title;
                const content =this.editorContent;
                if(title && content){
                    localStorage.setItem('newsTitle',title);
                    localStorage.setItem('newsContent',content);
                    let routeUrl = this.$router.resolve({
                        path: "/newsDetail/preview",
                    });
                    window.open(routeUrl .href, '_blank');
                }else{
                    this.$message.error('请填写标题和内容');
                }
                
            },
            uploadSuccess(res,file){
                this.coverUrl = aliOsSite + file.response.data;
                this.fileList = [file];
            },
            uploadError(err){
                
                refreshToken().then(res =>{
                    this.headers.Authorization = res;
                });
                
            },
            removeUpload(){
                this.coverUrl ='';
                this.fileList = [];
            },
            uploadBefore(){
                this.headers.Authorization = sessionStorage.getItem('accessToken');
            }
        },
    };
</script>

<style lang='less' scoped>
.newsAdd{
    .line2{
        display: flex;
        justify-content: space-between;
        margin-right:8%;
    }
    .line{
        margin-top:20px;
        .word_desc{
            position: relative;
            top:-20px;
        }
    }
    .btn_box{
        text-align: center;
        margin-top:30px;
    }
}
</style>
<style lang='less'>
.line2{
    .el-input{
        width:auto;
    }
}
.line{
    .el-input{
        width:80%;
    }
    .el-textarea{
        width:80%
    }
}
.w-e-text-container{
    height:500px!important;
    margin-right: 45px;
}  
.w-e-toolbar {
    margin-right: 45px;
}
.upload-demo{
    .el-upload-list{
        display: inline-block;
        vertical-align: middle;
        margin-left: 20px;
        height:36px;
    }
}
</style>