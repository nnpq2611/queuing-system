import React, { useState, useEffect } from "react";
import { Row, Col, InputNumber } from "antd";
import "./AddService.css";
import { Checkbox, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { get, ref, set } from "firebase/database";
import database from "../../../firebase/FireBase";

interface service {
  Thong_tin_dich_vu: {
    Ma_dich_vu: string;
    Ten_dich_vu: string;
    Mo_ta: string;
    Trang_thai_hoat_dong: string;
    Thoi_gian_cap: string;
    Han_su_dung: string;
  };
  Quy_tac_cap_so: {
    Tang_tu_dong: {
      Start: string;
      End: string;
    };
    Prefix: string;
    Surfix: string;
    Reset: boolean;
  };
}

const AddService = () => {
  const [ma_dich_vu, setMaDichVu] = useState("");
  const [ten_dich_vu, setTenDichVu] = useState("");
  const [mo_ta, setMoTa] = useState("");
  const [tang_start, setStart] = useState("0000");
  const [tang_end, setEnd] = useState("9999");
  const [prefix, setPrefix] = useState("0001");
  const [surfix, setSurfix] = useState("9999");
  const [reset, setReset] = useState<boolean>(false);
  const [typePrefix, setTypePrefix] = useState(false);
  const [typeSurfix, setTypeSurfix] = useState(false);
  const [typeAuto, setTypeAuto] = useState(false);
  const [service, setService] = useState<service[]>([]);
  const starCountRef = ref(database, "service");
  const { TextArea } = Input;
  const navigate = useNavigate();

  useEffect(() => {
    get(starCountRef)
      .then((snapshot: any) => {
        if (snapshot.exists()) {
          setService(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  const handleCancel = () => {
    navigate("/service");
  };

  const checkNull = () => {
    return ma_dich_vu === "" || ten_dich_vu === "" || mo_ta === "";
  };

  const handleSave = () => {
    if (checkNull()) {
      alert("Nhập thiếu thông tin!!!");
      return;
    }
    let newService = {
      Thong_tin_dich_vu: {
        Ma_dich_vu: `${ma_dich_vu}`,
        Ten_dich_vu: `${ten_dich_vu}`,
        Mo_ta: `${mo_ta}`,
        Trang_thai_hoat_dong: "Hoạt động",
        Thoi_gian_cap: `${new Date().toLocaleString()}`,
        Han_su_dung: `${new Date().toLocaleString()}`,
      },
      Quy_tac_cap_so: {
        Tang_tu_dong: {
          Start: typeAuto ? tang_start : "",
          End: typeAuto ? tang_end : "",
        },
        Prefix: typePrefix ? prefix : "",
        Surfix: typeSurfix ? surfix : "",
        Reset: reset,
      },
    };
    set(starCountRef, [...service, newService]).then(() =>
      navigate("/service")
    );
  };

  useEffect(() => {
    get(starCountRef)
      .then((snapshot: any) => {
        if (snapshot.exists()) {
          setService(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  return (
    <Row className="add-service-page">
      <Col className="add-service">
        <div className="nav-add">
          <h3 className="ser">Dịch vụ &gt; </h3>
          <h3 className="ser">Danh sách dịch vụ &gt; </h3>
          <h3 className="add-ser">Thêm dịch vụ</h3>
        </div>
        <h2> Quản lý dịch vụ</h2>
        <div className="add-list">
          <div className="add-list-ser">
            <div className="add-list-input">
              <h3>Thông tin dịch vụ</h3>
              <div className="add-list-id">
                <p>Mã dịch vụ</p>
                <Input
                  style={{ width: 500 }}
                  placeholder="Nhập mã dịch vụ"
                  onChange={(e) => setMaDichVu(e.target.value)}
                />
              </div>
              <div className="add-list-name">
                <p>Tên dịch vụ</p>
                <Input
                  style={{ width: 500 }}
                  placeholder="Nhập tên dịch vụ"
                  onChange={(e) => setTenDichVu(e.target.value)}
                />
              </div>
            </div>
            <div className="add-list-rule-number">
              <div className="add-list-rule">
                <h3>Quy tắc cấp số</h3>
                <div className="add-list-rule1">
                  <Checkbox
                    checked={typeAuto}
                    onChange={() => setTypeAuto(!typeAuto)}
                  />{" "}
                  <p>Tăng tự động từ</p>
                </div>
                <div className="add-list-rule1">
                  <Checkbox
                    checked={typePrefix}
                    onChange={() => setTypePrefix(!typePrefix)}
                  />{" "}
                  <p>Prefix</p>
                </div>
                <div className="add-list-rule1">
                  <Checkbox
                    checked={typeSurfix}
                    onChange={() => setTypeSurfix(!typeSurfix)}
                  />{" "}
                  <p>Surfix</p>
                </div>
                <div className="add-list-rule1">
                  <Checkbox onChange={() => setReset(!reset)} />
                  <p>Reset mỗi ngày</p>
                </div>
              </div>
              <div className="add-list-number">
                <div className="add-list-number1">
                  <Input
                    value={tang_start}
                    disabled={!typeAuto}
                    onChange={(e) =>
                      setStart(e.target.value.replace(/\D/g, ""))
                    }
                  />
                  <p>đến</p>
                  <Input
                    value={tang_end}
                    disabled={!typeAuto}
                    onChange={(e) => setEnd(e.target.value.replace(/\D/g, ""))}
                  />
                </div>
                <div className="add-list-number1">
                  <Input
                    value={prefix}
                    disabled={!typePrefix}
                    onChange={(e) =>
                      setPrefix(e.target.value.replace(/\D/g, ""))
                    }
                  />
                </div>
                <div className="add-list-number1">
                  <Input
                    value={surfix}
                    disabled={!typeSurfix}
                    onChange={(e) =>
                      setSurfix(e.target.value.replace(/\D/g, ""))
                    }
                  />
                </div>
              </div>
            </div>
            <h5>* Là trường thông tin bắt buộc</h5>
          </div>
          <div className="add-list_form-description">
            <p>Mô tả</p>
            <TextArea
              className="form-control"
              style={{ width: 500, height: 110 }}
              placeholder="Nhập mô tả"
              rows={4}
              onChange={(e) => setMoTa(e.target.value)}
            />
          </div>
        </div>
        <div className="add-list__button">
          <Button className="add-list__button-cancel" onClick={handleCancel}>
            Hủy bỏ
          </Button>
          <Button className="add-list__button-add-service" onClick={handleSave}>
            Thêm dịch vụ
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default AddService;
