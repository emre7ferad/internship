import { API_ENDPOINTS } from '../utils/apiUtils'
import { getList, http } from './http';

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
        return getList<Account>(API_ENDPOINTS.accounts.userAccounts(userId));
    }

    /* Fetch specific account (by Id) */
    async getAccountDetails(accountId: string): Promise<Account> {
        return http.get<Account>(API_ENDPOINTS.accounts.accountDetails(accountId));
    }

    /* Create new account */
    async createAccount(accountData: CreateAccountData): Promise<Account> {
        return http.post<Account>(API_ENDPOINTS.accounts.createAccount, accountData);
    }

    /* Update account details */
    async updateAccount(accountId: string, accountData: UpdateAccountData): Promise<Account> {
        return http.put<Account>(API_ENDPOINTS.accounts.updateAccount(accountId), accountData);
    }

    /* Update account balance */
    async updateBalance(accountId: string, balanceData: UpdateBalanceData): Promise<Account> {
        return http.patch<Account>(API_ENDPOINTS.accounts.updateBalance(accountId), balanceData);
    }

    /* Deactivate account */
    async deactivateAccount(accountId: string): Promise<Account> {
        return http.patch<Account>(API_ENDPOINTS.accounts.deactivateAccount(accountId));
    }

    /* Reactivate account */
    async reactivateAccount(accountId: string): Promise<Account> {
        return http.patch<Account>(API_ENDPOINTS.accounts.reactivateAccount(accountId));
    }

    /* Delete account */
    async deleteAccount(accountId: string): Promise<void> {
        return http.delete(API_ENDPOINTS.accounts.delete(accountId));
    }
}

export const accountService = new AccountService();

export default AccountService;