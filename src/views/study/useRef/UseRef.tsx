// useRef的用法
import { Typography, Row, Col } from 'antd'
import { useEffect, useRef } from 'react'
import MyChild from './MyChild'

interface ChildRef {
  sayHello: () => void
}
const { Title } = Typography
const style: React.CSSProperties = {
  background: '#0092ff',
  padding: '8px 0',
  color: '#fff',
  textAlign: 'center'
}
export default function UseRef() {
  // 获取dom元素
  const inputRef = useRef<HTMLInputElement>(null)
  //   缓存变量
  const count = useRef(0)
  //   组件ref获取
  const compRef = useRef<ChildRef>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleClick = () => {
    count.current = count.current + 1
    console.log('~~~~~~~~~', count.current)
  }
  const handleCallChild = () => {
    compRef.current?.sayHello()
  }
  return (
    <div>
      <Title level={3}>useRef的用法</Title>
      <Row gutter={[16, 24]}>
        <Col span={8}>
          <div style={style}>访问DOM元素</div>
        </Col>
        <Col span={8}>
          <div style={style}>缓存变量值,修改,组件不会重新渲染</div>
        </Col>
        <Col span={8}>
          <div style={style}>ref获取子组件的方法,需使用forwardRef包裹</div>
        </Col>
        <Col span={8}>
          <div style={style}>
            <input ref={inputRef} />
          </div>
        </Col>
        <Col span={8}>
          <div style={style}>
            <button onClick={handleClick}>点击{count.current}</button>
          </div>
        </Col>
        <Col span={8}>
          <div style={style}>
            <MyChild ref={compRef} />
            <button onClick={handleCallChild}>调子组件方法</button>
          </div>
        </Col>
      </Row>
    </div>
  )
}
