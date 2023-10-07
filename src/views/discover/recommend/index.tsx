import { FC, ReactNode, memo, useEffect } from 'react'
import { useAppSelector } from '@/reduxjsToolkitStore/store.js'
import { shallowEqual, useDispatch } from 'react-redux'
import { getAsyncBanners } from '@/reduxjsToolkitStore/modules/discover/recommendSlice.js'
import BannerChild from './c-comp/BannerChild.js'

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
      <BannerChild bannerData={banners} />
    </div>
  )
}

Remcommend.defaultProps = {}

export default memo(Remcommend)
