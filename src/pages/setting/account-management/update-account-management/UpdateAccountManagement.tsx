import React, {useState, useEffect} from 'react'
import { Row, Col } from 'antd'
import "./UpdateAccountManagement.css"
import {Space, Select, Input, Button} from 'antd'
import { ref, set, get } from "firebase/database";
import database from '../../../../firebase/FireBase';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

interface account{
    Ho_ten: string,
    So_dien_thoai: string,
    Email: string,
    Vai_tro: string,
    Ten_dang_nhap: string,
    Mat_khau: string,
    Nhap_lai_mat_khau: string,
    Trang_thai: boolean,
}

const UpdateAccountManagement = () => {
    const [ho_ten, setHoTen] = useState("");
    const [so_dien_thoai, setSoDienThoai] = useState("");
    const [email, setEmail] = useState("");
    const [Vai_tro, setTenVaiTro] = useState("");
    const [ten_dang_nhap, setTenDangNhap] = useState("");
    const [mat_khau, setMatKhau] = useState("");
    const [nhap_lai_mat_khau, setNhapLaiMatKhau] = useState("");
    const [trang_thai, setTrangThai] = useState<boolean | string>();
    const [account, setAccount] = React.useState<account[]>([])
    const { accountId } = useParams();
    const starCountRef = ref(database, `account/${accountId}`);
    const navigate = useNavigate();

    const getAccount = () => {
        get(starCountRef)
          .then((snapshot: any) => {
            if (snapshot.exists()) {
              setAccount(snapshot.val());
              setHoTen(snapshot.val().Ho_ten);
              setSoDienThoai(snapshot.val().So_dien_thoai);
              setEmail(snapshot.val().Email);
              setTenVaiTro(snapshot.val().Vai_tro);
              setTenDangNhap(snapshot.val().Ten_dang_nhap);
              setMatKhau(snapshot.val().Mat_khau);
              setTrangThai(snapshot.val().Trang_thai);
            } else {
              console.log("No data available");
            }
          })
          .catch((error: any) => {
            console.error(error);
          });
    };

    useEffect(() => {
        getAccount();
    }, []);
    

    const handleCancel = () => {
        navigate("/account_management");
    };
    
    const handleSave = () => {
        let taikhoan = {
            ...account,
            Ho_ten: ho_ten,
            So_dien_thoai: so_dien_thoai,
            Email: email,
            Vai_tro: Vai_tro,
            Ten_dang_nhap: ten_dang_nhap,
            Mat_khau: mat_khau,
            Nhap_lai_mat_khau: nhap_lai_mat_khau,
            Trang_thai: trang_thai,
        };
        set(starCountRef, taikhoan).then(() => {
            navigate("/account_management");
        });

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
                                <Input 
                                    value={ho_ten}
                                    placeholder="Nhập họ tên"
                                    onChange={(e) => {setHoTen(e.target.value)}}                                                                    
                                />
                            </div>
                            <div className='update-list__input1'>
                                <p>Số điện thoại</p>
                                <Input 
                                    value={so_dien_thoai}
                                    placeholder="Nhập số điện thoại" 
                                    onChange={(e) => {setSoDienThoai(e.target.value)}}
                                />
                            </div>
                            <div className='update-list__input1' >
                                <p>Email</p>
                                <Input 
                                    value={email}
                                    placeholder="Nhập email"
                                    onChange={(e) => {setEmail(e.target.value)}}
                                 />
                            </div>
                            <div className='update-list__input1'>
                                <p>Vai trò</p>
                                <Space wrap>
                                    <Select        
                                        style={{ width: 500 }}
                                        defaultValue="Chọn vai trò"
                                        onChange={(value) => {
                                            setTenVaiTro(value);
                                        }}
                                        value={Vai_tro}
                                        options={[
                                            { value: "Admin", label: "Admin"},
                                            { value: "Quản trị viên", label: "Quản trị viên" },
                                            { value: "Nhân viên", label: "Nhân viên" },
                                            { value: "Quản lý", label: "Quản lý"},
                                            { value: "Kế toán", label: "Kế toán"}
                                        ]}
                                    />
                                </Space>
                            </div>
                            <h5>* Là trường thông tin bắt buộc</h5>
                        </div>
                        <div className='update-list__input-account'>                                     
                            <div className='update-list__input2'>
                                <p>Tên đăng nhập</p>
                                <Input 
                                    value={ten_dang_nhap}
                                    placeholder="Nhập tên đăng nhập"
                                    onChange={(e) => {setTenDangNhap(e.target.value)}}
                                />
                            </div>
                            <div className='update-list__input2'>
                                <p>Mật khẩu</p>
                                <Input.Password 
                                    value={mat_khau}
                                    placeholder="Nhập mật khẩu"
                                    onChange={(e) => {setMatKhau(e.target.value)}}                                
                                />
                            </div>
                            <div className='update-list__input2'>
                                <p>Nhập lại mật khẩu</p>
                                <Input.Password 
                                    value={mat_khau}
                                    placeholder="Nhập lại mật khẩu"
                                    onChange={(e) => {setNhapLaiMatKhau(e.target.value)}}
                                />
                                {nhap_lai_mat_khau && nhap_lai_mat_khau !== mat_khau && (
                                <span
                                    style={{
                                    color: "red",
                                    fontSize: "15px",
                                    fontWeight: "400",
                                    }}
                                >
                                    Pass word không khớp !!!
                                </span>
                                )}
                            </div>
                            <div className='update-list__input2'>
                                <p>Trạng thái</p>
                                <Space wrap>
                                    <Select
                                        style={{ width: 500 }}
                                        defaultValue="Chọn trạng thái"
                                        onChange={(value) => {
                                            setTrangThai(value);
                                        }}
                                        value={trang_thai}
                                        options={[
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
                    <Button className='update-list__button-update-account' onClick={handleSave}>Cập nhật</Button>
                </div>
            </Col>

        </Row>
    )
}

export default UpdateAccountManagement