import React from "react";
import { Route, Routes } from "react-router-dom";
import DashBoard from "../pages/dashboard/DashBoard";
import UserName from "../pages/user/UserName";
import Device from "../pages/device/Device";
import AddDevice from "../pages/device/add-device/AddDevice";
import DetailDevice from "../pages/device/detail-device/DetailDevice";
import UpdateDevice from "../pages/device/update-device/UpdateDevice";
import Service from "../pages/service/Service";
import AddService from "../pages/service/add-service/AddService";
import UpdateService from "../pages/service/update-service/UpdateService";
import Progression from "../pages/progression/Progression";
import AddProgression from "../pages/progression/addprogression/AddProgression";
import DetailProgression from "../pages/progression/detail-progression/DetailProgression";
import Report from "../pages/report/Report";
import RoleManagement from "../pages/setting/role-management/RoleManagement";
import AddRoleManagement from "../pages/setting/role-management/add-role-management/AddRoleManagement";
import UpdateRoleManagement from "../pages/setting/role-management/update-role-management/UpdateRoleManagement";
import AccountManagement from "../pages/setting/account-management/AccountManagement";
import AddAccountManagement from "../pages/setting/account-management/add-account-management/AddAccountManagement";
import UpdateAccountManagement from "../pages/setting/account-management/update-account-management/UpdateAccountManagement";
import UserManagement from "../pages/setting/user-management/UserManagement";
import SignIn from "../pages/sign-in/SignIn";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DashBoard/>} />
      <Route path="/device" element={<Device />} />
      <Route path="/adddevice" element={<AddDevice />} />
      <Route path="/detail-device/:deviceId" element={<DetailDevice />} />
      <Route path="/update-device/:deviceId" element={<UpdateDevice />} />
      <Route path="/service" element={<Service />} />
      <Route path="/addservice" element={<AddService />} />
      <Route path="/update-service/:serviceId" element={<UpdateService />} />
      <Route path="/progression" element={<Progression />} />
      <Route path="/addprogression" element={<AddProgression />} />
      <Route path="/report" element={<Report />} />
      <Route path="/detail-progression/:progressionId" element={<DetailProgression />} />
      <Route path="/role_management" element={<RoleManagement />} />
      <Route path="/add_role_management" element={<AddRoleManagement />} />
      <Route path="/update_role_management/:roleId" element={<UpdateRoleManagement />} />
      <Route path="/account_management" element={<AccountManagement />} />
      <Route path="/add_account_management" element={<AddAccountManagement />} />
      <Route path="/update_account_management/:accountId" element={<UpdateAccountManagement />} />
      <Route path="/user_management" element={<UserManagement />} />
      <Route path="/user" element={<UserName />} />
      <Route path="/sign-in"  element={<SignIn />} />

    </Routes>
  );
};

export default Router;
