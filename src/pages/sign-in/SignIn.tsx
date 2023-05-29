import React from 'react'
import './SignIn.css'
import img from '../../assets/img/Logo alta.png'
import { Row, Col, Input, Button } from 'antd'

const SignIn = () => {
    return (
        <Row className='sign-in-page'>
            <Col className="sign-in">
                <div className="sign-in__logo">
                    <img className="logo-img" src={img} alt="logo-img"/>
                </div>
                <div className="sign-in__form">
                    <div className="sign-in__form-name">
                        <h3 className="sign-in__form-input-label">Tên đăng nhập</h3>
                        <Input className="sign-in__form-input-input" type="text" style={{ width: 268 }}/>                     
                    </div>
                    <div className="sign-in__form-password">                        
                        <h3 className="sign-in__form-input-label">Mật khẩu</h3> 
                        <Input className="sign-in__form-input-input" type="password" style={{ width: 268 }}/>
                    </div>
                    
                </div>
                <div className="sign-in__btn">
                    <Button className="sign-in__form-input-btn">Đăng nhập</Button>
                </div>
            </Col>


        </Row>
    )
}

export default SignIn