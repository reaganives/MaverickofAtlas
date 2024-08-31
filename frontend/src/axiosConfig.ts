import axios from 'axios';

// Create an axios instance
const instance = axios.create({
  baseURL: 'https://moa.reaganives.io',  // Replace with your backend URL
  timeout: 5000,  // Increased timeout for more flexibility
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,  // This ensures cookies are sent with every request
});

// Add a request interceptor to handle expired access tokens
instance.interceptors.response.use(
  (response) => {
    // Simply return the response if it's successful
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired access token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;  // Prevent infinite loop if refresh fails

      try {
        // Try to refresh the access token by making a request to the refresh token endpoint
        await instance.post('/auth/refresh-token');

        // If successful, retry the original request with the new access token
        return instance(originalRequest);
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        // If refresh fails, log out the user or handle appropriately
        window.location.href = '/login';  // Redirect to login page
      }
    }

    // For any other errors, reject the promise
    return Promise.reject(error);
  }
);

export default instance;


