interface Config {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const config: Config = {
  site: {
    title: 'Axmine',
    favicon: '',
    css: [],
    js: []
  },
  cnzz: '', // cnzz站点分析
  httpRequest: {
    statusCode: {
      success: [2010, 2000, 0],
      tokenError: [4010], // token 无效, 清空本地token, 并要求用户重新登录
      tokenFresh: [4020], // token 需要刷新
      authError: [4030, 4050] // 权限不足
    },
    errorLogApi: '', // 记录错误日志的接口, 前端发生错误时，会将错误日志提交给后台
    reTimes: 3, // 重试次数
    timeout: 10000, // 超时时间
    jsonData: false, // means contentType: json or x-www-form-urlencoded
    errorMessage: {
      401: 'token过期, 刷新token', // token过期, 刷新token
      402: '登陆失效了，请重新登录', // token无效，需重新登录
      403: '你没有足够的权限访问该资源（403）', // token权限不足，访问被禁止
      405: '服务器拒绝了你的请求（405）', // token权限不足，访问被禁止
      404: '请求错误，资源不存在（404）',
      500: '程序异常, 请稍候再试（500）',
      501: '程序异常，请稍候再试（501）',
      502: '程序异常，请稍候再试（502）',
      503: '程序异常，请稍候再试（503）',
      504: '连接错误，请稍候再试（504）',
      505: '程序无法响应，请稍候再试（505）',
      600: '响应超时，请确保您的设备已正常联网',
      601: '你的设备已离线，请确保你的设备已联网（601）',
      700: '请求发生错误，请稍候再试'
    }
  }
}
export default config
