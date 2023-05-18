import React from 'react'
import { Link} from "react-router-dom";
import img from '../../assets/img/unsplash_Fyl8sMC2j2Q.png'

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
                <Link to={item.path} key={index}><img src={img} alt="img" /></Link>  
            ))}
        </div>
    )
}

export default User