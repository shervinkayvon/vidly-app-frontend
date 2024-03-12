import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001'
});

// Add a request interceptor to include the x-auth-token in the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
});