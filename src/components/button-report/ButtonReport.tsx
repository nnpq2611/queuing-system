import React from 'react'
import "./ButtonReport.css"
import { Button } from "antd";


const ButtonReport: React.FC<{ icon: any; name: string; onClick: any }> = ({
    icon,
    name,
    onClick,
  }) => {
    
    return (
        <Button onClick={onClick} className="button-report_add">
            <span className="button-report_add-icon">{icon}</span>
            <span className="button-report_add-name">{name}</span>
        </Button>
    
    )
}

export default ButtonReport