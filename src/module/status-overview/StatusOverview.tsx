import React from 'react'
import './StatusOverview.css'
import {Col, Row} from 'antd'

const StatusOverview: React.FC<{chart:any, icon: any, count: number, title: string, label: any}> = ({chart, icon, count, title, label}) => {
  return (
    <Row className='status-overview'>
          <Col span={8}>
            {chart}
          </Col>
          <Col span={7} className='overview_count'>
              <span>{count}</span>
              <div className='overview_title'>
                  {icon}
                  {title}
              </div>
          </Col>
          <Col span={9} className='overview_label'>
              {label}
          </Col>      
        </Row>
  )
}

export default StatusOverview