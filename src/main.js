import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import SvgIcon from '@/components/SvgIcon/index.vue'// svg组件
import router from './router'
import store from './store'
import { ElMessage} from 'element-plus'

const app = createApp(App)
app.config.globalProperties.$message = ElMessage;
const req = require.context('@/icons/svg', false, /.svg$/)  
req.keys().map(req)
app.component('svg-icon', SvgIcon)
app.use(ElementPlus).use(router).use(store).mount('#app')
