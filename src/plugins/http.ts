/* eslint-disable @typescript-eslint/no-explicit-any */
import { Axios } from './axios/Index'
import { Notify } from 'vant'
import config from '@/config/index'
const httpOption = config.httpOption
const axios = new Axios({
  timeout: httpOption.timeout,
  jsonData: httpOption.jsonData, // 是否使用json提交
  successCode: httpOption.statusCode.success, // 与后端约定表示成功的代码
  formatKeys: { code: 'code', result: 'data', message: 'info' } // 与后端约定的基础返回字段
})
interface OptionType {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, any>;
  [key: string]: any;
}
interface ConfigType {
  method?: 'post' | 'get' | 'put' | 'patch' | 'delete' | 'head' | 'options';
  option?: OptionType;
  showNotify?: boolean;
  [key: string]: any;
}
interface DataType {
  // statusCode: number; // http状态码
  code: number; // 服务端自定义状态码
  result: any; // 结果项
  message: string; // 信息
}
export interface ResponseType {
  headers: Record<string, any>;
  status: number;
  statusText: string;
  config?: Record<string, any>;
  data: DataType;
}
class Http {
  /**
   * 发起post请求
   * @param url 接口地址(必填)
   * @param data 请求参数(必填)
   * @param config 修改请求配置(非必选)
   */
  async post (url: string, data: Record<string, any>, config: ConfigType = {}) {
    const option: ConfigType = { showNotify: true }
    const result = await this.request(url, data, Object.assign(option, config, { method: 'post' }))
    return result
  }

  /**
   * 发起get请求
   * @param url 接口地址(必填)
   * @param data 请求参数(必填)
   * @param config 修改请求配置(非必选)
   */
  async get (url: string, data: Record<string, any>, config: ConfigType = {}) {
    const option: ConfigType = { showNotify: true }
    const result = await this.request(url, data, Object.assign(option, config, { method: 'get' }))
    return result
  }

  /**
   * 发起Ajax请求(三个参数均必填)
   * @param url 请求接口
   * @param query 请求参数
   * @param config 请求配置
   */
  async request (url: string, query: Record<string, any>, config: ConfigType = {}) {
    // 1. 如需要在消息头 或 消息体 中添加额外的全局参数，可以合并 query 及 config
    // 合并配置参数
    const option: ConfigType = Object.assign({
      method: 'get',
      showNotify: false,
      option: {
        baseURL: process.env === 'production' ? '/api' : '/',
        headers: {} // 在消息头添加额外参数在这里进行
      }
    }, config)
    const result = await axios.ajax(url, query, option)
    const { data } = result
    if (data.code !== 0) {
      this.handleError(result, Object.assign({ config: option }, { data: query, api: url }))
    }
    return data
  }

  private handleError (response: ResponseType, requestConfig: ConfigType) {
    // 一. 如果是提交错误日志发生错误，则忽略后面的代码
    if (config.httpOption.errorUrl === requestConfig.api) { return }
    // 二. 开始处理错误
    const showNotify = requestConfig.config.showNotify

    // 1. 服务器错误或未成功发出请求, 向服务器提交日志，并弹出 Notify
    if (response.status >= 500) {
      console.log(showNotify)
      showNotify && Notify({ type: 'danger', message: response.data.message })
      let userAgent = ''
      if (window) { userAgent = window.navigator.userAgent || '' }
      this.logError(Object.assign(response, { userAgent }))
    // 2. 非服务器错误
    } else {
      const { errorToken, freshToken, errorAuth } = config.httpOption.statusCode
      const code = response.data.code
      // (1). token错误
      if (errorToken.includes(code)) {
        // 强提示 弹出对话框提示，删除错误的token, 弹出对话框提示用户重新登录
        console.log('token 错误，弹提示框，让登录')
      // (2) token 需要刷新
      } else if (freshToken.includes(code)) {
        // 不提示 悄悄地发出刷新 token 的请求，并且在成功之后重新发起刚才的请求
        console.log('快，悄咪咪的更新token，然后再把刚才的请求重发一遍')
      // (3) token 权限不足
      } else if (errorAuth.includes(code)) {
        // 没有权限是搞 强提示 还是 弱提示呢？ 待定
        errorAuth.includes(code) && Notify({ type: 'warning', message: response.data.message })
      // (4) 其他错误
      } else {
        showNotify && Notify({ type: 'danger', message: response.data.message })
      }
    }
  }

  // 向服务器提交错误日志
  private async logError (response: Record<string, any>) {
    if (config.httpOption.errorUrl) {
      const data = JSON.stringify(response)
      this.post(config.httpOption.errorUrl, { data }, { showNotify: false })
    }
  }
}
export default new Http()
