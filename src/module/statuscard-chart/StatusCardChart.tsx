import React from 'react'

const StatusCardChart: React.FC<{icon: any, count: number, title: string}> = ({icon, count, title}) =>  {
  return (
    <div>
        <div className='status-card'>
            <div className="status-card__icon">
                {icon}
                <span>{title}</span>
            </div>
            <div className="status-card__count">
                <h4>{count}</h4>
            </div>
        </div>
    </div>
  )
}

export default StatusCardChart