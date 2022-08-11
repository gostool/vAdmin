import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'

// initial state
const state = {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: []
  }
  
  // getters
  const getters = {}
  
   // mutations
  const mutations = {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  }
  
  // actions
  const actions = {
    // user login
    async LoginIn({ commit }, loginInfo) {
        const resp = await login(loginInfo)
        console.log("LoginIn resp", resp)
        // login 中service 返回不为空, 说明请求成功
        if (resp && resp.code == 0) {
            const token = resp.data? resp.data.token:""; 
            console.log("token:", token)
            commit('SET_TOKEN',token)
            setToken(token)
            return true
        }
        return false
    },
  
  
    // remove token
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    },
  }
  
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }