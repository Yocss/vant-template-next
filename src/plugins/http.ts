import { Axios } from './axios'
const axios = new Axios({
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
class Http {
  /**
   * 发请post请求
   * @param url 接口地址
   * @param data 请求参数
   * @param config 修改请求配置
   */
  async post (url: string, data: JSON) {
    const result = axios.request(url, data, {
      method: 'post',
      option: {
        headers: {}
      }
    })
    return result
  }
}

export default new Http()
