import React from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../service/TokenService'

const Header = () => {
    const logoutUser = () => { TokenService.clearToken()}
    return (
        <div>
            <Link to="/">Home</Link>
            <span> | </span>            
                <button onClick={logoutUser} type='submit'>Logout</button>            
                <Link to="/login" >Login</Link>            
        </div>
    )
}

export default Header