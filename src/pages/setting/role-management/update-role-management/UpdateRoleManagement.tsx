import React, {useState, useEffect} from 'react'
import "./UpdateRoleManagement.css"
import { Row, Col, Input, Button, Checkbox } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { ref, set, get } from "firebase/database"
import database from '../../../../firebase/FireBase'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'


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

const UpdateRoleManagement = () => {
    const [ten_vai_tro, setTenVaiTro] = useState<string>("")
    const [mo_ta, setMoTa] = useState<string>("")
    const [chuc_nang_tat_ca1, setChucNangTatCa1] = useState<CheckboxValueType[]>([])
    const [chuc_nang_tat_ca2, setChucNangTatCa2] = useState<CheckboxValueType[]>([])
    const [role_management, setRoleManagement] = useState<role[]>([])
    const { roleId } = useParams()
    const starCountRef = ref(database, `role/${roleId}`)
    const navigate = useNavigate()

    const getRole = () => {
        get(starCountRef)
          .then((snapshot: any) => {
            if (snapshot.exists()) {
                setTenVaiTro(snapshot.val().Ten_vai_tro);
                setMoTa(snapshot.val().Mo_ta);
                setChucNangTatCa1(snapshot.val().Phan_quyen.A.Chuc_nang_X ? chuc_nang_tat_ca1.concat("A1") : chuc_nang_tat_ca1)
                setChucNangTatCa1(snapshot.val().Phan_quyen.A.Chuc_nang_Y ? chuc_nang_tat_ca1.concat("A2") : chuc_nang_tat_ca1)
                setChucNangTatCa1(snapshot.val().Phan_quyen.A.Chuc_nang_Z ? chuc_nang_tat_ca1.concat("A3") : chuc_nang_tat_ca1)
                setChucNangTatCa2(snapshot.val().Phan_quyen.B.Chuc_nang_X ? chuc_nang_tat_ca2.concat("B1") : chuc_nang_tat_ca2)
                setChucNangTatCa2(snapshot.val().Phan_quyen.B.Chuc_nang_Y ? chuc_nang_tat_ca2.concat("B2") : chuc_nang_tat_ca2)
                setChucNangTatCa2(snapshot.val().Phan_quyen.B.Chuc_nang_Z ? chuc_nang_tat_ca2.concat("B3") : chuc_nang_tat_ca2)

            } else {
              console.log("No data available");
            }
          })
          .catch((error: any) => {
            console.error(error);
          });
      };

    const handleCancel = () => {
        navigate("/role_management");
    };

    const checkNull = () => {
        return(
            ten_vai_tro === "" || 
            mo_ta === ""
        )
    }
    
    const handleSave = () => {
        if (checkNull()) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
          }
          const data = {
            Ten_vai_tro: ten_vai_tro,
            Mo_ta: mo_ta,
            Phan_quyen: {
                A:{
                    Chuc_nang_X: chuc_nang_tat_ca1.includes("A1"),
                    Chuc_nang_Y: chuc_nang_tat_ca1.includes("A2"),
                    Chuc_nang_Z: chuc_nang_tat_ca1.includes("A3"),
                },
                B:{
                    Chuc_nang_X: chuc_nang_tat_ca2.includes("B1"),
                    Chuc_nang_Y: chuc_nang_tat_ca2.includes("B2"),
                    Chuc_nang_Z: chuc_nang_tat_ca2.includes("B3"),
                }
            }
          };
          set(ref(database, `role/${roleId}`), data);
          navigate("/role_management");
        
    }

    useEffect(() => {
        getRole();
      }, []);
    
    return (
        <Row className="update-role_page">
            <Col className="update-role_management">
                <div className="nav_update-role">
                    <h3 className="update-role">Cài đặt hệ thống &gt; </h3>
                    <h3 className="update-role">Quản lý vai trò &gt; </h3>
                    <h3 className="update-role_list">Thêm vai trò</h3>
                </div>
                <h2>Danh sách vai trò</h2>
                <div className="update-role_form">
                    <h3>Thông tin vai trò</h3>
                    <div className="update-role_form-role-type">
                        <div className="update-role_form-title">
                            <h4>Tên vai trò</h4>
                            <Input
                                value={ten_vai_tro}
                                onChange={(e) => setTenVaiTro(e.target.value)}
                                className="form-control"
                                style={{ width: 500, height: 40 }}
                                placeholder="Nhập tên vai trò"
                            />                    
                            <div className="update-role_form-description">
                                <h4>Mô tả</h4>
                                <Input.TextArea 
                                    value={mo_ta}
                                    onChange={(e) => setMoTa(e.target.value)}
                                    className="form-control"
                                    style={{ width: 500, height: 150 }}
                                    placeholder="Nhập mô tả"
                                    rows={4}  
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
                                    value={chuc_nang_tat_ca1}
                                    onChange={(e) => setChucNangTatCa1(e)}
                                >
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
                                <Checkbox.Group 
                                    style={{ width: '100%' }}
                                    value={chuc_nang_tat_ca2}
                                    onChange={(e) => setChucNangTatCa2(e)}
                                >
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
                <div className="update-role_form-button">
                    <Button className="update-role_form-button-cancel" onClick={handleCancel}>Hủy bỏ</Button>
                    <Button className="update-role_form-button-save" onClick={handleSave}>Cập nhật</Button>
                </div>                                
            </Col>
        </Row>
    )
}

export default UpdateRoleManagement