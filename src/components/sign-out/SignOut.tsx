import React from 'react'
import './SignOut.css'
import { Button } from 'antd'
import { LogoutOutlined } from '@ant-design/icons';

const SignOut = () => {
  return (
    <div className='sign-out'>
        <Button><LogoutOutlined />Đăng xuất</Button>
    </div>
  )
}

export default SignOut