import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000/api',  // Replace with your backend URL
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');  // Get token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Attach token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

