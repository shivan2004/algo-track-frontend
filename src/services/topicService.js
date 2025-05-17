import api from './api';

const timeout = (ms) =>
    new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Request timed out after ${ms / 1000}s`)), ms)
    );

export const getAllTopics = async () => {
  return Promise.race([
    api.get('/api/topics/getAllTopics'),
    timeout(5000),
  ]);
};

export const getTopicById = async (topicId) => {
  return Promise.race([
    api.get(`/api/topics/getTopicById/${topicId}`),
    timeout(5000),
  ]);
};

export const addTopic = async (topicData) => {
  return Promise.race([
    api.post('/api/topics/add', topicData),
    timeout(5000),
  ]);
};

export const updateTopic = async (topicData) => {
  return Promise.race([
    api.put('/api/topics/update-topic', topicData),
    timeout(5000),
  ]);
};

export const deleteTopic = async (topicId) => {
  return Promise.race([
    api.put(`/api/topics/delete-topic/${topicId}`),
    timeout(5000),
  ]);
};

export const reorderTopics = async (reorderData) => {
  return Promise.race([
    api.post('/api/topics/re-order', reorderData),
    timeout(5000),
  ]);
};