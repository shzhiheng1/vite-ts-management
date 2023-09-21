/******************@reduxjs/toolkit的组件中的使用*****************/
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
  incrment,
  incrementAsync
} from '@/reduxjsToolkitStore/amount/amountSlice.js'
// import { RootState } from '@/types/store.js'

import {
  RootState,
  useAppSelector,
  useAppDispatch
} from '@/reduxjsToolkitStore/store.js'

export default function Page2() {
  // 两种方式都可以
  const amountReducer = useSelector((state: RootState) => state.amount)
  const { message } = useAppSelector((state) => ({
    message: state.amount.message
  }))
  useSelector((state) => {
    console.log(state)
  }, shallowEqual)

  const dispatch = useDispatch()

  // 测试封装的useAppDispatch(个人感觉没啥卵用)
  const appDispatch = useAppDispatch()
  const handleIncrement = () => {
    // dispatch(incrment())
    appDispatch(incrment())
  }
  // 异步
  const handleAsyncIncrement = () => {
    dispatch(incrementAsync(2))
  }
  return (
    <div>
      <p>{message}</p>
      <p>由于redux与@reduxjs/toolkit不能同时使用,page1被注释了</p>
      <button aria-label="Increment" onClick={handleIncrement}>
        +
      </button>
      <span>{amountReducer.value}</span>
      <button aria-label="Increment" onClick={handleAsyncIncrement}>
        +2
      </button>
    </div>
  )
}
