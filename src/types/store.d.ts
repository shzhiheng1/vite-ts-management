// 方法一,需要页面引入： import {RootState} from '@/types/store.js'******/
// import store from '@/store'
// export  type RootState = ReturnType<typeof store.getState>

// 方法二
/*****全局引入，使用import('@/store/index.js')，推荐使用******/
// 使用redux
// type RootState = ReturnType<typeof import('@/store/index.js').getState>

// 使用 @reduxjs/toolkit
import store from '@/reduxjsToolkitStore/store.js'
type RootState = ReturnType<typeof store.getState>
// type RootState = ReturnType<
//   typeof import('@/reduxjsToolkitStore/store.js').getState
// >
