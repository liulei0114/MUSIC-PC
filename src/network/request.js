import axios from 'axios'
import store from '@/store'
import { Message, MessageBox } from 'element-ui';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject('error')
})

// respone拦截器
service.interceptors.response.use(
  response => {
     // code为非200是抛错 可结合自己业务进行修改
    const res = response.data
    if (res.code !== 200) {  // 返回错误
      if (res.code === 500 || res.code === 404) {   
        Message({
          message: res.message,
          type: 'error',
        })
      }
      return Promise.reject(res)
    } else { // 成功
      return Promise.resolve(res)
    }
  },
  error => {
    Message({
      message: error,
      type: 'error',
    })
    return Promise.reject(error)
  }
)

export default service