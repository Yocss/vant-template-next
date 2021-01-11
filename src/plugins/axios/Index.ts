/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios'
import * as Qs from 'qs'
import { OptionType, JsonType, ResultType, ConfigType } from './Axios.dto'
import { initOption } from './initData'

class Axios {
  private http: AxiosInstance // http
  private init: OptionType = initOption // 初始化参数
  private resultData: ResultType = {
    statusCode: 500,
    code: -1,
    result: {},
    message: ''
  }

  constructor (option?: OptionType) {
    this.init = Object.assign(initOption, option)
    const config = this.init.jsonData ? {} : {
      transformRequest: [(data: JsonType) => { return Qs.stringify(data) }]
    }
    this.http = axios.create(Object.assign({
      baseURL: this.init.baseURL,
      timeout: this.init.timeout
    }, config))
    this.setInterceptor()
  }

  private getResultData () {
    return this.resultData
  }

  // 定义拦截器
  private setInterceptor () {
    // 1. 请求拦截
    this.http.interceptors.request.use((config) => {
      return config
    }, (error) => {
      return Promise.reject(error)
    })

    // 2. 响应拦截
    this.http.interceptors.response.use(
      (response) => {
      // 处理正常响应
        response.data = this.transformResponseData(response, 'success')
        return response
      },
      (error) => {
      // 处理http状态码级别的错误
        const response = error.response
        const data = this.getResultData()
        if (response) {
          Object.assign(data, this.transformResponseData(response, 'error'))
        } else {
          const errorText = JSON.stringify(error)
          console.log('==== <Response error> ====')
          console.error(errorText)
          console.log('==== </Response error> ====')
          const statusCode = errorText.indexOf('timeout of') > -1 ? 504 : 502
          // this.init.errorMessage
          const errorMessage = this.init?.errorMessage || {}
          Object.assign(data, { statusCode, message: errorMessage[statusCode] })
        }
        return Promise.reject(data)
      }
    )
  }

  // 判断数据类型
  private getDataType (v: any): string {
    const t = Object.prototype.toString.call(v)
    return t.slice(8, -1).toLocaleLowerCase()
  }

  // 转换响应数据格式
  private transformResponseData (response: any, type: string): ResultType {
    let statusCode = response?.status || 500
    const initResult = this.getResultData()
    const res = Object.assign(initResult, { statusCode })
    const { data } = response
    // 1. 处理后端按规范返回的数据
    if (this.getDataType(data) === 'object') {
      const formatKeys = this.init?.formatKeys || {
        code: 'code',
        result: 'result',
        message: 'message'
      }
      const result = response.data[formatKeys.result] || {}
      let code = response.data[formatKeys.code]
      code = isNaN(code) ? -1 : code * 1
      let message = response.data[formatKeys.message] || ''
      if (type === 'error') {
        const errorMessage = this.init?.errorMessage || {}
        code = errorMessage[code] ? code : 500
        message = message || errorMessage[code] || '请求发生错误，请联系工程师' + `(${statusCode})`
      }
      Object.assign(res, { statusCode, code, result, message })
    } else {
    // 2. 后端返回的数据不规范，将 statusCode 定义为 500
      statusCode = 502
      Object.assign(res, { statusCode, message: `响应错误，未获取预期数据(${statusCode})` })
    }
    return res
  }

  // 调用axios请求方法 并 返回统一的数据格式
  private async callRequest (url: string, data: JsonType, config: ConfigType): Promise<ResultType> {
    const res = this.getResultData()
    const post = ['post', 'put', 'patch']
    const m = post.concat(['get', 'delete', 'head', 'options'])
    const confMethod = config?.method || 'get'
    const method = m.includes(confMethod) ? confMethod : 'get'
    const query = post.includes(method) ? { data } : { params: data }
    const option = config.option || {}
    const requestParams = Object.assign({}, query, option)
    try {
      const response = await this.http({ url, method, ...requestParams })
      return Object.assign(res, response.data)
    } catch (error) {
      return error
    }
  }

  // 发起请求
  /**
   * 发起ajax请求
   * @param url 请求的url地址
   * @param data 请求体参数
   * @param config 请求参数配置
   */
  async request (url: string, data: JsonType, config?: ConfigType): Promise<ResultType> {
    const conf: ConfigType = Object.assign({
      method: 'get',
      option: {}
    }, config)
    const result = await this.callRequest(url, data, conf)
    const customCode = this.init?.customCode || { success: [0, 2000, 2010] }
    const success = customCode.success.includes(result.code)
    if (success) {
      result.code = 0
    }
    return result
  }
}
export { Axios, OptionType, ResultType, JsonType, ConfigType }
