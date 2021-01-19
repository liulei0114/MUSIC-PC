import axios from 'axios'


// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL, // api的base_url
  // baseURL: "http://localhost:3000",
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
    const res = response.data
    if (res.code !== 200) {  // 返回错误
      return Promise.reject(res)
    } else { // 成功
      return Promise.resolve(res)
    }
  },
  error => { //非2XX
    if (error && error.response && error.response.status) {
      return Promise.reject(error.response.data)
    }
  }
)

export default service