import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getRecommendBanner,
  getPersonalized
} from '@/api/modules/discover/recommend.js'

const initialState = {
  message: '旺旺',
  banners: [],
  hotRecommend: []
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
/*****************异步处理结束*****************************/

export const { changeBanners, changeHotRecommend } = recommendSlice.actions

export default recommendSlice.reducer
