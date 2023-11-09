import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSongUrl, getSongDetail } from '@/api/modules/player/palyer.js'

interface Istate {
  songId: number //歌曲id
  songUrl: string //歌曲的url
  songDetail: any //哥区详情
  songList: any[] //歌曲播放列表
}
const initialState: Istate = {
  songId: 0,
  songUrl: '',
  songDetail: {},
  songList: []
}

//
/*******创建切片********/
const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeSongId(state, { payload }) {
      state.songId = payload
    },
    changeSongUrl(state, { payload }) {
      state.songUrl = payload
    },
    changeSongDetail(state, { payload }) {
      state.songDetail = payload
    }
  }
})

/**********异步处理***********/
// 异步获取歌曲URL
export const getAsyncSongUrl = createAsyncThunk(
  '/songUrl',
  (id: number, { dispatch }) => {
    getSongUrl(id)
      .then((res) => {
        if (res.code === 200) {
          const _data = res.data
          dispatch(changeSongUrl(_data[0].url || ''))
        } else {
          console.log('---获取歌曲url失败！---')
        }
      })
      .catch((err) => {
        console.log('---获取歌曲url失败！---', err)
      })
  }
)
// 异步获取歌曲详情
export const getAsyncSongDetail = createAsyncThunk(
  '/songDetail',
  (id: number, { dispatch }) => {
    getSongDetail(id)
      .then((res) => {
        if (res.code === 200) {
          console.log(res)
          dispatch(changeSongDetail(res.songs[0]))
        } else {
          console.log('---获取歌曲详情失败！---')
        }
      })
      .catch((err) => {
        console.log('---获取歌曲详情失败！---', err)
      })
  }
)
// actions
export const { changeSongId, changeSongUrl, changeSongDetail } =
  playerSlice.actions
// reducer
export default playerSlice.reducer
