import React from 'react'
import ReactDOM from 'react-dom/client'
// 样式初始化(放在最前面)
import 'reset-css'
// 框架样式

// 全局样式
import '@/assets/styles/global.scss'
// 组件
// import './index.css'


/*********组件式路由调用***********/ 
// import BaseRouter from '@/router/index.js'
// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     {/* <App /> */}
//     <BaseRouter />
//   </React.StrictMode>,
// )

/***********数组式路由调用********************/ 
import App from './App.tsx'
import { BrowserRouter} from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)