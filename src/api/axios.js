import axios from "axios";

const API = axios.create({
  baseURL: "https://elevate-ai-4.onrender.com/api", // ✅ YOUR RENDER BACKEND
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;