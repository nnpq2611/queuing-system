import React from 'react'
import './TopBar.css'
import InForm from '../../components/inform/InForm'
import img from '../../assets/img/unsplash_Fyl8sMC2j2Q.png'


const TopBar = () => {
  return (
    <div className='top-bar'>
        <h3>Dashboard</h3>
        <ul>
            <li>
                <InForm />
            </li>
            <li>
                <img src={img} alt="img" />
            </li>
            <li>
                <p>Xin chào</p>
                <h4>Nguyễn Thị Thùy Dung</h4>
            </li>
        </ul>

    </div>
  )
}

export default TopBar