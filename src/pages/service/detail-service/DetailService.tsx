import React, {useState, useEffect} from 'react'
import './DetailService.css'
import { Row, Col, Input, Checkbox, Space, DatePicker, Select  } from 'antd'
import { ref, get } from 'firebase/database'
import DetailSerTable from '../../../module/Table/DetailSerTable'
import database from '../../../firebase/FireBase'
import ButtonDevice from '../../../components/button-device/ButtonDevice'
import { PlusOutlined, SearchOutlined, CaretRightOutlined, RollbackOutlined } from '@ant-design/icons'

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

interface progression {
    So_thu_tu: number,
    Ho_ten: string,
    Ten_dich_vu: string,
    Thoi_gian_cap: string,
    Han_su_dung: string,
    Nguon_cap: string,
    Trang_thai: string,
    So_dien_thoai: string,
    Email: string
}

const DetailService = () => {
    const [filterActive, setFilterActive] = useState("Tất cả");
    const [searchInput, setSearchInput] = useState("");
    const [progression_show, setProgression_show] = useState<progression[]>([]);
    const [progression, setProgression] = useState<progression[]>([]);
    const starCountRef = ref(database, "progression");
    const dateFormatList = ['DD/MM/YYYY'];

    const handleGetStartDate = (date: any, dateString: any) => {
        console.log(dateString);
    }

    const handleGetEndDate = (date: any, dateString: any) => {
        console.log(dateString);
    }

    const handleSearch = (value: string) => {
        setSearchInput(value);
        if (value === "") {
          return setProgression_show(progression);
        }
        const search = progression.filter((item) => {
          return item.Ten_dich_vu.includes(searchInput);
        });
        setProgression_show(search);
    };

   
    const handleChange = (filterActive: string) => {
        let progressions = [...progression];
        if (filterActive !== "Tất cả") {
          progressions = progressions.filter(
            (item) => item.Trang_thai === filterActive
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
        <Row className='detail-service-page'>
            <Col className='detail-service'>
                <div className="nav-add">
                    <h3 className="ser">Dịch vụ &gt; </h3>
                    <h3 className="ser">Danh sách dịch vụ &gt; </h3>
                    <h3 className="add-ser">Chi tiết</h3>
                </div>
                <h2>Quản lý dịch vụ</h2>   
                <div className="detail-service__form">
                    <div className="detail-service__detail">
                        <h3>Thông tin dịch vụ</h3>
                        <p>Mã dịch vụ:</p>
                        <br />
                        <p>Tên dịch vụ: </p>
                        <br />
                        <p>Mô tả: </p>
                        <h3>Quy tắc cấp số</h3>
                        <div className="detail-service-rule-number">
                            <div className="detail-service-rule">
                                <div className="detail-service-rule1"><Checkbox/> <p>Tăng tự động từ</p></div>
                                <div className="detail-service-rule1"><Checkbox/> <p>Prefix</p></div> 
                                <div className="detail-service-rule1"><p>Reset mỗi ngày</p></div>              
                            </div>
                            <div className="detail-service-number">
                                <div className="detail-service-number1">
                                    <Input/>
                                    <p>đến</p>
                                    <Input/>
                                </div>
                                <div className="detail-service-number1">
                                    <Input/>
                                </div>
                            </div>  
                        </div>                  
                    </div>
                   <div className="detail-service__status-table">
                        <div className="detail-service__status">
                            <div className='active-status-service'>
                                <h4>Trạng thái hoạt động</h4>
                                <Space wrap>
                                    <Select
                                        defaultValue="Tất cả"
                                        style={{ width: 160 }}
                                        onChange={(value) => {
                                            setFilterActive(value);
                                            handleChange(value);
                                        }}
                                        value={filterActive}
                                        options={[
                                        { value: 'Tất cả', label: 'Tất cả' },
                                        { value: 'Đang chờ', label: 'Đang chờ' },
                                        { value: 'Đã sử dụng', label: 'Đang sử dụng' },
                                        { value: 'Bỏ qua', label: 'Bỏ qua' },
                                        ]}
                                    />
                                </Space>
                            
                            </div>
                            <div className='time'>
                                <h4>Chọn thời gian</h4>
                                <DatePicker onChange={handleGetStartDate} format={dateFormatList} className="date" />
                                <CaretRightOutlined />
                                <DatePicker onChange={handleGetEndDate} format={dateFormatList} className="date" />
                                        
                            </div>
                            <div className='key-word'>
                                <h4>Từ khóa</h4>
                                <Input
                                className="form-control"
                                style={{ width: 200 }}
                                placeholder="Nhập từ khóa"
                                onChange={(e) => handleSearch(e.target.value)}
                                value={searchInput}
                                suffix={<SearchOutlined />}
                                />
                            </div>
                        </div>
                        <div className='table-detail-service'>
                            <DetailSerTable progression_show={progression_show} />
                        </div>
                    </div>
                    
                
                    <div className='table-service'>
                        <ButtonDevice 
                            name="Cập nhật danh sách" 
                            path="/update-service/:serviceId" 
                            icon={<PlusOutlined />}
                        />
                        <ButtonDevice
                            name="Quay lại"
                            path={`/service`}
                            icon={<RollbackOutlined />}
                        />
                    </div>
                </div>

                
            </Col>
        </Row>
    )
}

export default DetailService