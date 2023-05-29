import React, {useState} from 'react'
import './UserName.css'
import { Col, Row, Input } from "antd";
import UpLoad from '../../components/upload/UpLoad';
import { ref, get } from "firebase/database";
import database from '../../firebase/FireBase';

interface account{
  Ho_ten: string,
  So_dien_thoai: string,
  Email: string,
  Ten_vai_tro: string,
  Ten_dang_nhap: string,
  Mat_khau: string,
  Nhap_lai_mat_khau: string,
  Trang_thai: boolean,
}

const UserName = (item:any) => {
  const [account, setAccount] = React.useState<account[]>([])
  const [accout_show, setAccount_show] = React.useState<account[]>([])
  const starCountRef = ref(database, "account");  
  
  React.useEffect(() => {
      get(starCountRef)
      .then((snapshot: any) => {
          if (snapshot.exists()) {
          setAccount(snapshot.val());
          setAccount_show(snapshot.val());
          } else {
          console.log("No data available");
          }
      })
      .catch((error: any) => {
          console.error(error);
      });
  }, []);

  return (
    <Row>
      <Col span={24} className="user-name-page">
        <h3>Thông tin cá nhân</h3>
        <div className='user-name'>
          <div className='avata'>
            <UpLoad />
            <h2>{item.Ho_ten}</h2>
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