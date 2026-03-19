import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' // ← 追加
import vuetify from './plugins/vuetify'

createApp(App)
  .use(router) // ← 追加（これでルーターが有効になります）
  .use(vuetify)
  .mount('#app')