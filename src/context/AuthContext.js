import { createContext, useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode';
import { json, useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(() => (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null))
    const navigate = useNavigate()

    let loginUser = (data) => {
        localStorage.setItem('authTokens', JSON.stringify(data));
        setAuthTokens(data);
        let testdata=localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
        console.log(testdata)
        console.log(testdata.access)
        console.log(data.access)
        console.log("User="+JSON.stringify(jwtDecode(data.access)))
        navigate('/')
    } 

    let logoutUser = () => {
        // e.preventDefault()
        localStorage.removeItem('authTokens')
        setAuthTokens(null)
        //setUser(null)
        navigate('/login')
    }

    let contextData = {
        // user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    // useEffect(()=>{
    //     if(loading){
    //         updateToken()
    //     }

    //     const REFRESH_INTERVAL = 1000 * 60 * 4 // 4 minutes
    //     let interval = setInterval(()=>{
    //         if(authTokens){
    //             updateToken()
    //         }
    //     }, REFRESH_INTERVAL)
    //     return () => clearInterval(interval)

    // },[authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}