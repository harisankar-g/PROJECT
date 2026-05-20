import axios from 'axios';

// Create axios instance
const api = axios.create({
    baseURL: 'http://localhost:3000', // Your backend URL
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to every request if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;