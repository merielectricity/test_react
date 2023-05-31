import React, { useState, useEffect, useContext } from 'react'
// import AuthContext from '../context/AuthContext';
import axiosInstance from '../api';

const HomePage = () => {
    // const { authTokens, logoutUser } = useContext(AuthContext);
    let [profile, setProfile] = useState([])
    
    const getProfile =  async (event) => {
        event.preventDefault();
        try{
          let response = await axiosInstance.get("login/");
          if(response.status === 200){
              setProfile(response.data)
          }}
          catch (error) {
            console.log("Unable to get profile");
          }  
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