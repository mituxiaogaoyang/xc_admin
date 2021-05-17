<template>
    <div class='login_page'>
        <div class="container">
            <div class="title">门户后台管理系统</div>
            <div class="login_box">
                <div class="core">
                    <div class="word">登录</div>
                    <div class="form_box">
                        <el-input v-model="userName" placeholder="登录名" class="input_login"></el-input>
                        <el-input v-model="userPassword" type="password"  class="input_login" placeholder="密码"></el-input>
                        <div class="img_box">
                            <el-input v-model="checkCode" placeholder="验证码" class="input_login"></el-input>
                            <div class="img" @click="refreshCode"><img :src="'data:image/gif;base64,'+imgUrl" alt=""></div>
                        </div>
                        
                        <el-button type="primary" @keyup.enter="loginIn"  round class="btn_login" @click="loginIn">登录</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {loginIn, getCode} from '@/apis/login';
    import {storeToken, removeToken} from '@/apis/http';
    import {Base64} from 'js-base64';
    export default {
        data () {
            return {
                userName: '',
                userPassword: '',
                checkCode: '',
                imgUrl:''
            };
        },
        mounted () {
            this.refreshCode();
        },
        methods: {
            loginIn(){
                const pwd = this.userPassword;
                const userName = this.userName;
                const code = this.checkCode;
                loginIn(userName, Base64.encode(pwd), code,this.cToken).then(res =>{
                    const data = res.data;
                    if(data.result === 200){
                        storeToken(data.data.token, data.data.refreshToken);
                        sessionStorage.setItem('expiration', data.data.expiration);
                        sessionStorage.setItem('userName', data.data.username);
                        sessionStorage.setItem('userId', data.data.userId);
                        this.$router.push('./home');
                    }else{
                        this.$message.error(data.message);
                    }
                    
                }).catch(error =>{
                    this.$message.error(error.response.data.message);
                });
            },
            refreshCode(){
                getCode().then(res =>{
                    this.imgUrl = res.data.data.img;
                    this.cToken = res.data.data.cToken;
                }).catch(err =>{
                    this.$message.error('服务异常');
                });
            }
        },
    };
</script>

<style lang='less' scoped>
.login_page{
    height:100vh;
    background: url(../assets/bg_login.png) no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    .container{
        width:600px;
        margin: 210px auto 0;
        .title{
            color:#fff;
            font-size: 32px;
        }
        .login_box{
            background-color: #fff;
            border-radius: 8px;
            padding:20px 60px;
            margin:10px 0;
            .core{
                .word{
                    text-align: center;
                    font-size: 20px;
                    margin:12px 0;
                    letter-spacing: 8px;
                }
                .form_box{
                    .input_login{
                        margin:6px 0;
                        
                    }
                    .img_box{
                        position: relative;
                        .img{
                            position: absolute;
                            right:0;
                            width:160px;
                            bottom:7px;
                            height:40px;
                            cursor: pointer;
                            img{
                                width:100%;
                            }
                        }
                    }
                    .btn_login{
                        width:80%;
                        margin:36px auto;
                        display: block;
                    }
                }
            }
        }
    }
}
</style>
<style>
.el-input .el-input__inner{
    border-width: 0 0 1px 0;
}
</style>