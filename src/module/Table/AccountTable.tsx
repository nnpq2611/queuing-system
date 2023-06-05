import React, { useState } from "react";
import "./Table.css";
import { Pagination } from "antd";
import { Link } from "react-router-dom";

interface account{
    Ho_ten: string,
    So_dien_thoai: string,
    Email: string,
    Vai_tro: string,
    Ten_dang_nhap: string,
    Mat_khau: string,
    Nhap_lai_mat_khau: string,
    Trang_thai: boolean,
}

const account_list = [    
    "Tên đăng nhập",
    "Họ tên",
    "Số điện thoại",
    "Email",
    "Vai trò",
    "Trạng thái hoạt động",
    " "
];

const renderHead = (item: any, index: any) => <th key={index}>{item}</th>;

const AccountTable: React.FC<{ account_show: account[] }> = ({ account_show }) => {
    const [dataShow, setDataShow] = useState<account[]>([]);


    const renderBody = (item: any, index: any) => (
        <tr key={index}>
            <td>{item.Ten_dang_nhap}</td>
            <td>{item.Ho_ten}</td>
            <td>{item.So_dien_thoai}</td>
            <td>{item.Email}</td>
            <td>{item.Vai_tro}</td>
            <td>{item.Trang_thai ? "Hoạt động" : "Ngưng hoạt động"}</td>
            <td>
                <Link to={`/update_setting_management/${index}`}>Cập nhật</Link>
            </td>   
        </tr>
    );

    React.useEffect(() => {
        const devices = account_show.map((item: any) => ({
          ...item,
          extend: false,
        }));
        setDataShow(devices.slice(0, 10));
      }, [account_show]);
    
      const selectPage = (page: any) => {
        const start = 10 * page;
        const end = start + 10;
        setDataShow(account_show.slice(start, end));
    };
    
    return (
        <div className="table">
            <table>
                <thead>
                <tr>{account_list.map(renderHead)}</tr>
                </thead>
                <tbody>{dataShow.map(renderBody)}</tbody>
            </table>
            <Pagination
                defaultCurrent={1}
                total={account_show.length}
                onChange={(page) => selectPage(page - 1)}
                className="pagination"
            />
        </div>
    )
}

export default AccountTable