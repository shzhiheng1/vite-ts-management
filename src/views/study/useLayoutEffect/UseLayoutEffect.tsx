// useLayoutEffect示例
import { Space, Table } from 'antd'
import { useState, useRef, useLayoutEffect } from 'react'

const columns = [
  {
    title: '特征',
    dataIndex: 'title'
  },
  {
    title: 'useEffect',
    dataIndex: 'useEffect'
  },
  {
    title: 'useLayoutEffect',
    dataIndex: 'useLayoutEffect'
  }
]
const dataSource = [
  {
    title: '触发时机',
    useEffect: '浏览器绘制之后触发',
    useLayoutEffect: 'DOM更新之后,绘制之前触发'
  },
  {
    title: '是否阻塞渲染',
    useEffect: '否',
    useLayoutEffect: '是'
  },
  {
    title: '是否适合操作DOM',
    useEffect: '延时执行，可能不准确',
    useLayoutEffect: '更精准的读取和修改DOM'
  },
  {
    title: '是否适合异步',
    useEffect: '适合',
    useLayoutEffect: '否'
  }
]
export default function UseLayoutEffect() {
  const [width, setWidth] = useState(0)
  const boxRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (boxRef.current !== null) {
      const boxWidth = boxRef.current.getBoundingClientRect().width
      setWidth(boxWidth)
    }
  }, [])
  // useEffect(() => {
  //   if (boxRef.current !== null) {
  //     console.log('进来了')
  //     const boxWidth = boxRef.current.getBoundingClientRect().width
  //     setWidth(boxWidth)
  //   }
  // }, [])
  useLayoutEffect(() => {
    if (scrollRef.current !== null) {
      scrollRef.current.scrollTop = scrollRef.current?.scrollHeight
    }
  }, [])

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        bordered
        pagination={false}
        size="small"
      ></Table>
      <hr />
      <Space direction="vertical">
        <h2>
          <strong>闪烁</strong>{' '}
          示例1:使用useEffect会有闪烁,因为初始为0绘制,0变为具体数字时又重新绘制;使用useLayoutEffect不会有闪烁，因为初始0变为具体数字后才绘制。
        </h2>

        <div ref={boxRef} style={{ width: '50%', background: 'blue' }}>
          这是盒子
        </div>
        <p>这个盒子的宽度：{width}px</p>
      </Space>
      <hr />
      <h2>示例2:跳转到指定的位置</h2>
      <div ref={scrollRef} style={{ height: '100px', overflowY: 'scroll' }}>
        {[...Array(100)].map((_, i) => (
          <div key={i+Math.random()}>line {i}</div>
        ))}
      </div>
      <hr />
      <h2>注意：不能滥用</h2>
    </div>
  )
}
