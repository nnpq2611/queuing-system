import React from "react";
import { Route, Routes } from "react-router-dom";
import DashBoard from "../pages/dashboard/DashBoard";
import UserName from "../pages/user/UserName";
// import Device from "../pages/device/Device";
// import Service from "../pages/service/Service";
// import Progression from "../pages/progression/Progression";
// import Report from "../pages/report/Report";
// import RoleManagement from "../pages/role_management/RoleManagement";
// import AccountManagement from "../pages/account_management/AccountManagement";
// import UserManagement from "../pages/user_management/UserManagement";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DashBoard/>} />
      {/* <Route path="/device" element={<Device />} /> */}
      {/* <Route path="/service" element={<Service />} /> */}
      {/* <Route path="/progression" element={<Progression />} /> */}
      {/* <Route path="/report" element={<Report />} /> */}
      {/* <Route path="/role_management" element={<RoleManagement />} /> */}
      {/* <Route path="/account_management" element={<AccountManagement />} /> */}
      {/* <Route path="/user_management" element={<UserManagement />} /> */}
      <Route path="/user" element={<UserName />} />

    </Routes>
  );
};

export default Router;
