
import apiService from './http';
export const apiContextPath = '/apiPath'; //
const pageSize = 10;
//logout
export function logout(data) {
    return apiService.post(apiContextPath + '/auth/logout');
}
//user
export function getAllUser(data) {
    return apiService.post(apiContextPath + '/console/user/queryList',{...data,pageSize});
}
export function saveUser(data) {
    return apiService.post(apiContextPath + '/console/user/save',data);
}
export function updateUser(data) {
    return apiService.post(apiContextPath + '/console/user/update',data);
}
export function deleteUser(id){
    return apiService.get(apiContextPath + '/console/user/deleteById',{id});
}
export function updatePwd(data) {
    return apiService.post(apiContextPath + '/console/user/changePwd',data);
}
export function resetPwd(id){
    return apiService.get(apiContextPath + '/console/user/resetPwd',{id});
}
//news
export const kindsNews = [
    {label:'新橙快报',val:1},
    {label:'北斗资讯',val:2},
    {label:'应急管理行业要闻',val:3},
    {label:'智慧交通行业要闻',val:4},
    {label:'精准城市行业要闻',val:5},
    {label:'国土地灾行业要闻',val:6},
    {label:'员工风采',val:7},
    {label:'直播公告',val:8},
];
export const states = [
    {label:'未发布',val:0},
    {label:'已发布',val:1},
];
export function getNews(data){
    return apiService.post(apiContextPath + '/console/content/queryList',{...data,pageSize});
}
export const imgSite = apiContextPath + '/console/file/upload' ; //图片上传地址
export function addNews(data){
    return apiService.post(apiContextPath + '/console/content/save',data);
}
export function updateNews(data){
    return apiService.post(apiContextPath + '/console/content/update',data);
}
export function publishNews(id,state){
    return apiService.get(apiContextPath + '/console/content/publish',{id,state});
}
export function getNewsInfo(id){
    return apiService.get(apiContextPath + '/console/content/queryById',{id});
}
export function deleteNews(id){
    return apiService.get(apiContextPath + '/console/content/deleteById',{id});
}
// 留言
export const statesMessage = [
    {label:'未处理',val:0},
    {label:'已处理',val:1},
    {label:'无需处理',val:2},
];
export function getMessages(data){
    return apiService.post(apiContextPath + '/console/comments/queryList',{...data,pageSize});
}
export function dealMessages(id,dealState){
    return apiService.post(apiContextPath + '/console/comments/deal',{id,dealState});
}
//banner
export function getBanners(data){
    return apiService.post(apiContextPath + '/console/banner/queryByList',{...data,pageSize});
}
export function addBanner(data){
    return apiService.post(apiContextPath + '/console/banner/save',data);
}
export function publishBanner(id,state){
    return apiService.get(apiContextPath + '/console/banner/publish',{id,state});
}
export function deleteBanner(id){
    return apiService.get(apiContextPath + '/console/banner/deleteById',{id});
}
//招聘
export function getJobs(data){
    return apiService.post(apiContextPath + '/console/position/queryByList',{...data,pageSize});
}
export function addJob(data){
    return apiService.post(apiContextPath + '/console/position/save',data);
}
export function publishJob(id,state){
    return apiService.get(apiContextPath + '/console/position/publish',{id,state});
}
export function deleteJob(id){
    return apiService.get(apiContextPath + '/console/position/deleteById',{id});
}
export function getJobInfo(id){
    return apiService.get(apiContextPath + '/console/position/queryById',{id});
}
export function updateJob(data){
    return apiService.post(apiContextPath + '/console/position/update',data);
}
