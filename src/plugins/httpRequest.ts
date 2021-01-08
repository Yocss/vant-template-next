/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios, { AxiosInstance } from 'axios'
import store from '@/store'
import { Notify } from 'vant'
import Qs from 'qs'
import config from '@/config/index'
const { timeout, jsonData, errorMessage, statusCode, errorLogApi, reTimes } = config.httpRequest
// const store = useStore()

interface DataType {
  [key: string]: any;
}
interface ResultData {
  code: number;
  statusCode: number;
  result: any;
  message: string;
}
interface FormatDataCode {
  key: string;
  default?: number;
}
interface FormatDataResult {
  key: string;
  default?: any;
}
interface FormatDataMessage {
  key: string;
  default?: string;
}
interface FormatData {
  code: FormatDataCode;
  result: FormatDataResult;
  message: FormatDataMessage;
}

interface AjaxOption {
  baseURL?: string;
  timeout?: number;
  headers?: DataType;
  [key: string]: any;
}

interface AjaxConfig {
  option?: AjaxOption;
  notify?: boolean;
}
enum Method {
  POST = 'post',
  GET = 'get'
}
interface RequestConfig {
  method?: Method;
  notify?: boolean;
  option?: AjaxOption;
  [key: string]: any;
}

class HttpRequest {
  private axios: AxiosInstance
  private formatData: FormatData = {
    code: { key: 'code', default: 0 },
    result: { key: 'result', default: {} },
    message: { key: 'message', default: 'ok' }
  }

  constructor (formatData: FormatData) {
    this.formatData = formatData
    this.axios = Axios.create({
      timeout: timeout,
      transformRequest: [(data: DataType) => { return jsonData ? data : Qs.stringify(data) }]
    })
    this.setInterceptor()
    this.getAxios()
  }

  private getAxios () {
    return this.axios
  }

  private setInterceptor () {
    // 请求拦截器
    this.axios.interceptors.request.use((config) => {
      // const token = { 'X-Request-TK': '' }
      const token = {}
      // 合并头部参数
      Object.assign(config.headers, token)
      return config
    }, (error) => {
      console.error(error)
      const code = 700
      const message = errorMessage[code]
      const data: ResultData = { code, statusCode: code, message, result: {} }
      return Promise.reject(data)
      // return Promise.reject(error)
    })

    // 响应拦截器
    this.axios.interceptors.response.use(
      // http状态码 级别的正确响应
      (response) => {
        const data = this.transformResponseData(response, 'normal')
        return Object.assign(response, { data })
      },
      // http状态码 级别的错误响应
      (error) => {
        const response = error.response
        const data: ResultData = { code: 504, statusCode: 504, message: '', result: {} }
        // 根据是否有响应数据，返回不同的data
        if (response) {
          Object.assign(data, this.transformResponseData(response, 'error'))
        } else {
          const code = JSON.stringify(error).indexOf('timeout of') > -1 ? 600 : 504
          Object.assign(data, { code, statusCode: code, message: errorMessage[code] })
        }
        return Promise.reject(data)
      }
    )
  }

  private getDataType (v: any): string {
    const type = Object.prototype.toString.call(v)
    return type.slice(8, -1).toLocaleLowerCase()
  }

  // 返回统一的数据格式 type 只能是 error 或 normal
  private transformResponseData (response: any, type: string): ResultData {
    const res = { code: 500, statusCode: 500, result: {}, message: '' }
    const { data } = response
    if (this.getDataType(data) === 'object') {
      let code = response.status
      const statusCode = response.status
      const result = response.data[this.formatData.result.key] || {}
      let message = response.data[this.formatData.message.key] || ''
      if (type === 'error') {
        code = errorMessage[code] ? code : 700
        message = message || errorMessage[code] || '请求发生错误，请联系工程师' + `(${response.status})`
      } else {
        code = isNaN(response.data[this.formatData.code.key]) ? 500 : response.data[this.formatData.code.key] * 1
      }
      Object.assign(res, { code, result, message, statusCode })
    } else {
      Object.assign(res, { message: '响应错误，未获取预期数据(500)' })
    }
    return res
  }

  // 发起请求并将返回数据封装为统一的数据结构 （ 注：http状态码级别的错误已在响应拦截器中处理完成 ）
  private async httpRequest (url: string, data: DataType, config: DataType): Promise<ResultData> {
    const method = config.method !== 'post' ? 'get' : 'post'
    const query = method === 'post' ? { data } : { params: data }
    const option = config.option || {}
    const requestParams = Object.assign(query, option)
    try {
      const response = await this.axios({ url, method, ...requestParams })
      // console.log(response)
      // 将响应结果按统一格式返回
      const data: ResultData = {
        code: response.data.code,
        statusCode: response.data.statusCode,
        result: response.data.result,
        message: response.data.message
      }
      return data
    } catch (error) {
      // 此处捕获的错误为 http 状态码级别的错误，通常表现为服务器报500，接口404等错误
      return error
    }
  }

  /**
   * @description 发起post请求, 返回 Promise
   * @param url 接口地址
   * @param data 请求参数
   * @param config 自定义请求参数，如 method: 'get' | 'post', option: {}, notify: boolean
   */
  async request (url: string, data: DataType, config?: RequestConfig): Promise<ResultData> {
    // 此处得到的数据为统一格式的非reject数据, 所以这里可以专心处理 code 错误
    const option = Object.assign({
      method: 'get',
      option: {},
      notify: false,
      reTry: reTimes || 0
    }, config)
    const result: ResultData = await this.httpRequest(url, data, option)
    const { success, tokenError, tokenFresh, authError } = statusCode
    const isSuccess = success.includes(result.code)
    // 请求成功则将 code 统一定义为 0
    if (isSuccess) {
      result.code = 0
    } else {
    // 处理请求不成功的情况
      // 错误级别: Error, Warn, Notice, Info
      // 1. Fatal 标准http状态码 >= 500 级别的错误，重试，不返回结果, 顶部弹出红色 notify 提示
      // 2. Error 严重级别的错误，没有返回值, 不重试，如token无效，删除本地token并弹出对话框询问用户是否重新登录，
      // 3. Info token 需要刷新的错误, 没有返回值，不重试， 不弹任何提示并悄悄地发出刷新token的请求, 完成后继续刚才的请求
      // 4. Warn 权限不足的错误, 返回结果，不重试, 顶部弹出红色 notify 提示权限不足
      // 5. Notice 一般code错误, 根据 config.notify 的值弹出红色 notify 提示， 根据 retimes 重试
      const code = result.code
      const statusCode = result.statusCode
      let level = 'Notice'
      if ((statusCode >= 500 || statusCode === 404) && errorMessage[statusCode]) { level = 'Fatal' }
      if ((statusCode < 500 && statusCode !== 404) || tokenError.includes(code)) { level = 'Error' }
      if (tokenFresh.includes(code)) { level = 'Info' }
      if (authError.includes(code)) { level = 'Warn' }
      const { notify } = option
      console.log(errorLogApi)
      switch (level) {
        case 'Notice':
          // Notice 代表一般错误，请求成功，不重试，根据 notify 的值决定是否弹框
          // 如果有 errorLogApi，则将错误发送至该接口
          notify && Notify({ message: result.message })
          break
        // case 'Info':
        //   // Info 代表一般，如token超时。不重试，悄悄地刷新token后继续刚才的请求
        //   break
        case 'Warn':
          // Warn 代表警告错误，如权限不足。不重试，弹出Notify提示框
          Notify({ type: 'warning', message: result.message })
          break
        case 'Error':
          // Error 代表严重错误，如token不可用。不重试，删除本地token并弹出登录框提示重新登录
          // store.dispatch('ToggleAccount', { account: { visible: true } })
          store.dispatch('SetToken', '')
          store.dispatch('SetStore', { account: { visible: true } })
          break
        case 'Fatal':
          // Fatal 代表严重错误，请求失败，要重试，根据 notify 的值决定是否弹框
          // 1. 重试，重试次数用完后再调错误提醒和发送错误日志
          option.reTry--
          if (option.reTry > 0 && url !== errorLogApi) {
            this.request(url, data, config)
          } else {
            url !== errorLogApi && notify && Notify({ message: result.message })
            if (errorLogApi && errorLogApi !== url) {
              const requestData = JSON.stringify({ url, data, config, result })
              this.request(errorLogApi, { data: requestData })
            }
          }
          break
      }
    }
    return result
  }

  /**
   * @description 发起post请求, 返回 Promise
   * @param url 接口地址
   * @param data 请求参数
   * @param config 用于修改默认的请求参数，如修改headers参数，baseURL等等
   */
  async post (url: string, data: DataType, config?: AjaxConfig): Promise<ResultData> {
    const option = Object.assign({ method: Method.POST, option: {}, notify: true }, config)
    const result = await this.request(url, data, option)
    return result
  }

  /**
   * @description 发起get请求, 返回 Promise
   * @param url 接口地址
   * @param data 请求参数
   * @param config 用于修改默认的请求参数，如修改headers参数，baseURL等等
   */
  async get (url: string, data: DataType, config?: AjaxConfig): Promise<ResultData> {
    const option = Object.assign({ method: Method.GET, option: {}, notify: true }, config)
    const result = await this.request(url, data, option)
    return result
  }
}
const formatData = {
  code: { key: 'code', default: 0 },
  result: { key: 'data', default: {} },
  message: { key: 'info', default: '' }
}
export default new HttpRequest(formatData)
