import { FC, ReactNode, memo, useRef, ElementRef } from 'react'
import { Carousel } from 'antd'

import classNames from 'classnames'
import styles from './NewDisc.module.scss'
import DiscItem from '@/component/disc-item/DiscItem.js'

interface Iprops {
  children?: ReactNode
}

const NewDisc: FC<Iprops> = () => {
  const CarouselRef = useRef<ElementRef<typeof Carousel>>(null)
  const handlePrev = () => {
    CarouselRef.current?.prev()
  }
  const handleNext = () => {
    CarouselRef.current?.next()
  }
  return (
    <div className={styles.newDisc}>
      <button
        className={classNames(styles.newDisc_btn, styles.btn_left)}
        onClick={handlePrev}
      ></button>
      <div className={styles.newDisc_content}>
        <Carousel dots={false} ref={CarouselRef}>
          {[0, 1].map((item) => {
            return (
              <div key={item}>
                <DiscItem index={item} />
              </div>
            )
          })}
        </Carousel>
      </div>
      <button
        className={classNames(styles.newDisc_btn, styles.btn_right)}
        onClick={handleNext}
      ></button>
    </div>
  )
}

NewDisc.defaultProps = {}

export default memo(NewDisc)
