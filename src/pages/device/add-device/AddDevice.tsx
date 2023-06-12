import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import "./AddDevice.css";
import { Space, Select, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { get, ref, set } from "firebase/database";
import database from "../../../firebase/FireBase";

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

const AddDevice = () => {
  const [loai_thiet_bi, setLoaiThietBi] = useState("");
  const [ma_thiet_bi, setMaThietBi] = useState("");
  const [ten_thiet_bi, setTenThietBi] = useState("");
  const [ten_dang_nhap, setTenDangNhap] = useState("");
  const [mat_khau, setMatKhau] = useState("");
  const [dich_vu_su_dung, setDichVuSuDung] = useState("");
  const [device, setDevice] = useState<device[]>([]);
  const [dia_chi_IP] = useState(
    Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join(".")
  );
  const starCountRef = ref(database, "device");
  const navigate = useNavigate();

  useEffect(() => {
    get(starCountRef)
      .then((snapshot: any) => {
        if (snapshot.exists()) {
          setDevice(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  const handleCancel = () => {
    navigate("/device");
  };

  const checkNull = () => {
    return (
      ma_thiet_bi === "" ||
      ten_thiet_bi === "" ||
      ten_dang_nhap === "" ||
      loai_thiet_bi === "" ||
      mat_khau === "" ||
      dich_vu_su_dung === ""
    );
  };

  const handleSave = () => {
    if (checkNull()) {
      alert("Nhập thiếu thông tin!!!");
      return;
    }
    let thiet_bi = {
      Ma_thiet_bi: `${ma_thiet_bi}`,
      Ten_thiet_bi: `${ten_thiet_bi}`,
      Dia_chi_IP: `${dia_chi_IP}`,
      Trang_thai_hoat_dong: "Hoạt động",
      Trang_thai_ket_noi: "Kết nối",
      Loai_thiet_bi: `${loai_thiet_bi}`,
      Ten_dang_nhap: `${ten_dang_nhap}`,
      Mat_khau: `${mat_khau}`,
      Dich_vu_su_dung: `${dich_vu_su_dung}`,
    };

    setDevice([...device, thiet_bi]);
    set(starCountRef, [...device, thiet_bi]).then(() => navigate("/device"))
  };

  return (
    <Row className="add-device-page">
      <Col className="add-device">
        <div className="nav-add">
          <h3 className="dev">Thiết bị &gt; </h3>
          <h3 className="dev">Danh sách thiết bị &gt; </h3>
          <h3 className="add-dev">Thêm thiết bị</h3>
        </div>
        <h2> Quản lý thiết bị</h2>
        <div className="add-list">
          <h3>Thông tin thiết bị</h3>
          <div className="add-list-dev">
            <div className="add-list__input">
              <div className="add-list__input-id">
                <p>Mã thiết bị</p>
                <Input
                  placeholder="Nhập mã thiết bị"
                  onChange={(e) => setMaThietBi(e.target.value)}
                />
              </div>
              <div className="add-list__input-name">
                <p>Tên thiết bị</p>
                <Input
                  placeholder="Nhập tên thiết bị"
                  onChange={(e) => setTenThietBi(e.target.value)}
                />
              </div>
              <div className="add-list__input-name">
                <p>Địa chỉ IP</p>
                <Input value={dia_chi_IP} disabled />
              </div>
            </div>
            <div className="add-list__input-account">
              <div className="add-list__select-name">
                <p>Loại thiết bị</p>
                <Space wrap>
                  <Select
                    style={{ width: 500 }}
                    onChange={(value) => setLoaiThietBi(value)}
                    defaultValue="Chọn loại thiết bị"
                    options={[
                      { value: "Kiosk", label: "Kiosk" },
                      { value: "Display counter", label: "Display counter" },
                    ]}
                  />
                </Space>
              </div>

              <div className="add-list__input-user_name">
                <p>Tên đăng nhập</p>
                <Input
                  placeholder="Nhập tài khoản"
                  onChange={(e) => setTenDangNhap(e.target.value)}
                />
              </div>
              <div className="add-list__input-password">
                <p>Mật khẩu</p>
                <Input.Password
                  placeholder="Nhập mật khẩu"
                  onChange={(e) => setMatKhau(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="add-list__input-service">
            <p>Dịch vụ sử dụng</p>
            <Input
              placeholder="Nhập dịch vụ sử dụng"
              onChange={(e) => setDichVuSuDung(e.target.value)}
            ></Input>
          </div>
          <h5>* Là trường thông tin bắt buộc</h5>
        </div>
        <div className="add-list__button">
          <Button className="add-list__button-cancel" onClick={handleCancel}>
            Hủy bỏ
          </Button>
          <Button className="add-list__button-add-device" onClick={handleSave}>
            Thêm thiết bị
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default AddDevice;
