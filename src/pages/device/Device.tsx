import React, {useState} from 'react'
import { Row, Col } from 'antd'
import './Device.css'
import {Space, Select, Input} from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import DeviceTable from '../../module/Table/DeviceTable';
import database from '../../firebase/FireBase';
import { get, ref } from "firebase/database";

interface device {
  Ma_thiet_bi: string,
  Ten_thiet_bi: string,
  Dia_chi_IP: string,
  Loai_thiet_bi: string,
  Ten_dang_nhap: string,
  Mat_khau: string,
  Dich_vu_su_dung: string,
}

const Device = () => {
  const [active, setActive] = React.useState('Tất cả');
  const [searchInput, setSearchInput] = useState("");
  const [device, setDevice] = useState<device[]>([]);
  const [device_show, setDevice_show] = useState<device[]>([]);
  const [danh_sach_thiet_bi, set_danh_sach_thiet_bi] = useState<{label: string, value: string}[]>([]);
  const starCountRef = ref(database, "device");
  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
  }

  React.useEffect(() => {
    get(starCountRef)
      .then((snapshot: any) => {
        if (snapshot.exists()) {
          setDevice(snapshot.val());
          setDevice_show(snapshot.val());
          const danh_sach_thiet_bi = snapshot.val().map((item: any) => item.Ten_thiet_bi).filter((value: any, index: any, self: any) => self.indexOf(value) === index);
          set_danh_sach_thiet_bi(danh_sach_thiet_bi.map((item: any) => ({value: item, label: item})));
        } else {
          console.log("No data available");
        }
      })
      .catch((error: any) => {
        console.error(error);
      });

  }, []);

  return (
    <Row className='device-page'>
        <Col className="device">
          <div className='nav-dev'>
            <h3 className='dev'>Thiết bị &gt; </h3>
            <h3 className='dev-list'>Danh sách thiết bị</h3>
          </div>
          <h2>Danh sách thiết bị</h2>
          <div className='device-list'>
            <div className='active-status'>
              <h4>Trạng thái hoạt động</h4>
              <Space wrap>
                <Select
                  defaultValue="Tất cả"
                  style={{ width: 280 }}
                  onChange={handleChange}
                  value={active}
                  options={[
                    { value: 'Tất cả', label: 'Tất cả' },
                    { value: 'Hoạt động', label: 'Hoạt động' },
                    { value: 'Ngưng hoạt động', label: 'Ngưng hoạt động' },
                  ]}
                />
              </Space>
              
            </div>
            <div className='connection-status'>
              <h4>Trạng thái kết nối</h4>
              <Space wrap>
                <Select
                  defaultValue="Tất cả"
                  style={{ width: 280 }}
                  onChange={handleChange}
                  value={active}
                  options={[
                    { value: 'Tất cả', label: 'Tất cả' },
                    { value: 'Kết nối', label: 'Kết nối' },
                    { value: 'Mất kết nối', label: 'Mất kết nối' },
                  ]}
                />
              </Space>            
            </div>
            <div className='key-word'>
              <h4>Từ khóa</h4>
              <Input
                className="form-control"
                style={{ width: 280 }}
                placeholder="Nhập từ khóa"
                value={searchInput}
                suffix={<SearchOutlined />}
              />
            </div>
          </div>
          <DeviceTable device_show = {device_show}/>
        </Col>
        <Col className='btn-add-device'>
        </Col>

    </Row>
  )
}

export default Device