import { FC, ReactNode, memo } from 'react'
import styles from './ContentLeft.module.scss'

import HotHeader from '@/component/hot-header/HotHeader.js'
import MusicCard from '@/component/music-card/MusicCard.js'
import { Link } from 'react-router-dom'
import { useAppSelector } from '@/reduxjsToolkitStore/store.js'

interface Iprops {
  children?: ReactNode
}

const ContentLeft: FC<Iprops> = () => {
  const { hotRecommend } = useAppSelector((state) => {
    return {
      hotRecommend: state.recommend.hotRecommend
    }
  })
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
      <div className={styles.hot}>
        <HotHeader keywords={hotKeywords} title="热门推荐" moreLink="/" />
        <ul className={styles.hotContent}>
          {hotRecommend?.map((item) => {
            return (
              <li key={item.id}>
                <MusicCard {...item} />
                <div className={styles.musicCard_title}>
                  <Link to={'/'}>{item.name}</Link>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      <div className={styles.new}>
        <HotHeader title="新碟上架" moreLink="/" />
      </div>
    </div>
  )
}

ContentLeft.defaultProps = {}

export default memo(ContentLeft)
