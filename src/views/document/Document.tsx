import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { items as defaultMenus, type MenuItem } from '@/assets/data/menu.js'
import { useAppSelector } from '@/reduxjsToolkitStore/store.js'
import styles from './Document.module.scss'

export default function Document() {
  const location = useLocation()
  
  // 获取菜单列表
  const storeMenus = useAppSelector((state) => state.user.menus)
  const menus = storeMenus.length > 0 ? storeMenus : defaultMenus
  
  // 根据路由路径查找对应的菜单项，获取实际要展示的URL
  const targetUrl = useMemo(() => {
    const findMenuItemByPath = (items: MenuItem[], path: string): MenuItem | null => {
      for (const item of items) {
        if (item.key === path) {
          return item
        }
        if (item.children) {
          const found = findMenuItemByPath(item.children, path)
          if (found) return found
        }
      }
      return null
    }
    
    const menuItem = findMenuItemByPath(menus as MenuItem[], location.pathname)
    return menuItem?.url || ''
  }, [location.pathname, menus])
  
  if (!targetUrl) {
    return (
      <div className={styles.error}>
        <p>未找到要展示的链接</p>
      </div>
    )
  }
  
  return (
    <div className={styles.container}>
      <iframe 
        src={targetUrl} 
        className={styles.iframe}
        title="文档预览"
        allow="fullscreen"
      />
    </div>
  )
}
