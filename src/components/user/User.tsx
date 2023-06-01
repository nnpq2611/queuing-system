import React from 'react'
import { Link} from "react-router-dom";
import img from '../../assets/img/avatar-def.jpg'

const User = () => {
    const user = 
    [
        {
            key: "user",
            path: "/user",
        }
    ]
    return (
        <div className='user'>
            {user.map((item, index) => (
                <Link to={item.path} key={index}><img src={img} alt="img" style={{width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%"}}/></Link>  
            ))}
        </div>
    )
}

export default User