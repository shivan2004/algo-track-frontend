import api from './api';

export const getUserProgress = async () => {
  return await api.get('/api/progress/getUserProgress');
};

export const markProgress = async (problemId) => {
  return await api.post(`/api/progress/markProgress/${problemId}`);
};

export const unmarkProgress = async (problemId) => {
  return await api.post(`/api/progress/unmarkProgress/${problemId}`);
};