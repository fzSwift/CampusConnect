import axios from 'axios';
import { API_BASE_URL } from '../config';

const axiosInstance = axios.create({
  baseURL: process.meta.env.NODE_ENV === 'development' ?  process.meta.env.REACT_APP_API_URL:'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 