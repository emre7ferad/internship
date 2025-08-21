import api from "../axiosConfig";
import { API_ENDPOINTS } from "../utils/apiUtils";

export interface RegisterData {
    egn: string;
    nameCyrillic: string;
    nameLatin: string;
    email: string;
    phone: string;
    address: string;
    username: string;
    password: string;
    isAdmin: boolean;
    lnch?: string;
}
export const registerUser = async (userData: RegisterData) => {
    try
    {
        const response = await api.post(API_ENDPOINTS.users.register, userData);
        return response.data;
    } catch(err: any){
        if (err.response?.data) {
            throw err.response.data
        } else {
            throw new Error("Network error")
        }
    }
};