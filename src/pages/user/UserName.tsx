import React from 'react'
import './UserName.css'
import { Col, Row, Input } from "antd";
import UpLoad from '../../components/upload/UpLoad';

const UserName = () => {
  return (
    <Row>
      <Col span={24} className="user-name-page">
        <h3>Thông tin cá nhân</h3>
        <div className='user-name'>
          <div className='avata'>
            <UpLoad />
            <h2>Nguyễn Thị Thùy Dung</h2>
          </div>
          <div className='name-phone-mail'>
            <h4>Tên người dùng</h4>
            <Input />
            <h4>Số điện thoại</h4>
            <Input />
            <h4>Email</h4>
            <Input />
          </div>
          <div className='account'>
            <h4>Tên đăng nhập</h4>
            <Input />
            <h4>Mật khẩu</h4>
            <Input />
            <h4>Vai trò</h4>
            <Input />
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default UserName