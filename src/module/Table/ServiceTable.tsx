import React, {useState} from 'react'
import "./Table.css"
import { Pagination } from "antd";
import { Link } from "react-router-dom";

interface service {
    Thong_tin_dich_vu: {
        Ma_dich_vu: string,
        Ten_dich_vu: string,
        Mo_ta: string,
        Trang_thai_hoat_dong: string,
    },
    Quy_tac_cap_so: {
        Tang_tu_dong: {
            Start: number,
            End: number,
        },
        Prefix: number,
        Surfix: number,
        Reset: boolean,
    }
}



const service_list = [
    "Mã dịch vụ",
    "Tên dịch vụ",
    "Mô tả",
    "Trạng thái hoạt động",
    " ",
    " ",
];

const renderHead = (item: any, index: any) => <th key={index}>{item}</th>;

const ServiceTable: React.FC<{ service_show: service[] }> = ({ service_show }) => {
    const [dataShow, setDataShow] = useState<service[]>([]);

    const renderBody = (item: any, index: any) => (
        <tr key={index}>
            <td>{item.Thong_tin_dich_vu.Ma_dich_vu}</td>
            <td>{item.Thong_tin_dich_vu.Ten_dich_vu}</td>
            <td>{item.Thong_tin_dich_vu.Mo_ta}</td>
            <td>{item.Thong_tin_dich_vu.Trang_thai_hoat_dong}</td>
            <td>
                <Link to={`/detail-service/${index}`}>Chi tiết</Link>
            </td>
            <td>
                <Link to={`/update-service/${index}`}>Cập nhật</Link>
            </td>
        </tr>
    )

    React.useEffect(() => {
        const devices = service_show.map((item: any) => ({
          ...item,
          extend: false,
        }));
        setDataShow(devices.slice(0, 10));
        console.log(dataShow)
      }, [service_show]);
    
      const selectPage = (page: any) => {
        const start = 10 * page;
        const end = start + 10;
        setDataShow(service_show.slice(start, end));
    };

    return (
        <div className="table">
            <table>
                <thead>
                <tr>{service_list.map(renderHead)}</tr>
                </thead>
                <tbody>{dataShow.map(renderBody)}</tbody>
            </table>
            <Pagination
                defaultCurrent={1}
                total={service_show.length}
                onChange={(page) => selectPage(page - 1)}
                className="pagination"
            />
        </div>
    )
}

export default ServiceTable