import { List, Typography } from 'antd'
import { filterData } from './filter'
import { useMemo } from 'react'

type todo = {
  id: number
  text: string
  completed: boolean
}
export default function CompList({
  theme,
  dataSource,
  tab
}: {
  theme: string
  dataSource: todo[]
  tab: string
}) {
  // 未缓存数据，更改主题会触发重新计算
  //   const visibleTodos = filterData(dataSource, tab)
  //   缓存数据，更改主题不会触发重新计算
  const visibleTodos = useMemo(() => {
    console.log('--触发计算---')
    return filterData(dataSource, tab)
  }, [dataSource, tab])
  console.log('--组件被渲染---')
  return (
    <div>
      <List
        style={{
          background: theme === 'dark' ? '#000' : '#fff'
        }}
        dataSource={visibleTodos}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text
              delete={item.completed}
              style={{
                color: theme === 'dark' ? 'white' : '#000'
              }}
            >
              {item.text}
            </Typography.Text>
          </List.Item>
        )}
      ></List>
    </div>
  )
}
