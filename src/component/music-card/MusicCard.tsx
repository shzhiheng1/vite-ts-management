import { FC, ReactNode, memo, useMemo } from 'react'
import { CustomerServiceOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { formatImage } from '@/utils/format.js'
import styles from './MusicCard.module.scss'

interface Iprops {
  children?: ReactNode
  picUrl: string
  name: string
  playCount: number
}

const MusicCard: FC<Iprops> = (props) => {
  const { picUrl, name, playCount } = props
  // 计算播放次数(使用useMemo实现计算属性)
  const playNumber = useMemo(() => {
    if (playCount > 100000) {
      return Math.floor(playCount / 10000) + '万'
    } else {
      return playCount
    }
  }, [playCount])

  return (
    <div className={styles.musicCard}>
      <img
        className={styles.musicCard_img}
        src={formatImage(picUrl, 140)}
        alt={name}
      />
      <Link to={'/'}></Link>
      <div className={styles.musicCard_bottom}>
        <div className={styles.musicCard_bottom_left}>
          <CustomerServiceOutlined
            className={styles.musicCard_bottom_left_icon}
          />
          <span className={styles.musicCard_bottom_left_text}>
            {/* 也可以直接使用格式化的方式处理 */}
            {playNumber}
          </span>
        </div>
        <div className={styles.musicCard_bottom_right}></div>
      </div>
    </div>
  )
}

MusicCard.defaultProps = {}

export default memo(MusicCard)
