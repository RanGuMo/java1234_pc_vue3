import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: '首页',
    component: () => import('../views/layout'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: '首页',
        component: () => import('../views/home'),
      },
      {
        path: '/bigType',
        name: '商品大类',
        component: () => import('../views/bigType'),
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
