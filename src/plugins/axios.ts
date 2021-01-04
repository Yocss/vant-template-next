/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import Qs from 'qs'
import config from '@/config/index'
const { httpRequest } = config
const { times } = httpRequest
interface Result {
  code: number;
  result: any;
  message: string;
}
class Axios {
  private axios
  private times

  constructor () {
    this.times = times
    this.axios = axios.create({
      timeout: 10000, // 10s超时
      transformRequest: [(data) => { return Qs.stringify(data) }]
    })
    // 设定拦截器
    this.initInterceptor()
    // 返回axios
    this.getAxios()
  }

  private getAxios () {
    return this.axios
  }

  // 初始化拦截器
  private initInterceptor () {
    /**
     * 请求拦截器
     * headers里添加参数
     * 返回错误等，如 请求超时
     */
    this.axios.interceptors.request.use((config) => {
      // "get" | "GET" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "purge" | "PURGE" | "link" | "LINK" | "unlink" | "UNLINK" | undefined

      const token = { 'x-request-tk': '' }
      const headData = Object.assign({}, token)

      Object.assign(config.headers, headData)
      return config
    }, (error) => {
      return Promise.reject(error)
    })

    this.axios.interceptors.response.use((res) => {
      let { data } = res
      try {
        JSON.stringify(data)
      } catch (error) {
        data = { code: 5000, result: {}, message: '响应错误：未获得预期数据(500)' }
      }
      return data
    }, (error) => {
      const response = error.response
      const { errorMessage } = httpRequest
      let code = 504
      let message = errorMessage[code]
      const data = { code, message, result: {} }
      if (response) {
        code = response.status || 500
        message = errorMessage[code] || message
      } else {
        Object.assign(data, { result: error.message || {} })
      }
      data.code *= 10
      return Promise.reject(data)
    })
  }

  // 执行请求
  private async request (api: string, json: any, config: any, times = this.times): Promise<any> {
    console.log(times)
    const resultData: Result = { code: 0, result: {}, message: 'ok' }
    const conf = Object.assign({ method: 'post', option: {} }, config)
    const url = api.indexOf('/') === 0 ? api.slice(1) : api
    try {
      const method = conf.method !== 'post' ? 'get' : 'post'
      const data = { post: { data: json }, get: { params: json } }[method]
      const result = await this.axios({ url, method, ...conf.option, ...data })
      return result
    } catch (err) {
      console.log(err)
    }
    return resultData
  }
}

const http = new Axios()
export default http
