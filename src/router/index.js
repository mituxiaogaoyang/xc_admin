import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/components/login';
import Home from '@/components/index';
import Banner from '@/components/banner';
import news from '@/components/news';
import newsAdd from '@/components/newsAdd';
import message from '@/components/message';
import job from '@/components/job';
import jobAdd from '@/components/jobAdd';
import user from '@/components/user';
import newsDetail from '@/components/newsDetail';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/newsDetail/:id',
    name: 'newsDetail',
    component: newsDetail
  },
  {
    path: '/home',
    name:'home',
    component:Home,
    redirect:'/banner',
    children:[
      {
        path: '/banner',
        name:'banner',
        component:Banner,
      },
      {
        path: '/news',
        name:'news',
        component:news,
      },
      {
        path: '/addNews',
        name:'newsAdd',
        component:newsAdd,
      },
      {
        path: '/message',
        name:'message',
        component:message,
      },
      {
        path: '/job',
        name:'job',
        component:job,
      },
      {
        path: '/addJob',
        name:'jobAdd',
        component:jobAdd,
      },
      {
        path: '/user',
        name:'user',
        component:user,
      },
    ]
  }
];

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) =>{
  const token = sessionStorage.getItem('accessToken');
  const refreshToke =  sessionStorage.getItem('refreshToken');
  const isLogin = token && refreshToke;
  if(!isLogin && to.name !== 'login'){
    next({ path: '/login' });
  }else{
    next();
  }
});


export default router;
