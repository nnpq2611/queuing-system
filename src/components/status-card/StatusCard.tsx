import React from 'react'
import './StatusCard.css'


const StatusCard: React.FC<{icon: any, count: number, title: string}> = ({icon, count, title}) => {
  return (
    <div className='status-card'>
        <div className="status-card__icon">
            {icon}
            <span>{title}</span>
        </div>
        <div className="status-card__count">
            <h4>{count}</h4>
        </div>
    </div>
  )
}

export default StatusCard