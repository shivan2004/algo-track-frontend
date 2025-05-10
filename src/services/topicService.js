import api from './api';

export const getAllTopics = async () => {
  return await api.get('/api/topics/getAllTopics');
};

export const getTopicById = async (topicId) => {
  return await api.get(`/api/topics/getTopicById/${topicId}`);
};

export const addTopic = async (topicData) => {
  return await api.post('/api/topics/add', topicData);
};

export const reorderTopics = async (reorderData) => {
  return await api.post('/api/topics/re-order', reorderData);
};