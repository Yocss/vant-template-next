import { createApp } from 'vue'
import App from '@/layout/App.vue'
import 'vant/lib/index.css'
import '@/assets/css/common/index.styl'
import './plugins/registerServiceWorker'
import router from './router'
import { store, key } from './store'
import './plugins/routerHook'

// createApp(App).use(store, key).use(router).mount('#app')
export const app = createApp(App)
app.use(store, key)
app.use(router)
app.mount('#app')
