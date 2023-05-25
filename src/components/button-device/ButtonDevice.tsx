import React from "react";
import "./ButtonDevice.css";
import { Link } from "react-router-dom";

const ButtonDevice: React.FC<{ icon: any; name: string; path: string }> = ({
  icon,
  name,
  path,
}) => {
  return (
    <div>
      <Link to={path} className="button-device_add">
        <span className="button-device_add-icon">{icon}</span>
        <span className="button-device_add-name">{name}</span>
      </Link>
    </div>
  );
};

export default ButtonDevice;
