import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import './mock/index'
import 'virtual:svg-icons-register'

const app = createApp(App)
app.use(router)
app.mount('#app')
