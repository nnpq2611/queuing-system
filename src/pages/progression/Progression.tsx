import React, { useState } from "react";
import { Space, Select, Input, DatePicker } from "antd";
import database from "../../firebase/FireBase";
import { get, ref } from "firebase/database";
import { SearchOutlined, CaretRightOutlined } from "@ant-design/icons";
import ProgressionTable from "../../module/Table/ProgressionTable";
import { Row, Col } from "antd";
import "./Progression.css";
import { PlusOutlined } from "@ant-design/icons";
import ButtonDevice from "../../components/button-device/ButtonDevice";

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

const Progression = () => {
    const [filterService, setFilterService] = useState("Tất cả");
    const [filterSource, setFilterSource] = useState("Tất cả");
    const [filterActive, setFilterActive] = useState("Tất cả");
    const [searchInput, setSearchInput] = useState("");
    const [progression, setProgression] = useState<progression[]>([]);
    const [progression_show, setProgression_show] = useState<progression[]>([]);
    const [capSo, setCapSo] =  useState<{label: string, value: string}[]>([]);
    const starCountRef = ref(database, "progression");
    const dateFormatList = ["DD/MM/YYYY"];

    const handleGetStartDate = (date: any, dateString: any) => {
        console.log(dateString);
    };

    const handleGetEndDate = (date: any, dateString: any) => {
        console.log(dateString);
    };

    const handleSearch = (value: string) => {
        setSearchInput(value);
        if (value === "") {
        return setProgression_show(progression);
        }
        const search = progression.filter((item) => {
        return item.Ho_ten.includes(searchInput);
        });
        setProgression_show(search);
    };

    const handleChange = (filterActive: string, filterService: string, filterSource: string) => {
        let progressions = [...progression];
        if (filterActive !== "Tất cả") {
            progressions = progressions.filter(
                (item) => item.Trang_thai === filterActive
            );
        }

        if (filterService !== "Tất cả") {
            progressions = progressions.filter(
                (item) => item.Ten_dich_vu === filterService
            );
        }

        if (filterSource !== "Tất cả") {
            progressions = progressions.filter(
                (item) => item.Nguon_cap === filterSource
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
            const capSo = snapshot.val().map((item: any) => item.Ten_dich_vu).filter((value: any, index: any, self: any) => self.indexOf(value) === index);
            setCapSo(capSo.map((item: any) => ({value: item, label: item})));
    
            } else {
            console.log("No data available");
            }
        })
        .catch((error: any) => {
            console.error(error);
        });
    }, []);

    return (
        <Row className="progression-page">
        <Col className="progression">
            <div className="nav-pro">
                <h3 className="pro">Dịch vụ &gt; </h3>
                <h3 className="pro-list">Danh sách cấp số</h3>
            </div>
            <h2>Quản lý cấp số</h2>
            <div className="progression-list">
                <div className="service-status-progression">
                    <h4>Tên dịch vụ</h4>
                    <Space wrap>
                        <Select
                            defaultValue="Tất cả"
                            style={{ width: 148 }}
                            onChange={(value) => {
                            setFilterService(value);
                            handleChange(filterActive, value, filterSource);
                            }}
                            value={filterService}
                            options={[
                            { value: "Tất cả", label: "Tất cả" },
                            // { value: "Khám tim mạch", label: "Khám tim mạch" },
                            // { value: "Khám tai mũi họng", label: "Khám tai mũi họng" },
                            // { value: "Khám sản - Phụ khoa", label: "Khám sản - Phụ khoa" },
                            ...capSo
                            ]}
                        />
                    </Space>
                </div>

                <div className="status-progression">
                    <h4>Trạng thái</h4>
                    <Space wrap>
                        <Select
                            defaultValue="Tất cả"
                            style={{ width: 148 }}
                            onChange={(value) => {
                                setFilterActive(value);
                                handleChange(value, filterService, filterSource);
                            }}
                            value={filterActive}
                            options={[
                            { value: "Tất cả", label: "Tất cả" },
                            { value: "Đang chờ", label: "Đang chờ" },
                            { value: "Đã sử dụng", label: "Đã sử dụng" },
                            { value: "Bỏ qua", label: "Bỏ qua" },
                            ]}
                        />
                    </Space>
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

                <div className="source-status-progression">
                    <h4>Nguồn cấp</h4>
                    <Space wrap>
                        <Select
                            defaultValue="Tất cả"
                            style={{ width: 148 }}
                            onChange={(value) => {
                            setFilterSource(value);
                            handleChange(filterActive, filterService, value);
                            }}
                            value={filterSource}
                            options={[
                            { value: "Tất cả", label: "Tất cả" },
                            { value: "Kiosk", label: "Kiosk" },
                            { value: "Hệ thống", label: "Hệ thống" },
                            ]}
                        />
                    </Space>
                </div>

                <div className="key-word">
                    <h4>Từ khóa</h4>
                    <Input
                    className="form-control"
                    style={{ width: 268 }}
                    placeholder="Nhập từ khóa"
                    onChange={(e) => handleSearch(e.target.value)}
                    value={searchInput}
                    suffix={<SearchOutlined />}
                    />
                </div>
            </div>
            <div className="table-progression">
                <ProgressionTable progression_show={progression_show} />
                <ButtonDevice
                    name="Cấp số mới"
                    path="/addprogression"
                    icon={<PlusOutlined />}
                />
            </div>
        </Col>
        </Row>
    );
};

export default Progression;
