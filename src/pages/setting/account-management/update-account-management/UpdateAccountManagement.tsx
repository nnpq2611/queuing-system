import React, {useState} from 'react'
import { Row, Col } from 'antd'
import "./UpdateAccountManagement.css"
import {Space, Select, Input, Button} from 'antd'
import { ref, set } from "firebase/database";
import database from '../../../../firebase/FireBase';
import { useNavigate } from 'react-router-dom';

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

const UpdateAccountManagement = () => {
    const [account, setAccount] = React.useState<account[]>([])
    const [accout_show, setAccount_show] = React.useState<account[]>([])
    const starCountRef = ref(database, "account");
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate("/account_management");
    };
    
    const handleSave = () => {

    };

    return (
        <Row className='update-account-page'>
            <Col className="update-account">
                <div className='nav-acc'>
                    <h3 className='acc'>Cài đặt hệ thống &gt; </h3>
                    <h3 className='acc'>Quản lý tài khoản &gt; </h3>
                    <h3 className='update-acc'>Cập nhật tài khoản</h3>
                </div>
                <h2> Quản lý Tài khoản</h2>
                <div className='update-list'>
                    <h3>Thông tin tài khoản</h3>
                    <div className='update-list-dev'>
                        <div className='update-list__input'>
                            <div className='update-list__input1'>
                                <p>Họ tên</p>
                                <Input placeholder="Nhập mã thiết bị"/>
                            </div>
                            <div className='update-list__input1'>
                                <p>Số điện thoại</p>
                                <Input placeholder="Nhập tên thiết bị" />
                            </div>
                            <div className='update-list__input1' >
                                <p>Email</p>
                                <Input placeholder="Nhập địa chỉ IP" />
                            </div>
                            <div className='update-list__input1'>
                                <p>Vai trò</p>
                                <Space wrap>
                                    <Select        
                                        style={{ width: 500 }}
                                        defaultValue="Chọn vai trò"
                                        // onChange={handleChange}
                                        // value={active}
                                        options={[
                                        { value: 'Hoạt động', label: 'Hoạt động' },
                                        { value: 'Ngưng hoạt động', label: 'Ngưng hoạt động' },
                                        ]}
                                    />
                                </Space>
                            </div>
                            <h5>* Là trường thông tin bắt buộc</h5>
                        </div>
                        <div className='update-list__input-account'>                                     
                            <div className='update-list__input2'>
                                <p>Tên đăng nhập</p>
                                <Input placeholder="Nhập tài khoản" />
                            </div>
                            <div className='update-list__input2'>
                                <p>Mật khẩu</p>
                                <Input />
                            </div>
                            <div className='update-list__input2'>
                                <p>Nhập lại mật khẩu</p>
                                <Input />
                            </div>
                            <div className='update-list__input2'>
                                <p>Trạng thái</p>
                                <Space wrap>
                                    <Select
                                        style={{ width: 500 }}
                                        defaultValue="Chọn trạng thái"
                                        // onChange={handleChange}
                                        // value={active}
                                        options={[
                                            { value: 'Tất cả', label: 'Tất cả' },
                                            { value: 'Hoạt động', label: 'Hoạt động' },
                                            { value: 'Ngưng hoạt động', label: 'Ngưng hoạt động' },
                                        ]}
                                    />
                                </Space>
                            </div>
                        </div>
                    </div>                  
                </div>
                <div className='update-list__button'>
                    <Button className='update-list__button-cancel' onClick={handleCancel}>Hủy bỏ</Button>
                    <Button className='update-list__button-update-account' onClick={handleSave}>Thêm thiết bị</Button>
                </div>
            </Col>

        </Row>
    )
}

export default UpdateAccountManagement