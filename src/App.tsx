import React, { useEffect, useState } from "react";
import "./App.css";
import MenuBar from "./module/menubar/MenuBar";
import { BrowserRouter } from "react-router-dom";
import TopBar from "./module/topbar/TopBar";
import Router from "./router/Router";
import RouterAuth from "./router/RouterAuth";

function App() {
  const [account, setAccount] = useState<any>();
  useEffect(() => {
    const account = localStorage.getItem("account");
    if (account) {
      setAccount(JSON.parse(account));
    }
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        {account ? (
          <>
            <MenuBar />
            <TopBar />
            <Router />
          </>
        ) : (
          <RouterAuth />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
