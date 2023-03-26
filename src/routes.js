// 路由菜单 枚举
// 页面首页
const Main = () => import('@/components/home/index.vue');
const Home = () => import('@/components/home/home.vue');
const HomeTrue = () => import('@/components/home-true/index.vue');
const User = () => import('@/components/user/index.vue')
const DataList = () => import('@/components/data-list/index.vue')
const RengZheng = () => import('@/components/reng-zheng/index.vue')
const SubmitPage = () => import('@/components/submit-page/index.vue')

const routes =
[
  {
    path: '/',
    component: Main,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: Home
      },
      {
        path: '/home-true',
        component: HomeTrue
      },
      {
        path: '/user',
        component: User
      },
      {
        path: '/data-list',
        component: DataList
      },
      {
        path: '/ren-zheng',
        component: RengZheng
      },
      {
        path: '/submit-page',
        component: SubmitPage
      }
    ]
  },
]
export default routes;
