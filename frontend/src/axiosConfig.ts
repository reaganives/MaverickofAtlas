import axios from 'axios';

// Create an axios instance
const instance = axios.create({
  baseURL: 'https://api.moa.reaganives.io/api',  // Replace with your backend URL
  timeout: 5000,  // Adjust as needed
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,  // Ensures cookies are sent with requests
});

// Add a response interceptor to handle expired access tokens
instance.interceptors.response.use(
  (response) => response, // Simply return the response if successful
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired access token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;  // Prevent infinite retry loop

      try {
        // Refresh the access token by calling the refresh endpoint
        const { data } = await instance.post('/auth/refresh-token');

        // Set the new access token in the headers of the original request
        instance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;

        // Retry the original request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);

        // If refresh fails, clear any authentication cookies and redirect to login
        document.cookie = 'accessToken=; Max-Age=0';  // Clear access token cookie
        document.cookie = 'refreshToken=; Max-Age=0';  // Clear refresh token cookie
      }
    }

    // Reject the promise for any other errors
    return Promise.reject(error);
  }
);

export default instance;