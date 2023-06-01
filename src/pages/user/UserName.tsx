import React, {useState, useEffect} from 'react'
import './UserName.css'
import { Col, Row, Input } from "antd";
import img from '../../assets/img/avatar-def.jpg'


interface account{
  Ho_ten: string,
  So_dien_thoai: string,
  Email: string,
  Ten_vai_tro: string,
  Ten_dang_nhap: string,
  Mat_khau: string,
  Trang_thai: boolean,
}

const UserName = () => {
  const [account, setAccount] = useState<account>();

  useEffect(() => {
    const account = localStorage.getItem("account");
    if (account) {
      setAccount(JSON.parse(account));
    }
  }, []);

  return (
    <Row>
      <Col span={24} className="user-name-page">
        <h3>Thông tin cá nhân</h3>
        <div className='user-name'>
          <div className='avata'>
            <img src={img} alt='' style={{width: "250px", height: "250px", objectFit: "cover", borderRadius: "50%"}}/>
            <h2>{account?.Ho_ten}</h2>
          </div>
          <div className='name-phone-mail'>
            <h4>Tên người dùng</h4>
            <Input disabled value={account?.Ho_ten} />
            <h4>Số điện thoại</h4>
            <Input disabled value={account?.So_dien_thoai}/>
            <h4>Email</h4>
            <Input disabled value={account?.Email}/>
          </div>
          <div className='account'>
            <h4>Tên đăng nhập</h4>
            <Input disabled value={account?.Ten_dang_nhap} />
            <h4>Mật khẩu</h4>
            <Input disabled value={account?.Mat_khau} />
            <h4>Vai trò</h4>
            <Input disabled value={account?.Ten_vai_tro} />
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default UserName