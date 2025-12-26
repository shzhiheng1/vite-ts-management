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
import { Navigate, RouteObject } from 'react-router-dom'
import Layout from '@/views/layout/Layout.js'

// import About from "@/views/about/About.js"

// 懒加载 lazy
import { lazy, Suspense } from 'react'
import Login from '@/views/login/Login.js'
// import Page1 from '@/views/page1/Page1.js'
const LazyUser = lazy(() => import('@/views/user/User.js'))
const LazyPage2 = lazy(() => import('@/views/page2/Page2.js'))
const FailPage404 = lazy(() => import('@/views/fail/404Page.js'))
const Page301 = lazy(() => import('@/views/page3/Page301.js'))
const Page302 = lazy(() => import('@/views/page3/Page302.js'))
const Page303 = lazy(() => import('@/views/page3/Page303.js'))
const Page40101 = lazy(() => import('@/views/page4/Page40101.js'))
const Page402 = lazy(() => import('@/views/page4/Page402.js'))
const Discover = lazy(() => import('@/views/discover/index.js'))
const Remcommend = lazy(() => import('@/views/discover/recommend/index.js'))
const Demo = lazy(() => import('@/views/demo/index.js'))
const MusicDetail = lazy(
  () => import('@/views/discover/recommend/music-detail/MusicDetail.js')
)
const UseLayoutEffect = lazy(
  () => import('@/views/study/useLayoutEffect/UseLayoutEffect.js')
)
const UseRef = lazy(() => import('@/views/study/useRef/UseRef.js'))
const UseMemo = lazy(() => import('@/views/study/useMemo/UseMemo'))
const UseCallback = lazy(() => import('@/views/study/useCallback/UseCallback'))
const Document=lazy(()=>import('@/views/document/Document'))

// 封装懒加载loading
const LazyLoading = (comp: JSX.Element) => (
  <Suspense fallback={<h2>加载中....</h2>}>{comp}</Suspense>
)
/**
 * 
 * interface RouteObject {
  path?: string;
  index?: boolean;
  children?: React.ReactNode;
  caseSensitive?: boolean;
  id?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  element?: React.ReactNode | null;
  Component?: React.ComponentType | null;
  errorElement?: React.ReactNode | null;
  ErrorBoundary?: React.ComponentType | null;
  handle?: RouteObject["handle"];
  shouldRevalidate?: ShouldRevalidateFunction;
  lazy?: LazyRouteFunction<RouteObject>;
}
 * 
 * 
 * ***/

const routers: RouteObject[] = [
  {
    //配置默认路由
    path: '/',
    element: <Navigate to="/page2" /> //重定向到 /B 页面
  },
  // 嵌套路由
  {
    path: '/',
    element: <Layout />,
    children: [
      // {
      //   path: 'page1',
      //   element: LazyLoading(<Page1 />)
      // },
      {
        path: 'page2',
        element: LazyLoading(<LazyPage2 />),
        index: true //默认地址
      },
      {
        path: '/page3/page301',
        element: LazyLoading(<Page301 />)
      },
      {
        path: '/page3/page302',
        element: LazyLoading(<Page302 />)
      },
      {
        path: '/page3/page303',
        element: LazyLoading(<Page303 />)
      },
      {
        path: '/page4/page40101',
        element: LazyLoading(<Page40101 />)
      },
      {
        path: '/page4/page402',
        element: LazyLoading(<Page402 />)
      },
      {
        path: '/demo',
        element: LazyLoading(<Demo />)
      },
      {
        path: '/discover/recommend',
        element: LazyLoading(<Remcommend />)
      },
      {
        path: '/discover/recommend/musicDetail/:id',
        element: LazyLoading(<MusicDetail />)
      },
      {
        path: '/study/useLayoutEffect',
        element: LazyLoading(<UseLayoutEffect />)
      },
      {
        path: '/study/useRef',
        element: LazyLoading(<UseRef />)
      },
      {
        path: '/study/useMemo',
        element: LazyLoading(<UseMemo />)
      },
      {
        path: '/study/useCallback',
        element: LazyLoading(<UseCallback />)
      },
      {
        path:'/document/:id',
        element:LazyLoading(<Document />)
      }
    ]
  },
  {
    path: '/discover',
    element: <Discover />
  },
  {
    path: '/Login',
    element: <Login />
  },
  {
    path: '/user',
    element: LazyLoading(<LazyUser />)
  },
  {
    path: '/404',
    element: LazyLoading(<FailPage404 />)
  },
  // 未匹配到路由
  {
    path: '*',
    element: <Navigate to="/404" />
  }
]
export default routers
