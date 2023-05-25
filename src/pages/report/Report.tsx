import React, {useState} from 'react'
import "./Report.css"
import {Row, Col, DatePicker, Button} from "antd";
import {CaretRightOutlined} from '@ant-design/icons';
import database from '../../firebase/FireBase';
import { ref, get } from "firebase/database";
import ReportTable from '../../module/Table/ReportTable';
import ButtonReport from '../../components/button-report/ButtonReport';
import { DownloadOutlined } from '@ant-design/icons';
import { CSVLink } from "react-csv";

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
    const csvLink = React.useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);
    const [csvData, setCsvData] = useState<any>([]);
    const [fileName, setFileName] = useState<string>("");

    const handleGetStartDate = (date: any, dateString: any) => {
        console.log(dateString);
    };

    const handleGetEndDate = (date: any, dateString: any) => {
        console.log(dateString);
    };
    const handleDowload = () => {
        const filteredData = report.map((item) => ({
            So_thu_tu: item.So_thu_tu,
            Ten_dich_vu: item.Ten_dich_vu,
            Thoi_gian_cap: item.Thoi_gian_cap,
            Trang_thai: item.Trang_thai,
            Nguon_cap: item.Nguon_cap,
          }));
        
          const csvData = filteredData;
          const fileName = 'report';
        
          setCsvData(csvData);
          setFileName(`${fileName}.csv`);
        
          setTimeout(() => {
            if (csvLink.current) csvLink.current.link.click();
        }, 100);
    }

    React.useEffect(() => {
        get(starCountRef)
        .then((snapshot: any) => {
            if (snapshot.exists()) {
            setReport(snapshot.val());
            setReportShow(snapshot.val());
            } else {
            console.log("No data available");
            }
        })
        .catch((error: any) => {
            console.error(error);
        });
    }, []);
    


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
                    <ButtonReport
                        name="Cấp số mới"
                        icon={<DownloadOutlined />}
                        onClick={handleDowload}
                    />
                </div>
                <CSVLink data={csvData} filename={`${fileName}.csv`} className="hidden" ref={csvLink} target="_blank" />
            </Col>
        </Row>
    )
}

export default Report