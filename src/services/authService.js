import api from './api';

const timeout = (ms) =>
    new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Request timed out after ${ms / 1000}s`)), ms)
    );

export const login = async (credentials) => {
  return Promise.race([
    api.post('/api/auth/login', credentials),
    timeout(10000), // 10 second max wait
  ]);
};

export const signup = async (userData) => {
  return Promise.race([
    api.post('/api/auth/signUp', userData),
    timeout(10000), // 10 second max wait
  ]);
};