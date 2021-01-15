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
    // 如果第一次访问的不是首页，则先跳转到首页，然后从首页重定向至目标页
    console.log('=======')
    console.log(from.name)
    console.log(from.name ? '非首次' : '首次访问')
    console.log('=======')
    setLayout(to)
    next()
  })

  router.afterEach((to, from) => {
    // 页面转场
    let animate = ''
    if (from.name) {
      if (to.path === from.path) {
        animate = 'goto'
      } else {
        if (from.path.indexOf(to.path) === 0) {
          animate = 'back'
        } else if (to.path.indexOf(from.path) === 0) {
          animate = 'go'
        } else {
          animate = 'goto'
        }
      }
    }
    store.dispatch('SetStore', { animate })

    // 使用cnzz记录用户访问数据
    analytics(to.fullPath, from.fullPath)
  })
}
hook()
