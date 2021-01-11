import { Axios, JsonType, ResultType, ConfigType } from './axios/Index'
class Http extends Axios {
  /**
   * 发请post请求
   * @param url 接口地址
   * @param data 请求参数
   * @param config 修改请求配置
   */
  async post (url: string, data: JsonType, config: ConfigType = { option: {} }): Promise<ResultType> {
    const conf: ConfigType = Object.assign({
      method: 'post',
      option: {}
    }, config)
    const result = this.request(url, data, conf)
    return result
  }
}

export default new Http({
  timeout: 10000,
  baseURL: '/',
  jsonData: false,
  customCode: { success: [0, 2000, 2010] },
  formatKeys: {
    code: 'code',
    result: 'data',
    message: 'info'
  }
})
