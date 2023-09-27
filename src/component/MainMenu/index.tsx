/************菜单组件************/
import React, { useState } from 'react'
import { Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  DesktopOutlined,
  FileOutlined,
  // PieChartOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons'

// import type { MenuProps } from 'antd';

// type MenuItem = Required<MenuProps>['items'][number];
interface node {
  label: string
  key: string
  icon?: React.ReactNode
  children?: node[]
}

const items: node[] = [
  // {
  //   label: '传统redux的使用',
  //   key: '/page1',
  //   icon: <PieChartOutlined />
  // },
  {
    label: 'reduxjs/toolkit的使用',
    key: '/page2',
    icon: <DesktopOutlined />
  },
  {
    label: '功能学习',
    key: 'page3',
    icon: <UserOutlined />,
    children: [
      {
        label: '栏目3-01',
        key: '/page3/page301'
      },
      {
        label: '栏目3-01',
        key: '/page3/page302'
      },
      {
        label: '栏目3-01',
        key: '/page3/page303'
      }
    ]
  },
  {
    label: '栏目4',
    key: 'page4',
    icon: <TeamOutlined />,
    children: [
      // {
      //   label:'栏目4-01',
      //   key:'page401',
      //   icon:<FileOutlined />,
      //   children:[
      //      {
      //        label:'栏目4-01-01',
      //        key:'/page4/page40101',
      //      }
      //   ]
      // },
      {
        label: '栏目4-02',
        key: '/page4/page402'
      }
    ]
  },
  {
    label: '发现',
    key: 'discover',
    icon: <FileOutlined></FileOutlined>,
    children: [
      {
        label: '精品推荐',
        key: '/discover/recommend'
      }
    ]
  },
  {
    label: '测试demo',
    key: '/demo',
    icon: <FileOutlined />
  }
]
const MainMenu: React.FC = () => {
  // V6 的新写法
  const navigate = useNavigate()
  // 严格模式下开发环境会调用两次
  const currentRoute = useLocation()
  // 点击菜单
  const handleMenu = (e: { key: string }) => {
    navigate(e.key)
  }
  // 只展开一项
  let firestOpenKey = ''
  // 找到路由所在行的父级,
  const getParentNodeId = (tree: node[], key: string) => {
    // 遍历树节点
    for (const node of tree) {
      // 第一层(忽略)
      // 如果当前节点就是目标节点的父节点，直接返回当前节点key;
      // some用法：不改变原数组，不处理空数组,只要存在返回true，都不存在返回false
      if (node.children && node.children.some((child) => child.key === key)) {
        return node.key
      }
      // // 否则继续遍历当前节点的子节点
      if (node.children) {
        const parentId: string = getParentNodeId(node.children, key)
        if (parentId !== '') {
          return parentId
        }
      }
    }
    // 如果没有找到父节点，则返回null
    return ''
  }
  // console.log(getParentNodeId(items,currentRoute.pathname))
  // 仅适用于两层菜单
  firestOpenKey = getParentNodeId(items, currentRoute.pathname)
  // 展开项
  const [openKeys, setOpenkeys] = useState([firestOpenKey])
  const handleOpenChange = (keys: string[]) => {
    // 数组中只含有最后一项(只适用于两层菜单)
    const lastValue = keys.pop() || ''
    setOpenkeys([lastValue])
  }

  return (
    <Menu
      theme="dark"
      // 选中
      defaultSelectedKeys={[currentRoute.pathname]}
      mode="inline"
      items={items}
      onClick={handleMenu}
      // 展开关闭回调
      onOpenChange={handleOpenChange}
      // 展开项数组
      openKeys={openKeys}
    />
  )
}
export default MainMenu
