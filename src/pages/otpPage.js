import React, { useState } from 'react';
import axiosInstance from '../api';
function OtpPage() {
  const [otp, setOtp] = useState('');
//   const [password, setPassword] = useState('');

  const verifyOtp = async (event) => {
    event.preventDefault();

    try {
      const data = {
        otp,
      };
      const response = await axiosInstance.post("verify-otp/", data);
      if (response.status === 200) {
        // API request successful
        alert('OTP request successful');
      } else {
        // API request failed
        alert('OTP request failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const generateOtp = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post("generate-otp/");
      if (response.status === 200) {
        // API request successful
        alert('OTP generate successful');
      } else {
        // API request failed
        alert('OTP generate failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };


  return (
   <div>
    <div><button onClick={generateOtp}>generateOtp</button></div>
    <div><form onSubmit={verifyOtp}>
      <input
        type="text"
        placeholder="otp"
        value={otp}
        onChange={(event) => setOtp(event.target.value)}
      />
      <button type="submit">Verify Otp</button>
    </form>
    </div>

   </div>
    
  );
}

export default OtpPage;