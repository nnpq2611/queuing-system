import React, {useState} from 'react'
import "./Report.css"
import {Row, Col, DatePicker} from "antd";
import {CaretRightOutlined} from '@ant-design/icons';
import database from '../../firebase/FireBase';
import { ref } from "firebase/database";
import ReportTable from '../../module/Table/ReportTable';
import ButtonDevice from '../../components/button-device/ButtonDevice'
import { DownloadOutlined } from '@ant-design/icons';

interface progression {
    So_thu_tu: number,
    Ho_ten: string,
    Ten_dich_vu: string,
    Thoi_gian_cap: string,
    Han_su_dung: string,
    Nguon_cap: string,
    Trang_thai: string,
}


const Report = () => {
    const [report, setReport] = useState<progression[]>([]);
    const [report_show, setReportShow] = useState<progression[]>([]);
    const starCountRef = ref(database, "progression");
    const dateFormatList = ['DD/MM/YYYY'];

    const handleGetStartDate = (date: any, dateString: any) => {
        console.log(dateString);
    };

    const handleGetEndDate = (date: any, dateString: any) => {
        console.log(dateString);
    };

    return (
        <Row className="report-page">
            <Col className="report">
                <div className="nav-rep">
                    <h3 className="rep">Dịch vụ &gt; </h3>
                    <h3 className="rep-list">Lập báo cáo</h3>
                </div>
                <div className="time">
                    <h4>Chọn thời gian</h4>
                    <DatePicker
                    onChange={handleGetStartDate}
                    format={dateFormatList}
                    className="date"
                    />
                    <CaretRightOutlined />
                    <DatePicker
                    onChange={handleGetEndDate}
                    format={dateFormatList}
                    className="date"
                    />
                </div>
                <div className="table-report">
                    <ReportTable report_show={report_show} />
                    <ButtonDevice
                        name="Cấp số mới"
                        path="/download"
                        icon={<DownloadOutlined />}
                    />
                </div>
            </Col>
        </Row>
    )
}

export default Report