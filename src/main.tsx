import React from 'react'
import ReactDOM from 'react-dom/client'
// 样式初始化(放在最前面)
import 'reset-css'
// 框架样式
/*****轮播图react-slick一起使用slick-carousel样式引入******/
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

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
import App from './App.js'
import { BrowserRouter } from 'react-router-dom'
// 使用redux状态管理
import { Provider } from 'react-redux'
// 第一种方法：使用reudx
// import store from '@/store/index.js'
// 第二种方法：使用@reduxjs/toolkit
import store from '@/reduxjsToolkitStore/store.js'

// 环境变量
console.log(import.meta.env)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
)
