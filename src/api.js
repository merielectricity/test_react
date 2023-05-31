import axios from 'axios';
import TokenService from './service/TokenService';



const axiosInstance = axios.create({
	withCredentials: true,
	baseURL:'/api',
	timeout: 5000,
	headers: {
	  'Content-Type': 'application/json',
	  accept: 'application/json',
	},
  });


  axiosInstance.interceptors.request.use((config) => {
     const access_token = TokenService.getAccessToken();
	console.log("axios header token"+ access_token)
	if (access_token) {
	  config.headers['Authorization'] = `Bearer ${access_token}`;
	}
	return config;
  });

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
	  const originalRequest = error.config;
	  const valid = TokenService.getRefreshTokenValidity();
	  // if refresh token is expired, redirect user to login with action
	  if (!valid) {
		TokenService.clearToken();
		alert("Expired Refresh Token")
		//useDispatch(deleteUserData());
	  }
  
	  if (error.response.status === 401 && !originalRequest.retry) {
		originalRequest.retry = true;
		return axiosInstance({
		  url: '/login/refresh/',
		  method: 'post',
		  data: {
			refresh: TokenService.getRefreshToken(),
		  },
		}).then((res) => {
		  if (res.status === 200) {
			TokenService.setToken(res.data);
			axiosInstance.defaults.headers.common.Authorization = `Bearer ${TokenService.getAccessToken()}`;
			return axiosInstance(originalRequest);
		  }
		  return null;
		});
	  }
	  return Promise.reject(error);
	}
  );




export default axiosInstance;
