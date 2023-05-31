import React, {useState,useContext} from 'react'
import axiosInstance from '../api'
import TokenService from '../service/TokenService';
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async (event) => {
        event.preventDefault();
    
        try {    
          // Prepare the data to be sent in the API request
          const data = {
            username,
            password
            // Add more data fields as required by the API
          };
    
          // Send a POST request to the API
          const response = await axiosInstance.post("login/", data);

          //console.log(response.json())
    
          // Process the API response
          if ((response.status === 200) && response.data) {
               TokenService.setToken(response.data)
          } else {
            // API request failed
            console.log('API request failed');
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };

    return (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      );
}

export default LoginPage