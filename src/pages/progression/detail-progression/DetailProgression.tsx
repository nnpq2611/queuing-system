import React, {useState, useEffect} from 'react'
import "./DetailProgression.css"
import { RollbackOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import { useParams } from "react-router-dom";
import ButtonDevice from '../../../components/button-device/ButtonDevice';
import { get, ref } from "firebase/database";
import database from "../../../firebase/FireBase";

interface progression {
  So_thu_tu: number;
  Ho_ten: string;
  Ten_dich_vu: string;
  Thoi_gian_cap: string;
  Han_su_dung: string;
  Nguon_cap: string;
  Trang_thai: string;
  So_dien_thoai: string;
  Email: string;
}

const DetailProgression = () => {

  const [progression, setProgression] = useState<progression>();
  const { progressionId } = useParams();
  const starCountRef = ref(database, `progression/${progressionId}`);
  const getProgression = () => {
    get(starCountRef)
      .then((snapshot: any) => {
        if (snapshot.exists()) {
          setProgression(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getProgression();
  }, []);

  return (
    <Row className="detail-progression-page">
      <Col className="detail-progression">
        <div className="nav-add">
          <h3 className="pro">Thiết bị &gt; </h3>
          <h3 className="pro">Danh sách cấp số &gt; </h3>
          <h3 className="add-pro">Chi tiết</h3>
        </div>
        <h2>Quản lý cấp số</h2>
        <div className="information-progression">
          <div className="detail-progression_title">
            <h3>Thông tin cấp số</h3>
            <div className="title">
              <div className="title-progression">
                <p>Họ tên:</p>
                <p>Tên dịch vụ:</p>
                <p>Số thứ tự:</p>
                <p>Thời gian cấp:</p>
                <p>Hạn sử dụng:</p>
              </div>
              <div className="title-progression1">
                <p>{progression?.Ho_ten}</p>
                <p>{progression?.Ten_dich_vu}</p>
                <p>{progression?.So_thu_tu}</p>
                <p>{progression?.Thoi_gian_cap}</p>
                <p>{progression?.Han_su_dung}</p>
              </div>
              <div className="title-progression2">
                <p>Nguồn cấp:</p>
                <p>Trạng thái:</p>
                <p>Số điện thoại:</p>
                <p>Địa chỉ Email:</p>
              </div>
              <div className="title-progression3">
                <p>{progression?.Nguon_cap}</p>
                <p>{progression?.Trang_thai}</p>
                <p>{progression?.So_dien_thoai}</p>
                <p>{progression?.Email}</p>
              </div>
            </div>
          </div>
          <ButtonDevice
            name="Quay lại"
            path={`/progression`}
            icon={<RollbackOutlined />}
          />
        </div>
      </Col>
    </Row>
  )
}

export default DetailProgression