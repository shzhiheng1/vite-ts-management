import { FC, ReactNode, memo } from 'react'
import styles from './ContentRight.module.scss'

interface Iprops {
  children?: ReactNode
}

const ContentRight: FC<Iprops> = () => {
  return <div className={styles.right}>ContentRight</div>
}

ContentRight.defaultProps = {}

export default memo(ContentRight)
