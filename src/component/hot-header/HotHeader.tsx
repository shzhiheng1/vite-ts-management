import { ArrowRightOutlined } from '@ant-design/icons'
import { FC, ReactNode, memo } from 'react'
import { Link } from 'react-router-dom'
// 使用styled-components 插件试试
import { Wrap } from './style.js'

interface Iprops {
  children?: ReactNode
  title: string
  keywords?: { keyword: string; link: string }[]
  moreLink: string
}

const HotHeader: FC<Iprops> = (props) => {
  const { keywords, title, moreLink } = props
  return (
    <Wrap>
      <div className="hot-left">
        <div className="icon">
          <div className="icon-circle"></div>
        </div>
        <div className="header">
          <h3>{title}</h3>
          <div className="header-keywords">
            {keywords?.map((item) => {
              return (
                <div className="header-keywords-item" key={item.keyword}>
                  <Link to={item.link}>{item.keyword}</Link>
                  <span>|</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="hot-right">
        <Link to={moreLink}>更多</Link>
        <ArrowRightOutlined style={{ color: '#c10d0c' }} />
      </div>
    </Wrap>
  )
}

HotHeader.defaultProps = {}

export default memo(HotHeader)
