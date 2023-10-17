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
