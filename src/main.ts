import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './style.css'
import App from './App.vue'
import router from './router' // ← 追加
import vuetify from './plugins/vuetify'

const app = createApp(App)
const pinia = createPinia()

// Piniaにプラグインをセット
pinia.use(piniaPluginPersistedstate) // 永続化プラグインを有効化

// VueアプリにPiniaを登録
app.use(pinia)

// その他のプラグインを登録してマウント
app.use(router) // ← 追加（これでルーターが有効になります）
app.use(vuetify)
app.mount('#app')