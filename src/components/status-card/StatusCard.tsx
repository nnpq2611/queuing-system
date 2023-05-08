import React from 'react'
import './StatusCard.css'


const StatusCard = (item:any) => {
  return (
    <div className='status-card'>
        <div className="status-card__icon">
            <i className={item.icon}></i>
            <span>{item.name}</span>
        </div>
        <div className="status-card__count">
            <h4>{item.count}</h4>
        </div>
    </div>
  )
}

export default StatusCard