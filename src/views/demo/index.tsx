import Child from './components/child.js'
const Demo = () => {
  return (
    <div>
      <Child name="小王" width={30}>
        <div>我需要children获取</div>
      </Child>
    </div>
  )
}

export default Demo
