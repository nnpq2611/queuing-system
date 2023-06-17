import React from 'react'
import './ForgotPassword.css'
import img from '../../../assets/img/Logo alta.png'
import img1 from '../../../assets/img/Screenshot 2023-05-11 082628.png'
import { Row, Col, Input, Button } from 'antd'
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate("/sign-in");
    };
    
    return (
        <Row className='forgot-page'>
            <Col className="forgot" span={9}>
                <div className="forgot__logo">
                    <img className="logo-img" src={img} alt="logo-img"/>
                </div>
                <div className="forgot__form">
                    <h3>Đặt lại mật khẩu</h3>
                    <p>Vui lòng nhập email để đặt lại mật khẩu của bạn *</p>
                    <Input className="forgot__form-email" type="email"/>             
                </div>
                <div className="forgot__btn">
                    <Button className='btn_continue' onClick={handleCancel}>Hủy</Button>
                    <Button className="btn_cancel">Tiếp tục</Button>
                </div>
            </Col>
            <Col className="forgot__img" span={15}>
                <img className="forgot__img-img" src={img1} alt="forgot-img"/>
            </Col>


        </Row>
    )
}

export default ForgotPassword