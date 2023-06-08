import React, { useState, useEffect} from "react";
import { Row, Col } from "antd";
import "./UpdateDevice.css";
import { useParams } from "react-router-dom";
import { Space, Select, Input, Button, Tag} from "antd";
import { ref, get, set } from "firebase/database";
import database from "../../../firebase/FireBase";
import { useNavigate } from "react-router-dom";
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';

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
  const [ma_thiet_bi, setMaThietBi] = useState("");
  const [loai_thiet_bi, setLoaiThietBi] = useState("");
  const [ten_thiet_bi, setTenThietBi] = useState("");
  const [ten_dang_nhap, setTenDangNhap] = useState("");
  const [dia_chi_IP, setDiaChiIP] = useState("");
  const [mat_khau, setMatKhau] = useState("");
  const [dich_vu_su_dung, setDichVuSuDung] = useState("");
  const [device, setDevice] = useState<device>();
  const { deviceId } = useParams();
  const starCountRef = ref(database, `device/${deviceId}`);
  const navigate = useNavigate();

  const getDevice = () => {
    get(starCountRef)
      .then((snapshot: any) => {
        if (snapshot.exists()) {
          setDevice(snapshot.val());
          setMaThietBi(snapshot.val().Ma_thiet_bi);
          setTenThietBi(snapshot.val().Ten_thiet_bi);
          setDiaChiIP(snapshot.val().Dia_chi_IP);
          setLoaiThietBi(snapshot.val().Loai_thiet_bi);
          setTenDangNhap(snapshot.val().Ten_dang_nhap);
          setMatKhau(snapshot.val().Mat_khau);
          setDichVuSuDung(snapshot.val().Dich_vu_su_dung);
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

  const handleCancel = () => {
    navigate("/device");
  };

  const handleSave = () => {
    let thiet_bi = {
      ...device,
      Ma_thiet_bi: ma_thiet_bi,
      Ten_thiet_bi: ten_thiet_bi,
      Dia_chi_IP: dia_chi_IP,
      Loai_thiet_bi: loai_thiet_bi,
      Ten_dang_nhap: ten_dang_nhap,
      Mat_khau: mat_khau,
      Dich_vu_su_dung: dich_vu_su_dung,
    };
    set(starCountRef, thiet_bi).then(() => {
      navigate("/device");
    });
  };

  // const convertTextToTags = (text:any) => {
  //   const segments = text.split(',');
  //   return segments.map((segment:any, index:any) => (
  //     <Tag key={index}>{segment.trim()}</Tag>
  //   ));
  // };



  return (
    <Row className="update-device-page">
      <Col className="update-device">
        <div className="nav-update">
          <h3 className="dev">Thiết bị &gt; </h3>
          <h3 className="dev">Danh sách thiết bị &gt; </h3>
          <h3 className="update-dev">Cập nhật thiết bị</h3>
        </div>
        <h2> Quản lý thiết bị</h2>
        <div className="update-list">
          <h3>Thông tin thiết bị</h3>
          <div className="update-list-dev">
            <div className="update-list__input">
              <div className="update-list__input-id">
                <p>Mã thiết bị</p>
                <Input
                  value={ma_thiet_bi}
                  onChange={(e) => setMaThietBi(e.target.value)}
                  placeholder="Nhập mã thiết bị"
                />
              </div>
              <div className="update-list__input-name">
                <p>Tên thiết bị</p>
                <Input
                  value={ten_thiet_bi}
                  onChange={(e) => setTenThietBi(e.target.value)}
                  placeholder="Nhập tên thiết bị"
                />
              </div>
              <div className="update-list__input-name">
                <p>Địa chỉ IP</p>
                <Input
                  value={dia_chi_IP}
                  disabled
                  placeholder="Nhập địa chỉ IP"
                />
              </div>
            </div>
            <div className="update-list__input-account">
              <div className="update-list__select-name">
                <p>Loại thiết bị</p>
                <Space wrap>
                  <Select
                    style={{ width: 500 }}
                    onChange={(value) => setLoaiThietBi(value)}
                    value={loai_thiet_bi}
                    options={[
                      { value: "Kiosk", label: "Kiosk" },
                      { value: "Display counter", label: "Display counter" },
                    ]}
                  />
                </Space>
              </div>

              <div className="update-list__input-user_name">
                <p>Tên đăng nhập</p>
                <Input
                  value={ten_dang_nhap}
                  onChange={(e) => setTenDangNhap(e.target.value)}
                  placeholder="Nhập tài khoản"
                />
              </div>
              <div className="update-list__input-password">
                <p>Mật khẩu</p>
                <Input
                  value={mat_khau}
                  onChange={(e) => e.target.value}
                  placeholder="Nhập mật khẩu"
                />
              </div>
            </div>
          </div>
          <div className="update-list__input-service">
            <p>Dịch vụ sử dụng</p>
            <Input.TextArea
              value={dich_vu_su_dung }
              onChange={(e) => setDichVuSuDung(e.target.value)}
              placeholder="Nhập dịch vụ sử dụng"
            ></Input.TextArea>
          </div>
          <h5>* Là trường thông tin bắt buộc</h5>
        </div>
        <div className="update-list__button">
          <Button className="update-list__button-cancel" onClick={handleCancel}>
            Hủy bỏ
          </Button>
          <Button
            className="update-list__button-update-device"
            onClick={handleSave}
          >
            Cập nhật
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default UpdateDevice;
