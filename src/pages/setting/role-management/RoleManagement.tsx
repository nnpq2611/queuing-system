import React, {useState} from 'react'
import "./RoleManagement.css"
import {ref, get}   from "firebase/database"
import database from '../../../firebase/FireBase';
import {Row, Col, Input} from "antd";
import {SearchOutlined, PlusOutlined} from "@ant-design/icons";
import RoleTable from '../../../module/Table/RoleTable';
import ButtonDevice from '../../../components/button-device/ButtonDevice';


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

const RoleManagement = () => {
    const [role_management, setRoleManagement] = useState<role[]>([]);
    const [role_show, setRoleManagementShow] = useState<role[]>([]);
    const starCountRef = ref(database, "role");
    const [searchInput, setSearchInput] = useState("");

    const handleSearch = (value: string) => {
        setSearchInput(value);
        if (value === "") {
        return setRoleManagementShow(role_management);
        }
        const search = role_management.filter((item) => {
        return item.Ten_vai_tro.includes(searchInput);
        });
        setRoleManagementShow(search);
    };

    React.useEffect(() => {
        get(starCountRef)
        .then((snapshot: any) => {
            if (snapshot.exists()) {
            setRoleManagement(snapshot.val());
            setRoleManagementShow(snapshot.val());
            } else {
            console.log("No data available");
            }
        })
        .catch((error: any) => {
            console.error(error);
        });
    }, []);


    return (
        <Row className="role-page">
            <Col className="role_management">
                <div className="nav-role">
                    <h3 className="role">Cài đặt hệ thống &gt; </h3>
                    <h3 className="role-list">Quản lý vai trò</h3>
                </div>
                <h2>Danh sách vai trò</h2>
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
                <div className="table_role">
                    <RoleTable role_show={role_show}/>
                    <ButtonDevice
                        name="Thêm vai trò"
                        path="/add_role_management"
                        icon={<PlusOutlined />}
                    />
                </div>
            </Col>
        </Row>
    )
}

export default RoleManagement