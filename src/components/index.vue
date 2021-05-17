<template>
    <div class='home_page'>
        <div class="home_ceil">
            <div class="user">
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">{{userName}}</span>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item icon="el-icon-edit" command="updatePwd">修改密码</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-switch-button" command="loginOut">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="home_bot">
            <div class="nav_bar">
                <div class="list">
                    <router-link to="/banner">首页banner</router-link>
                </div>
                <div class="list">
                    <router-link to="/news">新闻中心</router-link>
                </div>
                <div class="list">
                    <router-link to="/message">售前咨询</router-link>
                </div>
                <div class="list">
                    <router-link to="/job">招聘信息</router-link>
                </div>
                <div class="list">
                    <router-link to="/user">用户管理</router-link>
                </div>
            </div>
            <div class="home_content">
                <el-scrollbar style="height:100%">
                    <router-view @changeName="resetName"></router-view>
                </el-scrollbar>
            </div>
        </div>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
            <el-form :model="form"  label-width="120px">
                <el-form-item label="旧密码">
                    <el-input v-model="form.pwdOld" type="password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="form.pwdNew" type="password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" >
                    <el-input v-model="form.pwdNew2" type="password" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitPwd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {storeToken, removeToken} from '@/apis/http';
    import {logout,updatePwd } from '@/apis/home';
    export default {
        data () {
            return {
                dialogFormVisible: false,
                form:{
                    pwdOld: '',
                    pwdNew:'',
                    pwdNew2: ''
                },
                userName: sessionStorage.getItem('userName')
            };
        },
        mounted () {
        },
        methods: {
            handleCommand(command){
                if(command === 'updatePwd'){
                    this. dialogFormVisible=true;
                    Object.keys(this.form).forEach(k =>{
                        this.form[k] = '';
                    });
                    
                }else{
                    this.$confirm('确定退出系统?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        logout().then(res =>{
                            this.$message.success('退出登录成功');
                            removeToken();
                            this.$router.push('/login');
                        });
                    
                    }).catch(() => {
                                
                    });
                }
            },
            submitPwd(){
                const pwd = this.form.pwdNew;
                const pwd2 = this.form.pwdNew2;
                const oldPwd = this.form.pwdOld;
                const userId = sessionStorage.getItem('userId');
                if(pwd && oldPwd && pwd === pwd2){
                    updatePwd({oldPwd,userId,confirmPwd: pwd, newPwd: pwd}).then(res =>{
                        this.dialogFormVisible = false;
                        this.$message.success('密码修改成功,请重新登录');
                        this.$router.push('/login');
                    });
                }else{
                    this.$message.warning('请确保两次密码一致');
                }
            },
            resetName(v){
                this.userName =  v;
            }
        },
    };
</script>

<style lang='less' scoped>
@heightHeader:36px;
@widthNav: 180px;
.home_page{
    height: 100vh;
    .home_ceil{
        position: fixed;
        width: 100%;
        top:0;
        left:0;
        height:@heightHeader;
        background-color: #324157;
        .user{
            float:right;
            margin-right:30px;
            line-height: @heightHeader;
            cursor: pointer;
            .el-dropdown{
                color:#fff;
            }
        }
    }
    .home_bot{
        padding-top: @heightHeader;
        height:100vh;
        box-sizing: border-box;
        overflow: hidden;
        .nav_bar{
            float: left;
            background-color:#eef1f6 ;
            width: @widthNav;
            height: 100%;
            .list{
                line-height: 56px;
                a{
                    display: block;
                    color:#48576a;
                    padding-left: 30px;
                    text-decoration: none;
                    background-color: transparent;
                    transition: all .3s;
                    &:hover{
                        background-color: #d1dbe5;
                    }
                    &.router-link-active{
                        background-color: #d1dbe5;
                    }

                }
            }
        }
        .home_content{
            margin-left: @widthNav;
            padding:21px;
            height: 100%;
        }
    }

}

</style>
<style>
.el-table{
    margin-top: 21px;
}
.el-pagination{
    margin:30px 0 10px;
    text-align: center;
}
</style>