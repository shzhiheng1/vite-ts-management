import { FC, ReactNode, memo } from 'react'

interface Iprops {
  children?: ReactNode
}

const Child: FC<Iprops> = () => {
  return <div>Child</div>
}

Child.defaultProps = {}

export default memo(Child)
