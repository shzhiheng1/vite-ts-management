import Styles from './LayoutHeader.module.scss'
import { Breadcrumb, Dropdown, Avatar, Space } from 'antd'
import type { MenuProps } from 'antd'
import { UserOutlined, SettingOutlined } from '@ant-design/icons'
import { removeMenus } from '@/reduxjsToolkitStore/modules/user/userSlice.js'
import { useAppSelector, useAppDispatch } from '@/reduxjsToolkitStore/store.js'
import { useLocation } from 'react-router-dom'
import { findNameByPath } from '@/utils/index.js'
import { useState, useEffect } from 'react'
const LayoutHeader = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const storeMenus = useAppSelector((state) => state.user.menus)
  const menus =
    storeMenus.length > 0 ? storeMenus : sessionStorage.getItem('menus') || ''
  const [resetMemus, setResetMemus] = useState<{ title: string }[]>([])
  useEffect(() => {
    if (menus || menus.length > 0) {
      const checkMenus = findNameByPath(
        typeof menus === 'string' ? JSON.parse(menus) : menus,
        location.pathname
      )
      const _resetMenus = checkMenus.map((item) => {
        return {
          title: item.label
        }
      })
      setResetMemus(_resetMenus)
    } else {
      console.log('--menus没有值---')
    }
  }, [menus, location])
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
