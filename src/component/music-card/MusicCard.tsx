import { CustomerServiceOutlined } from '@ant-design/icons'
import { FC, ReactNode, memo, useMemo } from 'react'
import { Link } from 'react-router-dom'
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
    if (playCount > 10000) {
      return Math.round(playCount / 10000) + '万'
    } else {
      return playCount
    }
  }, [playCount])

  return (
    <div className={styles.musicCard}>
      <img className={styles.musicCard_img} src={picUrl} alt={name} />
      <Link to={'/'}></Link>
      <div className={styles.musicCard_bottom}>
        <div className={styles.musicCard_bottom_left}>
          <CustomerServiceOutlined
            className={styles.musicCard_bottom_left_icon}
          />
          <span className={styles.musicCard_bottom_left_text}>
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
