<template>
    <div class='banner_page'>
         <el-button type="primary" plain @click="addUser">新增</el-button>
         <el-table  :data="tableData" border >
             <el-table-column
                label="序号"
                type="index"
                width="80">
            </el-table-column>
            <el-table-column
                prop="username"
                label="用户名"
                width="180">
            </el-table-column>
            <!-- <el-table-column
                prop="usernick"
                label="昵称"
                width="180">
            </el-table-column> -->
            <el-table-column
                prop="loginname"
                label="登录名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="手机号">
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱">
            </el-table-column>
            <el-table-column
                prop="address"
                width="180"
                label="操作">
                <template slot-scope="scope">
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
        <el-dialog title="新添用户" :visible.sync="dialogFormVisible">
            <el-form :model="form"  label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="昵称">
                    <el-input v-model="form.usernick" autocomplete="off"></el-input>
                </el-form-item> -->
                <el-form-item label="登录名" >
                    <el-input v-model="form.loginname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" >
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" >
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.pwd" type="password" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitUser">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改用户" :visible.sync="dialogFormVisible2">
            <el-form :model="form"  label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="昵称">
                    <el-input v-model="form.usernick" autocomplete="off"></el-input>
                </el-form-item> -->
                <el-form-item label="登录名" >
                    <el-input v-model="form.loginname" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="手机号" >
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" >
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-button type="primary" plain size="small" @click="resetPwd" :disabled="isResetPwd?true:false">{{isResetPwd?'已重置':'重置密码'}}</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelUpdate">取 消</el-button>
                <el-button type="primary" @click="submitUser2">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getAllUser, saveUser, updateUser, deleteUser, resetPwd} from '@/apis/home';
    export default {
        data () {
            return {
                tableData:[],
                currentPage:1,
                formLabelWidth: 100,
                form:{
                    username: '',
                    loginname: '',
                    // usernick: '',
                    phone:'',
                    email: '',
                    pwd: ''
                },
                dialogFormVisible: false,
                dialogFormVisible2: false,
                isResetPwd: 0,
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
            getData(i){
                const page = i || 1;
                getAllUser({currentPage:page}).then(res =>{
                    this.page.total = res.totalRecords;
                    this.tableData = res.items;
                });
            },
            handleCurrentChange(i){
                this.getData(i);
            },
            modify(row){
                this.dialogFormVisible2 = true;
                for(let k in this.form){
                    this.form[k] = row[k];
                }
                this.updateId = row.id;
                this.isResetPwd = 0;
            },
            remove(id){
                this.$confirm('确定删除该用户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        deleteUser(id).then(res =>{
                            this.$message.success('删除成功');
                            this.getData();
                        });
                    
                    }).catch(() => {
                                
                    });
            },
            addUser(){
                this.dialogFormVisible = true;
                for(let k in this.form){
                    this.form[k] = '';
                }
            },
            submitUser(){
                saveUser(this.form).then(res =>{
                    this.dialogFormVisible = false;
                    this.$message.success('新添成功');
                    this.getData();
                    for(let k in this.form){
                        this.form[k] = '';
                    }
                });
            },
            cancelUpdate(){
                this.dialogFormVisible2 = false;
                this.isResetPwd = 0;
            },
            resetPwd(){  
                this.isResetPwd = 1;
            },
            submitUser2(){
                const obj = {...this.form};
                delete obj.pwd;
                const userId = Number(sessionStorage.getItem('userId'));
                const userName = sessionStorage.getItem('userName');
                const updateId = this.updateId;
                console.log(updateId);
                updateUser({...obj, id:this.updateId,resetPwd:this.isResetPwd}).then(res =>{
                    this.dialogFormVisible2 = false;
                    if(userId === updateId && obj.username !== userName){
                        this.$emit('changeName', obj.username);
                        sessionStorage.setItem('userName', obj.username);
                    }
                    this.getData();
                    let wordNewPwd = '';
                    if(this.isResetPwd){
                        this.isResetPwd = 0;
                        wordNewPwd = ','+this.form.username+'的新密码为' + res;
                    }
                    this.$message.success('修改成功'+ wordNewPwd);
                });
            }
        },
    };
</script>

<style lang='less' scoped>

</style>