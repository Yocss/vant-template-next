/* eslint-disable @typescript-eslint/no-explicit-any */
export enum FieldKey {
  USER = 'user',
  CODE = 'code',
  PASS = 'pass'
}
export enum AccountItemKey {
  LOGIN = 'login',
  JOIN = 'join',
  FIND = 'find'
}
export interface EventData {
  action: string;
  data: Record<string, any>;
}

export const formData: Record<FieldKey, string> = {
  [FieldKey.USER]: '',
  [FieldKey.CODE]: '',
  [FieldKey.PASS]: ''
}

interface AttrsType {
  maxlength: number;
  type: 'digit' | 'number' | 'text' | 'password';
  placeholder: string;
  [key: string]: any;
}

const userAttrs: AttrsType = {
  maxlength: 11,
  type: 'digit', // 仅支持正整数
  placeholder: '请输入手机号'
}
// const codeAttrs: AttrsType = {
//   maxlength: 4,
//   type: 'digit', // 仅支持正整数
//   placeholder: '请输入验证码'
// }
const passAttrs: AttrsType = {
  maxlength: 64,
  type: 'password', // 仅支持正整数
  placeholder: '请输入密码'
}

interface DataItem {
  name: FieldKey;
  attrs: AttrsType;
  [key: string]: any;
}
interface AccountsItem {
  title: string;
  key: AccountItemKey;
  data: Array<DataItem>;
  buttonText: string;
  [key: string]: any;
}

export const accounts: Array<AccountsItem> = [
  {
    title: '请登录',
    key: AccountItemKey.LOGIN,
    data: [
      {
        name: FieldKey.USER,
        attrs: userAttrs
      },
      {
        name: FieldKey.PASS,
        attrs: passAttrs
      }
    ],
    buttonText: '立即登录'
  }
]
