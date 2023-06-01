import React, {useState} from 'react'
import "./Table.css"
import { Pagination } from "antd";
import { Link } from "react-router-dom";

interface progression {
    So_thu_tu: number,
    Ho_ten: string,
    Ten_dich_vu: string,
    Thoi_gian_cap: string,
    Han_su_dung: string,
    Nguon_cap: string,
    Trang_thai: string,
    So_dien_thoai: string,
    Email: string
}

const progression_list = [
    "Số thứ tự",
    "Trạng thái"
];

const renderHead = (item: any, index: any) => <th key={index}>{item}</th>;

const DetailSerTable: React.FC<{ progression_show: progression[] }> = ({ progression_show }) => {
    const [dataShow, setDataShow] = useState<progression[]>([]);

    const renderBody = (item: any, index: any) => (
        <tr key={index}>
            <td>{item.So_thu_tu}</td>
            <td>{item.Trang_thai}</td>
        </tr>
    );

    React.useEffect(() => {
        const devices = progression_show.map((item: any) => ({
          ...item,
          extend: false,
        }));
        setDataShow(devices.slice(0, 10));
        console.log(dataShow)
    }, [progression_show]);
    
    const selectPage = (page: any) => {
        const start = 10 * page;
        const end = start + 10;
        setDataShow(progression_show.slice(start, end));
    };
    
    return (
        <div className="table1">
            <table>
                <thead>
                <tr>{progression_list.map(renderHead)}</tr>
                </thead>
                <tbody>{dataShow.map(renderBody)}</tbody>
            </table>
            <Pagination
                defaultCurrent={1}
                total={progression_show.length}
                onChange={(page) => selectPage(page - 1)}
                className="pagination"
            />
        </div>
    )
}

export default DetailSerTable