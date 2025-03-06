import axios from 'axios';

const API_URL = 'http://localhost:3000';
const api = axios.create({ baseURL: API_URL });

const handleRequest = async (method, url, data = null) => {
  try {
    const response = await api[method](url, data);
    return response.data;
  } catch (error) {
    console.error(`Error in ${method.toUpperCase()} ${url}:`, error);
    throw error;
  }
};

export const fetchLinks = (tag = '') => handleRequest('get', `/links${tag ? `?tag=${tag}` : ''}`);
export const fetchLinkById = (id) => handleRequest('get', `/links/${id}`);
export const fetchTags = () => handleRequest('get', '/tags');
export const createLink = (linkData) => handleRequest('post', '/links', linkData);
export const addComment = (linkId, commentData) => handleRequest('post', `/links/${linkId}/comments`, commentData);
export const addVote = (linkId) => handleRequest('post', `/links/${linkId}/votes`, { value: 1 });
