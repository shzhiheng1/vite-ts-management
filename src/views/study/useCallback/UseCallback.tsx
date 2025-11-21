import { Typography, Collapse, Divider, Button, Space } from 'antd'
import type { CollapseProps } from 'antd'
import { useCallback, useState } from 'react'
import React from 'react'

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'useCallback的语法',
    children: <pre>const memoizedCallback=useCallback(回调函数,[依赖项]) </pre>
  },
  {
    key: '2',
    label: 'useCallback的作用',
    children: (
      <p>
        缓存函数,仅在依赖项变化时重新生成函数,避免函数在每次渲染时重新创建，用于性能优化或稳定的props引用。
      </p>
    )
  },
  {
    key: '3',
    label: '与useMemo、React.memo的区别',
    children: (
      <p>useMemo缓存一个值,React.memo缓存的是组件,useCallback缓存的是函数</p>
    )
  }
]

const Child = React.memo(({ onClick }: { onClick: () => void }) => {
  console.log('---子组件渲染----')
  return <Button onClick={onClick}>Click me</Button>
})

export default function UseCallback() {
  const [count, setCount] = useState(0)
  // 修改父组件的数据，子组件渲染
  //   const handleClick = () => {
  //     console.log('~~~~~~点击了触发了~~~')
  //   } //空表示永远不变
  //  修改父组件的数据，子组件不会渲染
  const handleClick = useCallback(() => {
    console.log('~~~~~~点击了触发了~~~')
  }, []) //空表示永远不变
  return (
    <div>
      <Typography.Title level={3}>useCallback</Typography.Title>
      <Collapse
        items={items}
        defaultActiveKey={'1'}
        expandIconPosition="end"
      ></Collapse>
      {/* 示例 */}
      <Divider>示例</Divider>
      <Space>
        <Child onClick={handleClick} />
        <Button type="primary" onClick={() => setCount(count + 1)}>
          更改父组件的{count}
        </Button>
      </Space>
    </div>
  )
}
