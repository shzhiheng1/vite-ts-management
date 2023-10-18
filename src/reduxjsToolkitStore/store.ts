// 使用@reduxjs/toolkit包，创建Redux store实例
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import amountReducer from './amount/amountSlice.js'
import recommendReducer from './modules/discover/recommendSlice.js'
import userReducer from './modules/user/userSlice.js'
const store = configureStore({
  reducer: {
    amount: amountReducer,
    recommend: recommendReducer,
    user: userReducer
  }
})

// 对useSelector的回调函数state进行类型推断
export type RootState = ReturnType<typeof store.getState> // 导出类型， 防止页面使用的时候 ts 报错
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector //自行推导类型

// 对useDispatch进行类型推断
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
