import { RiPieChart2Fill } from "react-icons/ri";
import { FaPenAlt, FaWallet, FaNewspaper, FaDesktop, FaApple, FaAndroid } from "react-icons/fa";
import { IoIosCash, IoIosPaper, IoIosMailOpen, } from "react-icons/io";
import { BsSafeFill } from "react-icons/bs";
import { FaCreditCard } from "react-icons/fa6";
import { IoDocumentsSharp, IoStatsChart } from "react-icons/io5";
import { MdEditDocument } from "react-icons/md";
import { MdAllInbox, MdDiscount } from "react-icons/md";
import { BsBank2, BsInfoLg } from "react-icons/bs";
import { GrAtm } from "react-icons/gr";
import { BiSolidCoinStack } from "react-icons/bi";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import { useState } from "react";
import SidebarItem from "../components/Sidebar";
import AccountsTable from "../components/AccountsTable";
import TransactionsTable from "../components/TransactionsTable";
import SignatureTable from "../components/SignatureTable";
import CardsTable from "../components/CardsTable";

const Dashboard = () => {

    const [infoFibankOpen, setInfoFibankOpen] = useState(false);
    const [moreInfoOpen, setMoreInfoOpen] = useState(false);

    return(
        <div className="lg:m-5 lg:flex bg-white">
           {/* Sidebar */}
            <aside className="w-full lg:w-80 text-center lg:text-left bg-white space-y-2 border-r lg:py-2 border-gray-300">
                <p className="text-gray-500 text-xs px-2">Счетоводна дата: 20/Яну/2015</p>
                <div className="space-y-1 border-b border-gray-300 pb-2 px-2">
                    <button className="flex items-center space-x-2">
                            <img src="/profile.jpg" alt="profile" className="h-8 w-8 rounded-full" />
                        <div className="text-left">
                            <p className="text-gray-500 text-xs">Потребител:</p>
                            <p>Филип Филипов</p>
                        </div>
                    </button>
                    <button className="flex items-center space-x-2">
                        <img src="/company-logo.png" alt="company-logo" className="h-8 w-8 rounded-full"/>
                        <div className="text-left">
                            <p className="text-gray-500 text-xs">Клиент:</p>
                            <p>УИЗ ЕООД</p>
                        </div>
                    </button>
                </div>
                <ul className="space-y-1 text-md w-full text-gray-700">
                    <button className="bg-red-500 px-28 m-1 lg:px-11 lg:m-2 text-lg cursor-pointer hover:bg-red-700 text-white font-semibold p-1 my-1">
                        <BiSolidCoinStack className="inline-block mr-2" />
                        <span>НОВ ПРЕВОД</span>
                    </button>
                    <li className="text-blue-800 cursor-pointer py-2 px-2"><a href="#">
                        <RiPieChart2Fill className="inline-block mr-2" />
                        Начало
                    </a></li>
                    
                    <SidebarItem icon={IoIosPaper} label="Справки">
                        <li className="aside-submenu"><a href="#">ПОС транзакции - по групи</a></li>
                        <li className="aside-submenu"><a href="#">ПОС транзакции за период</a></li>
                        <li className="aside-submenu"><a href="#">Салда по всички сметки SSO</a></li>
                        <li className="aside-submenu"><a href="#">Дневен отчет за бюдж. разпоредител</a></li>
                        <li className="aside-submenu"><a href="#">Извършени услуги за клиент</a></li>
                        <li className="aside-submenu"><a href="#">Изпратени SMS нотификации</a></li>
                        <li className="aside-submenu"><a href="#">Дължими суми от такси</a></li>
                        <li className="aside-submenu"><a href="#">Преводи по SWIFT</a></li>
                        <li className="aside-submenu"><a href="#">Сесии</a></li>
                    </SidebarItem>
                    <SidebarItem icon={IoIosCash} label="Плащания">
                        <p className="px-2 py-2 text-gray-500 text-xs">ПРЕВОДИ</p>
                        <li className="aside-submenu"><a href="#">Нов кредитен превод</a></li>
                        <li className="aside-submenu"><a href="#">Плащане от/към бюджета</a></li>
                        <li className="aside-submenu"><a href="#">Директен дебит</a></li>
                        <li className="aside-submenu"><a href="#">Масов дебит</a></li>
                        <li className="aside-submenu"><a href="#">Преводи от файл</a></li>
                        <li className="aside-submenu"><a href="#">Нов периодичен превод</a></li>
                        <li className="aside-submenu"><a href="#">Плащания към СЕБРА</a></li>
                        <li className="aside-submenu"><a href="#">Кредитен превод CY</a></li>
                        <li className="aside-submenu"><a href="#">Вътрешноклонов превод CY</a></li>
                        <p className="px-2 py-2 text-gray-500 border-t border-gray-300 text-xs">ПОКУПКА/ПРОДАЖБА НА ВАЛУТА</p>
                        <li className="aside-submenu"><a href="#">Покупка/продажба на валута</a></li>
                        <li className="aside-submenu"><a href="#">Договаряне на курс</a></li>
                        <p className="px-2 py-2 text-gray-500 border-t border-gray-300 text-xs">РЕГИСТРИ</p>
                        <li className="aside-submenu"><a href="#">Регистър на пер. преводи</a></li>
                        <li className="aside-submenu"><a href="#">Получатели за преводи</a></li>
                    </SidebarItem>
                    <SidebarItem icon={MdAllInbox} label="Извлечения">
                        <li className="aside-submenu"><a href="#">Извлечение по сметка</a></li>
                        <li className="aside-submenu"><a href="#">Извлечение по кредитна карта</a></li>
                    </SidebarItem>
                    <li className="custom-li"><a href="#">
                        <IoIosPaper className="inline-block mr-2" />
                        Сметки
                    </a></li>
                    <li className="custom-li"><a href="#">
                        <BsSafeFill className="inline-block mr-2" />
                        Депозити
                    </a></li>
                    <li className="custom-li"><a href="#">
                        <FaCreditCard className="inline-block mr-2" />
                        Карти
                    </a></li>
                    <li className="custom-li"><a href="#">
                        <FaPenAlt className="inline-block mr-2" />    
                        Преводи за подпис
                    </a></li>
                    <li className="custom-li"><a href="#">
                        <IoDocumentsSharp className="inline-block mr-2" />
                        Наредени документи
                    </a></li>
                    <SidebarItem icon={IoIosMailOpen} label="Услуги">
                        <li className="aside-submenu"><a href="#">Отчети по e-mail за сметки</a></li>
                        <li className="aside-submenu"><a href="#">Извлечения по e-mail за карти</a></li>
                        <li className="aside-submenu"><a href="#">Картови авторизации по e-mail</a></li>
                        <li className="aside-submenu"><a href="#">Преводи по SWIFT по e-mail</a></li>
                    </SidebarItem>
                    <SidebarItem icon={FaWallet} label="Комунални услуги">
                    <p className="px-2 py-2 text-gray-500 text-xs">ПЛАЩАНЕ НА ЗАДЪЛЖЕНИЯ</p>
                        <li className="aside-submenu"><a href="#">Задължения очакващи плащане</a></li>
                        <li className="aside-submenu"><a href="#">Плащане на задължения</a></li>
                        <li className="aside-submenu"><a href="#">Плащане на общински данъци и такси</a></li>
                        <li className="aside-submenu"><a href="#">Еднократно плащане</a></li>
                        <p className="px-2 py-2 text-gray-500 border-t border-gray-300 text-xs">АБОНАТНИ СМЕТКИ</p>
                        <li className="aside-submenu"><a href="#"></a>Добавяне на абонатна сметка</li>
                        <li className="aside-submenu"><a href="#"></a>Регистрирани абонатни сметки</li>
                        <p className="px-2 py-2 text-gray-500 border-t border-gray-300 text-xs">ДРУГИ</p>
                        <li className="aside-submenu"><a href="#"></a>Известия по e-mail</li>
                        <li className="aside-submenu"><a href="#"></a>История на плащанията</li>
                    </SidebarItem>
                    <SidebarItem icon={MdEditDocument} label="Декларации">
                        <li className="aside-submenu"><a href="#">Декларация НОИ</a></li>
                        <li className="aside-submenu"><a href="#">Статистическа форма 100 000 лв.</a></li>
                        <li className="aside-submenu"><a href="#">Декларация за произход на средствата</a></li>
                        <li className="aside-submenu"><a href="#">Декларация за презгранични преводи</a></li>
                    </SidebarItem>
                </ul>
                <div className="text-gray-700 border-t border-gray-300 w-full py-2">
                    <p 
                        className="text-gray-500 text-xs px-2 cursor-pointer hover:text-blue-800 flex items-center"
                        onClick={() => setInfoFibankOpen((prev) => !prev)}
                        >
                            ИНФОРМАЦИЯ ЗА FIBANK
                            {infoFibankOpen ? (
                                <FiChevronDown className="ml-2" />
                            ) : (
                                <FiChevronRight className="ml-2" />
                            )}
                    </p>
                    {infoFibankOpen && (
                        <ul className="text-gray-700 text-md">
                        <li className="custom-li"><a href="#">
                            <BsBank2 className="inline-block mr-2" />
                            Клонове
                        </a></li>
                        <li className="custom-li"><a href="#">
                            <GrAtm className="inline-block mr-2" />
                            Банкомати
                        </a></li>
                        <li className="custom-li"><a href="#">
                            <IoStatsChart className="inline-block mr-2" />
                            Валутни курсове
                        </a></li>
                        <li className="custom-li"><a href="#">
                            <FaNewspaper className="inline-block mr-2" />
                            Новини
                        </a></li>
                        <li className="custom-li"><a href="#">
                            <MdDiscount className="inline-block mr-2" />
                            Промоции
                        </a></li>
                    </ul>
                    )}
                </div>
                <div className="text-gray-700 border-t border-gray-300 w-full py-2">
                    <p 
                    className="text-gray-500 text-sm px-2 cursor-pointer hover:text-blue-800 flex items-center"
                    onClick={() => setMoreInfoOpen((prev) => !prev)}
                    >Допълнително
                    {moreInfoOpen ? (
                        <FiChevronDown className="ml-2" />
                    ) : (
                        <FiChevronRight className="ml-2" />
                    )}
                    </p>

                    {moreInfoOpen && (<ul>
                        <li className="custom-li"><a href="#">
                            <BsInfoLg className="inline-block mr-2" />
                            Помощ
                        </a></li>
                        <li className="custom-li"><a href="#">
                            <FaDesktop className="inline-block mr-2" />
                            Към сайта
                        </a></li>
                        <li className="custom-li"><a href="#">
                            <FaAndroid className="inline-block" />
                            <FaApple className="inline-block mr-2" />
                            Мобилно приложение
                        </a></li>
                    </ul>
                    )}
                </div>
            </aside>

           {/* Main content */}
            <main  className=" w-full flex-grow">
                <div className="border-b text-center lg:text-left border-gray-300 lg:px-6 lg:py-2 text-gray-500">
                    Начало
                </div>
                {/* Top Info Boxes */}
                <div className="px-6 py-2">
                <section className="grid grid-cols-1 sm1 lg:grid-cols-3 gap-8 py-4">
                    <div className="bg-gray-100 text-center block py-4 px-12">
                        Нета разполагаема наличност по сметки и депозити:
                        <span className="text-2xl text-blue-800 block font-semibold">50 203 000.03 BGN</span>
                        </div>
                    <div className="bg-gray-100 text-center block py-4 px-12">
                        Общо  текущо салдо по сметки и депозити:
                        <span className="text-2xl text-blue-800 block bottom-0 font-semibold">75 000.00 BGN</span>
                    </div>
                    <div className="bg-gray-100 text-center block py-4 px-12">
                        Обща нетна разполагаемост по картови сметки:
                        <span className="text-2xl text-blue-800 block font-semibold">20 000.00 BGN</span>
                    </div>
                </section>

                {/* Accounts Table */}
                <AccountsTable />

                {/* Transactions Table */}
                <TransactionsTable />

                {/* For Signature Table */}
                <SignatureTable />

                {/*Cards Table */}
                <CardsTable />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;