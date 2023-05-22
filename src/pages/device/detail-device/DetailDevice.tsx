import React, { useEffect, useState } from "react";
import "./DetailDevice.css";
import { useParams } from "react-router-dom";
import { get, ref } from "firebase/database";
import database from "../../../firebase/FireBase";
import { Row, Col } from "antd";
import ButtonDevice from "../../../components/button-device/ButtonDevice";
import EditOutlined from "@ant-design/icons/EditOutlined";

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

const DetailDevice = () => {
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

  // const data = [
  //   {
  //       name: "Thêm thiết bị",
  //       path: "/adddevice",
  //       icon: <PlusOutlined />
  //   }
  // ]

  return (
    <Row className="detail-device-page">
      <Col className="detail-device">
        <div className="nav-add">
          <h3 className="dev">Thiết bị &gt; </h3>
          <h3 className="dev">Danh sách thiết bị &gt; </h3>
          <h3 className="add-dev">Chi tiết thiết bị</h3>
        </div>
        <h2>Quản lý thiết bị</h2>
        <div className="information-device">
          <div className="detail-device_title">
            <h3>Thông tin thiết bị</h3>
            <div className="title">
              <div className="title-device">
                <p>Mã thiết bị:</p>
                <p>Tên thiết bị:</p>
                <p>Địa chỉ IP:</p>
              </div>
              <div className="title-device1">
                <p>{device?.Ma_thiet_bi}</p>
                <p>{device?.Ten_thiet_bi}</p>
                <p>{device?.Dia_chi_IP}</p>
              </div>
              <div className="title-device2">
                <p>Loại thiết bị:</p>
                <p>Tên đăng nhập:</p>
                <p>Mật khẩu:</p>
              </div>
              <div className="title-device3">
                <p>{device?.Loai_thiet_bi}</p>
                <p>{device?.Ten_dang_nhap}</p>
                <p>{device?.Mat_khau}</p>
              </div>
            </div>
            <p>
              <b>Dịch vụ sử dụng:</b> {device?.Dich_vu_su_dung}
            </p>
          </div>
          <ButtonDevice
            name="Cập nhật thiết bị"
            path={`/update-device/${deviceId}`}
            icon={<EditOutlined />}
          />
        </div>
      </Col>
    </Row>
  );
};

export default DetailDevice;
