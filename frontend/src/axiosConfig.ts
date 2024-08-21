import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000/api',  // Replace with your backend URL
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,  // This ensures that cookies are sent with requests
});

// No need for interceptors to handle tokens in headers anymore because the tokens are in cookies
// Any manual token injection logic in headers has been removed.

export default instance;