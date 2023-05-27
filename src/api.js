import axios from 'axios';

let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
const baseURL='https://staging.merielectricity.in'


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
	const access_token = authTokens?authTokens.access:null;
	console.log("axios header token"+ access_token)
	if (access_token) {
	  config.headers['Authorization'] = `Bearer ${access_token}`;
	}
	return config;
  });

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;
		console.log("First Error:"+ originalRequest)
		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
					'Looks like CORS might be the problem. ' +
					'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + 'token/refresh/'
		) {
            console.log("Refresh token expired")
			removeToken()
			return Promise.reject(error);
		}

		if (			
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			console.log("Access token expired")
			// const refreshToken = localStorage.getItem('refresh_token');
			const refreshToken = authTokens?authTokens.refresh:null;
			if (refreshToken) {
				console.log("Refresh token found")
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);
				console.log(tokenParts.exp);
                console.log(now);
				if (tokenParts.exp > now) {
					return axiosInstance
						.post('/login/refresh/', { refresh: refreshToken })
						.then((response) => {
							setToken(response.data)
							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							console.log(err);
						});
				}else {
					console.log('Refresh token expired.');
					removeToken()
				}
			} else {
				console.log('Refresh token not available.');
				removeToken()
			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);

const removeToken = () => {
    localStorage.removeItem('authTokens');
}

const setToken = (data) => {
    localStorage.setItem('authTokens', JSON.stringify(data));
	authTokens=data
}




export default axiosInstance;
