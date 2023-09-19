import { FC, ReactNode, memo } from 'react'

interface Iprops {
  name: string
  width: number
  height?: number
  children?: ReactNode
}

/**
 * 传参并定义类型方法：
 * 1.const Discover = (props: Iprops) => {}; 缺点：defaultProps没有类型校验和提示
 * 2.const Discover: FC<Iprops> = (props) => {};  defaultProps有提示（比较好）
 *
 * ***/

// const Discover = (props: Iprops) => {
//   return (
//     <div>
//       <div>{props.name}</div>
//       <div>{props.width}</div>
//     </div>
//   )
// }
const Child: FC<Iprops> = (props) => {
  return (
    <div>
      <div>{props.name}</div>
      <div>{props.width}</div>
      <div>{props.children}</div>
    </div>
  )
}

Child.defaultProps = {
  name: 'xiaowang',
  width: 20
}
// 只要组件的 props 没有改变，当它的父组件重新渲染时，组件的这个记忆版本通常不会被重新渲染。
// 但 React 可能仍然会重新渲染它：memoization 是一种性能优化，而不是保证。

export default memo(Child)
