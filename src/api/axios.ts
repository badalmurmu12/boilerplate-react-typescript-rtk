import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'https://jsonplaceholder.typicode.com/';   // 'https://api.example.com';

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized error
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Refresh token logic here if needed
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          // const response = await refreshTokenAPI(refreshToken);
          // localStorage.setItem('token', response.data.token);
          // originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
          // return axiosInstance(originalRequest);
        }
      } catch (error) {
        // Handle refresh token error
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;