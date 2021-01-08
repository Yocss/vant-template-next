import { createApp } from 'vue'
import App from './layout/App.vue'
import 'vant/lib/index.css'
import './plugins/registerServiceWorker'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')
// const app = createApp(App)
// app.use(store)
// app.use(router)
// app.mount('#app')
