// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify のインポートを追加 **********/
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// 以下を追加 **********/
const vuetify = createVuetify({
  components,
  directives,
})

// main.ts
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify) // ここで、先ほど作成したappインスタンスにvuetifyを追加
app.mount('#app') // ここでappをマウント
