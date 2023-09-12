


// 方法一,需要页面引入： import {RootState} from '@/types/store.js'******/ 
// import store from '@/store'
// export  type RootState = ReturnType<typeof store.getState>

// 方法二
/*****全局引入，使用import('@/store/index.js')，推荐使用******/ 
type RootState = ReturnType<typeof import('@/store/index.js').getState>

