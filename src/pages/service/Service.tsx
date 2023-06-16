import React, {useState} from 'react'
import { Row, Col } from 'antd'
import "./Service.css"
import {Space, Select, Input, DatePicker} from 'antd'
import database from '../../firebase/FireBase';
import { get, ref } from "firebase/database";
import {SearchOutlined, CaretRightOutlined} from '@ant-design/icons';
import ServiceTable from '../../module/Table/ServiceTable';
import ButtonDevice from '../../components/button-device/ButtonDevice';
import { PlusOutlined } from '@ant-design/icons';


interface service {
    Thong_tin_dich_vu: {
        Ma_dich_vu: string,
        Ten_dich_vu: string,
        Mo_ta: string,
        Trang_thai_hoat_dong: string,
    },
    Quy_tac_cap_so: {
        Tang_tu_dong: {
            Start: string,
            End: string,
        },
        Prefix: string,
        Surfix: string,
        Reset: boolean,
    }
}

const Service = () => {
    const [filterActive, setFilterActive] = useState("Tất cả");
    const [searchInput, setSearchInput] = useState("");
    const [service, setService] = useState<service[]>([]);
    const [service_show, setService_show] = useState<service[]>([]);
    const starCountRef = ref(database, "service");
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
          return setService_show(service);
        }
        const search = service.filter((item) => {
          return item.Thong_tin_dich_vu.Ten_dich_vu.includes(searchInput);
        });
        setService_show(search);
    };

   
    const handleChange = (filterActive: string) => {
        let services = [...service];
        if (filterActive !== "Tất cả") {
          services = services.filter(
            (item) => item.Thong_tin_dich_vu.Trang_thai_hoat_dong === filterActive
          );
        }
        setService_show(services);
    };

    React.useEffect(() => {
        get(starCountRef)
        .then((snapshot: any) => {
            if (snapshot.exists()) {
                setService(snapshot.val());
                setService_show(snapshot.val());
            } else {
                console.log("No data available");
            }
        })
        .catch((error: any) => {
            console.error(error);
        });

    }, []);


    return (
        <Row className='service-page'>
            <Col className="service">
                <div className='nav-ser'>
                    <h3 className='ser'>Dịch vụ &gt; </h3>
                    <h3 className='ser-list'>Danh sách dịch vụ</h3>
                </div>
                <h2>Danh sách dịch vụ</h2>
                <div className='service-list'>
                    <div className='active-status-service'>
                        <h4>Trạng thái hoạt động</h4>
                        <Space wrap>
                            <Select
                                defaultValue="Tất cả"
                                style={{ width: 280 }}
                                onChange={(value) => {
                                    setFilterActive(value);
                                    handleChange(value);
                                }}
                                value={filterActive}
                                options={[
                                { value: 'Tất cả', label: 'Tất cả' },
                                { value: 'Hoạt động', label: 'Hoạt động' },
                                { value: 'Ngưng hoạt động', label: 'Ngưng hoạt động' },
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
                        style={{ width: 280 }}
                        placeholder="Nhập từ khóa"
                        onChange={(e) => handleSearch(e.target.value)}
                        value={searchInput}
                        suffix={<SearchOutlined />}
                        />
                    </div>
                </div>
                <div className='table-service'>
                    <ServiceTable service_show={service_show} />
                    <ButtonDevice name="Thêm dịch vụ" path="/addservice" icon={<PlusOutlined />}/>
                </div>
            </Col>
            
        </Row>
        
    )
}

export default Service