/* eslint-disable react-refresh/only-export-components */

/**
 *第一种实现路由：组价式路由写法(已经不常用了)
 * 
 * **/ 
// import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom"
// // BrowserRouter(history模式)、HashRouter(hash模式)
// import App from "@/App.js"
// import Home from "@/views/home/Home.js"
// import About from "@/views/about/About.js"

// const BaseRouter=()=>(
//     <BrowserRouter>
//        <Routes>
//         <Route path="/" element={<App />} >
//             {/* 重定向 */}
//             <Route path="/" element={<Navigate to="/home" />}></Route>
//             <Route path="/home" element={<Home />}></Route>
//             <Route path="/about" element={<About/>}></Route>
//         </Route>
//        </Routes>
//     </BrowserRouter>
// )
// export default BaseRouter


/**
 * 第二种显示路由
 * 
 * 
 * **/
import {Navigate} from 'react-router-dom'
import Home from "@/views/home/Home.js"

// import About from "@/views/about/About.js"

// 懒加载 lazy
import  {lazy,Suspense} from 'react';
import Page1 from '@/views/page1/Page1.js';
const LazyAbout=lazy(()=>import('@/views/about/About.js'))
const LazyUser=lazy(()=>import('@/views/user/User.js'))
const LazyPage2=lazy(()=>import('@/views/page2/Page2.js'))


// 封装懒加载loading
const LazyLoading=(comp:JSX.Element)=>(
    <Suspense fallback={<h2>加载中....</h2>}>
        {comp}
    </Suspense>
)

const routers=[
  {
        //配置默认路由
        path: "/",
        element: <Navigate to="/page1" />, //重定向到 /B 页面
  },
  {
    path:'/',
    element:<Home />,
    children: [
      {
        path: 'page1',
        element: LazyLoading(<Page1 />)
      },
      {
        path: 'page2',
        element: LazyLoading(<LazyPage2 />)
      }
    ]
  },
  {
    path:'/about',
    element: LazyLoading(<LazyAbout />),
  },{
    path:'/user',
    element:LazyLoading(<LazyUser />)
  }
]
export default routers