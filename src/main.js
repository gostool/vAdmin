import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import SvgIcon from '@/components/SvgIcon/index.vue'// svg组件
import router from './router'
import { createStore } from 'vuex'

const store = createStore({
    state () {
      return {
        count: 0,
        todos: [
            { id: 1, text: '...', done: true },
            { id: 2, text: '...', done: false }
          ]
      }
    },
    mutations: {
      increment (state, payload) {
            state.count += payload.amount
       },
      addTodo (state) {
        state.todos.push({ id: state.count, text: '...', done: true })
      }
    },
    getters: {
     doneTodos (state) {
        return state.todos.filter(todo => todo.done)
     }, 
     doneTodosCount (state, getters) {
        return getters.doneTodos.length
      }
    }
  })

const app = createApp(App)
const req = require.context('@/icons/svg', false, /.svg$/)  
req.keys().map(req)
app.component('svg-icon', SvgIcon)
app.use(ElementPlus).use(router).use(store).mount('#app')
