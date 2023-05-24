import React, { useState } from 'react';
import axiosInstance from '../api';
function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //const apiEndpoint = 'https://api.example.com/endpoint'; // Replace with your API endpoint

      // Prepare the data to be sent in the API request
      const data = {
        username,
        password
        // Add more data fields as required by the API
      };

      // Send a POST request to the API
      const response = await axiosInstance.post("login/", data);

      // Process the API response
      if (response.status === 200) {

        // api.defaults.headers['Authorization'] = "Bearer " + response.data.access;
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        // API request successful
        console.log('API request successful');
        window.location.href = '/dashboard/';
      } else {
        // API request failed
        console.log('API request failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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

export default LoginForm;
