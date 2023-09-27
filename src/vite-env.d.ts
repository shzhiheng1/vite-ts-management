/// <reference types="vite/client" />

import { AxiosRequestConfig } from 'axios'

declare module '*.tsx'
declare module '*.ts'

/*********处理 类型"AxiosResponse<any,any>"上不存在xxx属性*************/
declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
}

// 让环境变量有提示
interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string //定义提示信息 数据是只读的无法被修改
  //多个变量定义多个...
}

// interface ImportMetaEnv {
//   VITE_APP_BASE_URL: string
// }
