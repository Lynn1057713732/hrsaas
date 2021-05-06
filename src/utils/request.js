import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  // 当执行 npm run dev  => .evn.development => /api => 跨域代理
  baseURL: process.env.VUE_APP_BASE_API, // npm  run dev  => /api npm run build =>  /prod-api
  timeout: 5000 // 设置超时时间
})
// 请求拦截器
service.interceptors.request.use()
// 响应拦截器
service.interceptors.response.use(response => {
  // axios默认加了一层data
  const { success, message, data } = response.data
  //   要根据success的成功与否决定下面的操作
  if (success) {
    return data
  } else {
    // 业务已经错误了 还能进then ? 不能 ！ 应该进catch
    Message.error(message) // 提示错误消息
    return Promise.reject(new Error(message))
  }
}, error => {
  // error 信息 里面 response的对象
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 当等于10002的时候 表示 后端告诉我token超时了
    store.dispatch('user/logout') // 登出action 删除token
    router.push('/login')
  } else {
    Message.error(error.message) // 提示错误信息
  }
  return Promise.reject(error)
})

export default service
