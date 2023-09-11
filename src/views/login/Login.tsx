
import { Button, Divider,Input,Space } from 'antd'
import { ChangeEvent, useState } from 'react'
import styles from './Login.module.scss'
// import hello from './login.module.less'

export default function Login() {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [code,setCode]=useState('')

  // change事件
  const usernameChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setUsername(e.target.value)
  }
  const passwordChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setPassword(e.target.value)
  }
  const codeChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setCode(e.target.value)
  }
  const goToLogin=()=>{
    console.log('用户名：'+username,'密码：'+password,'验证码：'+code)
  }
  return (
    <div className={styles.loginPage}>
        <div className={styles.lgoinBox}>
            <Divider  className={styles.titleDivider}>xxx管理系统</Divider>
            <div>
              <Space direction="vertical" size="middle" style={{ display: 'flex' }} className={styles.inputStyle}>
                <Input placeholder="用户名" onChange={usernameChange}/>
                <Input.Password placeholder="密码"  onChange={passwordChange}/>
                <div className={styles.loginCode}>
                  <Input placeholder="验证码" onChange={codeChange} />
                  <img className={styles.loginCodeImg} src='https://bpic.588ku.com/element_origin_min_pic/01/37/32/26573c46f211bc8.jpg'/>
                </div>
                <Button type='primary' block onClick={goToLogin}>登录</Button>
              </Space>
            </div>
        </div>
    </div>
  )
}
