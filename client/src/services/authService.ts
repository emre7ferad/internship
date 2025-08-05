import api from "../axiosConfig";
import { API_ENDPOINTS } from "../utils/apiUtils";

export const loginUser = async (username: string, password: string) => {
    const response = await api.post(API_ENDPOINTS.auth.login, {username, password});
    return response.data;
};

export const logoutUser = async () => {
    try {
        await api.post(API_ENDPOINTS.auth.logout);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        console.error('Logout failed:', error);
    }
};