import Vue from 'vue'
import Router from 'vue-router'
import sidebar from '@/ults/sidebar'
import Home from '@/layouts/home.vue'
// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}

const router_children = sidebar.sidebar_list.map((item) => {
  return {
    path: item.path,
    name: item.name,
    component: () => import(`@/views${item.path}.vue`),
  }
})

Vue.use(Router)

const createRouter = () =>
  new Router({
    mode: 'hash',
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        redirect: '/html',
        children: router_children,
      },
    ],
  })

const router = createRouter()

// router.beforeEach((to, from, next) => {
//   next()
// })

// 定义一个resetRouter 方法，在退出登录后或token过期后 需要重新登录时，调用即可
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
