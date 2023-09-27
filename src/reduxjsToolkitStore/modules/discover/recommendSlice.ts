import { createSlice } from '@reduxjs/toolkit'
import { getRecommendBanner } from '@/api/modules/discover/recommend.js'

const initialState = {
  message: '旺旺',
  banners: []
}

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    chengeBanners(state, action) {
      state.banners = action.payload
    }
  }
})
// 异步请求数据
export const getAsyncBanners = (params: any = {}) => {
  return async function (dispatch: any) {
    // 第二个参数getState是获取上面的state
    try {
      const res = await getRecommendBanner(params)
      if (res.code === 200) {
        dispatch(chengeBanners(res.banners))
      }
    } catch (error) {
      console.log('----banner接口请求失败---', error)
    }
  }
}

export const { chengeBanners } = recommendSlice.actions

export default recommendSlice.reducer
