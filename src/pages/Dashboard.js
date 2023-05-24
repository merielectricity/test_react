import React, { useState} from 'react';
import { Link } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api';

function Dashboard() {
//   const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleGetUser = async () => {
    try {
      const response = await axiosInstance.get('login/');
      if (response.status === 200) {
        setUser(response.data);
      } else {
        console.log('Failed to fetch user details');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleLogout = () => {
    const access= localStorage.getItem('access_token');
    const refresh= localStorage.getItem('refresh_token');
    if (access && refresh) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login/';
    }
    else {
        alert("Login before Logout")
    }

    // Clear the access_token and refresh_token from localStorage
    
    // setUser(null)
    
  }

  const handleLogin = () => {
    const access = localStorage.getItem('access_token');
    const refresh = localStorage.getItem('refresh_token');

    if (!(access && refresh)) {
        window.location.href = '/login/';
      }
      else {
        alert("Logout before logging in")
      }
    }

//   const handleLogout = () => {
//     // Clear the access_token and refresh_token from localStorage
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('refresh_token');

//     // Redirect to the login page
//     history.push('/login');
//   };

//   useEffect(() => {
//     // Check if the user is logged in ,better to handle by using user state
//     const access_token = localStorage.getItem('access_token');
//     if (!access_token) {
//       // Redirect to the login page if access_token is not present
//       window.location.href = '/login/';
//     } else {
//       // Fetch the user details
//       handleGetUser();
//     }
//   }, []); // Empty dependency array to run this effect only once on component mount

  return (
    <div>
    <div>
      <h1>Dashboard</h1>
      {user && (
        <div>
          <p>Welcome, {user.first_name}</p>
          <p>Email: {user.email}</p>
          <p>Phone Number: {user.phone_number}</p>
          <p>Is Staff: {user.is_staff ? 'Yes' : 'No'}</p>
        </div>
      )}
      <button onClick={handleGetUser}>Get User</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleLogin}>Login</button>
    </div>
    <div>

    </div>

      <h1>Test Post request after Login</h1>
      <Link to="/otppage">OTP</Link>
    </div>
  );
  
}

export default Dashboard;
