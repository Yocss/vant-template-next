/**
 * 全局路由守卫
 */
import { RouteLocationNormalized } from 'vue-router'
import { store } from '@/store'
import router from '@/router'
import { analytics } from '@/plugins/analytics'

function setLayout (to: RouteLocationNormalized): void {
  const layout = to?.meta?.layout || 'default'
  store.dispatch('SetStore', { layout })
}

function hook () {
  router.beforeEach((to, from, next) => {
    // 首次进入应用的非首页, 先跳转到首页，然后再进入到目标页
    setLayout(to)
    next()
  })

  router.beforeResolve((to, from, next) => {
    // console.log(to)
    // console.log(from)
    if (!from.name && to.path !== '/') {
      next({
        name: 'HomeIndex',
        replace: true,
        params: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  })

  router.afterEach((to, from) => {
    // 页面转场
    let transition = ''
    if (from.name) {
      if (to.path === from.path) {
        transition = 'goto'
      } else {
        if (from.path.indexOf(to.path) === 0) {
          transition = 'back'
        } else if (to.path.indexOf(from.path) === 0) {
          transition = 'go'
        } else {
          transition = 'goto'
        }
      }
    }
    store.dispatch('SetStore', { transition })

    // 使用cnzz记录用户访问数据
    analytics(to.fullPath, from.fullPath)
  })
}
hook()
