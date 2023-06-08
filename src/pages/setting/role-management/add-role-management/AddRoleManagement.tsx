import React from 'react'
import { Row, Col, Input, Button, Checkbox } from 'antd'
import "./AddRoleManagement.css"
import { useNavigate } from 'react-router-dom'


const AddRoleManagement = () => {
    const { TextArea } = Input;
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate("/role_management");
    };

    const checkNull = () => {
    }
    
    const handleSave = () => {

    }
    
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