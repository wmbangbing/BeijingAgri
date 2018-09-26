import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export const constantRouterMap = [
  // {
  //   path: '/redirect',
  //   component:() => import('@/views/layout/Layout'),
  //   children: [
  //     {
  //       path: '/redirect/:path*',
  //       component: () => import('@/views/redirect/index')
  //     }
  //   ]
  // },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
  },
  // {
  //   path: '/404',
  //   component: () => import('@/views/errorPage/404'),
  //   hidden: true
  // },
  // {
  //   path: '/401',
  //   component: () => import('@/views/errorPage/401'),
  //   hidden: true
  // },
  {
    path: '',
     component: () => import('@/views/layout/Layout'),
    redirect: 'main',
    children: [
      {
        path: 'main',
        component:() => import('@/views/layout/Layout'),
        name: 'main',
        meta: { title: 'main', icon: 'main', noCache: true }
      }
    ]
  },
  // { path: '/', redirect: '/Login'},
  // { path: '/Login', component:  () => import('@/views/login/index') },
  // { path: '', component:  () => import('@/views/layout/Layout') },
]

export default new Router({
  // mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
]