export interface State {
  layout: string;
  transition: string;
  token: string;
  account: Record<'visible', boolean>;
}
export const state: State = {
  layout: 'default',
  transition: '',
  token: '',
  account: {
    visible: false
  }
}
