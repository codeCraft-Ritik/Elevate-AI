import axios from "axios";

const API = axios.create({
  baseURL: "https://elevate-ai-4.onrender.com/api", // ✅ NEW RENDER URL
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Global error handler (production safe)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;