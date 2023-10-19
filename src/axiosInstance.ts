import axios from 'axios';
import { store } from './app/store';

const axiosInstance = axios.create({
  baseURL: 'https://proyecto-lapacho-backend.onrender.com/',
   // Replace with your API base URL
});
axiosInstance.interceptors.request.use(
  (config) => {
    const storeRedux = store.getState()
    const token = storeRedux.auth.token
    // Request interceptor
    if (token) {      
      if (config.headers) config.headers.x_token = token;
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