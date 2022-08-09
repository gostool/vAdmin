import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import SvgIcon from '@/components/SvgIcon/index.vue'// svg组件
import router from './router'

const app = createApp(App)
const req = require.context('@/icons/svg', false, /.svg$/)  
req.keys().map(req)
app.component('svg-icon', SvgIcon)
app.use(ElementPlus).use(router).mount('#app')
