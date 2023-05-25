import React, {useState} from 'react'
import { Row, Col } from 'antd'
import "./AddAccountManagement.css"
import {Space, Select, Input, Button} from 'antd'
import path from 'path'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { ref, set } from "firebase/database";
import database from '../../../../firebase/FireBase';

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

const AddAccountManagement = () => {
    const [account, setAccount] = React.useState<account[]>([])
    const [accout_show, setAccount_show] = React.useState<account[]>([])
    const starCountRef = ref(database, "account");  

    return (
        <Row className='add-device-page'>
            <Col className="add-device">
                <div className='nav-add'>
                    <h3 className='dev'>Thiết bị &gt; </h3>
                    <h3 className='dev'>Danh sách thiết bị &gt; </h3>
                    <h3 className='add-dev'>Thêm thiết bị</h3>
                </div>
                <h2> Quản lý thiết bị</h2>
                <div className='add-list'>
                    <h3>Thông tin thiết bị</h3>
                    <div className='add-list-dev'>
                        <div className='add-list__input'>
                            <div className='add-list__input-id'>
                                <p>Mã thiết bị</p>
                                <Input placeholder="Nhập mã thiết bị"/>
                            </div>
                            <div className='add-list__input-name'>
                                <p>Tên thiết bị</p>
                                <Input placeholder="Nhập tên thiết bị" />
                            </div>
                            <div className='add-list__input-name' >
                                <p>Địa chỉ IP</p>
                                <Input placeholder="Nhập địa chỉ IP" />
                            </div>
                        </div>
                        <div className='add-list__input-account'>
                            <div className='add-list__select-name'>
                                <p>Loại thiết bị</p>
                                <Space wrap>
                                    <Select        
                                        style={{ width: 500 }}
                                        // onChange={handleChange}
                                        // value={active}
                                        options={[
                                        { value: 'Hoạt động', label: 'Hoạt động' },
                                        { value: 'Ngưng hoạt động', label: 'Ngưng hoạt động' },
                                        ]}
                                    />
                                </Space>
                            </div>
                            
                            <div className='add-list__input-user_name'>
                                <p>Tên đăng nhập</p>
                                <Input placeholder="Nhập tài khoản" />
                            </div>
                            <div className='add-list__input-password'>
                                <p>Mật khẩu</p>
                                <Input placeholder="Nhập mật khẩu"/>
                            </div>
                        </div>
                    </div>
                    <div className='add-list__input-service'>
                        <p>Dịch vụ sử dụng</p>
                        <Input placeholder='Nhập dịch vụ sử dụng'></Input>
                    </div>
                    <h5>* Là trường thông tin bắt buộc</h5>
                </div>
                <div className='add-list__button'>
                    <Button className='add-list__button-cancel'>Hủy bỏ</Button>
                    <Button className='add-list__button-add-device'>Thêm thiết bị</Button>
                </div>
            </Col>

        </Row>
    )
}

export default AddAccountManagement