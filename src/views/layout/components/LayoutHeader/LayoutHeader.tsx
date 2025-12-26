import Styles from './LayoutHeader.module.scss'
import { Breadcrumb, Dropdown, Avatar, Space } from 'antd'
import type { MenuProps } from 'antd'
import { UserOutlined, SettingOutlined } from '@ant-design/icons'
import { removeMenus } from '@/reduxjsToolkitStore/modules/user/userSlice.js'
import { useAppSelector, useAppDispatch } from '@/reduxjsToolkitStore/store.js'
import { useLocation } from 'react-router-dom'
import { findNameByPath } from '@/utils/index.js'
import { items as defaultMenus, type MenuItem } from '@/assets/data/menu.js'
import { useState, useEffect } from 'react'
const LayoutHeader = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const storeMenus = useAppSelector((state) => state.user.menus)
  const [resetMemus, setResetMemus] = useState<{ title: string }[]>([])
  
  useEffect(() => {
    // 获取菜单数据：优先使用 store，其次 sessionStorage，最后使用默认菜单
    let menuList: MenuItem[] = []
    if (storeMenus.length > 0) {
      menuList = storeMenus as MenuItem[]
    } else {
      const storedMenus = sessionStorage.getItem('menus')
      if (storedMenus) {
        try {
          menuList = JSON.parse(storedMenus) as MenuItem[]
        } catch (e) {
          console.error('解析菜单数据失败:', e)
          menuList = defaultMenus
        }
      } else {
        menuList = defaultMenus
      }
    }
    
    // 根据当前路径查找菜单路径
    const checkMenus = findNameByPath<MenuItem>(menuList, location.pathname)
    const _resetMenus = checkMenus.map((item) => {
      return {
        title: item.label
      }
    })
    setResetMemus(_resetMenus)
  }, [storeMenus, location.pathname])
  //   console.log('-----匹配到菜单----', checkMenus)
  // const resetMemus = checkMenus.map((item) => {
  //   return {
  //     title: item.label
  //     //   href: item.key
  //   }
  // })
  //   console.log('',resetMemus)
  const list: MenuProps['items'] = [
    {
      key: '1',
      label: '退出登录'
    },
    {
      key: '2',
      label: '设置',
      icon: <SettingOutlined />
    }
  ]
  const handleClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '1') {
      console.log('退出登录')
      dispatch(removeMenus())
      window.location.reload()
      //   removeMenus
    } else if (key === '2') {
      console.log('跳转到设置页面')
    }
  }
  return (
    <div className={Styles.headerBox}>
      <div>
        <Breadcrumb style={{ lineHeight: '64px' }} items={resetMemus}>
          {/* <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
        </Breadcrumb>
      </div>
      <div className={Styles.headerTitle}>xxx管理系统</div>
      <div>
        <Dropdown menu={{ items: list, onClick: handleClick }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar size={24} icon={<UserOutlined />}></Avatar>
              <p>admin</p>
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  )
}

export default LayoutHeader
