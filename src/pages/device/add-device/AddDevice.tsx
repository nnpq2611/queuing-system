import React, {useState} from 'react'
import { Row, Col } from 'antd'
import './AddDevice.css'
import {Space, Select, Input, Button} from 'antd'
import path from 'path'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { ref, set } from "firebase/database";
import database from '../../../firebase/FireBase';

interface device {
    Ma_thiet_bi: string,
    Ten_thiet_bi: string,
    Dia_chi_IP: string,
    Loai_thiet_bi: string;
    Ten_dang_nhap: string;
    Mat_khau: string;
    Dich_vu_su_dung: string;
    Trang_thai_hoat_dong: string;
    Trang_thai_ket_noi: string;
}

const AddDevice = () => {
    const [active, setActive] = React.useState('Nhập loại thiết bị');
    const [ma_thiet_bi, setMaThietBi] = useState('KIO_01');
    const [ten_thiet_bi, setTenThietBi] = useState('Kiosk');
    const [hoat_dong, setHoatDong] = useState("Hoạt động");
    const [ket_noi, setKetNoi] = useState("Kết nối");
    const [ten_dang_nhap, setTenDangNhap] = useState<any>();
    const [mat_khau, setMatKhau] = useState<any>();
    const [dich_vu_su_dung, setDichVuSuDung] = useState<any>();
    const [device, setDevice] = useState<device[]>([]);
    const [device_show, setDevice_show] = useState<device[]>([]);
    const starCountRef = ref(database, "device");
    const [history, setHistory] = useState<any>([]);
    

    const handleChange = (value: string) => {
        setTenThietBi(value);
    }

    const handleCancel = () => {
        history.push('/device');
    };


    const handleSave = () => {
        // let thiet_bi = {
        //     "Ma_thiet_bi": `${ma_thiet_bi}`,
        //     "Ten_thiet_bi": `${ten_thiet_bi}`,
        //     "Dia_chi_IP": `${Array.from({length: 4}, () => Math.floor(Math.random() * 256)).join('.')}`,
        //     "Trang_thai_hoat_dong": `${hoat_dong}`,
        //     "Trang_thai_ket_noi": `${ket_noi}`,
        //     "Loai_thiet_bi": `${ten_thiet_bi}`,
        //     "Ten_dang_nhap":`${ten_dang_nhap}`,
        //     "Mat_khau":`${mat_khau}`,
        //     "Dich_vu_su_dung": `${dich_vu_su_dung}`          
        // };  
        // setDevice([...device, thiet_bi]);
        // setDevice_show([...device, thiet_bi]);
        // set(starCountRef,[...device, thiet_bi]);       
    };

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
                                <Input placeholder="Nhập mã thiết bị" onChange={(e) => setMaThietBi(e.target.value)}/>
                            </div>
                            <div className='add-list__input-name'>
                                <p>Tên thiết bị</p>
                                <Input placeholder="Nhập tên thiết bị" onChange={(e) => setTenThietBi(e.target.value)} />
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
                                        onChange={handleChange}
                                        value={active}
                                        options={[
                                        { value: 'Hoạt động', label: 'Hoạt động' },
                                        { value: 'Ngưng hoạt động', label: 'Ngưng hoạt động' },
                                        ]}
                                    />
                                </Space>
                            </div>
                            
                            <div className='add-list__input-user_name'>
                                <p>Tên đăng nhập</p>
                                <Input placeholder="Nhập tài khoản" onChange={(e) => setTenDangNhap(e.target.value)}/>
                            </div>
                            <div className='add-list__input-password'>
                                <p>Mật khẩu</p>
                                <Input placeholder="Nhập mật khẩu" onChange={(e) => setMatKhau(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className='add-list__input-service'>
                        <p>Dịch vụ sử dụng</p>
                        <Input placeholder='Nhập dịch vụ sử dụng' onChange={(e) => setDichVuSuDung(e.target.value)}></Input>
                    </div>
                    <h5>* Là trường thông tin bắt buộc</h5>
                </div>
                <div className='add-list__button'>
                    <Button className='add-list__button-cancel' onClick={handleCancel}>Hủy bỏ</Button>
                    <Button className='add-list__button-add-device' onClick={handleSave}>Thêm thiết bị</Button>
                </div>
            </Col>

        </Row>
    )
}

export default AddDevice