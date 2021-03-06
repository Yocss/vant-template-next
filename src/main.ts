import { createApp } from 'vue'
import App from '@/layout/App.vue'
import 'vant/lib/index.css'
import '@/assets/css/common/index.styl'
import './plugins/registerServiceWorker'
import router from './router'
import { store, key } from './store'
import './plugins/routerHook'
import { Lazyload } from 'vant'
// 全局base-page组件
import BasePage from '@/components/base/BasePage/index.vue'

// createApp(App).use(store, key).use(router).mount('#app')
export const app = createApp(App)
app.component('base-page', BasePage)
app.use(store, key)
app.use(Lazyload, {
  lazyComponent: true,
  loading: 'https://sihong-cdn.oss-cn-shanghai.aliyuncs.com/img/loading.gif',
  error: '/error.png'
})
app.use(router)
app.mount('#app')
