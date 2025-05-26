import { useSearchParams, useParams } from 'react-router-dom'
const MusicDetail = () => {
  // 获取query上的参数
  const [searchParams] = useSearchParams()
  const name = searchParams.get('name')
  //   获取动态路由上参数
  const { id } = useParams()
  return (
    <div>
      <h2>音乐详情</h2>
      <h3>url的query参数获取,使用useSearchParams获取数据:</h3>
      <div>名称:{name}</div>
      <h3>获取动态路由的参数,使用useParams获取数据:</h3>
      <div>id:{id}</div>
    </div>
  )
}
export default MusicDetail
