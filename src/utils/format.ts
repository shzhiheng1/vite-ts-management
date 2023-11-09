/********数字过10万转为万********/
export function formatCount(count: number) {
  // 大于10万是向下取整
  if (count > 100000) {
    return Math.floor(count / 10000) + '万'
  } else {
    return count
  }
}

/********针对网易云的图片问题的优化**********/
export function formatImage(
  url: string,
  width: number,
  height: number = width
) {
  return url + `?param=${width}x${height}`
}
/***********时间格式转换*********/
export function formatTime(timestamp: number) {
  // 187058毫秒----->  03:07
  // const minutes = Math.floor(timestamp / 1000 / 60) //3分钟
  // const seconds = Math.floor((timestamp / 1000) % 60) //7秒
  // 187秒----->03:07
  const minutes = Math.floor(timestamp / 60) //3分钟
  const seconds = Math.floor(timestamp % 60) //7秒
  // 转为字符串并补'0'
  const timeStr =
    String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0')
  if (!timestamp) '00:00'
  return timeStr
}
