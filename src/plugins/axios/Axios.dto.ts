/* eslint-disable @typescript-eslint/no-explicit-any */
export interface JsonType {
  [key: string]: any;
}

// 转换类型分为: 响应成功时， 响应失败时
export enum TTransformData {
  SUCCESS = 'success',
  ERROR = 'error'
}

// errorMessage的类型
export interface ErrorMessageType {
  [key: number]: string;
}
// Axios 初始化参数
export interface CustomCodeType {
  success: Array<number>;
  [key: string]: Array<number>;
}
// format Key
export interface FormatKeysType {
  code: string;
  result: string;
  message: string;
}
export interface OptionType {
  timeout?: number;
  baseURL?: string;
  jsonData?: boolean;
  formatKeys?: FormatKeysType;
  customCode?: CustomCodeType;
  errorMessage?: ErrorMessageType;
}

// 调用Axios方法返回的参数
export interface ResultType {
  statusCode: number; // http状态码
  code: number; // 服务端自定义状态码
  result: any; // 结果项
  message: string; // 信息
}
export interface ConfigOptionType {
  baseURL?: string;
  timeout?: number;
  headers?: JsonType;
  [key: string]: any;
}
// 发请http请求时的配置参数
export interface ConfigType {
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options';
  option?: ConfigOptionType;
  [key: string]: any;
}
