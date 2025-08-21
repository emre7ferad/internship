import axios from 'axios';
import { errorBus } from './hooks/errorBus';
import { loadingBus } from './hooks/loadingBus';

const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
    console.error('VITE_API_URL environment variable is not set. Please check your .env file.');
}

const api = axios.create({
    baseURL: API_URL || 'http://localhost:5000',
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        loadingBus.start();
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        loadingBus.stop();
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => {
        loadingBus.stop();
        return response;
    },
    (error) => {
        loadingBus.stop();
        
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
            return Promise.reject(error);
        }
        const message = 
            error.response?.data?.error ||
            error.message ||
            'Unexpected error';

        errorBus.publish({
            message,
            status: error.response?.status,
            url: error.config?.url,
        });

        return Promise.reject(error);
    }
);

export default api;