import server from '@/utils/server.js'

export const getDemoData = (data: any = {}) => {
  return server({
    url: '/banner',
    method: 'get',
    params: data
    // data,   适用于post请求
  })
}
