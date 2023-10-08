/// <reference types="vite/client" />

declare module '*.tsx'
declare module '*.ts'

// 让环境变量有提示
interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string //定义提示信息 数据是只读的无法被修改
  //多个变量定义多个...
}

// interface ImportMetaEnv {
//   VITE_APP_BASE_URL: string
// }
