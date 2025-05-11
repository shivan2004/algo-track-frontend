import api from './api';

const timeout = (ms) =>
    new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Request timed out after ${ms / 1000}s`)), ms)
    );

export const login = async (credentials) => {
  return Promise.race([
    api.post('/api/auth/login', credentials),
    timeout(5000), // 5 second max wait
  ]);
};

export const signup = async (userData) => {
  return Promise.race([
    api.post('/api/auth/signUp', userData),
    timeout(5000), // 5 second max wait
  ]);
};

export const googleLogin = async (token) => {
  return Promise.race([
    api.post('/oauth2/authorization/google', { token }),
    timeout(5000),
  ]);
};