import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import './UpdateService.css'
import { Checkbox, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { get, ref, set } from "firebase/database";
import database from "../../../firebase/FireBase";

interface service {
  Thong_tin_dich_vu: {
      Ma_dich_vu: string,
      Ten_dich_vu: string,
      Mo_ta: string,
      Trang_thai_hoat_dong: string,
  },
  Quy_tac_cap_so: {
      Tang_tu_dong: {
          Start: number,
          End: number,
      },
      Prefix: number,
      Surfix: number,
      Reset: boolean,
  }
}

const UpdateService = () => {
    const [ma_dich_vu, setMaDichVu] = useState("");
    const [ten_dich_vu, setTenDichVu] = useState("");
    const [mo_ta, setMoTa] = useState("");
    const [tang_start, setStart] = useState<number>();
    const [tang_end, setEnd] = useState<number>();
    const [prefix, setPrefix] = useState("");
    const [surfix, setSurfix] = useState("");
    const [reset, setReset] = useState<boolean>();
    const [service, setService] = useState<service[]>([]);
    const [service_show, setService_show] = useState<service[]>([]);
    const starCountRef = ref(database, "service/:serviceId");
    const { TextArea } = Input;
    const navigate = useNavigate();

    useEffect(() => {
        get(starCountRef)
        .then((snapshot: any) => {
            if (snapshot.exists()) {
            setService(snapshot.val());
            } else {
            console.log("No data available");
            }
        })
        .catch((error: any) => {
            console.error(error);
        });
    }, []);

    const handleCancel = () => {
        navigate("/service");
    };

    const handleSave = () => {
    
    };
    return (
        <Row className="update-service-page">
            <Col className="update-service">
                <div className="nav-update">
                <h3 className="ser">Thiết bị &gt; </h3>
                <h3 className="ser">Danh sách dịch vụ &gt; </h3>
                <h3 className="update-ser">Thêm dịch vụ</h3>
                </div>
                <h2> Quản lý dịch vụ</h2>
                <div className="update-list">
                <div className="update-list-ser"> 
                    <div className="update-list-input">
                    <h3>Thông tin dịch vụ</h3>
                    <div className="update-list-id">
                        <p>Mã dịch vụ</p>
                        <Input
                        style={{ width: 500 }}
                        placeholder="Nhập mã thiết bị"
                        onChange={(e) => setMaDichVu(e.target.value)}
                        />
                    </div>
                    <div className="update-list-name">
                        <p>Tên dịch vụ</p>
                        <Input
                        style={{ width: 500 }}
                        placeholder="Nhập tên thiết bị"
                        onChange={(e) => setTenDichVu(e.target.value)}
                        />
                    </div>
                    </div>
                    <div className="update-list-rule-number">
                    <div className="update-list-rule">
                        <h3>Quy tắc cấp số</h3>
                        <div className="update-list-rule1"><Checkbox/> <p>Tăng tự động từ</p></div>
                        <div className="update-list-rule1"><Checkbox/> <p>Prefix</p></div>
                        <div className="update-list-rule1"><Checkbox/> <p>Surfix</p></div>
                        <div className="update-list-rule1"><Checkbox/> <p>Reset mỗi ngày</p></div>               
                    </div>
                    <div className="update-list-number">
                        <div className="update-list-number1">
                        <Input/>
                        <p>đến</p>
                        <Input/>
                        </div>
                        <div className="update-list-number1">
                        <Input/>
                        </div>
                        <div className="update-list-number1">
                        <Input/>
                        </div>
                    </div>
                    </div>
                    <h5>* Là trường thông tin bắt buộc</h5>
                </div>
                <div className="update-list_form-description">
                    <p>Mô tả</p>
                    <TextArea 
                    className="form-control"
                    style={{ width: 500, height: 110 }}
                    placeholder="Nhập mô tả"
                    rows={4} 
                    maxLength={6} 
                    />  
                </div>           
                </div> 
                <div className="update-list__button">
                <Button className="update-list__button-cancel" onClick={handleCancel}>
                    Hủy bỏ
                </Button>
                <Button className="update-list__button-update-service" onClick={handleSave}>
                    Cập nhật
                </Button>
                </div>
            </Col>
        </Row>
    )
}

export default UpdateService