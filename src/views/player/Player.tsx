import { FC, ReactNode, memo, useRef, useEffect, useState } from 'react'
import {
  LeftCircleOutlined,
  PlayCircleOutlined,
  RightCircleOutlined,
  createFromIconfontCN
} from '@ant-design/icons'
import { Tooltip, Slider, Space } from 'antd'
import { useAppSelector } from '@/reduxjsToolkitStore/store.js'
import { formatTime } from '@/utils/format.js'
import styles from './Player.module.scss'

interface Iprops {
  children?: ReactNode
}

const Player: FC<Iprops> = () => {
  // 使用iconfont
  const iconFontUrl = import.meta.env.VITE_APP_ICON_FONT
  const IconFont = createFromIconfontCN({
    scriptUrl: iconFontUrl
  })

  // 获取audio元素
  const audioRef = useRef<HTMLAudioElement>(null)
  // 获取store数据
  const { songUrl, songDetail } = useAppSelector(
    (state) => ({
      songUrl: state.palyer.songUrl,
      songDetail: state.palyer.songDetail
    }),
    // 监听url数据变化，重新打开播放
    (left, right) => {
      if (
        left.songUrl === right.songUrl &&
        left.songDetail === right.songDetail
      ) {
        return true
      } else {
        setIsPalying(true)
        return false
      }
    }
  )
  // 播放/暂停
  const [isPlaying, setIsPalying] = useState(false)
  // 当前时间
  const [currentTime, setCurrentTime] = useState(0)
  // 进度
  const [progress, setProgress] = useState(0)
  // 是否使用鼠标
  const [isDrag, setIsDrag] = useState(false)

  // 播放/暂停
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPalying((state) => !state)
  }
  // 播放时间更新
  const timeUpdated = () => {
    // 正在拖拽中不改变进度和时间显示
    if (isDrag) return
    // 更改时间显示和进度显示
    const time = Math.floor(audioRef.current?.currentTime || 0)
    setCurrentTime(time)
    // 更改进度条： (1000*  30/187)/10,  为了保留一位小数配合步长0.5
    const pro = Math.ceil((1000 * time) / (songDetail.dt / 1000)) / 10
    setProgress(pro)
  }
  // 歌曲播放结束
  const timeEnded = () => {
    setIsPalying(false)
  }
  // 点击进度条松开鼠标时候触发
  const handleMouseUp = (value: number) => {
    console.log('-------点击的位置------', value)
    // setIsMouse(true)
    const time = (value / 100) * (songDetail.dt / 1000)
    // 更改音乐播放时间
    audioRef.current!.currentTime = time
    // 更改显示时间和进度
    setCurrentTime(time)
    setProgress(value)
    // 松开拖拽鼠标修改
    setIsDrag(false)
  }
  // 拖拽进度条
  const hanleSliderDrag = (value: number) => {
    setProgress(value)
    // 设置正在拖拽
    setIsDrag(true)
  }
  //包房
  useEffect(() => {
    // audioRef.current.src=''
    // console.log(audioRef.current)
  }, [])

  return (
    <div className={styles.player}>
      <div className={styles.player_left}>
        <Tooltip title="上一曲" className={styles.player_left_iconL}>
          <LeftCircleOutlined />
        </Tooltip>
        <Tooltip title="播放/暂停" className={styles.player_left_iconC}>
          {isPlaying ? (
            <IconFont type="icon-bofang" onClick={handlePlayPause}></IconFont>
          ) : (
            <PlayCircleOutlined onClick={handlePlayPause} />
          )}
        </Tooltip>
        <Tooltip title="下一曲" className={styles.player_left_iconR}>
          <RightCircleOutlined />
        </Tooltip>
      </div>
      <div className={styles.player_content}>
        <img src={songDetail?.al?.picUrl} />
        <div className={styles.player_content_right}>
          <p className={styles.player_content_right_title}>
            <span>{songDetail?.name} &nbsp;</span>
            <span style={{ fontSize: '12px', color: 'gray' }}>
              {songDetail?.ar?.[0]?.name}
            </span>
          </p>
          <div className={styles.player_content_right_slider}>
            <Slider
              className={styles.player_content_right_slider_line}
              // 未使用的部分
              railStyle={{ background: '#aaa' }}
              // 已使用的部分
              trackStyle={{ background: '#0f0' }}
              value={progress}
              min={0}
              max={100}
              step={0.5}
              onAfterChange={handleMouseUp}
              onChange={hanleSliderDrag}
            />
            <p className={styles.player_content_right_slider_time}>
              {formatTime(currentTime || 0)}
              <span>&nbsp;/&nbsp;</span>
              {formatTime(songDetail?.dt / 1000 || 0)}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.player_right}>
        <Space>
          <IconFont type="icon-danquxunhuan_32"></IconFont>
          <IconFont type="icon-bofang-xunhuanbofang1"></IconFont>
          <IconFont type="icon-xunhuanbofang1"></IconFont>
          <IconFont type="icon-liebiao"></IconFont>
        </Space>
      </div>

      <audio
        autoPlay={songUrl ? true : false}
        ref={audioRef}
        src={songUrl}
        onTimeUpdate={timeUpdated}
        onEnded={timeEnded}
      >
        你的浏览器不支持audio音乐播放器
      </audio>
    </div>
  )
}

Player.defaultProps = {}

export default memo(Player)
