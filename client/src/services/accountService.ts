import api from '../axiosConfig';
import { API_ENDPOINTS } from '../utils/apiUtils'
import { handleApiError } from '../utils/apiUtils';

export interface Account {
    _id: string;
    accountNumber: string;
    accountType: string;
    currency: string;
    availableBalance: number;
    startingBalance: number;
    balance: number;
    feesOwed: number;
    userId?: string;
    status?: 'active' | 'inactive' | 'suspended';
    createdAt?: Date;
    updatedAt?: Date;
}

/* Interface for creating new account */
export interface CreateAccountData {
    accountType: string;
    currency: string;
    userId: string;
    initialBalance?: number;
}


/* Interface for updating account data */
export interface UpdateAccountData {
    accountType?: string;
    status?: 'active' | 'inactive' | 'suspended';
}

/* Interface for account balance update */
export interface UpdateBalanceData {
    amount: number;
    type: 'deposit' | 'withdrawal' | 'transfer';
}

/* Interface for account operations response */
export interface AccountResponse {
    success: boolean;
    data?: Account | Account[];
    message?: string;
    error?: string;
}

/* Service class for account-related API */
class AccountService {

    /* Fetch all accounts for a specific user */
    async getUserAccounts(userId: string): Promise<Account[]> {
        try {
            const response = await api.get(API_ENDPOINTS.accounts.userAccounts(userId));

            if (!Array.isArray(response.data)) {
                throw new Error('Expected array of accounts but got different format');
            }

            return response.data;
        } catch (error) {
            const errorMessage = handleApiError(error);
            console.error('Failed to fetch user accounts:', errorMessage);
            throw new Error(errorMessage);
        }
    }

    /* Fetch specific account (by Id) */
    async getAccountDetails(accountId: string): Promise<Account> {
        try {
            const response = await api.get(API_ENDPOINTS.accounts.accountDetails(accountId));
            return response.data;
        } catch (error) {
            const errorMessage = handleApiError(error);
            console.error('Failed to fetch account details: ', errorMessage);
            throw new Error(errorMessage);
        }
    }

    /* Create new account */
    async createAccount(accountData: CreateAccountData): Promise<Account> {
        try {
            const response = await api.post(API_ENDPOINTS.accounts.createAccount, accountData);
            return response.data;
        } catch (error) {
            const errorMessage = handleApiError(error);
            console.error('Failed to create account: ', errorMessage);
            throw new Error(errorMessage);
        }
    }

    /* Update account details */
    async updateAccount(accountId: string, accountData: UpdateAccountData): Promise<Account> {
        try {
            const response = await api.put(API_ENDPOINTS.accounts.updateAccount(accountId), accountData);
            return response.data;
        } catch (error) {
            const errorMessage = handleApiError(error);
            console.error('Failed to update account: ', errorMessage);
            throw new Error(errorMessage);
        }
    }

    /* Update account balance */
    async updateBalance(accountId: string, balanceData: UpdateBalanceData): Promise<Account> {
        try {
            const response = await api.patch(API_ENDPOINTS.accounts.updateBalance(accountId), balanceData);
            return response.data;
        } catch (error) {
            const errorMessage = handleApiError(error);
            console.error('Failed to update account balance: ', errorMessage);
            throw new Error(errorMessage);
        }
    }

    /* Deactivate account */
    async deactivateAccount(accountId: string): Promise<Account> {
        try{
            const response = await api.patch(API_ENDPOINTS.accounts.deactivateAccount(accountId));
            return response.data;
        } catch (error) {
            const errorMessage = handleApiError(error);
            console.error('Failed to deactivate account: ', errorMessage);
            throw new Error(errorMessage);
        }
    }

    /* Reactivate account */
    async reactivateAccount(accountId: string): Promise<Account> {
        try {
            const response = await api.patch(API_ENDPOINTS.accounts.reactivateAccount(accountId));
            return response.data;
        } catch (error) {
            const errorMessage = handleApiError(error);
            console.error('Failed to reactivate account: ', errorMessage);
            throw new Error(errorMessage);
        }
    }

    /* Delete account */
    async deleteAccount(accountId: string): Promise<void> {
        try {
            await api.delete(API_ENDPOINTS.accounts.delete(accountId));
        } catch (error) {
            const errorMessage= handleApiError(error);
            console.error('Failed to delete account: ', errorMessage);
            throw new Error(errorMessage);
        }
    }
}

export const accountService = new AccountService();

export default AccountService;