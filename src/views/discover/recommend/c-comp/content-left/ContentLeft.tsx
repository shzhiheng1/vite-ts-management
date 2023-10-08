import { FC, ReactNode, memo } from 'react'
import styles from './ContentLeft.module.scss'

import HotHeader from '@/component/hot-header/HotHeader.js'

interface Iprops {
  children?: ReactNode
}

const ContentLeft: FC<Iprops> = () => {
  const hotKeywords = [
    {
      keyword: '华语',
      link: '/'
    },
    {
      keyword: '流行',
      link: '/'
    },
    {
      keyword: '摇滚',
      link: '/'
    },
    {
      keyword: '民谣',
      link: '/'
    },
    {
      keyword: '电子',
      link: '/'
    }
  ]
  return (
    <div className={styles.left}>
      <HotHeader keywords={hotKeywords} title="热门推荐" moreLink="/" />
    </div>
  )
}

ContentLeft.defaultProps = {}

export default memo(ContentLeft)
