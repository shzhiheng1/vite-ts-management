import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getSongUrl,
  getSongDetail,
  getSongLyric
} from '@/api/modules/player/palyer.js'
import { formatLyrics } from '@/utils/format.js'
import { message } from 'antd'

interface Istate {
  songDetail: any //哥区详情
  songList: any[] //歌曲播放列表
}
const initialState: Istate = {
  songDetail: {},
  songList: []
}

/*******创建切片********/
const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeSongDetail(state, { payload }) {
      state.songDetail = payload
    },
    changeSongList(state, { payload }) {
      // 不存在列表中的数据放入列表中
      const findIndex = state.songList.findIndex(
        (item) => item.id === payload.id
      )
      if (findIndex === -1) {
        state.songList.push(payload)
      }
    }
  }
})

// 异步获取歌曲详情
export const getAsyncSongDetail = createAsyncThunk(
  '/songDetail',
  async (id: number, { dispatch }) => {
    try {
      const resultDetail = await getSongDetail(id)
      const resultUrl = await getSongUrl(id)
      const resultLrc = await getSongLyric(id)
      let song = resultDetail.songs[0]
      song['url'] = resultUrl.data[0].url || ''
      // 添加歌词到当前音乐和列表
      const lyric = formatLyrics(resultLrc.lrc.lyric)
      song['lyric'] = lyric || []
      // 当前歌曲详情
      dispatch(changeSongDetail(song))
      // 歌曲列表
      dispatch(changeSongList(song))
    } catch (error) {
      message.error('歌单获取失败！', 3000)
      console.log('----歌单获取失败-----', error)
    }
  }
)
// actions
export const { changeSongDetail, changeSongList } = playerSlice.actions
// reducer
export default playerSlice.reducer
