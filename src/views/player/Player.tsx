import { FC, ReactNode, memo, useRef, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  LeftCircleOutlined,
  PlayCircleOutlined,
  RightCircleOutlined,
  createFromIconfontCN
} from '@ant-design/icons'
import {
  Tooltip,
  Slider,
  Space,
  Alert,
  Popover,
  List,
  Avatar,
  message
} from 'antd'
import { useAppSelector } from '@/reduxjsToolkitStore/store.js'
import { changeSongDetail } from '@/reduxjsToolkitStore/modules/player/playerSlice.js'
import { formatTime } from '@/utils/format.js'
import styles from './Player.module.scss'

interface Iprops {
  children?: ReactNode
}

interface Iitem {
  time: number
  content: string
}

const Player: FC<Iprops> = () => {
  // 使用iconfont
  const iconFontUrl = import.meta.env.VITE_APP_ICON_FONT
  const IconFont = createFromIconfontCN({
    scriptUrl: iconFontUrl
  })
  // 派发
  const dispatch = useDispatch()

  // 获取audio元素
  const audioRef = useRef<HTMLAudioElement>(null)
  // 获取store数据
  const { songDetail, songList } = useAppSelector(
    (state) => ({
      songDetail: state.palyer.songDetail,
      songList: state.palyer.songList
    }),
    // 监听url数据变化，重新打开播放
    (left, right) => {
      if (
        left.songDetail === right.songDetail &&
        left.songList.length === right.songList.length
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
  // 是否显示歌词
  const [isLyric, setIsLyric] = useState(false)
  // 当前行的歌词
  const [lineLyric, setLineLyric] = useState('暂无歌词！')
  // 播放类型
  const [playerType, setPlayerTyppe] = useState(0) //0循环，1随机，2单曲

  // 上一曲
  const handlePrevious = () => {
    if (songList.length > 0) {
      const index = songList.findIndex((item) => item.id === songDetail.id)
      if (index > 0) {
        dispatch(changeSongDetail(songList[index - 1]))
      }
    }
  }
  // 播放/暂停
  const handlePlayPause = () => {
    if (songList.length < 1) return
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPalying((state) => !state)
  }
  // 下一曲
  const handleNext = () => {
    if (songList.length > 0) {
      const index = songList.findIndex((item) => item.id === songDetail.id)
      if (index < songList.length - 2) {
        dispatch(changeSongDetail(songList[index + 1]))
      } else {
        dispatch(changeSongDetail(songList[0]))
      }
    }
  }

  // 计算当前行歌词的内容
  const showLineLyric = () => {
    const lines = songDetail.lyric
    const findIndex = lines.findIndex((item: Iitem) => {
      return Math.floor(item.time / 1000) > currentTime
    })
    if (findIndex === -1) {
      setLineLyric(lines.slice(-1).content || '暂无歌词！')
    } else {
      setLineLyric(lines[findIndex - 1]?.content || '暂无歌词！')
    }
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
    if (isLyric) {
      // 动态获取歌词
      showLineLyric()
    }
  }
  // 歌曲播放结束
  const timeEnded = () => {
    // 循环
    if (playerType === 0) {
      // 下一曲
      handleNext()
    } else if (playerType === 1) {
      // 随机
      const length = songList.length
      //  0~length-1
      const random = Math.round(Math.random() * (length - 1))
      dispatch(changeSongDetail(songList[random]))
    }

    setIsPalying(true)
    setCurrentTime(0)
    audioRef.current?.load()
    audioRef.current!.currentTime = 0
    // audioRef.current?.play()
    // 解决浏览器获取音乐和视频资源是Promise异步的问题
    fetchVideoAndPlay()
  }
  // 异步获取数据并播放()
  function fetchVideoAndPlay() {
    fetch(songDetail.url)
      .then((response) => {
        console.log(response)
        return audioRef.current?.play()
      })
      .catch((e) => {
        message.error(e)
      })
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
  // 关闭歌词显示
  const hanleCloseLyric = () => {
    setIsLyric(false)
  }
  // 显示歌词
  const handleShowLyric = () => {
    if (!songDetail.lyric || songDetail.lyric.length === 0) {
      return
    }
    setIsLyric(true)
  }

  //副作用函数
  useEffect(() => {
    // 调用音乐资源加载。。。
  }, [])

  // 点击播放列表
  const handlePlayerItem = (index: number) => {
    return () => {
      dispatch(changeSongDetail(songList[index]))
    }
  }
  // 播放列表
  const playerList = () => {
    return (
      <List
        size="small"
        bordered
        dataSource={songList}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.al.picUrl} />}
              title={<a onClick={handlePlayerItem(index)}>{item.name}</a>}
              description={item.alia[0]}
            />
          </List.Item>
        )}
      />
    )
  }

  // 播放类型展示(巧妙的使用了Space的分割属性)
  const PlayerTypeElement = () => {
    if (playerType === 1) {
      return (
        <Tooltip title="随机播放">
          <IconFont
            type="icon-xunhuanbofang1"
            onClick={changePlayerType}
          ></IconFont>
        </Tooltip>
      )
    } else if (playerType === 2) {
      return (
        <Tooltip title="单机循环">
          <IconFont
            type="icon-danquxunhuan_32"
            onClick={changePlayerType}
          ></IconFont>
        </Tooltip>
      )
    } else {
      return (
        <Tooltip title="顺序循环">
          <IconFont
            type="icon-bofang-xunhuanbofang1"
            onClick={changePlayerType}
          ></IconFont>
        </Tooltip>
      )
    }
  }
  // 改变播放类型
  const changePlayerType = () => {
    if (playerType === 2) {
      setPlayerTyppe(0)
    } else {
      setPlayerTyppe((state) => state + 1)
    }
  }

  return (
    <>
      <div className={styles.player}>
        <div className={styles.player_left}>
          <Tooltip title="上一曲" className={styles.player_left_iconL}>
            <LeftCircleOutlined onClick={handlePrevious} />
          </Tooltip>
          <Tooltip title="播放/暂停" className={styles.player_left_iconC}>
            {isPlaying ? (
              <IconFont type="icon-bofang" onClick={handlePlayPause}></IconFont>
            ) : (
              <PlayCircleOutlined onClick={handlePlayPause} />
            )}
          </Tooltip>
          <Tooltip title="下一曲" className={styles.player_left_iconR}>
            <RightCircleOutlined onClick={handleNext} />
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
          <Space split={PlayerTypeElement()}>
            <Tooltip title="歌词">
              <IconFont type="icon-geci" onClick={handleShowLyric}></IconFont>
            </Tooltip>
            <Popover title="播放列表" content={playerList}>
              <IconFont type="icon-liebiao"></IconFont>
            </Popover>
          </Space>
        </div>

        <audio
          autoPlay={songDetail?.url ? true : false}
          ref={audioRef}
          src={songDetail.url}
          onTimeUpdate={timeUpdated}
          onEnded={timeEnded}
        >
          你的浏览器不支持audio音乐播放器
        </audio>
      </div>
      {isLyric && (
        <div className={styles.alert}>
          <Alert
            message={lineLyric}
            type="info"
            closable
            onClose={hanleCloseLyric}
          />
        </div>
      )}
    </>
  )
}

Player.defaultProps = {}

export default memo(Player)
