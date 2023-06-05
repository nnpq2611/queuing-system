import React, { useState, useEffect } from "react";
import "./UserManagement.css";
import { Row, Col, DatePicker, Input } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import database from "../../../firebase/FireBase";
import { ref, get } from "firebase/database";
import { SearchOutlined } from "@ant-design/icons";
import UserTable from "../../../module/Table/UserTable";

interface user {
  Ten_dang_nhap: string,
  Thoi_gian_tac_dong: string,
  IP_thuc_hien: string,
  Thao_tac_thuc_hien: string,
}

const UserManagement = () => {
  const [user, setUser] = useState<user[]>([]);
  const [user_show, setUserShow] = useState<user[]>([]);
  const [searchInput, setSearchInput] = React.useState<string>("");
  const starCountRef = ref(database, "setting/active");
  const dateFormatList = ["DD/MM/YYYY"];

  const handleGetStartDate = (date: any, dateString: any) => {
    console.log(dateString);
  };

  const handleGetEndDate = (date: any, dateString: any) => {
    console.log(dateString);
  };

  const handleSearch = (value: string) => {
    setSearchInput(value);
    if (value === "") {
      return setUserShow(user);
    }
    const search = user.filter((item) => {
      return item.Ten_dang_nhap.includes(searchInput);
    });
    setUserShow(search);
  };

  useEffect(() => {
    get(starCountRef)
      .then((snapshot: any) => {
        if (snapshot.exists()) {
          setUser(snapshot.val());
          setUserShow(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  return (
    <Row className="user-page">
      <Col className="user">
        <div className="nav-use">
          <h3 className="use">Cài đặt hệ thống &gt; </h3>
          <h3 className="use-list">Nhật ký hoạt động</h3>
        </div>
        <div className="user-list">
          <div className="time">
            <h4>Chọn thời gian</h4>
            <DatePicker
              onChange={handleGetStartDate}
              format={dateFormatList}
              className="date"
            />
            <CaretRightOutlined />
            <DatePicker
              onChange={handleGetEndDate}
              format={dateFormatList}
              className="date"
            />
          </div>
          <div className="key-word">
            <h4>Từ khóa</h4>
            <Input
              className="form-control"
              style={{ width: 268 }}
              placeholder="Nhập từ khóa"
              onChange={(e) => handleSearch(e.target.value)}
              suffix={<SearchOutlined />}
            />
          </div>
        </div>
        <div className="table-user">
          <UserTable user_show={user_show} />
        </div>
      </Col>
    </Row>
  );
};

export default UserManagement;
