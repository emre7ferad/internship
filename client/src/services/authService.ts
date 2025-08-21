import { API_ENDPOINTS } from "../utils/apiUtils";
import { http } from "./http";

export const loginUser = async (username: string, password: string) => {
    return http.post<{ token: string; user: { id: string; username: string } }>(
        API_ENDPOINTS.auth.login,
        { username, password }
    );
};

export const logoutUser = async () => {
    try {
        await http.post<void>(API_ENDPOINTS.auth.logout);
    } finally {
        localStorage.removeItem('token');
    }
};