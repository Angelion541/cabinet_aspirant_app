
import { createApp } from 'vue'
import { createPinia } from 'pinia';
import Antd from 'ant-design-vue';
import App from './App.vue'
import router from './router'
import AntProvider from './components/AntProvider.vue'

import 'ant-design-vue/dist/reset.css';
import './assets/main.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Antd)
app.component('AntProvider', AntProvider)

app.mount('#app')
