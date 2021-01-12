/* eslint-disable @typescript-eslint/no-explicit-any */
import { Axios } from './axios/Index'
import { Notify } from 'vant'
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
class Http extends Axios {
  private handleError (responseData: any): void {
    console.log(responseData)
    // 1. 错误分级
    // 2. 重试
    // 3. 弹出提示
  }

  private async request (url: string, query: Record<string, any>, config: ConfigType = {}) {
    const baseURL = process.env === 'production' ? '/api' : '/'
    const option: ConfigType = {
      method: 'get',
      showNotify: false,
      option: { baseURL, headers: {}, timeout: 10000 }
    }
    const result = await this.ajax(url, query, Object.assign(option, config))
    const { data } = result
    if (data.code !== 0) {
      Notify({
        type: 'danger',
        message: data.message
      })
    }
    return data
  }

  /**
   * 发起post请求
   * @param url 接口地址
   * @param data 请求参数
   * @param config 修改请求配置
   */
  async post (url: string, data: Record<string, any>, config: ConfigType = {}) {
    const option: ConfigType = { showNotify: true }
    const result = await this.request(url, data, Object.assign(option, config, { method: 'post' }))
    return result
  }

  /**
   * 发起get请求
   * @param url 接口地址
   * @param data 请求参数
   * @param config 请求配置
   */
  async get (url: string, data: Record<string, any>, config: ConfigType = {}) {
    const option: ConfigType = { showNotify: true }
    const result = await this.request(url, data, Object.assign(option, config, { method: 'get' }))
    return result
  }
}

export default new Http({
  jsonData: false, // 不使用json提交
  successCode: [0, 2000, 2010], // 与后端约定表示成功的代码
  formatKeys: { code: 'code', result: 'data', message: 'info' } // 与后端约定的基础返回字段
})
