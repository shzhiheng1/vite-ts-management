import { FC, ReactNode, memo, useEffect } from 'react'
import { useAppSelector } from '@/reduxjsToolkitStore/store.js'
import { shallowEqual, useDispatch } from 'react-redux'
import classNames from 'classnames'
import {
  getAsyncBanners,
  getAsyncPersonalized
} from '@/reduxjsToolkitStore/modules/discover/recommendSlice.js'
import BannerChild from './c-comp/BannerChild.js'
import ContentLeft from './c-comp/content-left/ContentLeft.js'
import ContentRight from './c-comp/content-right/ContentRight.js'

import styles from './index.module.scss'

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
    // 获取banner数据
    dispatch(getAsyncBanners())
    // 获取热门推荐的数据
    dispatch(getAsyncPersonalized(8))
  }, [])

  return (
    <div>
      <p>{message}</p>
      <BannerChild bannerData={banners} />
      <div className={classNames(['wrap1', styles.content])}>
        <ContentLeft />
        <ContentRight />
      </div>
    </div>
  )
}

Remcommend.defaultProps = {}

export default memo(Remcommend)
