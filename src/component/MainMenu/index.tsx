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
  let { menus } = useAppSelector((state) => ({
    menus:
      state.user.menus.length > 0
        ? (state.user.menus as MenuItem[])
        : (JSON.parse(
            sessionStorage.getItem('menus') || '[]'
          ) as MenuItem[])
  }))
  const menuList = menus && menus.length > 0 ? menus : defaultMenus
  const renderedMenus = useMemo(() => attachIcons(menuList), [menuList])
  // menus?.map((item: any) => (item.icon = <UserOutlined />))
  // V6 的新写法
  const navigate = useNavigate()
  // 严格模式下开发环境会调用两次
  const currentRoute = useLocation()
  // 点击菜单
  const handleMenu = (e: { key: string }) => {
    // 判断是否为外部链接（以 http:// 或 https:// 开头）
    if (e.key.startsWith('http://') || e.key.startsWith('https://')) {
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
