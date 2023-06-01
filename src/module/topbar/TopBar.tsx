import React, { useEffect, useState } from "react";
import "./TopBar.css";
import InForm from "../../components/inform/InForm";
import User from "../../components/user/User";

const TopBar = () => {
  const [account, setAccount] = useState<any>([]);

  useEffect(() => {
    const account = localStorage.getItem("account");
    if (account) {
      setAccount(JSON.parse(account));
    }
  }, []);

  return (
    <div className="top-bar">
      <InForm />
      <User />
      <div className="user-name">
        <p>Xin chào</p>
        <h4>{account?.Ho_ten}</h4>
      </div>
    </div>
  );
};

export default TopBar;
