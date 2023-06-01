import React from 'react'
import './SignOut.css'
import { Button } from 'antd'
import { LogoutOutlined } from '@ant-design/icons';

const SignOut = () => {
  const handleLogout = () => {
    localStorage.removeItem('account')
    window.location.href = '/sign-in'
  }
  return (
    <div className='sign-out'>
        <Button onClick={handleLogout}><LogoutOutlined />Đăng xuất</Button>
    </div>
  )
}

export default SignOut