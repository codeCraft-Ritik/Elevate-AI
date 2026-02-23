import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // From Vercel ENV
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Global error handler
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;