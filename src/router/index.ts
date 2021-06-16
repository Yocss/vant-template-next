import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomeIndex',
    component: () => import('@/views/home/index.vue'),
    meta: { title: '首页', layout: 'home' }
  },
  {
    path: '/news',
    name: 'NewsIndex',
    component: () => import('@/views/news/index.vue'),
    meta: { title: '新闻', layout: 'home' }
  },
  {
    path: '/test',
    name: 'TextIndex',
    component: () => import('@/views/test/index.vue'),
    meta: { title: '测试页', layout: 'home' }
  },
  {
    path: '/test/play',
    name: 'TextPlay',
    component: () => import('@/views/test/play.vue'),
    meta: { title: '播放器测试' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'ErrorIndex',
    component: () => import('@/views/error/index.vue'),
    meta: { title: '访问出错了', layout: 'home' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
