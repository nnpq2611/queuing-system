import React, {useState} from 'react'
import "./Table.css"
import { Pagination } from "antd";
import { Link } from "react-router-dom";

interface user {
    Ten_dang_nhap: string,
    Thoi_gian_tac_dong: string,
    IP_thuc_hien: string,
    Thao_tac_thuc_hien: string
}

const user_list = [
    "Tên đăng nhập",
    "Thời gian tác động",
    "IP thực hiện",
    "Thao tác thực hiện"
];

const renderHead = (item: any, index: any) => <th key={index}>{item}</th>;

const UserTable: React.FC<{ user_show: user[] }> = ({ user_show }) =>  {
    const [dataShow, setDataShow] = useState<user[]>([]);
    
    const renderBody = (item: any, index: any) => (
        <tr key={index}>
            <td>{item.Ten_dang_nhap}</td>
            <td>{item.Thoi_gian_tac_dong}</td>
            <td>{item.IP_thuc_hien}</td>
            <td>{item.Thao_tac_thuc_hien}</td>
        </tr>
    )

    React.useEffect(() => {
        const users = user_show.map((item: any) => ({
          ...item,
          extend: false,
        }));
        setDataShow(users.slice(0, 10));
        console.log(dataShow)
      }, [user_show]);
    
      const selectPage = (page: any) => {
        const start = 10 * page;
        const end = start + 10;
        setDataShow(user_show.slice(start, end));
    };

    return (
        <div className="table">
            <table>
                <thead>
                <tr>{user_list.map(renderHead)}</tr>
                </thead>
                <tbody>{dataShow.map(renderBody)}</tbody>
            </table>
            <Pagination
                defaultCurrent={1}
                total={user_show.length}
                onChange={(page) => selectPage(page - 1)}
                className="pagination"
            />
        </div>
    )
}

export default UserTable