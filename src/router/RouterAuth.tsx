import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/sign-in/SignIn";
import ForgotPassword from "../pages/sign-in/forgot_password/ForgotPassword";

const RouterAuth = () => {
  return (
    <Routes>
      <Route path="/"  element={<SignIn />} />
      <Route path="sign-in"  element={<SignIn />} />
      <Route path="/forgot_password"  element={<ForgotPassword />} />
      <Route path="*"  element={<SignIn />} />
    </Routes>
  );
};

export default RouterAuth;
