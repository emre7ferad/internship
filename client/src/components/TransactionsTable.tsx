import { useAuth } from "../context/AuthContext";
import { transactionService } from "../services/transactionService";
import type { Transaction } from "../services/transactionService";
import { accountService } from "../services/accountService";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoIosSettings } from "react-icons/io";
import { useTranslation } from "react-i18next";

const TransactionsTable = () => {
    const { user } = useAuth();
    const { t } = useTranslation('dashboard')
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

    const fetchTransactions = async (accountId: string) => {
        if (!user?.userId) return;

        setLoading(true);
        setError(null);
        try {
            const data = await transactionService.getTransactionByAccount(accountId);
            setTransactions(data);
            setSelectedAccount(accountId);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch transactions';
            setError(errorMessage);
            console.error('Failed to fetch transactions: ', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        if (selectedAccount) {
            await fetchTransactions(selectedAccount);
        }
    }

    useEffect(() => {
        const loadInitialData = async () => {
            if (!user?.userId) return;

            setLoading(true);
            try {
                const accounts = await accountService.getUserAccounts(user.userId);
                if (accounts.length > 0) {
                    await fetchTransactions(accounts[0]._id);
                }
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Failed to load data';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        loadInitialData();
    }, [user]);

    if (loading) return <p className="p-4">{t('loadingTransactions')}</p>

    if (error) return (
        <div className="p-4 text-red-500">
            <p>Error: {error}</p>
            <button
                onClick={handleRefresh}
                className="mt-2 px-4 py-2 bg-blue-800 text-white hover:bg-blue-600"
            >
                {t('retry')}
            </button>
        </div>
    );

    const getTransactionTypeLabel = (type: string) => {
        switch(type) {
            case 'deposit':
                return `${t('deposit')}`;
            case 'withdrawal':
                return `${t('withdrawal')}`;
            case 'transfer':
                return `${t('transfer')}`;
            default:
                return type;
        }
    };

    const formatDate = (dateString: Date) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('bg-BG');
    };

    return (
        <section className="border my-5 border-gray-300 shadow-md">
            <div className="flex justify-between items-stretch border-b border-gray-300 bg-white">
                <h2 className="text-lg pl-4 py-2 font-semibold flex items-center uppercase">{t('lastFiveTransfers')}</h2>
                <div className="flex items-stretch">
                    <a href="#" className="flex items-center justify-center border-l border-gray-300 hover:text-blue-800">
                        {t('seeAll')} &gt;
                    </a>
                    <div className="relative group flex items-center hover:text-blue-800 cursor-pointer text-gray-700 justify-center border-l border-gray-300 w-12">
                        <button>
                            <IoIosSettings className="text-lg cursor-pointer" />
                        </button>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-white text-black font-semibold border border-gray-300 text-md px-2 py-1 whitespace-nowrap z-10 uppercase">
                            {t('settings')}
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden lg:block">
            <table className="w-full text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <td className="py-2 pl-4 w-20 text-left">{t('type')}</td>
                        <th className="py-2 w-24">{t('date')}</th>
                        <td className="py-2">{t('documentAndReference')}</td>
                        <td className="py-2">{t('receiverOrderer')}</td>
                        <td className="py-2">{t('account')}</td>
                        <td className="py-2 pr-4 text-right">{t('sum')}</td>
                    </tr>
                </thead>
                <tbody>
                    {transactions.slice(0, 5).map((transaction) => (
                        <tr key={transaction._id} className="border-t border-gray-300">
                            <td className="table-td pl-4">
                                <div className="flex items-center">
                                    {transaction.type === 'deposit' ? (
                                        <IoIosArrowUp className="text-green-500 mr-1"/>
                                    ) : (
                                        <IoIosArrowDown className="text-red-500 mr-1"/>
                                    )}
                                    {getTransactionTypeLabel(transaction.type)}
                                </div>
                            </td>
                            <td className="table-td">{formatDate(transaction.date)}</td>
                            <td className="table-td">{transaction.description}</td>
                            <td className="table-td">-</td>
                            <td className="table-td">{transaction.account?.accountNumber}</td>
                            <td className={`py-3 pr-4 text-right ${transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'}`}>
                                {transaction.type === 'withdrawal' ? '-' : '+'}
                                {transaction.amount.toLocaleString('bg-BG', { minimumFractionDigits: 2})} {transaction.currency}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <div className="lg:hidden text-center divide-y divide-gray-200">
                {transactions.slice(0, 5).map(transaction => (
                    <div key={transaction._id} className="p-4 space-y-2">
                        <div className="flex items-center space-x-2 font-semibold">
                            {transaction.type === 'deposit' ? (
                                <IoIosArrowUp className="text-green-500" />
                            ) : (
                                <IoIosArrowDown className="text-red-500" />
                            )}
                            <span>{getTransactionTypeLabel(transaction.type)}</span>
                        </div>
                        <div><span className="font-medium">{t('date')}:</span> {formatDate(transaction.date)}</div>
                        <div><span className="font-medium">{t('documentAndReference')}:</span> {transaction.description}</div>
                        <div><span className="font-medium">{t('receiverOrderer')}:</span> -</div>
                        <div><span className="font-medium">{t('account')}:</span> {transaction.account?.accountNumber}</div>
                        <div className={`font-medium ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                            <span>Сума: </span>
                            {transaction.type === 'withdrawal' ? '-' : '+'}
                            {transaction.amount.toLocaleString('bg-BG', { minimumFractionDigits: 2 })} {transaction.currency}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TransactionsTable;