import { API_ENDPOINTS } from "../utils/apiUtils";
import { getList, http } from "./http";

export interface Transaction {
    _id: string;
    date: Date;
    type: 'deposit' | 'withdrawal' | 'transfer';
    amount: number;
    currency: string;
    description: string;
    reference: string;
    document: string;
    senderAccount?: {
        _id: string;
        accountNumber: string;
        user?: {
            _id: string;
            nameCyrillic: string;
        };
    };
    receiverAccount?: {
        _id: string;
        accountNumber: string;
        user?: {
            _id: string;
            nameCyrillic: string;
        };
    };
    account: {
        _id: string;
        accountNumber: string;
        user?: {
            _id: string;
            nameCyrillic: string;
        }
    };
}

/* Interface for creating new transaction */
export interface CreateTransactionData {
    account: string;
    type: 'deposit' | 'withdrawal' | 'transfer';
    amount: number;
    currency: string;
    description: string;
    document?: string;
    senderAccount?: string;
    receiverAccount?: string;
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
        return getList<Transaction>(API_ENDPOINTS.transactions.accountTransactions(accountId));
    }

    /* Get transactions for a user (all accounts) */
    async getUserTransactions(userId: string): Promise<Transaction[]> {
        return getList<Transaction>(API_ENDPOINTS.transactions.userTransactions(userId));
    }

    /* Get specific transaction by ID */
    async getTransactionById(transactionId: string): Promise<Transaction> {
        return http.get<Transaction>(API_ENDPOINTS.transactions.transactionDetails(transactionId));
    }

    /* Create new transaction */
    async createTransaction(transactionData: CreateTransactionData): Promise<Transaction> {
        return http.post<Transaction>(API_ENDPOINTS.transactions.create, transactionData);
    }

    /* Update a transaction */
    async updateTransaction(transactionId: string, updateData: UpdateTransactionData): Promise<Transaction> {
        return http.put<Transaction>(API_ENDPOINTS.transactions.update(transactionId), updateData);
    }

    /* Delete a transaction */
    async deleteTransaction(transactionId: string): Promise<void> {
        return http.delete(API_ENDPOINTS.transactions.delete(transactionId));
    }

    /* Get transactions with pagination */
    async getPaginatedTransactions(
        accountId: string, 
        page: number = 1, 
        limit: number = 5
    ): Promise<{ transactions: Transaction[], total: number, page: number, limit: number }> {
        return http.get(`${API_ENDPOINTS.transactions.accountTransactions(accountId)}?page=${page}&limit=${limit}`);
    }

    /* Get transaction summary for an account */
    async getTransactionSummary(accountId: string): Promise<{
        totalDeposits: number;
        totalWithdrawals: number;
        totalTransfers: number;
        balance: number;
    }> {
        return http.get(API_ENDPOINTS.transactions.summary(accountId));
    }
}

export const transactionService = new TransactionService();

export default TransactionService;