import { FC, ReactNode, memo } from 'react'
import { Link } from 'react-router-dom'
import styles from './DiscItem.module.scss'
import { formatImage } from '@/utils/format.js'
import { useAppSelector } from '@/reduxjsToolkitStore/store.js'

interface Iprops {
  children?: ReactNode
  index: number
}

const DiscItem: FC<Iprops> = (props) => {
  const { albums } = useAppSelector((state) => ({
    albums: state.recommend.albums
  }))
  const { index } = props
  return (
    <ul className={styles.DiscItem}>
      {albums?.slice(index * 5, (index + 1) * 5).map((disc) => {
        return (
          <li className={styles.DiscItem_item} key={disc.id}>
            <div className={styles.DiscItem_item_top}>
              <img src={formatImage(disc.picUrl, 100)} alt="" />
              <Link to={'/'}>
                <span></span>
              </Link>
            </div>
            <div className={styles.DiscItem_item_info}>
              <p className={styles.DiscItem_item_info_title}>
                <Link to={'/'}>{disc.name}</Link>
              </p>
              <p className={styles.DiscItem_item_info_content}>
                <Link to={'/'}>{disc.company}</Link>
              </p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

DiscItem.defaultProps = {}

export default memo(DiscItem)
