// const store = createStore({
//     state () {
//       return {
//         count: 0,
//         todos: [
//             { id: 1, text: '...', done: true },
//             { id: 2, text: '...', done: false }
//           ]
//       }
//     },
//     mutations: {
//       increment (state, payload) {
//             state.count += payload.amount
//        },
//       addTodo (state) {
//         state.todos.push({ id: state.count, text: '...', done: true })
//       }
//     },
//     getters: {
//      doneTodos (state) {
//         return state.todos.filter(todo => todo.done)
//      }, 
//      doneTodosCount (state, getters) {
//         return getters.doneTodos.length
//       }
//     }
//   })