enum Field {
  USER = 'user',
  CODE = 'code',
  PASS = 'pass'
}
export enum AccountItemKey {
  LOGIN = 'login',
  JOIN = 'join',
  FIND = 'find'
}
interface AccountsItem {
  title: string;
  key: AccountItemKey;
  fields: Array<Field>;
}
export const accounts: Array<AccountsItem> = [
  {
    title: '请登录',
    key: AccountItemKey.LOGIN,
    fields: [Field.USER, Field.PASS]
  },
  {
    title: '注册帐号',
    key: AccountItemKey.JOIN,
    fields: [Field.USER, Field.CODE, Field.PASS]
  },
  {
    title: '找回密码',
    key: AccountItemKey.FIND,
    fields: [Field.USER, Field.CODE, Field.PASS]
  }
]

// 对应字段的属性
export const fieldAttrs = {
  [Field.USER]: {
    attrs: {
      maxlength: 11,
      type: 'number',
      placeholder: '请输入手机号'
    }
  },
  [Field.CODE]: {
    attrs: {
      maxlength: 4,
      type: 'text',
      placeholder: '请输入验证码'
    }
  },
  [Field.PASS]: {
    attrs: {
      maxlength: 32,
      type: 'password',
      placeholder: '请输入密码'
    }
  }
}
