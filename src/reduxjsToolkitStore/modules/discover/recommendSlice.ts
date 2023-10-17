import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getRecommendBanner,
  getPersonalized,
  getAlbumNewest
} from '@/api/modules/discover/recommend.js'

// 定义类型，数组不想定义类型时可以设置为any,只是在使用时无提示
interface hotObj {
  id: number
  type: number
  name: string
  copywriter: string
  picUrl: string
  canDislike: boolean
  trackNumberUpdateTime: number
  playCount: number
  trackCount: number
  highQuality: boolean
  alg: string
}
interface stateType {
  message: string
  banners: any[]
  hotRecommend: hotObj[]
  albums: any[]
}

const initialState: stateType = {
  message: '旺旺',
  banners: [],
  // hotRecommend: [] as any[]
  hotRecommend: [],
  albums: []
}

/*****************开始创建切片**********************/
const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBanners(state, action) {
      state.banners = action.payload
    },
    changeHotRecommend(state, action) {
      state.hotRecommend = action.payload
    },
    changeAlbums(state, action) {
      state.albums = action.payload
    }
  }
})
/*****************结束创建切片**********************/

/*****************异步处理开始*****************************/
// 第一种方式：异步请求banner数据
export const getAsyncBanners = (params: any = {}) => {
  return async function (dispatch: any) {
    // 第二个参数getState是获取上面的state
    try {
      const res = await getRecommendBanner(params)
      if (res.code === 200) {
        dispatch(changeBanners(res.banners))
      }
    } catch (error) {
      console.log('----banner接口请求失败---', error)
    }
  }
}

// 第二种方式：异步请求推荐歌单
export const getAsyncPersonalized = createAsyncThunk(
  'recommend/personalized',
  async (limit: number, { dispatch }) => {
    const response = await getPersonalized(limit)
    dispatch(changeHotRecommend(response.result))
  }
)

// 获取新碟商上架数据
export const getAsyncAlbulms = createAsyncThunk(
  'recommend/ablulmNewest',
  async (_, { dispatch }) => {
    const res = await getAlbumNewest()
    if (res.code === 200) {
      dispatch(changeAlbums(res.albums))
    }
  }
)
/*****************异步处理结束*****************************/

export const { changeBanners, changeHotRecommend, changeAlbums } =
  recommendSlice.actions

export default recommendSlice.reducer
