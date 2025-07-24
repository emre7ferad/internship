import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoIosSettings } from "react-icons/io";

interface Transaction {
    _id: string;
    date: Date;
    type: 'deposit' | 'withdrawal' | 'transfer';
    amount: number;
    currency: string;
    description: string;
    account: {
        _id: string;
        accountNumber: string;
    }
}

const TransactionsTable = () => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

    useEffect(() => {
        if (user?.userId) {
            axios.get(`api/accounts/user/${user.userId}`)
                .then(accountsRes => {
                    if (Array.isArray(accountsRes.data) && accountsRes.data.length > 0) {
                        const firstAccount = accountsRes.data[0];
                        setSelectedAccount(firstAccount._id)

                        return axios.get(`api/transactions/account/${firstAccount._id}`);
                    }
                    return Promise.reject('No accounts found');
                })
                .then(transactionsRes => {
                    if (Array.isArray(transactionsRes.data)) {
                        setTransactions(transactionsRes.data);
                    } else {
                        console.error('Expected array but got: ', transactionsRes.data);
                        setTransactions([]);
                    }
                })
                .finally(() => setLoading(false))
        }
    }, [user]);

    if (loading) return <p className="p-4">Зареждане на транзакции...</p>

    const getTransactionTypeLabel = (type: string) => {
        switch(type) {
            case 'deposit':
                return 'Депозит';
            case 'withdrawal':
                return 'Теглене';
            case 'transfer':
                return 'Превод';
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
                <h2 className="text-lg pl-4 py-2 font-semibold flex items-center">ПОСЛЕДНИ 5 ПРЕВОДА</h2>
                <div className="flex items-stretch">
                    <a href="#" className="flex items-center justify-center border-l border-gray-300 hover:text-blue-800">
                        Вижте всички &gt;
                    </a>
                    <div className="relative group flex items-center hover:text-blue-800 cursor-pointer text-gray-700 justify-center border-l border-gray-300 w-12">
                        <button>
                            <IoIosSettings className="text-lg cursor-pointer" />
                        </button>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-white text-black font-semibold border border-gray-300 text-md px-2 py-1 whitespace-nowrap z-10">
                            НАСТРОЙКИ
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden lg:block">
            <table className="w-full text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <td className="py-2 pl-4 w-20 text-left">Тип</td>
                        <th className="py-2 w-24">Дата</th>
                        <td className="py-2">Документ и референция</td>
                        <td className="py-2">Получател/наредител</td>
                        <td className="py-2">Сметка</td>
                        <td className="py-2 pr-4 text-right">Сума</td>
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
                        <div><span className="font-medium">Дата:</span> {formatDate(transaction.date)}</div>
                        <div><span className="font-medium">Референция:</span> {transaction.description}</div>
                        <div><span className="font-medium">Получател/Наредител:</span> -</div>
                        <div><span className="font-medium">Сметка:</span> {transaction.account?.accountNumber}</div>
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