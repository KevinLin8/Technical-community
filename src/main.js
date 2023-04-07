import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'reset-css'
import '@/ults/element-ui.js'
import '@/assets/css/style.css'
Vue.config.productionTip = false

console.log(
  `${process.env.NODE_ENV}环境---版本号:${APP_VERSION}---${BUILD_DATE}`
)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
