import React from 'react'
import './TopBar.css'
import InForm from '../../components/inform/InForm'
import User from '../../components/user/User'


const TopBar = () => {
    

    return (
        <div className='top-bar'>
            <InForm/>
            <User/>
            <div className='user-name'>
                <p>Xin chào</p>
                <h4>Nguyễn Thị Thùy Dung</h4>
            </div>

        </div>
    )
}

export default TopBar