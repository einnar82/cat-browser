import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import CatCard from '@/components/CatCard.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(BootstrapVue)
app.use(BootstrapVueIcons)
app.component('CatCard', CatCard)

app.mount('#app')
