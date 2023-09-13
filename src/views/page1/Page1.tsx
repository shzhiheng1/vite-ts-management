import { Button } from 'antd'
import {useSelector,useDispatch} from 'react-redux'
// import {RootState} from '@/types/store.js'

export default function Page1() {
  const dispatch=useDispatch()
  const {num,arr}=useSelector((state:RootState)=>(
    {
      num:state.counterReducer.num,
      arr:state.arrReducer.arr
    }
  ))
  const handleClick=()=>{
    dispatch({type:'add1'})
    // dispatch({type:'add2',val:10})
  }
  const handleClickArr=()=>{
    dispatch({type:'addArr',val:'你好---'})
    // dispatch({type:'add2',val:10})
    console.log(arr)
  }
  return (
    <div>
       <div>初始值为{num}</div>
       <Button type='primary' onClick={handleClick}>点击add2</Button>
       <div>{arr}</div>
       <br />
       <Button type='primary' onClick={handleClickArr}>点击addArr</Button>

    </div>
  )
}
