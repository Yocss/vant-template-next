interface HomeNavType {
  url: string;
  icon: string;
  title: string;
}
export interface State {
  layout: 'default' | 'home' | 'null';
  homeNav: Array<HomeNavType>;
  transition: string;
  token: string;
  account: Record<'visible', boolean>;
}
export const state: State = {
  layout: 'default',
  homeNav: [
    { url: '/', title: '首页', icon: 'wap-home-o' },
    { url: '/news', title: '新闻', icon: 'newspaper-o' },
    { url: '/test', title: '测试', icon: 'filter-o' }
  ],
  transition: '',
  token: '',
  account: {
    visible: false
  }
}
