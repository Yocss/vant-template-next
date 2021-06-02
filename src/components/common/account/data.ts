interface AttrsType {
  maxlength: number;
  type: 'digit' | 'number' | 'text' | 'password';
  placeholder: string;
  [key: string]: unknown;
}
export interface FieldType {
  key: 'user' | 'code' | 'pass';
  value: unknown;
  attrs: AttrsType;
  [key: string]: unknown;
}
export interface AccountType {
  title: string;
  key: 'login' | 'sms' | 'join' | 'reset';
  fields: Array<FieldType>;
  buttonText: string;
  [key: string]: unknown;
}

const userAttrs: AttrsType = {
  maxlength: 11,
  type: 'digit', // 仅支持正整数
  placeholder: '请输入手机号'
}
const codeAttrs: AttrsType = {
  maxlength: 4,
  type: 'digit', // 仅支持正整数
  placeholder: '请输入验证码'
}
const passAttrs: AttrsType = {
  maxlength: 64,
  type: 'password', // 仅支持正整数
  placeholder: '请输入密码'
}

export const accounts: Array<AccountType> = [
  {
    title: '帐号登录',
    key: 'login',
    fields: [
      {
        key: 'user',
        value: '',
        attrs: userAttrs
      },
      {
        key: 'pass',
        value: '',
        attrs: passAttrs
      }
    ],
    buttonText: '立即登录'
  },
  {
    title: '短信登录',
    key: 'sms',
    fields: [
      {
        key: 'user',
        value: '',
        attrs: userAttrs
      },
      {
        key: 'code',
        value: '',
        attrs: codeAttrs
      }
    ],
    buttonText: '立即登录'
  },
  {
    title: '免费注册',
    key: 'join',
    fields: [
      {
        key: 'user',
        value: '',
        attrs: userAttrs
      },
      {
        key: 'code',
        value: '',
        attrs: codeAttrs
      },
      {
        key: 'pass',
        value: '',
        attrs: passAttrs
      }
    ],
    buttonText: '注册'
  },
  {
    title: '重设密码',
    key: 'reset',
    fields: [
      {
        key: 'user',
        value: '',
        attrs: userAttrs
      },
      {
        key: 'code',
        value: '',
        attrs: codeAttrs
      },
      {
        key: 'pass',
        value: '',
        attrs: passAttrs
      }
    ],
    buttonText: '立即修改'
  }
]
