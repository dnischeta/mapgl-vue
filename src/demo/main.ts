import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { plugin } from '../plugin'
createApp(App).use(plugin).mount('#app')
