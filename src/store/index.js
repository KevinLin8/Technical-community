import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const modules = {}
const files = require.context('./modules', false, /\.js$/)
files.keys().forEach((keys) => {
  const key = keys.replace(/^\.\/(.*?)\.js$/, '$1')
  modules[key] = files(keys).default
})
export default new Vuex.Store({
  modules,
  state: {},
  mutations: {},
  actions: {},
  getters: {},
})
