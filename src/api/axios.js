// src/api/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // This must match the key used in Login.jsx
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Must include 'Bearer ' prefix
  }
  return config;
});

export default API;