import React, {useState} from 'react'
import { Row, Col } from 'antd'
import "./AddAccountManagement.css"
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

const AddAccountManagement = () => {
    const [ho_ten, setHoTen] = useState("")
    const [so_dien_thoai, setSoDienThoai] = useState("")
    const [email, setEmail] = useState("")
    const [ten_vai_tro, setTenVaiTro] = useState("")
    const [ten_dang_nhap, setTenDangNhap] = useState("")
    const [mat_khau, setMatKhau] = useState("")
    const [nhap_lai_mat_khau, setNhapLaiMatKhau] = useState("")
    const [trang_thai, setTrangThai] = useState(false)
    const [account, setAccount] = React.useState<account[]>([]);
    const starCountRef = ref(database, "account");  
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate("/account_management");
    };  

    const checkNull = () => {
        return (
            ho_ten === "" ||
            so_dien_thoai === "" ||
            email === "" ||
            ten_vai_tro === "" ||
            ten_dang_nhap === "" ||            
            mat_khau === "" ||
            nhap_lai_mat_khau === "" ||
            trang_thai === false
        );
    };
    
    const handleSave = () => {
        if (checkNull()) {
          alert("Nhập thiếu thông tin!!!");
          return;
        }
        let tai_khoan = {
            Ho_ten: `${ho_ten}`,
            So_dien_thoai: `${so_dien_thoai}`,
            Email: `${email}`,
            Ten_vai_tro: `${ten_vai_tro}`,
            Ten_dang_nhap: `${ten_dang_nhap}`,
            Mat_khau: `${mat_khau}`,
            Nhap_lai_mat_khau: `${nhap_lai_mat_khau}`,
            Trang_thai: `${trang_thai}`,          
        };
    
        setAccount([...account, ]);
        set(starCountRef, [...account, tai_khoan]).then(() => navigate("/account_management"))
    };

    return (
        <Row className='add-account-page'>
            <Col className="add-account">
                <div className='nav-acc'>
                    <h3 className='acc'>Cài đặt hệ thống &gt; </h3>
                    <h3 className='acc'>Quản lý tài khoản &gt; </h3>
                    <h3 className='add-acc'>Thêm tài khoản</h3>
                </div>
                <h2> Quản lý tài khoản</h2>
                <div className='add-list'>
                    <h3>Thông tin tài khoản</h3>
                    <div className='add-list-dev'>
                        <div className='add-list__input'>
                            <div className='add-list__input1'>
                                <p>Họ tên</p>
                                <Input 
                                    placeholder="Nhập họ tên"
                                    onChange={(e) => {setHoTen(e.target.value)}}
                                />
                            </div>
                            <div className='add-list__input1'>
                                <p>Số điện thoại</p>
                                <Input 
                                    placeholder="Nhập họ tên" 
                                    onChange={(e) => {setSoDienThoai(e.target.value)}}
                                />
                            </div>
                            <div className='add-list__input1' >
                                <p>Email</p>
                                <Input 
                                    placeholder="Nhập email"
                                    onChange={(e) => {setEmail(e.target.value)}}
                                />
                            </div>
                            <div className='add-list__input1'>
                                <p>Vai trò</p>
                                <Space wrap>
                                    <Select        
                                        style={{ width: 500 }}
                                        defaultValue="Chọn vai trò"                              
                                        onChange={(value) => {
                                            setTenVaiTro(value);
                                        }}                                                              
                                        options={[
                                        { value: 'Hoạt động', label: 'Hoạt động' },
                                        { value: 'Ngưng hoạt động', label: 'Ngưng hoạt động' },
                                        ]}
                                    />
                                </Space>
                            </div>
                            <h5>* Là trường thông tin bắt buộc</h5>
                        </div>
                        <div className='add-list__input-account'>                                     
                            <div className='add-list__input2'>
                                <p>Tên đăng nhập</p>
                                <Input 
                                    placeholder="Nhập tên đăng nhập" 
                                    onChange={(e) => {setTenDangNhap(e.target.value)}}
                                />
                            </div>
                            <div className='add-list__input2'>
                                <p>Mật khẩu</p>
                                <Input 
                                    placeholder='Nhập mật khẩu' 
                                    onChange={(e) => {setMatKhau(e.target.value)}}
                                />
                            </div>
                            <div className='add-list__input2'>
                                <p>Nhập lại mật khẩu</p>
                                <Input 
                                    placeholder='Nhập lại mật khẩu'
                                    onChange={(e) => {setNhapLaiMatKhau(e.target.value)}}
                                />
                            </div>
                            <div className='add-list__input2'>
                                <p>Trạng thái</p>
                                <Space wrap>
                                    <Select
                                        style={{ width: 500 }}
                                        defaultValue="Chọn trạng thái"                                        
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
                <div className='add-list__button'>
                    <Button className='add-list__button-cancel' onClick={handleCancel}>Hủy bỏ</Button>
                    <Button className='add-list__button-add-account' onClick={handleSave}>Thêm thiết bị</Button>
                </div>
            </Col>

        </Row>
    )
}

export default AddAccountManagement