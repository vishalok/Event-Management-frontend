import axios from "axios";

// Create an Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend's base URL
});

// Add an interceptor to include the token in every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
