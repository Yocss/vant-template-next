/* eslint-disable @typescript-eslint/no-explicit-any */
interface SiteType {
  title?: string;
  favicon?: string;
  css?: Array<string>;
  js?: Array<string>;
  [key: string]: any;
}
interface HttpOptionType {
  errorUrl: string;
  timeout: number;
  jsonData: boolean;
  statusCode: Record<'success' | 'errorToken' | 'freshToken' | 'errorAuth', Array<number>>;
}
interface ConfigType {
  site: SiteType;
  cnzz: string;
  httpOption: HttpOptionType;
  [key: string]: any;
}

const config: ConfigType = {
  site: {
    title: 'Axmine',
    favicon: '',
    css: [],
    js: []
  },
  cnzz: '', // cnzz站点分析
  httpOption: {
    statusCode: {
      success: [2010, 2000, 0],
      errorToken: [4010], // token 无效, 清空本地token, 并要求用户重新登录
      freshToken: [4020], // token 需要刷新
      errorAuth: [4030, 4050] // 权限不足
    },
    errorUrl: '', // 记录错误日志的接口, 前端发生错误时，会将错误日志提交给后台
    timeout: 10000, // 超时时间
    jsonData: false // means contentType: json or x-www-form-urlencoded
  }
}
export default config
