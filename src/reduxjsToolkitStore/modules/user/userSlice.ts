import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { items, type MenuItem } from '@/assets/data/menu.js'

interface IdefultInt {
  menus: MenuItem[]
  routers: any[]
}
// 初始state
const initialState: IdefultInt = {
  menus: [],
  routers: []
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
    }
  }
})

const menusData: MenuItem[] = [
  {
    label: 'reduxjs/toolkit的使用',
    key: '/page2',
    icon: 'DesktopOutlined'
  },
  {
    label: '发现',
    key: 'discover',
    icon: 'FileOutlined',
    children: [
      {
        label: '精品推荐',
        key: '/discover/recommend'
      }
    ]
  }
]
// 异步获取menus数据
export const getAsyncMenus = createAsyncThunk(
  'user/menus',
  async (arg: { loginType?: string }, { dispatch }) => {
    /***正常情况下此处的数据应该有后端提供***/
    return new Promise((resolve) => {
      setTimeout(() => {
        if (arg.loginType === 'admin') {
          resolve(items)
        } else {
          resolve(menusData)
        }
      }, 1000)
    })
      .then((res) => {
        dispatch(changeMenus(res))
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
)

export const { changeMenus, removeMenus } = userSlice.actions
export default userSlice.reducer
