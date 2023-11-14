import server from '@/utils/server.js'

// 获取歌曲的mp3的url
export const getSongUrl = (id: number) => {
  return server.request({
    url: '/song/url',
    method: 'get',
    params: {
      id
    }
  })
}
// 获取歌曲详情 /song/detail?ids=2075896544
export const getSongDetail = (ids: number) =>
  server.request({
    url: '/song/detail',
    method: 'get',
    params: {
      ids
    }
  })

// 获取歌词
export const getSongLyric = (id: number) => {
  return server.request({
    url: '/lyric',
    method: 'get',
    params: {
      id
    }
  })
}
