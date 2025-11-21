type todo = {
  id: number
  text: string
  completed: boolean
}

// 创建数据
export const createData = (len: number = 0) => {
  const todos: todo[] = []
  for (let i = 0; i < len; i++) {
    todos.push({
      id: i,
      text: 'Todo ' + (i + 1),
      completed: Math.random() > 0.5
    })
  }
  return todos
}

// 过滤数据
export const filterData = (todos: todo[], tab: string) => {
  let startTime = performance.now()
  while (performance.now() - startTime < 500) {
    // 500 毫秒内不执行任何操作来模拟极慢的代码
  }
  return todos.filter((todo) => {
    if (tab === 'all') {
      return true
    } else if (tab === 'active') {
      return !todo.completed
    } else if (tab === 'completed') {
      return todo.completed
    }
  })
}
