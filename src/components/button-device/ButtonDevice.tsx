import React from 'react'
import './ButtonDevice.css'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { Button } from 'antd'
import { Link, useLocation } from 'react-router-dom'

const ButtonDevice = () => {
    const data = [
        {
            name: "Thêm thiết bị",
            path: "/adddevice",
            icon: <PlusOutlined />
        }
    ]
  return (

    <div>
        {data.map((item, index) => (
            <Link to={item.path} className="button-device_add">
                <span className='button-device_add-icon'>{item.icon}</span>
                <span className='button-device_add-name'>{item.name}</span>
            </Link>
        ))}
    </div>
    
    // <Button className="button-device_add" href="/adddevice">
    //     <PlusOutlined className="button-device_add-icon"/>
    //     <span>Thêm</span>
    //     <span>thiết bị</span>
    // </Button>

  )
}

export default ButtonDevice