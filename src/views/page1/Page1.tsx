import { Button } from 'antd'
import {useSelector,useDispatch} from 'react-redux'
// import {RootState} from '@/types/store.js'

export default function Page1() {
  const {num}=useSelector((state:RootState)=>(
    {
      num:state.num
    }
  ))
  const dispatch=useDispatch()
  const handleClick=()=>{
    // dispatch({type:'add1'})
    dispatch({type:'add2',val:10})
  }
  return (
    <div>
       <div>初始值为{num}</div>
       <Button type='primary' onClick={handleClick}>点击</Button>
    </div>
  )
}
