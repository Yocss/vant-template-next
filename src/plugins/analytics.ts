/* eslint-disable @typescript-eslint/no-explicit-any */
// cnzz 的统计分析(针对单页应用的异步统计)
import config from '@/config/index'

export function analytics (toUrl: string, fromUrl = '') {
  if (process.env.VUE_APP_MODE === 'production' && config.cnzz) {
    const czc = (window as any)._czc || null
    if (window && !czc) {
      const cnzzTag = document.createElement('script')
      cnzzTag.type = 'text/javascript'
      cnzzTag.async = true
      cnzzTag.charset = 'utf-8'
      cnzzTag.src = `${config.cnzz}&sync=1`
      const cnccRoot = document.getElementsByTagName('script')[0]
      const node = cnccRoot.parentNode
      node && node.insertBefore(cnzzTag, cnccRoot)
    }

    const cncc = (window as any)._czc || []
    cncc.push(['_setAutoPageview', false])
    cncc.push(['_trackPageview', toUrl, fromUrl])
  }
}
