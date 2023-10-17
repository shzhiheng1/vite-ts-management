import server from '@/utils/server.js'
// 轮播图接口
export const getRecommendBanner = (data: any = {}) => {
  return server.request({
    url: '/banner',
    method: 'get',
    params: data
    // data,   适用于post请求
  })
}

// 推荐歌单
export const getPersonalized = (limit = 30) => {
  return server.request({
    url: '/personalized',
    method: 'get',
    params: {
      limit
    }
  })
}
// 新碟上架
export const getAlbumNewest = () => {
  return server.request({
    url: '/album/newest',
    method: 'post'
  })
}
