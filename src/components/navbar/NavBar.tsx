import React, { useState } from "react";
import { Menu } from "antd";
import { Link} from "react-router-dom";
import {
  SettingOutlined,
  DesktopOutlined,
  CommentOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  NumberOutlined,
} from "@ant-design/icons";

const NavBar = () => {
  const [current, setCurrent] = useState("home");
  const handleClick = (e: any) => {
    setCurrent(e.key);
  };

  const menuItems = [
    {
      key: "dashboard",
      title: "Dashboard",
      path: "/",
      icon: <AppstoreOutlined />,
    },
    {
      key: "device",
      title: "Thiết bị",
      path: "/device",
      icon: <DesktopOutlined />,
    },
    {
      key: "service",
      title: "Dịch vụ",
      path: "/service",
      icon: <CommentOutlined />,
    },
    {
      key: "progression",
      title: "Cấp số",
      path: "/progression",
      icon: <NumberOutlined />,
    },
    {
      key: "report",
      title: "Báo cáo",
      path: "/report",
      icon: <BarChartOutlined />,
    },
  ];

  const subMenuItems = [
    { key: "role", title: "Quản lý vai trò", path: "/role" },
    { key: "account", title: "Quản lý tài khoản", path: "/account" },
    { key: "user", title: "Quản lý người dùng", path: "/user" },
  ];

  return (
    <div style={{ width: 230 }} className="navbar">
      <Menu selectedKeys={[current]} onClick={handleClick}>
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        ))}
        <Menu.SubMenu
          key="subMenu"
          title="Cài đặt hệ thống"
          icon={<SettingOutlined />}
        >
          {subMenuItems.map((item) => (
            <Menu.Item key={item.key}>
              <Link to={item.path}>{item.title}</Link>
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};

export default NavBar;
