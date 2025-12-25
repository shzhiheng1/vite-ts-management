import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, theme } from 'antd'
import MainMenu from '@/component/MainMenu/index.js'
import LayoutHeader from './components/LayoutHeader/LayoutHeader.js'
// import Player from '../player/Player.js'
import Styles from './Layout.module.scss'
const { Header, Content, Footer, Sider } = Layout

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 左侧栏 */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className={Styles.sider}
      >
        <div className={Styles.logo} />
        <div className={Styles.menuContainer}>
          <MainMenu />
        </div>
      </Sider>
      {/* 右侧 */}
      <Layout>
        {/* 头部 */}
        <Header style={{ paddingLeft: '16px', background: colorBgContainer }}>
          <LayoutHeader />
        </Header>
        {/* 内容 */}
        <div className={Styles.mainContainer} style={{ margin: '8px 8px 0px', background: colorBgContainer }}>
          <Content>
              <Outlet />
              {/* <Player /> */}
          </Content>
        </div>     
        {/* 底部 */}
        <Footer
          style={{
            textAlign: 'center',
            height: '48px',
            padding: '0px',
            lineHeight: '48px'
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Home
