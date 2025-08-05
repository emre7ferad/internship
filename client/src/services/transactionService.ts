import api from "../axiosConfig";
import { API_ENDPOINTS } from "../utils/apiUtils";
import { handleApiError } from "../utils/apiUtils";

export interface Transaction {
    _id: string;
    date: Date;
    type: 'deposit' | 'withdrawal' | 'transfer';
    amount: number;
    currency: string;
    description: string;
    account: {
        _id: string;
        accountNumber: string;
    };
}

/* Interface for creating new transaction */
export interface CreateTransactionData {
    account: string;
    type: 'deposit' | 'withdrawal' | 'transfer';
    amount: number;
    currency: string;
    description: string;
}

/* Interface for updating transaction data */
export interface UpdateTransactionData {
    description?: string;
    type?: 'deposit' | 'withdrawal' | 'transfer';
    amount?: number;
}

/* Interface for transaction response */
export interface TransactionResponse {
    success: boolean;
    data?: Transaction | Transaction[];
    message?: string;
    error?: string;
}

/* Service class for transaction-related API */
class TransactionService {

    /* Get transaction for a specific account */
    async getTransactionByAccount(accountId: string): Promise<Transaction[]> {
        try {
            const response = await api.get(API_ENDPOINTS.transactions.accountTransactions(accountId));

            if (!Array.isArray(response.data)) {
                throw new Error('Expected array of transactions but got different format');
            }

            return response.data;
        } catch (error) {
            const errorMessage = handleApiError(error);
            console.error('Failed to fetch transactions: ', errorMessage);
            throw new Error(errorMessage);
        }
    }

    /* Get transactions for a user (all accounts) */
    async getUserTransactions(userId: string): Promise<Transaction[]> {
        try {
            const response = await api.get(API_ENDPOINTS.transactions.userTransactions(userId));

            if (!Array.isArray(response.data)) {
                throw new Error('Expected array of transactions but got different format');
            }

            return response.data;
        } catch (error) {
            const errorMessage = handleApiError(error);
            console.error('Failed to fetch transactions: ', errorMessage);
            throw new Error(errorMessage);
        }
    }

    /* Get specific transaction by ID */
    async getTransactionById(transactionId: string): Promise<Transaction> {
        try {
            const response = await api.get(API_ENDPOINTS.transactions.transactionDetails(transactionId));
            return response.data;
        } catch (error) {
            const errorMessage = handleApiError(error);
            console.error('Failed to fetch transaction: ', errorMessage);
            throw new Error(errorMessage);
        }
    }

    /* Create new transaction */
    async createTransaction(transactionData: CreateTransactionData): Promise<Transaction> {
        try {
            const response = await api.post(API_ENDPOINTS.transactions.create, transactionData);
            return response.data;
        } catch (error) {
            const errorMessage = handleApiError(error);
            console.error('Failed to create transaction: ', errorMessage);
            throw new Error(errorMessage);
        }
    }

    /* Update a transaction */
    async updateTransaction(transactionId: string, updateData: UpdateTransactionData): Promise<Transaction> {
        try {
            const response = await api.put(API_ENDPOINTS.transactions.update(transactionId), updateData);
            return response.data;
        } catch (error) {
            const errorMessage = handleApiError(error);
            console.error('Failed to update transaction: ', errorMessage);
            throw new Error(errorMessage);
        }
    }

    /* Delete a transaction */
    async deleteTransaction(transactionId: string): Promise<void> {
        try {
            await api.delete(API_ENDPOINTS.transactions.delete(transactionId));
        } catch (error) {
            const errorMessage = handleApiError(error);
            console.error('Failed to delete transaction: ', errorMessage);
            throw new Error(errorMessage);
        }
    }

    /* Get transactions with pagination */
    async getPaginatedTransactions(
        accountId: string, 
        page: number = 1, 
        limit: number = 5
    ): Promise<{ transactions: Transaction[], total: number, page: number, limit: number }> {
        try {
            const response = await api.get(
                `${API_ENDPOINTS.transactions.accountTransactions(accountId)}?page=${page}&limit=${limit}`
            );
            return response.data;
        } catch (error) {
            const errorMessage = handleApiError(error);
            console.error('Failed to fetch transactions: ', errorMessage);
            throw new Error(errorMessage);
        }
    }

    /* Get transaction summary for an account */
    async getTransactionSummary(accountId: string): Promise<{
        totalDeposits: number;
        totalWithdrawals: number;
        totalTransfers: number;
        balance: number;
    }> {
        try {
            const response = await api.get(API_ENDPOINTS.transactions.summary(accountId));
            return response.data;
        } catch (error) {
            const errorMessage = handleApiError(error);
            console.error('Failed to fetch transaction summary: ', errorMessage);
            throw new Error(errorMessage);
        }
    }
}

export const transactionService = new TransactionService();

export default TransactionService;