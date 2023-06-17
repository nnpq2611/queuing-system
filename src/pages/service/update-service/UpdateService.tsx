import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import "./UpdateService.css";
import { Checkbox, Input, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { get, ref, set } from "firebase/database";
import database from "../../../firebase/FireBase";

interface service {
  Thong_tin_dich_vu: {
    Ma_dich_vu: string;
    Ten_dich_vu: string;
    Mo_ta: string;
    Trang_thai_hoat_dong: string;
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

const UpdateService = () => {
  const [ma_dich_vu, setMaDichVu] = useState("");
  const [ten_dich_vu, setTenDichVu] = useState("");
  const [mo_ta, setMoTa] = useState("");
  const [tang_start, setStart] = useState("");
  const [tang_end, setEnd] = useState("");
  const [prefix, setPrefix] = useState("");
  const [surfix, setSurfix] = useState("");
  const [reset, setReset] = useState(false);
  const [typePrefix, setTypePrefix] = useState(false);
  const [typeSurfix, setTypeSurfix] = useState(false);
  const [typeAuto, setTypeAuto] = useState(false);
  const { TextArea } = Input;
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const starCountRef = ref(database, `service/${serviceId}`);

  useEffect(() => {
    get(starCountRef)
      .then((snapshot: any) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setMaDichVu(data.Thong_tin_dich_vu.Ma_dich_vu);
          setTenDichVu(data.Thong_tin_dich_vu.Ten_dich_vu);
          setMoTa(data.Thong_tin_dich_vu.Mo_ta);
          setStart(data.Quy_tac_cap_so.Tang_tu_dong.Start);
          setEnd(data.Quy_tac_cap_so.Tang_tu_dong.End);
          setPrefix(data.Quy_tac_cap_so.Prefix);
          setSurfix(data.Quy_tac_cap_so.Surfix);
          setReset(data.Quy_tac_cap_so.Reset);
          setTypePrefix(data.Quy_tac_cap_so.Prefix !== "");
          setTypeSurfix(data.Quy_tac_cap_so.Surfix !== "");
          setTypeAuto(
            data.Quy_tac_cap_so.Tang_tu_dong.Start !== "" ||
              data.Quy_tac_cap_so.Tang_tu_dong.End !== ""
          );
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
    if (ma_dich_vu === "") {
      alert("Mã dịch vụ không được để trống");
      return false;
    }
    if (ten_dich_vu === "") {
      alert("Tên dịch vụ không được để trống");
      return false;
    }
    if (mo_ta === "") {
      alert("Mô tả không được để trống");
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!checkNull()) return;

    const data: service = {
      Thong_tin_dich_vu: {
        Ma_dich_vu: ma_dich_vu,
        Ten_dich_vu: ten_dich_vu,
        Mo_ta: mo_ta,
        Trang_thai_hoat_dong: "1",
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
    set(ref(database, `service/${serviceId}`), data);
    navigate("/service");
  };
  return (
    <Row className="update-service-page">
      <Col className="update-service">
        <div className="nav-update">
          <h3 className="ser">Dịch vụ &gt; </h3>
          <h3 className="ser">Danh sách dịch vụ &gt; </h3>
          <h3 className="update-ser">Thêm dịch vụ</h3>
        </div>
        <h2> Quản lý dịch vụ</h2>
        <div className="update-list">
          <div className="update-list-ser">
            <div className="update-list-input">
              <h3>Thông tin dịch vụ</h3>
              <div className="update-list-id">
                <p>Mã dịch vụ</p>
                <Input
                  style={{ width: 500 }}
                  placeholder="Nhập mã dịch vụ"
                  value={ma_dich_vu}
                  onChange={(e) => setMaDichVu(e.target.value)}
                />
              </div>
              <div className="update-list-name">
                <p>Tên dịch vụ</p>
                <Input
                  style={{ width: 500 }}
                  placeholder="Nhập tên dịch vụ"
                  value={ten_dich_vu}
                  onChange={(e) => setTenDichVu(e.target.value)}
                />
              </div>
            </div>
            <div className="update-list-rule-number">
              <div className="update-list-rule">
                <h3>Quy tắc cấp số</h3>
                <div className="update-list-rule1">
                  <Checkbox
                    checked={typeAuto}
                    onChange={() => setTypeAuto(!typeAuto)}
                  />
                  <p>Tăng tự động từ</p>
                </div>
                <div className="update-list-rule1">
                  <Checkbox
                    checked={typePrefix}
                    onChange={() => setTypePrefix(!typePrefix)}
                  />
                  <p>Prefix</p>
                </div>
                <div className="update-list-rule1">
                  <Checkbox
                    checked={typeSurfix}
                    onChange={() => setTypeSurfix(!typeSurfix)}
                  />
                  <p>Surfix</p>
                </div>
                <div className="update-list-rule1">
                  <Checkbox checked={reset} onChange={() => setReset(!reset)} />{" "}
                  <p>Reset mỗi ngày</p>
                </div>
              </div>
              <div className="update-list-number">
                <div className="update-list-number1">
                  <Input
                    value={tang_start}
                    onChange={(e) =>
                      setStart(e.target.value.replace(/\D/g, ""))
                    }
                    disabled={!typeAuto}
                  />
                  <p>đến</p>
                  <Input
                    value={tang_end}
                    onChange={(e) => setEnd(e.target.value.replace(/\D/g, ""))}
                    disabled={!typeAuto}
                  />
                </div>
                <div className="update-list-number1">
                  <Input
                    value={prefix}
                    onChange={(e) =>
                      setPrefix(e.target.value.replace(/\D/g, ""))
                    }
                    disabled={!typePrefix}
                  />
                </div>
                <div className="update-list-number1">
                  <Input
                    value={surfix}
                    onChange={(e) =>
                      setSurfix(e.target.value.replace(/\D/g, ""))
                    }
                    disabled={!typeSurfix}
                  />
                </div>
              </div>
            </div>
            <h5>* Là trường thông tin bắt buộc</h5>
          </div>
          <div className="update-list_form-description">
            <p>Mô tả</p>
            <TextArea
              className="form-control"
              style={{ width: 500, height: 110 }}
              placeholder="Nhập mô tả"
              value={mo_ta}
              onChange={(e) => setMoTa(e.target.value)}
              rows={4}
            />
          </div>
        </div>
        <div className="update-list__button">
          <Button className="update-list__button-cancel" onClick={handleCancel}>
            Hủy bỏ
          </Button>
          <Button
            className="update-list__button-update-service"
            onClick={handleSave}
          >
            Cập nhật
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default UpdateService;
