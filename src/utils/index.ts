// 获取pathname所配的menu
interface MenuInter<T = any> {
  key: string
  label: string
  children?: MenuInter<T>[]
}
export function findNameByPath<T extends MenuInter>(
  tree: T[],
  pathName = ''
): T[] {
  const path: T[] = []
  function dfs(nodeList: T[]): boolean {
    for (const node of nodeList) {
      path.push(node) //添加节点
      if (node.key === pathName) {
        // 如果第一层匹配，直接终止循环
        return true
      }
      //   去第二层寻找，递归2,3,4层
      if (node.children && dfs(node.children)) {
        // 匹配到就停止
        return true
      }
      //   所有层都没有匹配到，删除这个节点
      path.pop()
    }
    // 为了做下一次循环
    return false
  }
  dfs(tree)
  return [...path]
}
