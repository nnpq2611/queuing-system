import React, {useState} from 'react'
import "./Table.css"
import { Pagination, Space, Select} from "antd";

interface progression {
    So_thu_tu: number,
    Ho_ten: string,
    Ten_dich_vu: string,
    Thoi_gian_cap: string,
    Han_su_dung: string,
    Nguon_cap: string,
    Trang_thai: string,
}

const report_list = [
    "Số thứ tự",
    "Tên dịch vụ",
    "Thời gian cấp",
    "Trạng thái",
    "Nguồn cấp"
]

const renderHead = (item: any, index: any) => <th key={index}>{item}</th>;

const ReportTable: React.FC<{ report_show: progression[] }> = ({ report_show }) => {
  const [dataShow, setDataShow] = useState<progression[]>([]);

  const renderBody = (item: any, index: any) => (
    <tr key={index}>
        <td><Select>{item.So_thu_tu}</Select></td>
        <td>{item.Ten_dich_vu}</td>
        <td>{item.Thoi_gian_cap}</td>
        <td>{item.Trang_thai}</td>
        <td>{item.Nguon_cap}</td>
    </tr>
  )

  React.useEffect(() => {
      const devices = report_show.map((item: any) => ({
        ...item,
        extend: false,
      }));
      setDataShow(devices.slice(0, 10));
    }, [report_show]);

    const selectPage = (page: any) => {
      const start = 10 * page;
      const end = start + 10;
      setDataShow(report_show.slice(start, end));
  };

  return (
    <div className="table">
        <table>
            <thead>
            <tr>{report_list.map(renderHead)}</tr>
            </thead>
            <tbody>{dataShow.map(renderBody)}</tbody>
        </table>
        <Pagination
            defaultCurrent={1}
            total={report_show.length}
            onChange={(page) => selectPage(page - 1)}
            className="pagination"
        />
    </div>
  ) 
}

export default ReportTable