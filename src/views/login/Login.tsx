import { Button, Divider, Input, Space, message } from 'antd'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.scss'
// import hello from './login.module.less'
import { useDispatch } from 'react-redux'
import { getAsyncMenus } from '@/reduxjsToolkitStore/modules/user/userSlice.js'

export default function Login() {
  const navigateTo = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')

  const dispatch = useDispatch()
  // change事件
  const usernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }
  const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const codeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  }
  const goToLogin = () => {
    if (!username.trim() || !password.trim() || !code.trim()) {
      return message.warning('请把信息填写完整！')
    }
    // 存储token并跳转到page1
    // localStorage.setItem('vite-ts-management-token', '123456789')
    sessionStorage.setItem('vite-ts-management-token', '123456789')
    // 获取菜单
    dispatch(getAsyncMenus({ loginType: username }))
    // 回到首页
    navigateTo('/')
  }
  return (
    <div className={styles.loginPage}>
      <div className={styles.lgoinBox}>
        <Divider className={styles.titleDivider}>xxx管理系统</Divider>
        <div>
          <Space
            direction="vertical"
            size="middle"
            style={{ display: 'flex' }}
            className={styles.inputStyle}
          >
            <Input placeholder="用户名" onChange={usernameChange} />
            <Input.Password placeholder="密码" onChange={passwordChange} />
            <div className={styles.loginCode}>
              <Input placeholder="验证码" onChange={codeChange} />
              <img
                className={styles.loginCodeImg}
                src="https://bpic.588ku.com/element_origin_min_pic/01/37/32/26573c46f211bc8.jpg"
              />
            </div>
            <Button type="primary" block onClick={goToLogin}>
              登录
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}
