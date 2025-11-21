import { Typography, List, Divider, Button, Space, Checkbox } from 'antd'
import type { CheckboxProps } from 'antd'
import { useState } from 'react'
import CompList from './CompList'
import { createData } from './filter'

const data = [
  '1.作用：用于缓存一个值(数组、对象、复杂的计算结果的值),即使页面重新渲染，如果依赖项没有未变时不会重新计算。跳过重复计算或页面没有必要的重新渲染',
  '2.语法: const cachedValue = useMemo(计算函数, [依赖项])',
  '3.与React.memo区别：React.memo缓存组件(props更新时才重新渲染),而useMemo缓存的是计算值',
  '4.与useCallback的区别：useCallback缓存的是函数本身而不是缓存的值',
  '5.与React.memo联合使用可以阻止子组件的重新渲染',
  '6.注意:1.开发严格模型调用2次;2.没有return数据,会抛出undefined;3.没有数组依赖项,会重复渲染。4.在map循环中调用useMemo是不允许的。'
]
const dataSource = createData(100)
export default function UseMemo() {
  const [theme, setTheme] = useState('light')
  const [tab, setTab] = useState('all')
  const handleTheme: CheckboxProps['onChange'] = (e) => {
    setTheme(e.target.checked ? 'dark' : 'light')
  }
  const handleTab = (tab: string) => {
    setTab(tab)
  }
  return (
    <div>
      <Typography.Title level={3}>useMemo学习</Typography.Title>
      <List
        dataSource={data}
        size="small"
        bordered
        renderItem={(item, index) => (
          <List.Item>
            <Typography.Text mark={data.length - 1 === index ? true : false}>
              {item}{' '}
            </Typography.Text>
          </List.Item>
        )}
      ></List>
      <Divider dashed={true}>示例</Divider>
      <div>
        <Space>
          <Button type="primary" onClick={() => handleTab('all')}>
            全部
          </Button>
          <Button color="default" onClick={() => handleTab('active')}>
            正常
          </Button>
          <Button danger onClick={() => handleTab('completed')}>
            已删除
          </Button>
          <Checkbox onChange={handleTheme}>黑暗主题</Checkbox>
        </Space>
        <CompList theme={theme} dataSource={dataSource} tab={tab} />
      </div>
    </div>
  )
}
