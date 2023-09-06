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
import {useRoutes} from 'react-router-dom'
import routers from './router/index.js'
const App=()=>{
  const element=useRoutes(routers)
  return(
    <>
      {element}
    </>
  )
}
export default App
