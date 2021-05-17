<template>
    <div class='newsAdd'>
        <div class="line">
            职位名称 ：
            <el-input v-model="title" autocomplete="off"></el-input>
        </div>
        <div class="line">
            详情：
            <div ref="editor"></div>
        </div>
        <div class="btn_box">
            <el-button plain @click="cancelAdd">取消</el-button>
            <el-button type="primary" plain @click="submitJob">确认</el-button>
        </div>
    </div>
</template>

<script>
    import Editor from 'wangeditor';
    import {imgSite, addJob, updateJob,getJobInfo} from '@/apis/home';
    import {aliOsSite, refreshToken} from '@/apis/http';
    export default {
        components: {

        },
        data () {
            return {
                title: '',
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
                getJobInfo(id).then(res =>{
                    this.title = res.title;
                    this.editorContent =res.content;
                    editor.txt.html(res.content);
                });
            }
        },
        methods: {
            cancelAdd(){
                this.$router.push('./job');
            },
            submitJob(isPublish){
                const title = this.title;
                const content = this.editorContent;
                const publishState = 0;//isPublish ;
                if( title && content){
                    if(this.idUpdate){ //update
                        const id = this.idUpdate;
                        updateJob({content,title,publishState,id}).then(res =>{
                            this.$message.success(publishState?'修改并发布成功':'修改成功');
                            this.$router.push('./job');
                        });
                    }else{
                        addJob({content,title,publishState}).then(res =>{
                            this.$message.success(publishState?'发布成功':'新添成功');
                            this.$router.push('./job');
                        });
                    }
                    
                }else{
                    this.$message.error('请填完所有内容');
                }
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

</style>