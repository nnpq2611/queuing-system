import React,{useState, useEffect} from 'react'
import { Row, Col, Input, Button, Checkbox } from 'antd'
import "./AddRoleManagement.css"
import {ref, get}   from "firebase/database"
import database from '../../../../firebase/FireBase';
import { useNavigate } from 'react-router-dom';


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
    const { TextArea } = Input;
    const [ten_vai_tro, setTenVaiTro] = useState<string>("");
    const [mo_ta, setMoTa] = useState<string>("");
    const [role_management, setRoleManagement] = useState<role[]>([]);
    const [role_show, setRoleManagementShow] = useState<role[]>([]);
    const starCountRef = ref(database, "setting/role");
    const [check, setCheck] = useState<boolean>(false);
    const navigate = useNavigate();


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
    
      const handleCancel = () => {
        navigate("/role_management");
      };
    
      const checkNull = () => {
       
      };
    
      const handleSave = () => {
       
      };


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
                            />                    
                            <div className="add-role_form-description">
                                <h4>Mô tả</h4>
                                <TextArea 
                                    className="form-control"
                                    style={{ width: 500, height: 150 }}
                                    placeholder="Nhập mô tả"
                                    rows={4} 
                                    maxLength={6} 
                                />   
                                <h5>*là trường thông tin bắt buộc</h5>  
                            </div>                   
                        </div>
                        <div className='decentralization'>
                            <h4>Phân quyền chức năng*</h4>
                            <div className='function'>
                                <h3>Nhóm chức năng A</h3>
                                <Checkbox.Group style={{ width: '100%' }}>
                                    <Row>
                                        <Col span={24}>
                                            <Checkbox value="Tất cả">Tất cả</Checkbox>
                                        </Col>
                                        <br/>
                                        <Col span={24}>
                                            <Checkbox value="Chức năng x">Chức năng x</Checkbox>
                                        </Col>
                                        <br/>
                                        <Col span={24}>
                                            <Checkbox value="Chức năng y">Chức năng y</Checkbox>
                                        </Col>
                                        <br/>
                                        <Col span={24}>
                                            <Checkbox value="Chức năng z">Chức năng z</Checkbox>
                                        </Col>
                                    </Row>
                                </Checkbox.Group>
                                <h3>Nhóm chức năng B</h3>
                                <Checkbox.Group style={{ width: '100%' }}>
                                    <Row>
                                        <Col span={24}>
                                            <Checkbox value="Tất cả">Tất cả</Checkbox>
                                        </Col>
                                        <br/>
                                        <Col span={24}>
                                            <Checkbox value="Chức năng x">Chức năng x</Checkbox>
                                        </Col>
                                        <br/>
                                        <Col span={24}>
                                            <Checkbox value="Chức năng y">Chức năng y</Checkbox>
                                        </Col>
                                        <br/>
                                        <Col span={24}>
                                            <Checkbox value="Chức năng z">Chức năng z</Checkbox>
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