import axios from 'axios'
import { RootState } from './app/store';
const axiosInstance = axios.create({
  baseURL: 'https://proyecto-lapacho-backend.onrender.com/',
   // Replace with your API base URL
});
const token = (state: RootState) => state.auth.token;
// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (token) {
      if (config.headers) config.headers.token = token;
    }
    return config;
  },
  (error) => {

    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Modify the response data here (e.g., parse, transform)

    return response;
  },
  (error) => {
    // Handle response errors here

    return Promise.reject(error);
  }
);

export default axiosInstance;