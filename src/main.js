import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'
import Plotly from 'plotly.js-dist-min'

createApp(App).use(router, Plotly).mount('#app')
