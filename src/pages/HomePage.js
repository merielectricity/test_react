import React, { useState, useEffect, useContext } from 'react'
// import AuthContext from '../context/AuthContext';
import axiosInstance from '../api';

const HomePage = () => {
    // const { authTokens, logoutUser } = useContext(AuthContext);
    let [profile, setProfile] = useState([])

    // useEffect(() => {
    //     getProfile()
    // },[])

    const getProfile =  async (event) => {
        event.preventDefault();
        // let response = await fetch('/api/login/', {
        // method: 'GET',
        // headers:{
        //     'Content-Type': 'application/json',
        //     'Authorization':'Bearer ' + String(authTokens.access)
        // }
        // })

        let response = await axiosInstance.get("login/");

        // let data = await response.json()
        // console.log(data)
        if(response.status === 200){
            setProfile(response.data)
        } 
        
        // else if(response.statusText === 'Unauthorized'){
        //     logoutUser()
        // }
    }

    return (

        <div>
        <h1>Profile Page</h1>
        <button type="submit" onClick={getProfile}>
          Get Profile
        </button>
        {profile && (
          <div>
            <h2>Profile Data</h2>
            <div>
            <p>You are logged in to the homepage!</p>
            <p>Name: {profile.first_name} {profile.last_name}</p>
            <p>Email: {profile.email}</p>
           </div>
          </div>
        )}
      </div>
        
    )
}

export default HomePage