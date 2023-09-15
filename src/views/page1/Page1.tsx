import { Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import counterStore from '@/store/counterReducer/index.js'
// import {RootState} from '@/types/store.js'

export default function Page1() {
  const dispatch = useDispatch()
  const { num, arr } = useSelector((state: RootState) => ({
    num: state.counterReducer.num,
    arr: state.arrReducer.arr,
  }))
  const handleClick = () => {
    // 同步
    // dispatch({type:'add1'})
    // 异步 redux-thunk的用法格式：dispath(异步执行函数)
    // eslint-disable-next-line @typescript-eslint/ban-types
    // dispatch((dis:Function)=>{
    //   setTimeout(() => {
    //     dis({type:'add1'})
    //   }, 2000);
    // })
    // 第二种写法
    dispatch(counterStore.asyncAction.asyncAdd1)
    // dispatch({type:'add2',val:10})
  }
  const handleClickArr = () => {
    dispatch({ type: 'addArr', val: '你好---' })
    // dispatch({type:'add2',val:10})
    console.log(arr)
  }
  return (
    <div>
      <div>初始值为{num}</div>
      <Button type="primary" onClick={handleClick}>
        点击add2
      </Button>
      <div>{arr}</div>
      <br />
      <Button type="primary" onClick={handleClickArr}>
        点击addArr
      </Button>
    </div>
  )
}
