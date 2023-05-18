import React, {useState} from 'react'
import { Row, Col } from 'antd'
import "./Service.css"
import {Space, Select, Input, DatePicker} from 'antd'
import database from '../../firebase/FireBase';
import { get, ref } from "firebase/database";
import {SearchOutlined, CaretRightOutlined} from '@ant-design/icons';
import ServiceTable from '../../module/Table/ServiceTable';

interface service{
    Ma_dich_vu: string;
    Ten_dich_vu:string;
    Mo_ta: string;
    Trang_thai_hoat_dong: string;
}
// interface service {
//     Thong_tin_dich_vu: {
//         Ma_dich_vu: number,
//         Ten_dich_vu: string,
//         Mo_ta: string,
//         Trang_thai_hoat_dong: string,
//     },
//     Quy_tac_cap_so: {
//         Tang_tu_dong: {
//             Start: number,
//             End: number,
//         },
//         Prefix: number,
//         Surfix: number,
//         Reset: boolean,
//     }
// }

const Service = () => {
    const [active, setActive] = React.useState('Tất cả');
    const [searchInput, setSearchInput] = useState("");
    const [service, setService] = useState<service[]>([]);
    const [service_show, setService_show] = useState<service[]>([]);
    const [danh_sach_thiet_bi, set_danh_sach_thiet_bi] = useState<{label: string, value: string}[]>([]);
    const starCountRef = ref(database, "service");
    const dateFormatList = ['DD/MM/YYYY'];
    const handleChange = (value: any) => {
        console.log(`selected ${value}`);
    }

    React.useEffect(() => {
    get(starCountRef)
        .then((snapshot: any) => {
            if (snapshot.exists()) {
            setService(snapshot.val());
            setService_show(snapshot.val());
            const danh_sach_thiet_bi = snapshot.val().map((item: any) => item.Ten_thiet_bi).filter((value: any, index: any, self: any) => self.indexOf(value) === index);
            set_danh_sach_thiet_bi(danh_sach_thiet_bi.map((item: any) => ({value: item, label: item})));
            } else {
            console.log("No data available");
            }
        })
        .catch((error: any) => {
            console.error(error);
        });

    }, []);

    const handleGetStartDate = (date: any, dateString: any) => {
        console.log(dateString);
    }

    const handleGetEndDate = (date: any, dateString: any) => {
        console.log(dateString);
    }

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
                            onChange={handleChange}
                            value={active}
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
                        value={searchInput}
                        suffix={<SearchOutlined />}
                        />
                    </div>
                </div>
                <div className='btn-add-vervice'>
                    <ServiceTable service_show={service_show} />

                </div>
            </Col>
            
        </Row>
        
    )
}

export default Service