import React, { useState } from "react";
import "./Table.css";
import { Pagination } from "antd";
import { Link } from "react-router-dom";

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

const device_list = [
  "Mã thiết bị",
  "Tên thiết bị",
  "Địa chỉ IP",
  "Trạng thái hoạt động",
  "Trạng thái kết nối",
  "Dịch vụ sử dụng",
  " ",
  " ",
];

const renderHead = (item: any, index: any) => <th key={index}>{item}</th>;


const DeviceTable: React.FC<{ device_show: device[] }> = ({ device_show }) => {
  const [dataShow, setDataShow] = useState<device[]>([]);
  
  const renderBody = (item: any, index: any) => (
    <tr key={index}>
      <td>{item.Ma_thiet_bi}</td>
      <td>{item.Ten_thiet_bi}</td>
      <td>{item.Dia_chi_IP}</td>
      <td>{item.Trang_thai_hoat_dong}</td>
      <td>{item.Trang_thai_ket_noi}</td>
      {item.extend ? (
        <td>{item.Dich_vu_su_dung}</td>
      ) : (
        <td>
          {item.Dich_vu_su_dung.slice(0, 10)}...
          <br />
          <p
            onClick={() => {
              item.extend = true;
              setDataShow([...dataShow]);
            }}
            style={{ color: "blue", cursor: "pointer", margin: "0" }}
          >
            Xem thêm
          </p>
        </td>
      )}
      <td>
        <Link to={`/detail-device/${index}`}>Chi tiết</Link>
      </td>
      <td>
        <Link to={`/update-device/${index}`}>Cập nhật</Link>
      </td>
    </tr>
  );
  React.useEffect(() => {
    const devices = device_show.map((item: any) => ({
      ...item,
      extend: false,
    }));
    setDataShow(devices.slice(0, 10));
  }, [device_show]);

  const selectPage = (page: any) => {
    const start = 10 * page;
    const end = start + 10;
    setDataShow(device_show.slice(start, end));
  };

  return (
    <div className="table">
      <table>
        <thead>
          <tr>{device_list.map(renderHead)}</tr>
        </thead>
        <tbody>{dataShow.map(renderBody)}</tbody>
      </table>
      <Pagination
        defaultCurrent={1}
        total={device_show.length}
        onChange={(page) => selectPage(page - 1)}
        className="pagination"
      />
    </div>
  );
};

export default DeviceTable;
