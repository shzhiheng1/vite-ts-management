/**
 * 组件路由书写
 *
 *
 * **/

// import { Link,NavLink,Outlet} from 'react-router-dom'
// function App() {

//   return (
//     <>
//       <NavLink to="/home">home</NavLink> |
//       <Link to="/about"> about</Link>
//       {/* Outlet 占位符组件，相当于view-router */}
//       <div>
//         <Outlet />
//       </div>
//     </>
//   )
// }

// export default App

/**
 * 数组路由书写形式
 *
 * **/
import { useRoutes, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import routers from './router/index.js'

/********做路由守卫**********/

function Login() {
  const navigateTo = useNavigate()

  useEffect(() => {
    //  1.token存在，且访问登录页面，跳转到page1
    navigateTo('/login')
  }, [])
  return <div></div>
}
function Page1() {
  const navigateTo = useNavigate()

  useEffect(() => {
    //  1.token存在，且访问登录页面，跳转到page1
    navigateTo('/page2')
  }, [])
  return <div></div>
}

function BeforeRouteEnter() {
  const element = useRoutes(routers)
  // const navigateTo=useNavigate()
  const token = localStorage.getItem('vite-ts-management-token') || ''
  const location = useLocation()
  /*******第一种写法*********/
  // useEffect(()=>{
  //     //  1.token存在，且访问登录页面，跳转到page1
  //   if(token && location.pathname==='/login'){
  //     navigateTo('/page1')
  //   }
  //   // 2.token不存在，且不在登录页，跳转到login
  //   if(!token && location.pathname!=='/login'){
  //     navigateTo('/login')
  //   }
  // },[token,location.pathname,navigateTo])
  /********第二种写法，相对较好。
   * (唯一区别：访问其他路由且token为空的时候，此方法无跳转闪烁的效果。
   * 因为先渲染空<div />，再跳转的登录页面。而方法一，是先渲染访问的页面后，再跳到登录页面。
   * )********/
  if (token && location.pathname === '/login') {
    return <Page1 />
  }
  if (!token && location.pathname !== '/login') {
    return <Login />
  }
  // 3.其他
  return <>{element}</>
}

const App = () => {
  // const element=useRoutes(routers)
  return (
    <>
      {/* {element} */}
      <BeforeRouteEnter />
    </>
  )
}
export default App
