import React, { useState } from "react";
import { Row, Col } from "antd";
import "./Device.css";
import { Space, Select, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import DeviceTable from "../../module/Table/DeviceTable";
import database from "../../firebase/FireBase";
import { get, ref } from "firebase/database";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import ButtonDevice from "../../components/button-device/ButtonDevice";

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

const Device = () => {
  const [filterActive, setFilterActive] = useState("Tất cả");
  const [filterConnection, setFilterConnection] = useState("Tất cả");
  const [searchInput, setSearchInput] = useState("");
  const [device, setDevice] = useState<device[]>([]);
  const [device_show, setDevice_show] = useState<device[]>([]);
  const starCountRef = ref(database, "device");
  
  const handleChange = (filterActive: string, filterConnection: string) => {
    let devices = [...device];
    if (filterActive !== "Tất cả") {
      devices = devices.filter(
        (item) => item.Trang_thai_hoat_dong === filterActive
      );
    }
    if (filterConnection !== "Tất cả") {
      devices = devices.filter(
        (item) => item.Trang_thai_ket_noi === filterConnection
      );
    }
    setDevice_show(devices);
  };

  React.useEffect(() => {
    get(starCountRef)
      .then((snapshot: any) => {
        if (snapshot.exists()) {
          setDevice(snapshot.val());
          setDevice_show(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  const handleSearch = (value: string) => {
    setSearchInput(value);
    if (value === "") {
      return setDevice_show(device);
    }
    const search = device.filter((item) => {
      return item.Ten_thiet_bi.includes(searchInput);
    });
    setDevice_show(search);
  };

  return (
    <Row className="device-page">
      <Col className="device">
        <div className="nav-dev">
          <h3 className="dev">Thiết bị &gt; </h3>
          <h3 className="dev-list">Danh sách thiết bị</h3>
        </div>
        <h2>Danh sách thiết bị</h2>
        <div className="device-list">
          <div className="active-status">
            <h4>Trạng thái hoạt động</h4>
            <Space wrap>
              <Select
                defaultValue="Tất cả"
                style={{ width: 280 }}
                onChange={(value) => {
                  setFilterActive(value);
                  handleChange(value, filterConnection);
                }}
                value={filterActive}
                options={[
                  { value: "Tất cả", label: "Tất cả" },
                  { value: "Hoạt động", label: "Hoạt động" },
                  { value: "Ngưng hoạt động", label: "Ngưng hoạt động" },
                ]}
              />
            </Space>
          </div>
          <div className="connection-status">
            <h4>Trạng thái kết nối</h4>
            <Space wrap>
              <Select
                defaultValue="Tất cả"
                style={{ width: 280 }}
                onChange={(value) => {
                  setFilterConnection(value);
                  handleChange(filterActive, value);
                }}
                value={filterConnection}
                options={[
                  { value: "Tất cả", label: "Tất cả" },
                  { value: "Kết nối", label: "Kết nối" },
                  { value: "Mất kết nối", label: "Mất kết nối" },
                ]}
              />
            </Space>
          </div>
          <div className="key-word">
            <h4>Từ khóa</h4>
            <Input
              className="form-control"
              style={{ width: 280 }}
              placeholder="Nhập từ khóa"
              onChange={(e) => handleSearch(e.target.value)}
              value={searchInput}
              suffix={<SearchOutlined />}
            />
          </div>
        </div>
        <div className="table-device">
          <DeviceTable device_show={device_show} />
          <ButtonDevice name="Thêm thiết bị" path="/adddevice" icon={<PlusOutlined />}/>
        </div>
      </Col>
    </Row>
  );
};

export default Device;
