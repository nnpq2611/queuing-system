import React, {useState} from 'react'
import "./Table.css"

interface device {
  Ma_thiet_bi: string,
  Ten_thiet_bi: string,
  Dia_chi_IP: string,
  Loai_thiet_bi: string,
  Ten_dang_nhap: string,
  Mat_khau: string,
  Dich_vu_su_dung: string,
}

const device_list = [
  "Mã thiết bị",
  "Tên thiết bị",
  "Địa chỉ IP",
  "Loại thiết bị",
  "Tên đăng nhập",
  "Mật khẩu",
  "Dịch vụ sử dụng",
  " ",
  " ",
]

const renderHead = (item: any, index: any) => <th key={index}>{item}</th>;

const renderBody = (item: any, index: any) => (
  <tr key={index}>
    <td>{item.Ma_thiet_bi}</td>
    <td>{item.Ten_thiet_bi}</td>
    <td>{item.Dia_chi_IP}</td>
    <td>{item.Loai_thiet_bi}</td>
    <td>{item.Ten_dang_nhap}</td>
    <td>{item.Mat_khau}</td>
    <td>{item.Dich_vu_su_dung}</td>
    <td><button className='btn-edit'>Chi tiết</button></td>
    <td><button className='btn-delete'>Cập nhật</button></td>
  </tr>
);

const DeviceTable:React.FC <{ device_show: device[] }>  = ({
  device_show
}) => {
  const [dataShow, setDataShow] = useState<device[]>([]);

  React.useEffect(() => {
    setDataShow(device_show.slice(0, 10));
  }, [device_show]);


  return (
    <div>
      <table className="table">
        <thead>
          <tr>{device_list.map(renderHead)}</tr>
        </thead>
        <tbody>{dataShow.map(renderBody)}</tbody>
      </table>
        
    </div>
  )
}

export default DeviceTable