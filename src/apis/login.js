import axios from 'axios';
import {Message} from 'element-ui';
// import apiService, {storeToken, removeToken} from './http';
export function getCode(){
    return axios.get('/apiPath/api/captcha/get');
}
export function loginIn(userName, pwd, checkCode, cToken){
    return axios.post('/apiPath/auth/login',{password: pwd,loginname: userName, code: checkCode, cToken: cToken});
}