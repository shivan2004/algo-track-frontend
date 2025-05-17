import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Extract data from the API response format
    if (response.data && (response.data.data !== undefined)) {
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    // Handle API error format
    if (error.response && error.response.data && error.response.data.error) {
      return Promise.reject({
        ...error,
        message: error.response.data.error.message || 'An error occurred'
      });
    }
    return Promise.reject(error);
  }
);

export default api;
export {API_URL}