import React from 'react'
import './InForm.css'
import { BellOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';

const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <h3>Thông báo</h3>
      ),
    },
    {
      key: '2',
      label: [
        <h4>Người dùng: Nguyễn Thị Thùy Dung</h4> ,
        <p>Thời gian nhận số: 12h20 ngày 30/11/2021</p>
      ]
    },
    {
      key: '3',
      label: [
        <h4>Người dùng: Nguyễn Thị Thùy Dương</h4> ,
        <p>Thời gian nhận số: 12h20 ngày 30/11/2021</p>
      ]
    },
    {
        key: '4',
        label: [
            <h4>Người dùng: Nguyễn Thị Ngọc Mai</h4> ,
            <p>Thời gian nhận số: 12h20 ngày 30/11/2021</p>
        ]
    },
    {
        key: '5',
        label: [
            <h4>Người dùng: Nguyễn Thị Thùy Dung</h4> ,
            <p>Thời gian nhận số: 12h20 ngày 30/11/2021</p>
        ]
    },
];

const InForm = () => {
  return (
    <div className='in-form'>
        <Dropdown menu={{ items }} placement="bottom" arrow>
            <BellOutlined />
        </Dropdown>
    </div>
  )
}

export default InForm