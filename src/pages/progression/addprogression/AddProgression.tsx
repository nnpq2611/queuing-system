import React from 'react'
import {Space, Select, Row, Col,Modal} from 'antd'
import "./AddProgression.css"
import { Button } from 'antd';
import { useState } from 'react';
import database from '../../../firebase/FireBase';
import { get, ref } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

interface progression {
    So_thu_tu: number;
    Ho_ten: string;
    Ten_dich_vu: string;
    Thoi_gian_cap: string;
    Han_su_dung: string;
    Nguon_cap: string;
    Trang_thai: string;
    So_dien_thoai: string;
    Email: string;
}
  

const AddProgression = () => {
    const [filterService, setFilterService] = React.useState("Chọn dịch vụ");
    const [progression, setProgression] = useState<progression[]>([]);
    const [progression_show, setProgression_show] = useState<progression[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    
    const handleComeBack = () => {
        navigate("/progression");
    };    

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const starCountRef = ref(database, "progression");
    const handleChange = (filterService: string) => {
        let progressions = [...progression];
        if (filterService !== "Tất cả") {
            progressions = progressions.filter(
                (item) => item.Ten_dich_vu === filterService
            );
        }
        setProgression_show(progressions);
    };
    React.useEffect(() => {
        get(starCountRef)
        .then((snapshot: any) => {
            if (snapshot.exists()) {
            setProgression(snapshot.val());
            setProgression_show(snapshot.val());
            } else {
            console.log("No data available");
            }
        })
        .catch((error: any) => {
            console.error(error);
        });
    }, []);

    return (
        <Row className='add-progression-page'>
            <Col className='add-progression'>
                <div className='nav-add'>
                    <h3 className='pro'>Cấp số &gt; </h3>
                    <h3 className='pro'>Danh sách cấp số &gt; </h3>
                    <h3 className='add-pro'>Cấp số mới</h3>
                </div>
                <h2> Quản lý cấp số</h2>
                <div className='add-list'>
                    <h1>Cấp số mới</h1>
                    <h3>Dịch vụ khách hàng lựa chọn</h3>
                    <Space wrap>
                        <Select
                            defaultValue="Tất cả"
                            style={{ width: 350 , height: 40}}
                            onChange={(value) => {
                            setFilterService(value);
                            handleChange(value);
                            }}
                            value={filterService}
                            options={[
                            { value: "Tất cả", label: "Tất cả" },
                            { value: "Khám tim mạch", label: "Khám tim mạch" },
                            { value: "Khám tai mũi họng", label: "Khám tai mũi họng" },
                            { value: "Khám sản - Phụ khoa", label: "Khám sản - Phụ khoa" },
                            ]}
                        />
                    </Space>
                    <div className='add-list__button'>
                        <Button className='add-list__button-cancel' onClick={handleComeBack}>Hủy bỏ</Button>
                        <Button className='add-list__button-add-progression' onClick={showModal} >In số</Button>
                    </div>
                </div>
                <Modal
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={null}
                    className="custom-modal"
                    width={400}
                >                    
                    <h2>Số thứ tự được cấp</h2>
                    <h1>2001201</h1>
                    <h4>DV: Khám răng hàm mặt (tại quầy số 1)</h4>
                    <div className='date-time'>
                        <p>Thời gian cấp: 09:30 11/10/2021</p>
                        <p>Hạn sử dụng: 10:30 11/10/2021</p>
                    </div>
                    

                </Modal>
            </Col>            
        </Row>
    )
}

export default AddProgression