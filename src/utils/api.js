import axios from "axios";

// Create an Axios instance
const API = axios.create({
  baseURL: "https://event-management-backend-p1m4.onrender.com/api", 

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
