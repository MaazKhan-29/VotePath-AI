import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
});

// User APIs
export const initUser = (data) => API.post('/user/init', data);
export const getUser = (userId) => API.get(`/user/${userId}`);

// Journey API
export const getJourney = (userId) => API.get(`/journey/${userId}`);

// Timeline API
export const getTimeline = (userId) => API.get(`/timeline/${userId}`);

// Chat API
export const sendChatMessage = (userId, message) => API.post('/chat', { userId, message });
export const getChatHistory = (userId) => API.get(`/chat/${userId}/history`);

// Checklist APIs
export const getChecklist = (userId) => API.get(`/checklist/${userId}`);
export const updateChecklistItem = (userId, itemKey, completed) =>
  API.post('/checklist/update', { userId, itemKey, completed });

// Scenario APIs
export const getScenarios = () => API.get('/scenario/list');
export const runScenario = (userId, scenarioType) => API.post('/scenario', { userId, scenarioType });

// Booth API
export const getBoothGuide = (userId, pincode, area) => API.post('/booth', { userId, pincode, area });

// Quiz APIs
export const getQuiz = () => API.get('/quiz');
export const submitQuiz = (userId, answers) => API.post('/quiz/submit', { userId, answers });

// Health check
export const getHealth = () => API.get('/health');

export default API;
