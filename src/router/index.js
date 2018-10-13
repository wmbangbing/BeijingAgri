import Vue from 'vue'
import Router from 'vue-router'

import envParamRouter from './modules/envParam'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'


export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/view',
    name: 'default',
    hidden: true,
    // children: [{
    //   path: 'map',
    //   component: () => import('@/views/esriMap/index')
    // }]
  },
  {
    path: '/view',
    component: Layout,
    redirect: '/view/mapview',
    name: 'map',
    meta: { title: '地图', icon: 'map' },
    children: [
      {
        path: 'mapview',
        name: 'MapView',
        component: () => import('@/views/esriMap/index'),
        meta: { title: '二维', icon: '2dmap' }
      },
      {
        path: 'sceneview',
        name: 'SceneView',
        component: () => import('@/views/esriScene/index'),
        meta: { title: '三维', icon: '3dmap' }
      }
    ]
  },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: '例子', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: '表格', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: '树状列表', icon: 'tree' }
  //     }
  //   ]
  // },
  envParamRouter
  // {
  //   path: '/login',
  //   component: () => import('@/views/login/index'),
  // },
  // {
  //   path: '/auth-redirect',
  //   component: () => import('@/views/login/authredirect'),
  // },
  // {
  //   path: '',
  //    component: () => import('@/views/layout/Layout'),
  //   redirect: 'main',
  //   children: [
  //     {
  //       path: 'main',
  //       component:() => import('@/views/layout/Layout'),
  //       name: 'main',
  //       meta: { title: 'main', icon: 'main', noCache: true }
  //     }
  //   ]
  // },
]

export default new Router({
  // mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// export const asyncRouterMap = [
//   {
//     path: '/404',
//     component: () => import('@/views/errorPage/404'),
//     hidden: true
//   },
//   {
//     path: '/401',
//     component: () => import('@/views/errorPage/401'),
//     hidden: true
//   },
// ]