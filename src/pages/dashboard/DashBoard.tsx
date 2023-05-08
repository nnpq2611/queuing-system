import React from 'react'
import './DashBoard.css'
import StatusCard from '../../components/status-card/StatusCard'
import { CalendarOutlined, CarryOutOutlined, UserSwitchOutlined, FileExcelOutlined } from '@ant-design/icons';
import AreaChart from '../../components/areachart/AreaChart';
import DatePickerm from '../../components/date-picker/DatePicker';



const DashBoard = () => {
  const [dataChart, setDataChart] = React.useState([0, 0, 0, 0, 0, 0, 0]);
  const data = [
    {
      name: "Số thứ tự đã cấp",
      icon: <CalendarOutlined />,
      count: 69,
    },
    {
      name: "Số thứ tự đã sử dụng",
      icon: <CarryOutOutlined />,
      count: 69,
    },
    {
      name: "Số thứ tự đang chờ",
      icon: <UserSwitchOutlined />,
      count: 69,
    },
    {
      name: "Số thứ tự đã bỏ qua",
      icon: <FileExcelOutlined />,
      count: 69,
    },
  ];

  return (
    <div className='dash-board-page'>
      <div className='dash-board'>
        <h2>Biểu đồ cấp</h2>
        <div className="col-6" style={{display: "flex"}}>
        {
          data.map((item, index) => (
              <div className="col-6" key={index}>
                  <StatusCard
                      icon={item.icon}
                      count={item.count}
                      title={item.name}
                  />
              </div>
          ))
        }
        </div>

        <div className="chart">
          <h3>Bảng thống kê theo ngày</h3>
          <DatePickerm/>
          <AreaChart data={dataChart} />
        </div>
      </div>

      <div className='overview'>
        {/* <h2>Tổng quan</h2> */}

      </div>

      
    </div>
    
  )
}

export default DashBoard