import React, { useEffect, useState } from "react";
import "./SignIn.css";
import img from "../../assets/img/Logo alta.png";
import img1 from "../../assets/img/Screenshot 2023-05-11 082546.png";
import { Row, Col, Input, Button } from "antd";
import { Link } from "react-router-dom";
import database from "../../firebase/FireBase";
import { get, ref } from "firebase/database";

const SignIn = () => {
  const starCountRef = ref(database, "account");
  const [account, setAccount] = useState<any>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const getAccount = () => {
    get(starCountRef)
      .then((snapshot: any) => {
        if (snapshot.exists()) {
          setAccount(snapshot.val());
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  const handleLogin = () => {
    const check = account.filter(
      (item: any) => item.Ten_dang_nhap === username && item.Mat_khau === password
    );
    if (check.length > 0) {
      localStorage.setItem("account", JSON.stringify(check[0]));
      window.location.href = "/";
    } else {
      alert("Tài khoản hoặc mật khẩu không đúng");
    }
  };

  useEffect(() => {
    getAccount();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Row className="sign-in-page">
      <Col className="sign-in" span={9}>
        <div className="sign-in__logo">
          <img className="logo-img" src={img} alt="logo-img" />
        </div>
        <div className="sign-in__form">
          <div className="sign-in__form-name">
            <h3 className="sign-in__form-input-label">Tên đăng nhập</h3>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="sign-in__form-input-input"
              type="text"
            />
          </div>
          <div className="sign-in__form-password">
            <h3 className="sign-in__form-input-label">Mật khẩu</h3>
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="sign-in__form-input-input"
              type="password"
            />
          </div>
          <Link to={`/forgot_password`}>Quên mật khẩu?</Link>
        </div>
        <div className="sign-in__btn">
          <Button className="sign-in__form-input-btn" onClick={handleLogin}>Đăng nhập</Button>
        </div>
      </Col>
      <Col className="sign-in__img" span={15}>
        <img className="sign-in__img-img" src={img1} alt="sign-in-img" />
      </Col>
    </Row>
  );
};

export default SignIn;
