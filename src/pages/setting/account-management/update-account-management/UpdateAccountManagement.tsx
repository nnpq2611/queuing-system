import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import "./UpdateAccountManagement.css";
import { Space, Select, Input, Button } from "antd";
import { ref, set, get } from "firebase/database";

import database from "../../../../firebase/FireBase";
import { useNavigate, useParams } from "react-router-dom";

interface account {
  Ho_ten: string;
  So_dien_thoai: string;
  Email: string;
  Ten_vai_tro: string;
  Ten_dang_nhap: string;
  Mat_khau: string;
  Trang_thai: boolean;
}

const UpdateAccountManagement = () => {
  const [ho_ten, setHoTen] = useState("");
  const [so_dien_thoai, setSoDienThoai] = useState("");
  const [email, setEmail] = useState("");
  const [ten_vai_tro, setTenVaiTro] = useState("");
  const [ten_dang_nhap, setTenDangNhap] = useState("");
  const [mat_khau, setMatKhau] = useState("");
  const [nhap_lai_mat_khau, setNhapLaiMatKhau] = useState("");
  const [trang_thai, setTrangThai] = useState<boolean | undefined | string>(
    undefined
  );
  const [account, setAccount] = React.useState<account>();
  const [role_account, setRole] = React.useState<
    { label: string; value: string }[]
  >([]);
  const { accountId } = useParams();
  const starCountRef = ref(database, `account/${accountId}`);
  const starCountRefRole = ref(database, "role");
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
      nhap_lai_mat_khau !== mat_khau ||
      trang_thai === undefined
    );
  };

  const getAccount = () => {
    get(starCountRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setAccount(data);
        setHoTen(data.Ho_ten);
        setSoDienThoai(data.So_dien_thoai);
        setEmail(data.Email);
        setTenVaiTro(data.Ten_vai_tro);
        setTenDangNhap(data.Ten_dang_nhap);
        setTrangThai(data.Trang_thai);
      } else {
        console.log("No data available");
      }
    });
  };

  const getRole = () => {
    get(starCountRefRole).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        data.map((item: any) => {
          setRole([
            ...role_account,
            { label: item.Ten_vai_tro, value: item.Ten_vai_tro },
          ]);
        });
      } else {
        console.log("No data available");
      }
    });
  };

  const handleSave = () => {
    if (checkNull()) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    const data = {
      Ho_ten: ho_ten,
      So_dien_thoai: so_dien_thoai,
      Email: email,
      Ten_vai_tro: ten_vai_tro,
      Ten_dang_nhap: ten_dang_nhap,
      Mat_khau: mat_khau === "" ? account?.Mat_khau : mat_khau,
      Trang_thai: trang_thai,
    };
    set(ref(database, `account/${accountId}`), data);
    navigate("/account_management");
  };

  useEffect(() => {
    getAccount();
    getRole();
  }, []);

  return (
    <Row className="update-account-page">
      <Col className="update-account">
        <div className="nav-acc">
          <h3 className="acc">Cài đặt hệ thống &gt; </h3>
          <h3 className="acc">Quản lý tài khoản &gt; </h3>
          <h3 className="update-acc">Cập nhật tài khoản</h3>
        </div>
        <h2> Quản lý Tài khoản</h2>
        <div className="update-list">
          <h3>Thông tin tài khoản</h3>
          <div className="update-list-dev">
            <div className="update-list__input">
              <div className="update-list__input1">
                <p>Họ tên</p>
                <Input
                  placeholder="Nhập họ tên"
                  value={ho_ten}
                  onChange={(e) => setHoTen(e.target.value)}
                />
              </div>
              <div className="update-list__input1">
                <p>Số điện thoại</p>
                <Input
                  placeholder="Nhập số điện thoại"
                  value={so_dien_thoai}
                  onChange={(e) => setSoDienThoai(e.target.value)}
                />
              </div>
              <div className="update-list__input1">
                <p>Email</p>
                <Input
                  placeholder="Nhập email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="update-list__input1">
                <p>Vai trò</p>
                <Space wrap>
                  <Select
                    style={{ width: 500 }}
                    value={ten_vai_tro}
                    onChange={(value) => setTenVaiTro(value)}
                    options={role_account}
                  />
                </Space>
              </div>
              <h5>* Là trường thông tin bắt buộc</h5>
            </div>
            <div className="update-list__input-account">
              <div className="update-list__input2">
                <p>Tên đăng nhập</p>
                <Input
                  placeholder="Nhập tên đăng nhập"
                  value={ten_dang_nhap}
                  onChange={(e) => setTenDangNhap(e.target.value)}
                />
              </div>
              <div className="update-list__input2">
                <p>Mật khẩu</p>
                <Input.Password
                  placeholder="Nhập mật khẩu"
                  onChange={(e) => setMatKhau(e.target.value)}
                  value={mat_khau}
                />
              </div>
              <div className="update-list__input2">
                <p>Nhập lại mật khẩu</p>
                <Input.Password
                  placeholder="Nhập lại mật khẩu"
                  value={nhap_lai_mat_khau}
                  onChange={(e) => setNhapLaiMatKhau(e.target.value)}
                />
              </div>
              <div className="update-list__input2">
                <p>Trạng thái</p>
                <Space wrap>
                  <Select
                    style={{ width: 500 }}
                    value={trang_thai}
                    onChange={(value) => setTrangThai(value)}
                    options={[
                      { value: "Tất cả", label: "Tất cả" },
                      { value: true, label: "Hoạt động" },
                      { value: false, label: "Ngưng hoạt động" },
                    ]}
                  />
                </Space>
              </div>
            </div>
          </div>
        </div>
        <div className="update-list__button">
          <Button className="update-list__button-cancel" onClick={handleCancel}>
            Hủy bỏ
          </Button>
          <Button
            className="update-list__button-update-account"
            onClick={handleSave}
          >
            Cập nhật    
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default UpdateAccountManagement;
