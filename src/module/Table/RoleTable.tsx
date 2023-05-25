import React, {useState} from 'react'
import "./Table.css"
import {Link} from "react-router-dom"
import { Pagination } from "antd";

interface role{
    Ten_vai_tro: string,
    So_nguoi_dung: number,
    Mo_ta: string,
    Phan_quyen: {
        A:{
            Chuc_nang_X: boolean,
            Chuc_nang_Y: boolean,
            Chuc_nang_Z: boolean,
        },
        B:{
            Chuc_nang_X: boolean,
            Chuc_nang_Y: boolean,
            Chuc_nang_Z: boolean,
        }
    }
}

const role_list = [
    "Tên vai trò",
    "Số người dùng",
    "Mô tả",
    " "
]

const renderHead = (item: any, index: any) => <th key={index}>{item}</th>;

const RoleTable: React.FC<{ role_show: role[] }> = ({ role_show }) => {
    const [dataShow, setDataShow] = useState<role[]>([]);

    const renderBody = (item: any, index: any) => (
        <tr key={index}>
            <td>{item.Ten_vai_tro}</td>
            <td>{item.So_nguoi_dung}</td>
            <td>{item.Mo_ta}</td>
            <td><Link to={`/update_role_management/${index}`}>Cập nhật</Link></td>
        </tr>
    )

    React.useEffect(() => {
        const devices = role_show.map((item: any) => ({
          ...item,
          extend: false,
        }));
        setDataShow(devices.slice(0, 10));
        console.log(dataShow)
      }, [role_show]);
    
      const selectPage = (page: any) => {
        const start = 10 * page;
        const end = start + 10;
        setDataShow(role_show.slice(start, end));
    };



    return (
        <div className="table">
            <table>
                <thead><tr>{role_list.map(renderHead)}</tr></thead>
                <tbody>{dataShow.map(renderBody)}</tbody>
            </table>
            <Pagination
                defaultCurrent={1}
                total={role_show.length}
                onChange={selectPage}
            />
        </div>
    )
}

export default  RoleTable