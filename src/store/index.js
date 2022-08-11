import { createStore, createLogger } from 'vuex'
// import cart from './modules/cart'
import products from './modules/products'
import user from "./modules/user"

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    // cart,
    products,
    user,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
