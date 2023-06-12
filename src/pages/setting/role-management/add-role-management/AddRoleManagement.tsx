import React, {useState, useEffect} from 'react'
import { Row, Col, Input, Button, Checkbox } from 'antd'
import "./AddRoleManagement.css"
import { useNavigate } from 'react-router-dom'
import {ref, set, get}   from "firebase/database"
import database from '../../../../firebase/FireBase'
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

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

const AddRoleManagement = () => {
    const [ten_vai_tro, setTenVaiTro] = useState<string>("")
    const [mo_ta, setMoTa] = useState<string>("")
    const [chuc_nang_tat_ca1, setChucNangTatCa1] = useState<CheckboxValueType[]>([]);
    const [chuc_nang_tat_ca2, setChucNangTatCa2] = useState<CheckboxValueType[]>([]);
    const [role_management, setRoleManagement] = useState<role[]>([]);
    const starCountRef = ref(database, "role");
    const { TextArea } = Input;
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate("/role_management");
    };

    const handleCheckbok = (value: CheckboxValueType[]) => {
        setChucNangTatCa1(value);
        if (value.indexOf("All1") !== -1 && value.length === 3) {
            setChucNangTatCa1(value.filter((item) => item !== "All1"));
        } 
        else if (value.indexOf("All1") !== -1){
            setChucNangTatCa1(["All1", "Chức năng x1", "Chức năng y1", "Chức năng z1"]);
        }   
        setChucNangTatCa2(value);
        if (value.indexOf("All2") !== -1 && value.length === 3) {
            setChucNangTatCa2(value.filter((item) => item !== "All2"));
        } 
        else if (value.indexOf("All2") !== -1){
            setChucNangTatCa2(["All2", "Chức năng x2", "Chức năng y2", "Chức năng z2"]);
        } 
    }

    const checkNull = () => {
        return(
            ten_vai_tro === "" || 
            mo_ta === ""
            // [...chuc_nang_tat_ca1, ...chuc_nang_tat_ca2].length === 0 ? false : true
        )
    }
    
    const handleSave = () => {
        if (checkNull()) {
            alert("Nhập thiếu thông tin!!!");
            return;
        }
        let newRole = {
            Ten_vai_tro: `${ten_vai_tro}`,
            So_nguoi_dung: 6,
            Mo_ta: `${mo_ta}`,
            Phan_quyen: {
                A:{
                    Chuc_nang_X: chuc_nang_tat_ca1.indexOf("Chức năng x1") !== -1 ? true : false,
                    Chuc_nang_Y: chuc_nang_tat_ca1.indexOf("Chức năng y1") !== -1 ? true : false,
                    Chuc_nang_Z: chuc_nang_tat_ca1.indexOf("Chức năng z1") !== -1 ? true : false,
                },
                B:{
                    Chuc_nang_X: chuc_nang_tat_ca2.indexOf("Chức năng x2") !== -1 ? true : false,
                    Chuc_nang_Y: chuc_nang_tat_ca2.indexOf("Chức năng y2") !== -1 ? true : false,
                    Chuc_nang_Z: chuc_nang_tat_ca2.indexOf("Chức năng z2") !== -1 ? true : false,
                }
            }
        };
        set(starCountRef, [...role_management, newRole]).then(() => navigate("/role_management"));
    }

    useEffect(() => {
        get(starCountRef)
          .then((snapshot: any) => {
            if (snapshot.exists()) {
              setRoleManagement(snapshot.val());
            } else {
              console.log("No data available");
            }
          })
          .catch((error: any) => {
            console.error(error);
          });
    }, []);
    
    return (
        <Row className="add-role_page">
            <Col className="add-role_management">
                <div className="nav_add-role">
                    <h3 className="add-role">Cài đặt hệ thống &gt; </h3>
                    <h3 className="add-role">Quản lý vai trò &gt; </h3>
                    <h3 className="add-role_list">Thêm vai trò</h3>
                </div>
                <h2>Danh sách vai trò</h2>
                <div className="add-role_form">
                    <h3>Thông tin vai trò</h3>
                    <div className="add-role_form-role-type">
                        <div className="add-role_form-title">
                            <h4>Tên vai trò</h4>
                            <Input
                                className="form-control"
                                style={{ width: 500, height: 40 }}
                                placeholder="Nhập tên vai trò"
                                onChange={(e) => {setTenVaiTro(e.target.value)}}
                            />                    
                            <div className="add-role_form-description">
                                <h4>Mô tả</h4>
                                <TextArea 
                                    className="form-control"
                                    style={{ width: 500, height: 150 }}
                                    placeholder="Nhập mô tả"
                                    rows={4} 
                                    onChange={(e) => {setMoTa(e.target.value)}}
                                />   
                                <h5>*là trường thông tin bắt buộc</h5>  
                            </div>                   
                        </div>
                        <div className='decentralization'>
                            <h4>Phân quyền chức năng*</h4>
                            <div className='function'>
                                <h3>Nhóm chức năng A</h3>
                                <Checkbox.Group 
                                    style={{ width: '100%' }}
                                    onChange={handleCheckbok}
                                    value={chuc_nang_tat_ca1}
                                >
                                    <Row>
                                        <Col span={24}>
                                            <Checkbox value="All1">Tất cả</Checkbox>
                                        </Col>
                                        <br/>
                                        <Col span={24}>
                                            <Checkbox value="Chức năng x1">Chức năng x</Checkbox>
                                        </Col>
                                        <br/>
                                        <Col span={24}>
                                            <Checkbox value="Chức năng y1">Chức năng y</Checkbox>
                                        </Col>
                                        <br/>
                                        <Col span={24}>
                                            <Checkbox value="Chức năng z1">Chức năng z</Checkbox>
                                        </Col>
                                    </Row>
                                </Checkbox.Group>
                                <h3>Nhóm chức năng B</h3>
                                <Checkbox.Group 
                                    style={{ width: '100%' }}
                                    onChange={handleCheckbok}
                                    value={chuc_nang_tat_ca2}
                                >
                                    <Row>
                                        <Col span={24}>
                                            <Checkbox value="All2">Tất cả</Checkbox>
                                        </Col>
                                        <br/>
                                        <Col span={24}>
                                            <Checkbox value="Chức năng x2">Chức năng x</Checkbox>
                                        </Col>
                                        <br/>
                                        <Col span={24}>
                                            <Checkbox value="Chức năng y2">Chức năng y</Checkbox>
                                        </Col>
                                        <br/>
                                        <Col span={24}>
                                            <Checkbox value="Chức năng z2">Chức năng z</Checkbox>
                                        </Col>
                                    </Row>
                                </Checkbox.Group>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="add-role_form-button">
                    <Button className="add-role_form-button-cancel" onClick={handleCancel}>Hủy bỏ</Button>
                    <Button className="add-role_form-button-save" onClick={handleSave}>Thêm</Button>
                </div>                                
            </Col>
        </Row>
    )
}

export default AddRoleManagement