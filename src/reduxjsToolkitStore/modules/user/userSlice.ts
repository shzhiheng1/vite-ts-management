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

// 安全地从 sessionStorage 恢复数据
const getStoredData = <T>(key: string, defaultValue: T): T => {
  try {
    const stored = sessionStorage.getItem(key)
    if (stored) {
      return JSON.parse(stored) as T
    }
  } catch (error) {
    console.error(`解析 ${key} 数据失败:`, error)
    // 清除损坏的数据
    sessionStorage.removeItem(key)
  }
  return defaultValue
}

// 初始state - 从 sessionStorage 恢复 menus 和 userRoles（但不恢复 routers，因为包含 React 元素）
const initialState: IdefultInt = {
  menus: getStoredData<MenuItem[]>('menus', []),//菜单
  routers: [],//路由 - 不从不恢复，需要重新构建
  userRoles: getStoredData<string[]>('userRoles', [])//角色
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
    },
    changeUserRoles(state, { payload }) {
      state.userRoles = payload
      sessionStorage.setItem('userRoles', JSON.stringify(payload))
    },
    changeRoutes(state, { payload }) {
      console.log('------cangeg----',payload)
      state.routers = payload
      // 注意：不能将包含 React 元素的路由配置保存到 sessionStorage
      // React 元素无法通过 JSON 序列化，会导致刷新后路由无法正常渲染
      // 路由配置应该在需要时重新构建，而不是从 sessionStorage 恢复
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
  async (arg: { loginType?: string }, { dispatch, getState }) => {
    /***正常情况下此处的数据应该有后端提供***/
    // 尝试从 Redux state 或 sessionStorage 获取已保存的用户角色
    const state = getState() as any
    let userRoles: string[] = state?.user?.userRoles || []
    
    // 如果 state 中没有，尝试从 sessionStorage 读取
    if (userRoles.length === 0) {
      try {
        const storedRoles = sessionStorage.getItem('userRoles')
        if (storedRoles) {
          userRoles = JSON.parse(storedRoles)
        }
      } catch (error) {
        console.error('解析用户角色失败:', error)
      }
    }
    
    // 如果还是没有，使用默认值(接口返回过来的)
    if (userRoles.length === 0) {
      userRoles = ['demo']
    }
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // if (arg.loginType === 'admin') {
          // 使用已保存的用户角色或默认值
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
          // console.log('----要剔除的路由---',_filterPath)
          // console.log('----剔除过后的菜单---',_filterMenus)
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
