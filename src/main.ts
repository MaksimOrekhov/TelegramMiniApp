import './assets/main.css'
import VueTelegram from 'vue-tg'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(VueTelegram)
app.use(createPinia())
app.use(router)

app.mount('#app')
