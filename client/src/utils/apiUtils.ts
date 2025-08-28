export const API_CONFIG = {
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    timeout: 10000,
} as const;

export const API_ENDPOINTS = {
    auth: {
        login: '/api/auth/login',
        logout: '/api/auth/logout',
    },

    users: {
        register: '/api/users',
        profile: (userId: string) => `/api/users/${userId}`,
        updateProfile: (userId: string) => `/api/users/${userId}`,
        modules: '/api/users/modules',
    },

    accounts: {
        userAccounts: (userId: string) => `/api/accounts/user/${userId}`,
        accountDetails: (accountId: string) => `/api/accounts/${accountId}`,
        createAccount: `/api/accounts`,
        updateAccount: (accountId: string) => `/api/accounts/${accountId}`,
        updateBalance: (accountId: string) => `/api/accounts/${accountId}/balance`,
        deactivateAccount: (accountId: string) => `/api/accounts/${accountId}/deactivate`,
        reactivateAccount: (accountId: string) => `/api/accounts/${accountId}/reactivate`,
        delete: (accountId: string) => `/api/accounts/${accountId}`,
    },

    transactions: {
        accountTransactions: (accountId: string) => `/api/transactions/account/${accountId}`,
        userTransactions: (userId: string) => `/api/transactions/user/${userId}`,
        transactionDetails: (transactionId: string) => `/api/transactions/${transactionId}`,
        create: `/api/transactions`,
        update: (transactionId: string) => `/api/transactions/${transactionId}`,
        delete: (transactionId: string) => `/api/transactions/${transactionId}`,
        summary: (accountId: string) => `/api/transactions/account/${accountId}/summary`,
    },

    notifications: {
        create: '/api/notifications',
        userNotifications: (userId: string) => `/api/notifications/${userId}`,
        markAsRead: (notificationId: string) => `/api/notifications/${notificationId}/read`,
        delete: (notificationId: string) => `/api/notifications/${notificationId}`,
    },

    admin: {
        stats: '/api/admin/stats',
        users: '/api/admin/users',
        updateUserStatus: (userId: string) => `/api/admin/users/${userId}/status`,
        deleteUser: (userId: string) => `/api/admin/users/${userId}`,
    }

} as const;

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
    return `${API_CONFIG.baseURL}${endpoint}`;
};

// Helper function to validate API response
export const validateApiResponse = <T>(response: any): T => {
    if (!response || typeof response !== 'object') {
        throw new Error('Invalid API response format');
    }
    return response as T;
};

// Error handling utilities
export const handleApiError = (error: any): string => {
    if (error.response?.data?.error) {
        return error.response.data.error;
    }
    if (error.message) {
        return error.message;
    }
    return 'An unexpected error occurred';
}; 