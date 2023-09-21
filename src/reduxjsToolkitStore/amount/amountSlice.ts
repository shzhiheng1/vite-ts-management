// counter 特性相关的 redux 逻辑
import { createSlice } from '@reduxjs/toolkit'
export const amountSlice = createSlice({
  name: 'amount',
  initialState: {
    value: 0,
    message: '我是使用@reduxjs/toolkit'
  },
  reducers: {
    incrment: (state) => {
      // Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。
      // 并不是真正的改变 state 因为它使用了 immer 库
      // 当 immer 检测到 "draft state" 改变时，会基于这些改变去创建一个新的
      // 不可变的 state
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})
// 结构出来action  {type: "amount/increment"}
export const { incrment, decrement, incrementByAmount } = amountSlice.actions
/**********redux-thunk已被Redux Toolkit 的 configureStore封装好了***********/
// 处理异步函数;相当于action creator中的store.dispatch(incrementAsync(5))
export const incrementAsync = function (num: number) {
  return function (dispatch: any) {
    setTimeout(() => {
      dispatch(incrementByAmount(num))
    }, 2000)
  }
}
/********异步ajax请求服务器数据实例如下************/
// const fatchUserById=userId=>{
// 异步函数
//     return async (dispatch,getState)=>{
//         try {
//    请求
//             const user=await userAPI.fetchById(userId)
//            调用dispatch一个action
//             dispatch(userLoaded(user))
//         } catch (error) {
// 错误处理
//             console.log(error)
//         }
//     }
// }

// 导出reducer
export default amountSlice.reducer
