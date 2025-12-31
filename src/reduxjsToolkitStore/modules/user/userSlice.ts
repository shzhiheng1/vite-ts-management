import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { items, type MenuItem } from '@/assets/data/menu.js'
import {dynamicRouters} from '@/router/index'
import constantRouters from '@/router/index'
import { RouteObject } from 'react-router-dom'

interface IdefultInt {
  menus: MenuItem[]
  routers: any[]
  userRoles:string[]
}
// 初始state
const initialState: IdefultInt = {
  menus: [],//菜单
  routers: [],//路由
  userRoles:[]//角色
}
// 创建切片
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeMenus(state, { payload }) {
      state.menus = payload
      sessionStorage.setItem('menus', JSON.stringify(payload))
    },
    removeMenus(state) {
      state.menus = []
      sessionStorage.removeItem('menus')
      sessionStorage.removeItem('vite-ts-management-token')
      sessionStorage.removeItem('userRoles')
      sessionStorage.removeItem('routers')
    },
    changeUserRoles(state, { payload }) {
      state.userRoles = payload
      sessionStorage.setItem('userRoles', JSON.stringify(payload))
    },
    changeRoutes(state, { payload }) {
      console.log('------cangeg----',payload)
      state.routers = payload
      sessionStorage.setItem('routers', JSON.stringify(payload))
    },
  }
})

const filterMenus=(menus:MenuItem[],paths:string[]):MenuItem[] =>{
 return menus
 .filter(item=>!paths?.includes(item.key))
 .map(item=>{
   if(item.children){
     return {
      ...item,
      children:filterMenus(item.children,paths)
     }
   }
   return item
 })
//  去掉没有子级的
 .filter(item => !item.children || item.children.length > 0);

}

// 异步获取menus数据
export const getAsyncMenus = createAsyncThunk(
  'user/menus',
  async (arg: { loginType?: string }, { dispatch }) => {
    /***正常情况下此处的数据应该有后端提供***/
    return new Promise((resolve) => {
      setTimeout(() => {
        // if (arg.loginType === 'admin') {
          // 假设后端返回的用户角色数据
          const userRoles=['demo']
          // 获取所有动态路由的path数组
          const allDynamicRoutersPath=dynamicRouters.children?.map(item=>item.path)
          // 过滤出动态路由中角色与用户角色匹配的路由
          const filterRoutes=dynamicRouters.children?.filter(item=>item.roles?.some(i=>userRoles.includes(i)))
          // 生成routerObject结构的动态路由
          const _dynamicRouters=filterRoutes?.map(item=>{
            return {
              element:item.element,
              path:item.path
            }
          })
          console.log('----用户角色的动态路由----',_dynamicRouters)
          // 从全部动态菜单中找到要剔除的路由path
          const _filterPath=allDynamicRoutersPath?.filter(item=>!_dynamicRouters?.map(i=>i.path).includes(item))||[]
          // 过滤后的路由菜单
          const _filterMenus=filterMenus(items,_filterPath as string[])
          console.log('----要剔除的路由---',_filterPath)
          console.log('----剔除过后的菜单---',_filterMenus)
          const params={
            _dynamicRouters,
            _filterMenus,
            userRoles
          }
          resolve(params)
      }, 1000)
    })
      .then((res:any) => {
        dispatch(changeMenus(res._filterMenus))
        dispatch(changeUserRoles(res.userRoles))
        console.log(res._dynamicRouters)
        // 插入动态路由
        const nestedRouters={
          ...dynamicRouters,
          children:[...res._dynamicRouters]
        }
       const finiallRouters= [...constantRouters.slice(0, 1), nestedRouters as RouteObject, ...constantRouters.slice(1)]
        dispatch(changeRoutes(finiallRouters))
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
)

export const { changeMenus, removeMenus,changeUserRoles,changeRoutes } = userSlice.actions

export default userSlice.reducer
