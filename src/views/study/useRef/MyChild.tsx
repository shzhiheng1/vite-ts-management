import { forwardRef, useImperativeHandle } from 'react'

const MyChild = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    sayHello() {
      console.log('hello word!')
    }
  }))
  return <div>我是子组件</div>
})

export default MyChild
