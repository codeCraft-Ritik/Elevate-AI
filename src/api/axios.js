import axios from "axios";

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Your Render Backend URL
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Global Response Error Handling (Best Practice)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API ERROR:",
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export default API;