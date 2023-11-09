import { FC, ReactNode, memo } from 'react'
import styles from './RankList.module.scss'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/reduxjsToolkitStore/store.js'
import {
  changeSongId,
  getAsyncSongUrl,
  getAsyncSongDetail
} from '@/reduxjsToolkitStore/modules/player/playerSlice.js'

interface Iprops {
  children?: ReactNode
}

const RankList: FC<Iprops> = () => {
  const dispatch = useDispatch()
  const { palyListData } = useAppSelector((state) => ({
    palyListData: state.recommend.palyListData
  }))

  // 点击获取歌曲id和url
  const handleSong = (id: number) => {
    return () => {
      dispatch(changeSongId(id))
      dispatch(getAsyncSongUrl(id))
      dispatch(getAsyncSongDetail(id))
    }
  }
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
                    <span onClick={handleSong(childItem.id)}>
                      {childItem.name}
                    </span>
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
