import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { IoIosPaper, IoIosSettings } from "react-icons/io";
import TablesBtn from "./TablesBtn";
import { BiSolidCoinStack } from "react-icons/bi";
import { FaAlignLeft, FaCoins } from "react-icons/fa";
import { MdAllInbox } from "react-icons/md";

interface Account {
    _id: string;
    accountNumber: string;
    accountType: string;
    currency: string;
    availableBalance: number;
    startingBalance: number;
    balance: number;
    feesOwed: number;
}


const AccountsTable = () => {
    const { user } = useAuth();
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.userId) {
            axios.get(`/api/accounts/user/${user.userId}`)
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setAccounts(res.data)
                    } else {
                        console.error('Expected array but got:', res.data);
                        setAccounts([]);
                    }
                })
                .catch(err => {
                    console.error('Failed to fetch accounts: ', err);
                    setAccounts([]);
                })
                .finally(() => setLoading(false));
        }
    }, [user]);

    if (loading) return <p className="p-4">Зареждане на сметки...</p>;

    return (
        <section className="border my-5 border-gray-300 shadow-md">
            <div className="flex justify-between items-stretch border-b border-gray-300 bg-white">
                <h2 className="text-lg pl-4 py-2 font-semibold flex items-center">СМЕТКИ</h2>
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
            <div className="lg:hidden text-center">
                {accounts.map(acc => (
                    <div key={acc._id} className="border-b p-4">
                        <div className="font-bold">{acc.accountType}</div>
                        <div>Сметка: {acc.accountNumber}</div>
                        <div>Валута: {acc.currency}</div>
                        <div>Разполагаемост: {acc.availableBalance.toFixed(2)}</div>
                        <div>Начално салдо: {acc.startingBalance.toFixed(2)}</div>
                        <div>Текущо салдо: {acc.balance.toFixed(2)}</div>
                        <div className="text-blue-800">Такси: {acc.feesOwed.toFixed(2)}</div>
                        <div className="flex mt-2 gap-2 justify-center">
                            <TablesBtn icon={<BiSolidCoinStack/>} ariaLabel="НОВ ПРЕВОД"/>
                            <TablesBtn icon={<FaAlignLeft/>}/>
                            <TablesBtn icon={<FaCoins/>}/>
                            <TablesBtn icon={<MdAllInbox/>}/>
                        </div>
                    </div>
                ))}
            </div>
            <div className="hidden lg:block">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 text-center">
                        <tr>
                            <td className="py-2 pl-4 w-68 text-left">Сметка</td>
                            <td className="py-2 w-18">Валута</td>
                            <td className="py-2 w-40">Разполагаемост</td>
                            <td className="py-2 w-40">Начално<br />салдо за деня</td>
                            <td className="py-2">Текущо салдо</td>
                            <td className="py-2">Дължими<br />суми от такси</td>
                            <td className="py-2 w-40">Действия</td>
                        </tr>
                    </thead>
                    <tbody className="text-right">
                        {accounts.map((acc, index) => (
                            <tr key={acc._id} className={index % 2 === 1 ? 'bg-gray-100' : ''}>
                                <td className="table-td text-left flex items-center space-x-2">
                                    <a href="#" className="inline-flex items-center justify-center bg-blue-800 rounded-full w-8 h-8">
                                        <IoIosPaper className="text-white w-5 h-5" />
                                    </a>
                                    <span>
                                        <p>{acc.accountType}</p>
                                        <a href="#" className="text-blue-800">{acc.accountNumber} &gt;</a>
                                    </span>
                                </td>
                                <td className="table-td">{acc.currency}</td>
                                <td className="table-td">{acc.availableBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                <td className="table-td">{acc.startingBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                <td className="table-td">{acc.balance.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                <td className="table-td text-blue-800">{acc.feesOwed.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                <td className="table-td border-none flex">
                                    <TablesBtn icon={<BiSolidCoinStack/>} ariaLabel="НОВ ПРЕВОД"/>
                                    <TablesBtn icon={<FaAlignLeft/>}/>
                                    <TablesBtn icon={<FaCoins/>}/>
                                    <TablesBtn icon={<MdAllInbox/>}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AccountsTable;