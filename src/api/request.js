import axios from 'axios'

// 不同环境不同地址
const apis = {
  production: 'http://www.api.lalala.com', // 线上 (生成环境)
  development: 'http://localhost:3000', // 本地 (开发环境)
}
// ajax请求设置
const request = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production' ? apis.production : apis.development,
  timeout: 6000, // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message,
      })
    }
    if (
      error.response.status === 401 &&
      !(data.result && data.result.isLogin)
    ) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed',
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

request.interceptors.request.use((config) => {
  return config
}, errorHandler)
request.interceptors.response.use((response) => {
  return response.data
}, errorHandler)

export default request
