import api from '../axiosConfig';
import { handleApiError } from '../utils/apiUtils';

/** Thin HTTP helpers that unwrap response data and normalize errors */
export const http = {
    async get<T>(url: string, config?: unknown): Promise<T> {
        try {
            const res = await api.get<T>(url as string, config as any);
            return res.data as T;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },
    async post<T>(url: string, data?: unknown, config?: unknown): Promise<T> {
        try {
            const res = await api.post<T>(url as string, data, config as any);
            return res.data as T;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },
    async put<T>(url: string, data?: unknown, config?: unknown): Promise<T> {
        try {
            const res = await api.put<T>(url as string, data, config as any);
            return res.data as T;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },
    async patch<T>(url: string, data?: unknown, config?: unknown): Promise<T> {
        try {
            const res = await api.patch<T>(url as string, data, config as any);
            return res.data as T;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },
    async delete(url: string, config?: unknown): Promise<void> {
        try {
            await api.delete(url as string, config as any);
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    }
};

/** Fetch a list endpoint and validate it's an array at runtime. */
export async function getList<T>(url: string): Promise<T[]> {
    const data = await http.get<unknown>(url);
    if (!Array.isArray(data)) {
        throw new Error('Expected array but got different format');
    }
    return data as T[];
}