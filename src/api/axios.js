import axios from 'axios';

const API = axios.create({
  // VITE_API_URL should be set to https://elevate-ai-3.onrender.com/api in your Vercel settings
  baseURL: import.meta.env.VITE_API_URL || 'https://elevate-ai-3.onrender.com/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
});

export default API;