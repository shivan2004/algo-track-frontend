import api from './api';

const timeout = (ms) =>
    new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Request timed out after ${ms / 1000}s`)), ms)
    );

export const getUserProgress = async () => {
  return Promise.race([
    api.get('/api/progress/getUserProgress'),
    timeout(5000),
  ]);
};

export const markProgress = async (problemId) => {
  return Promise.race([
    api.post(`/api/progress/markProgress/${problemId}`),
    timeout(5000),
  ]);
};

export const unmarkProgress = async (problemId) => {
  return Promise.race([
    api.post(`/api/progress/unmarkProgress/${problemId}`),
    timeout(5000),
  ]);
};