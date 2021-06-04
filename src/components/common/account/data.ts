interface AttrsType {
  maxlength: number;
  type: 'digit' | 'number' | 'text' | 'password';
  placeholder: string;
  [key: string]: unknown;
}
export interface RuleType {
  status: boolean;
  rules: Array<Record<string, unknown>>;
}
export interface FieldType {
  key: 'user' | 'code' | 'pass';
  value: unknown;
  attrs: AttrsType;
  rules: RuleType;
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
  clearable: true,
  placeholder: '请输入手机号'
}
const codeAttrs: AttrsType = {
  maxlength: 4,
  type: 'digit', // 仅支持正整数
  placeholder: '请输入验证码'
}
const passAttrs: AttrsType = {
  maxlength: 64,
  clearable: true,
  type: 'password', // 仅支持正整数
  placeholder: '请输入密码'
}

const userRules: RuleType = {
  status: false,
  rules: [
    { required: true, message: '手机号不能为空' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入标准的手机号' }
  ]
}
const codeRules: RuleType = {
  status: false,
  rules: [
    { required: true, message: '验证码不能为空' },
    { pattern: /^\d{4}$/, message: '验证码为4位数字' }
  ]
}
const passRules: RuleType = {
  status: false,
  rules: [
    { required: true, message: '密码不能为空' }
  ]
}

export const accounts: Array<AccountType> = [
  {
    title: '帐号登录',
    key: 'login',
    fields: [
      {
        key: 'user',
        value: '',
        attrs: userAttrs,
        rules: userRules
      },
      {
        key: 'pass',
        value: '',
        attrs: passAttrs,
        rules: passRules
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
        attrs: userAttrs,
        rules: userRules
      },
      {
        key: 'code',
        value: '',
        attrs: codeAttrs,
        rules: codeRules
      }
    ],
    buttonText: '立即登录'
  },
  {
    title: '注册帐号',
    key: 'join',
    fields: [
      {
        key: 'user',
        value: '',
        attrs: userAttrs,
        rules: userRules
      },
      {
        key: 'code',
        value: '',
        attrs: codeAttrs,
        rules: codeRules
      },
      {
        key: 'pass',
        value: '',
        attrs: passAttrs,
        rules: passRules
      }
    ],
    buttonText: '注册并登录'
  },
  {
    title: '重设密码',
    key: 'reset',
    fields: [
      {
        key: 'user',
        value: '',
        attrs: userAttrs,
        rules: userRules
      },
      {
        key: 'code',
        value: '',
        attrs: codeAttrs,
        rules: codeRules
      },
      {
        key: 'pass',
        value: '',
        attrs: passAttrs,
        rules: passRules
      }
    ],
    buttonText: '修改并登录'
  }
]
