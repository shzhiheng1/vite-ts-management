import { FC, ReactNode, memo } from 'react'
import styles from './RankList.module.scss'
import { useAppSelector } from '@/reduxjsToolkitStore/store.js'

interface Iprops {
  children?: ReactNode
}

const RankList: FC<Iprops> = () => {
  const { palyListData } = useAppSelector((state) => ({
    palyListData: state.recommend.palyListData
  }))
  return (
    <div className={styles.rank}>
      {palyListData.length > 0 &&
        palyListData.map((parentItem) => (
          <div className={styles.rank_item} key={parentItem.id}>
            <div className={styles.rank_item_head}>
              <img src={parentItem.coverImgUrl} />
              <div className={styles.rank_item_head_text}>
                <h2>{parentItem.name}</h2>
                <p>{parentItem.description}</p>
              </div>
            </div>
            <ul className={styles.rank_item_list}>
              {parentItem.tracks
                .slice(0, 10)
                .map((childItem: any, index: number) => (
                  <li key={childItem.id}>
                    <i>{index + 1}</i>
                    <span>{childItem.name}</span>
                  </li>
                ))}
              <li>查看更多 &gt;</li>
            </ul>
          </div>
        ))}
    </div>
  )
}

RankList.defaultProps = {}

export default memo(RankList)
