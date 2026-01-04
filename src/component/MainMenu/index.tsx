/************菜单组件************/
import React, { useEffect, useMemo, useState } from 'react'
import { Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/reduxjsToolkitStore/store.js'
import { findNameByPath } from '@/utils/index.js'
import { items as defaultMenus, type IconKey, type MenuItem } from '@/assets/data/menu.js'

import {
  DesktopOutlined,
  FileOutlined,
  // PieChartOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons'

import type { MenuProps } from 'antd';

const iconMap: Record<IconKey, React.ReactNode> = {
  DesktopOutlined: <DesktopOutlined />,
  UserOutlined: <UserOutlined />,
  TeamOutlined: <TeamOutlined />,
  FileOutlined: <FileOutlined />
}

const attachIcons = (data: MenuItem[]): MenuProps['items'] =>
  data.map(({ icon, children, ...rest }) => ({
    ...rest,
    icon: icon ? iconMap[icon] : undefined,
    children: children ? (attachIcons(children) as any) : undefined
  })) as MenuProps['items']
const MainMenu: React.FC = () => {
  const { menus: storeMenus } = useAppSelector((state) => ({
    menus: state.user.menus
  }))
  
  // 安全地获取菜单数据：优先使用 store，其次从 sessionStorage 读取
  let menus: MenuItem[] = []
  
  if (storeMenus && storeMenus.length > 0) {
    menus = storeMenus as MenuItem[]
  } else {
    // 如果 store 中没有，尝试从 sessionStorage 读取
    try {
      const storedMenus = sessionStorage.getItem('menus')
      if (storedMenus) {
        const parsed = JSON.parse(storedMenus) as MenuItem[]
        if (Array.isArray(parsed) && parsed.length > 0) {
          menus = parsed
        }
      }
    } catch (error) {
      console.error('解析菜单数据失败:', error)
      // 清除损坏的数据
      sessionStorage.removeItem('menus')
    }
  }
  
  const menuList = menus && menus.length > 0 ? menus : defaultMenus
  const renderedMenus = useMemo(() => attachIcons(menuList), [menuList])
  // menus?.map((item: any) => (item.icon = <UserOutlined />))
  // V6 的新写法
  const navigate = useNavigate()
  // 严格模式下开发环境会调用两次
  const currentRoute = useLocation()
  // 点击菜单
  const handleMenu = (e: { key: string }) => {
    // 从菜单列表中查找对应的菜单项，获取 isinlink 属性
    const findMenuItem = (items: MenuItem[], key: string): MenuItem | null => {
      for (const item of items) {
        if (item.key === key) {
          return item
        }
        if (item.children) {
          const found = findMenuItem(item.children, key)
          if (found) return found
        }
      }
      return null
    }
    
    const menuItem = findMenuItem(menuList, e.key)
    
    // 判断是否为内嵌链接
    if (menuItem?.isinlink) {
      // 使用菜单项的 key 作为路由参数（key 应该是 /document/xxx 格式）
      navigate(e.key)
    } else if (e.key.startsWith('http://') || e.key.startsWith('https://')) {
      // 在新标签页打开外部链接
      window.open(e.key, '_blank')
    } else {
      // 内部路由跳转
      navigate(e.key)
    }
  }
  // 展开项
  const [openKeys, setOpenkeys] = useState<string[]>([])

  // 根据当前路径展开全部父级，支持多级菜单
  useEffect(() => {
    // console.log('---调用--currentRoute.pathname',currentRoute.pathname)
    // console.log('---调用--currentRoute.pathname',menuList)
    const matchedPath = findNameByPath<MenuItem>(menuList, currentRoute.pathname)
    const parentKeys = matchedPath.slice(0, -1).map((item) => item.key)
    setOpenkeys(parentKeys)
  }, [])
  const handleOpenChange = (keys: string[]) => {
    setOpenkeys(keys)
  }

  return (
    <Menu
      theme="dark"
      // 选中
      selectedKeys={[currentRoute.pathname]}
      mode="inline"
      // items={items}
      items={renderedMenus}
      onClick={handleMenu}
      // 展开关闭回调
      onOpenChange={handleOpenChange}
      // 展开项数组
      openKeys={openKeys}
    />
  )
}
export default MainMenu
