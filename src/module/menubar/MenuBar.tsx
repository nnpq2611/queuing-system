import React from 'react'
import './MenuBar.css'
import Logo from '../../assets/img/Logo alta.png'
import SignOut from '../../components/sign-out/SignOut';
import NavBar from '../../components/navbar/NavBar';

const MenuBar = () => {
    return (
        <nav className="menu-bar">
            <img src={Logo} alt="logo" />
            <NavBar />
            <SignOut />
        </nav>
        
    )
}

export default MenuBar