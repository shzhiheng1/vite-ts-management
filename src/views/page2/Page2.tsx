/******************@reduxjs/toolkit的组件中的使用*****************/
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
  incrment,
  incrementAsync
} from '@/reduxjsToolkitStore/amount/amountSlice.js'
// import { RootState } from '@/types/store.js'
import { useState } from 'react'
import {
  RootState,
  useAppSelector,
  useAppDispatch
} from '@/reduxjsToolkitStore/store.js'
import { Button } from 'antd'
import { getDemoData } from '@/api/demo.js'

export default function Page2() {
  const [banners, setBanners] = useState<Banner[]>([])
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

  // 测试请求数据
  const handleProductList = () => {
    getDemoData({})
      .then((res) => {
        console.log(res)
        if (res.code === 200) {
          setBanners(res.banners)
        }
      })
      .catch((err) => {
        throw new Error(err)
      })
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
      <Button type="primary" onClick={handleProductList}>
        测试接口
      </Button>
      <div>
        {banners.map((item) => {
          return <div key={item.imageUrl}>{item.imageUrl}</div>
        })}
      </div>
    </div>
  )
}
