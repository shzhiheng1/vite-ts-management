import { FC, ReactNode, memo, useEffect } from 'react'
import { useAppSelector } from '@/reduxjsToolkitStore/store.js'
import { shallowEqual, useDispatch } from 'react-redux'
import { getAsyncBanners } from '@/reduxjsToolkitStore/modules/discover/recommendSlice.js'

interface Iprops {
  children?: ReactNode
}

const Remcommend: FC<Iprops> = () => {
  const dispatch = useDispatch()
  const { message, banners } = useAppSelector((state) => {
    return {
      message: state.recommend.message,
      banners: state.recommend.banners
    }
  }, shallowEqual)
  // 渲染完成调用一次
  useEffect(() => {
    dispatch(getAsyncBanners())
  }, [])

  return (
    <div>
      <p>{message}</p>
      {banners.map((item: any) => {
        return <div key={item.imageUrl}>{item.imageUrl}</div>
      })}
    </div>
  )
}

Remcommend.defaultProps = {}

export default memo(Remcommend)
