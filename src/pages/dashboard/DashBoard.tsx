import React, {useState} from "react";
import "./DashBoard.css";
import StatusCard from "../../components/status-card/StatusCard";
import {
  CalendarOutlined,
  CarryOutOutlined,
  UserSwitchOutlined,
  FileExcelOutlined,
  DesktopOutlined,
  CommentOutlined,
  NumberOutlined
} from "@ant-design/icons";
import AreaChart from "../../components/areachart/AreaChart";
import { Col, Row, DatePicker, Select, Space} from "antd";
import type { DatePickerProps, TimePickerProps } from 'antd';
import Calendarm from "../../components/calendar/Calendarm";
import StatusOverview from "../../module/status-overview/StatusOverview";
import MultipleRadialbars from "../../components/multiple-radialbars/MultipleRadialbars";
import MultipleRadialbars1 from "../../components/multiple-radialbars/MultipleRadialbars1";
import MultipleRadialbars2 from "../../components/multiple-radialbars/MultipleRadialbars2";

const { Option } = Select;

type PickerType = 'date';

const PickerWithType = ({
  type,
  onChange,
}: {
  type: PickerType;
  onChange: TimePickerProps['onChange'] | DatePickerProps['onChange'];
}) => {
  if (type === 'date') return <DatePicker onChange={onChange} />;
  return <DatePicker picker={type} onChange={onChange} />;
};


const DashBoard = () => {
  const [dataChart, setDataChart] = React.useState([0, 0, 0, 0, 0, 0, 0]);
  const [type, setType] = useState<PickerType>('date');
  const data = [
    {
      name: "Số thứ tự đã cấp",
      icon: <CalendarOutlined />,
      count: 100,
    },
    {
      name: "Số thứ tự đã sử dụng",
      icon: <CarryOutOutlined />,
      count: 100,
    },
    {
      name: "Số thứ tự đang chờ",
      icon: <UserSwitchOutlined />,
      count: 100,
    },
    {
      name: "Số thứ tự đã bỏ qua",
      icon: <FileExcelOutlined />,
      count: 100,
    },
  ];

  const data1 = [
    {
      name: "Thiết bị",
      chart: <MultipleRadialbars />,
      icon: <DesktopOutlined />,
      count: 100,
      label: "Đang hoạt động"
      // label:{
      //   "Đang hoạt động": 94,
      //   "Đã sử dụng": 6,
      // }
    },
    {
      name: "Dịch vụ",
      chart: <MultipleRadialbars1 />,
      icon: <CommentOutlined />,
      count: 100,
      label: "Đang hoạt động"
      // label:{
      //   "Đang hoạt động": 94,
      //   "Đã sử dụng": 6,
      // }

    },
    {
      name: "Cấp số",
      chart: <MultipleRadialbars2 />,
      icon: <NumberOutlined />,
      count: 100,
      label: "Đang hoạt động"
      // label: {
      //   "Đã sử dụng": 74,
      //   "Đang chờ": 20,
      //   "Bỏ qua": 6,
      // }
    },
  ];
  return (
      <Row className="dash-board-page">
        <Col span={17} className="dash-board">
          <h3 className="dash">DashBoard</h3>
          <h2>Biểu đồ cấp số</h2>
          <div className="col-6" style={{ display: "flex" }}>
            {data.map((item, index) => (
              <div className="col-6" key={index}>
                <StatusCard
                  icon={item.icon}
                  count={item.count}
                  title={item.name}
                />
              </div>
            ))}
          </div>

          <div className="chart">
            <h3>Bảng thống kê theo ngày</h3>
            <Space>
              <Select value={type} onChange={setType}>
                <Option value="date">Ngày</Option>
                <Option value="week">Tuần</Option>
                <Option value="month">Tháng</Option>
              </Select>
              {/* <PickerWithType type={type} onChange={(value) => console.log(value)} /> */}
            </Space>
            <AreaChart data={dataChart} />
          </div>
        </Col>

        <Col span={7} className="overview">
          <h2>Tổng quan</h2>
          <div className="col-6">
            {data1.map((item, index) => (
              <div className="col-6" key={index}>
                <StatusOverview
                  chart={item.chart}
                  icon={item.icon}
                  count={item.count}
                  title={item.name}
                  label={item.label}
                />
              </div>
            ))}
          </div>
          <Calendarm />
        </Col>
      </Row>
    
  );
};

export default DashBoard;
