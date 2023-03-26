import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './routes.js'

const router = new VueRouter({
  mode: 'history',
  routes,
  base:'/myH5/'
})

// 导航守卫
// https://v3.router.vuejs.org/

// router.beforeEach((to, from, next) => {
//   const isLogin = store.state.isLogin;
//   console.log('isLogin----',isLogin)
//   // // 没有登录且不是去登录首页
//    if(!isLogin && to.path != '/web-log/login'){
//      next("/web-log/login")
//    }else{
//     next()
//    }
// })
export default router
