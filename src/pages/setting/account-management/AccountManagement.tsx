import React from 'react'
import "./AccountManagement.css"
import {Col, Row, Input, Space, Select} from "antd";
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import ButtonDevice from '../../../components/button-device/ButtonDevice';
import AccountTable from '../../../module/Table/AccountTable';
import {ref, get}   from "firebase/database"
import database from '../../../firebase/FireBase';

interface account{
    Ho_ten: string,
    So_dien_thoai: string,
    Email: string,
    Ten_vai_tro: string,
    Ten_dang_nhap: string,
    Mat_khau: string,
    Nhap_lai_mat_khau: string,
    Trang_thai: boolean,
}


const AccountManagement = () => {
    const [filterRole,setFilterRole ] = React.useState<string>("Tất cả");
    const [account, setAccount] = React.useState<account[]>([]);
    const [account_show, setAccount_show] = React.useState<account[]>([]);
    const [role_account, setRoleAccount] = React.useState<{label: string, value: string}[]>([]);
    const [searchInput, setSearchInput] = React.useState<string>("");
    const starCountRef = ref(database, "account");  

    const handleChange = (filterRole:string) => {
        let accounts = [...account];
        if (filterRole !== "Tất cả") {
            accounts = accounts.filter(
                (item) => item.Ten_vai_tro === filterRole
            );
        }
        setAccount_show(accounts);
    };

    const handleSearch = (value: string) => {
        setSearchInput(value);
        if (value === "") {
        return setAccount_show(account);
        }
        const search = account.filter((item) => {
        return item.Ho_ten.includes(searchInput);
        });
        setAccount_show(search);
    };

    React.useEffect(() => {
        get(starCountRef)
        .then((snapshot: any) => {
            if (snapshot.exists()) {
            setAccount(snapshot.val());
            setAccount_show(snapshot.val());
            const role1 = snapshot.val().map((item: any) => item.Ten_vai_tro).filter((value: any, index: any, self: any) => self.indexOf(value) === index);
            setRoleAccount(role1.map((item: any) => ({value: item, label: item})));
            } else {
            console.log("No data available");
            }
        })
        .catch((error: any) => {
            console.error(error);
        });
    }, []);

    return (
        <Row className="account-page">
            <Col className="account_management">
                <div className="nav-acc">
                    <h3 className="acc">Cài đặt hệ thống &gt; </h3>
                    <h3 className="acc-list">Quản lý tài khoản</h3>
                </div>
                <h2>Danh sách tài khoản</h2>
                <div className='account-list'>
                    <div className="account-search">
                        <h4>Tên vai trò</h4>
                        <Space>
                            <Select
                                className="form-control"
                                style={{ width: 268 }}
                                placeholder="Tất cả"
                                onChange={(value) => {
                                    setFilterRole(value);
                                    handleChange(value);
                                }}
                                value={filterRole}
                                options={[
                                    { label: "Tất cả", value: "Tất cả" },
                                    ...role_account,
                                ]}
                            />
                        </Space>
                    </div>
                    <div className="key-word">
                        <h4>Từ khóa</h4>
                        <Input
                        className="form-control"
                        style={{ width: 268 }}
                        placeholder="Nhập từ khóa"
                        onChange={(e) => handleSearch(e.target.value)}
                        value={searchInput}
                        suffix={<SearchOutlined />}
                        />
                    </div>
                </div>
                <div className="table_account">
                    <AccountTable account_show={account_show}/>
                    <ButtonDevice
                        name="Thêm tài khoản"
                        path="/add_account_management"
                        icon={<PlusOutlined />}
                    />
                </div>
            </Col>
        </Row>
    )
}

export default AccountManagement