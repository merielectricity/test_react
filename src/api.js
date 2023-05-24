import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api/';

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
	  'Content-Type': 'application/json',
	  accept: 'application/json',
	},
  });


  axiosInstance.interceptors.request.use((config) => {
	const access_token = localStorage.getItem('access_token');
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

		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
					'Looks like CORS might be the problem. ' +
					'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		// if (
		// 	error.response.status === 401 &&
		// 	originalRequest.url === baseURL + 'token/refresh/'
		// ) {
        //     console.log("Refresh token expired")
		// 	logoutUser()
		// 	return Promise.reject(error);
		// }

		if (			
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			console.log("Access token expired")
			const refreshToken = localStorage.getItem('refresh_token');

			if (refreshToken) {
				console.log("Refresh token found")
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);
				console.log(tokenParts.exp);

				if (tokenParts.exp > now) {
					return axiosInstance
						.post('/login/refresh/', { refresh: refreshToken })
						.then((response) => {
							localStorage.setItem('access_token', response.data.access);
							localStorage.setItem('refresh_token', response.data.refresh);

							axiosInstance.defaults.headers['Authorization'] =
								'Bearer ' + response.data.access;
							originalRequest.headers['Authorization'] =
								'Bearer ' + response.data.access;

							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							console.log(err);
						});
				}else {
					console.log('Refresh token expired.');
					logoutUser()
				}
			} else {
				console.log('Refresh token not available.');
				logoutUser()
			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);

const logoutUser = () => {
    // Clear the access_token and refresh_token from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // Redirect to the login page
    window.location.href = '/login/';
  }



export default axiosInstance;
