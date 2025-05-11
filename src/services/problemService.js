import api from './api';

const timeout = (ms) =>
    new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Request timed out after ${ms / 1000}s`)), ms)
    );

export const getProblemsByTopicId = async (topicId) => {
  return Promise.race([
    api.get(`/api/problems/getProblemsByTopicId/${topicId}`),
    timeout(5000),
  ]);
};

export const addProblem = async (problemData) => {
  return Promise.race([
    api.post('/api/problems/add', problemData),
    timeout(5000),
  ]);
};

export const reorderProblems = async (topicId, reorderData) => {
  return Promise.race([
    api.post(`/api/problems/re-order/${topicId}`, reorderData),
    timeout(5000),
  ]);
};