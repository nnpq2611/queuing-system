import React, {useState, useEffect} from 'react'
import { Row, Col } from 'antd'
import './UpdateDevice.css'
import { useParams } from "react-router-dom";
import {Space, Select, Input, Button} from 'antd'
import { ref, get } from "firebase/database";
import database from '../../../firebase/FireBase';

interface device {
    Ma_thiet_bi: string;
    Ten_thiet_bi: string;
    Dia_chi_IP: string;
    Loai_thiet_bi: string;
    Ten_dang_nhap: string;
    Mat_khau: string;
    Dich_vu_su_dung: string;
    Trang_thai_hoat_dong: string;
    Trang_thai_ket_noi: string;
}

const UpdateDevice = () => {
    const [active, setActive] = React.useState('Nhập loại thiết bị');
    const [device, setDevice] = useState<device>();
    const { deviceId } = useParams();
    const starCountRef = ref(database, `device/${deviceId}`);

    const getDevice = () => {
        get(starCountRef)
          .then((snapshot: any) => {
            if (snapshot.exists()) {
              setDevice(snapshot.val());
              console.log(snapshot.val());
            } else {
              console.log("No data available");
            }
          })
          .catch((error: any) => {
            console.error(error);
          });
    };

    useEffect(() => {
        getDevice();
    }, []);

    const handleChange = (value: any) => {
        console.log(`selected ${value}`);
      }
    return (
        <Row className='update-device-page'>
            <Col className="update-device">
                <div className='nav-update'>
                    <h3 className='dev'>Thiết bị &gt; </h3>
                    <h3 className='dev'>Danh sách thiết bị &gt; </h3>
                    <h3 className='update-dev'>Cập nhật thiết bị</h3>
                </div>
                <h2> Quản lý thiết bị</h2>
                <div className='update-list'>
                    <h3>Thông tin thiết bị</h3>
                    <div className='update-list-dev'>
                        <div className='update-list__input'>
                            <div className='update-list__input-id'>
                                <p>Mã thiết bị</p>
                                <Input placeholder="Nhập mã thiết bị"/>
                            </div>
                            <div className='update-list__input-name'>
                                <p>Tên thiết bị</p>
                                <Input placeholder="Nhập tên thiết bị" />
                            </div>
                            <div className='update-list__input-name'>
                                <p>Địa chỉ IP</p>
                                <Input placeholder="Nhập địa chỉ IP" />
                            </div>
                        </div>
                        <div className='update-list__input-account'>
                            <div className='update-list__select-name'>
                                <p>Loại thiết bị</p>
                                <Space wrap>
                                    <Select 
                                        style={{ width: 500 }}      
                                        onChange={handleChange}
                                        value={active}
                                        options={[
                                        { value: 'Kiosk', label: 'Kiosk' },
                                        { value: 'Display counter', label: 'Display counter' },
                                        ]}
                                    />
                                </Space>
                            </div>
                            
                            <div className='update-list__input-user_name'>
                                <p>Tên đăng nhập</p>
                                <Input placeholder="Nhập tài khoản" />
                            </div>
                            <div className='update-list__input-password'>
                                <p>Mật khẩu</p>
                                <Input placeholder="Nhập mật khẩu" />
                            </div>
                        </div>
                    </div>
                    <div className='update-list__input-service'>
                        <p>Dịch vụ sử dụng</p>
                        <Input placeholder='Nhập dịch vụ sử dụng'></Input>
                    </div>
                    <h5>* Là trường thông tin bắt buộc</h5>
                </div>
                <div className='update-list__button'>
                    <Button className='update-list__button-cancel'>Hủy bỏ</Button>
                    <Button className='update-list__button-update-device'>Cập nhật</Button>
                </div>
            </Col>

        </Row>
    )
}

export default UpdateDevice