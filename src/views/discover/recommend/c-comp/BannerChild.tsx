import {
  FC,
  ReactNode,
  memo,
  useRef,
  ElementRef,
  useState,
  useEffect
} from 'react'
// import Slider from 'react-slick' //使用时会ts错误警告，功能是正常的
import classNames from 'classnames' //多class
import { Carousel } from 'antd'
import styles from './BannerChild.module.scss'

import { LeftOutlined, RightOutlined } from '@ant-design/icons'

interface Iprops {
  children?: ReactNode
  bannerData: Banner[]
}

const Banner: FC<Iprops> = (props) => {
  const { bannerData } = props
  const [currentIndex, setCurrentIndex] = useState(0) //当前页下标
  const [currentImage, setCurrentImage] = useState('') //当前的图片
  const sliderRef = useRef<ElementRef<typeof Carousel>>(null)
  const settings = {
    arrows: false, //左右箭头
    dots: false, //点
    infinite: true, //无限循环
    slidesToShow: 1, //显示数量
    slidesToScroll: 1, //每次移动数量
    speed: 2000, //速度，ms
    autoplay: true, //自动轮播
    autoplaySpeed: 5000, //自动轮播时长
    waitForAnimate: true, //等待动画
    cssEase: 'linear', //动画速度效果，
    pauseOnHover: true, //鼠标放上面暂停
    fade: true //是否为显隐方式
    // rows: 2,//多行
    //   slidesPerRow: 2
  }
  // classNames的使用
  const wrap = classNames('wrap1', styles.slider)
  /*点击箭头事件*/
  const handleArrows = (type: string) => {
    return () => {
      if (type === 'next') {
        sliderRef.current?.next()
        // console.log('------下一页-----')
      } else {
        sliderRef.current?.prev()
        // console.log('------上一页------')
      }
    }
  }
  /****轮播图的change事件,下标从0开始****/
  const sliderAfterChange = (current: number) => {
    setCurrentIndex(current)
    // console.log(current, currentIndex)
  }
  /******点击小点点事件*****/
  const handleClickDots = (index: number) => {
    return () => {
      sliderRef.current?.goTo(index, true)
    }
  }
  /*****数据获取数据和下标更改是时修改****/
  useEffect(() => {
    setCurrentImage(
      `${bannerData[currentIndex]?.imageUrl}?imageView&blur=40x20&quot`
    )
  }, [currentIndex, bannerData])

  return (
    <div
      className={styles.bannerBox}
      style={{
        backgroundImage: `url(${currentImage})`
      }}
    >
      {/* 轮播图中心位 */}
      <div className={wrap}>
        <Carousel {...settings} ref={sliderRef} afterChange={sliderAfterChange}>
          {bannerData.map((item) => {
            return (
              <div key={item.imageUrl}>
                <img className={styles.itemImg} src={item.imageUrl} />
              </div>
            )
          })}
        </Carousel>
        {/* 广告位 */}
        <div className={styles.advertisement}></div>
        {/* 自定义轮播图左右按钮 */}
        <div
          className={classNames(styles.preBtn, styles.arrows)}
          onClick={handleArrows('pre')}
        >
          <LeftOutlined className={styles.arrowsIcon} />
        </div>
        <div
          className={classNames(styles.nextBtn, styles.arrows)}
          onClick={handleArrows('next')}
        >
          <RightOutlined className={styles.arrowsIcon} />
        </div>
        {/* 小点点 */}
        <div className={styles.dotsList}>
          <ul>
            {bannerData.map((item, index) => {
              return (
                <li
                  key={item.imageUrl}
                  className={classNames(
                    index === currentIndex ? `${styles.active}` : ''
                  )}
                  onClick={handleClickDots(index)}
                ></li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

Banner.defaultProps = {}

export default memo(Banner)
