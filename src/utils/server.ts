import axios from 'axios'
// 处理 类型"AxiosResponse<any,any>"上不存在xxx属性
// declare module 'axios' {
//   interface AxiosInstance {
//     (config: AxiosRequestConfig): Promise<any>
//   }
// }
declare module 'axios' {
  interface AxiosResponse<T = any> {
    code: number
    result?: any
    banners?: any
    // 这里追加你的参数
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance
}
// 网易云http://codercba.com:9002/top/mv
// 环境变量
const baseURL =
  import.meta.env.MODE === 'prod'
    ? import.meta.env.VITE_APP_BASE_URL
    : import.meta.env.VITE_APP_PROXY_URL
// 创建axios实例
const server = axios.create({
  baseURL,
  timeout: 5000,
  withCredentials: true, // 异步请求携带cookie
  headers: { 'Content-type': 'application/json;charset=UTF-8' }
})
/*********请求拦截*********/
server.interceptors.request.use(
  // 成功
  function (config) {
    // 转小写
    config.method = config.method?.toLocaleLowerCase()

    // 请求发送之前的
    return config
  },
  //   失败
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

/******返回拦截********/
server.interceptors.response.use(
  // 成功，任何处于2xx范围内的状态码都会触发此函数
  (response) => {
    return Promise.resolve(response.data)
    // return response.data
  },
  // 失败，任何超出2xx范围的状态码都会触发此函数
  (error) => {
    return Promise.reject(error)
  }
)

export default server
