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
import { useTranslation } from "react-i18next";

const Dashboard = () => {
    const [infoFibankOpen, setInfoFibankOpen] = useState(false);
    const [moreInfoOpen, setMoreInfoOpen] = useState(false);
    const { t } = useTranslation('dashboard')

    return(
        <div className="lg:m-5 lg:flex bg-white">
           {/* Sidebar */}
            <aside className="w-full lg:w-80 text-center lg:text-left bg-white space-y-2 border-r lg:py-2 border-gray-300">
                <p className="text-gray-500 text-xs px-2">{t('accountingDate')}</p>
                <div className="space-y-1 border-b border-gray-300 pb-2 px-2">
                    <button className="flex items-center space-x-2">
                            <img src="/profile.jpg" alt="profile" className="h-8 w-8 rounded-full" />
                        <div className="text-left">
                            <p className="text-gray-500 text-xs">{t('user')}</p>
                            <p>{t('filipFilipov')}</p>
                        </div>
                    </button>
                    <button className="flex items-center space-x-2">
                        <img src="/company-logo.png" alt="company-logo" className="h-8 w-8 rounded-full"/>
                        <div className="text-left">
                            <p className="text-gray-500 text-xs">{t('client')}</p>
                            <p>{t('uizEOOD')}</p>
                        </div>
                    </button>
                </div>
                <ul className="space-y-1 text-md w-full text-gray-700">
                    <button className="bg-red-500 px-28 m-1 lg:px-11 lg:m-2 text-lg cursor-pointer hover:bg-red-700 text-white font-semibold p-1 my-1">
                        <BiSolidCoinStack className="inline-block mr-2" />
                        <span>{t('newTransfer')}</span>
                    </button>
                    <li className="text-blue-800 cursor-pointer py-2 px-2"><a href="#">
                        <RiPieChart2Fill className="inline-block mr-2" />
                        {t('home')}
                    </a></li>
                    
                    <SidebarItem icon={IoIosPaper} label={t('inquiries')}>
                        <li className="aside-submenu"><a href="#">{t('groupPos')}</a></li>
                        <li className="aside-submenu"><a href="#">{t('transferPos')}</a></li>
                        <li className="aside-submenu"><a href="#">{t('accountsBalance')} SSO</a></li>
                        <li className="aside-submenu"><a href="#">{t('dailyReport')}</a></li>
                        <li className="aside-submenu"><a href="#">{t('doneServices')}</a></li>
                        <li className="aside-submenu"><a href="#">{t('sentSms')}</a></li>
                        <li className="aside-submenu"><a href="#">{t('owedFeesTaxes')}</a></li>
                        <li className="aside-submenu"><a href="#">{t('swiftTransfers')} SWIFT</a></li>
                        <li className="aside-submenu"><a href="#">{t('sessions')}</a></li>
                    </SidebarItem>
                    <SidebarItem icon={IoIosCash} label={t('payments')}>
                        <p className="px-2 py-2 text-gray-500 text-xs uppercase">{t('transfersLbl')}</p>
                        <li className="aside-submenu"><a href="#">{t('newCreditTransfer')}</a></li>
                        <li className="aside-submenu"><a href="#">{t('paymentsBudget')}</a></li>
                        <li className="aside-submenu"><a href="#">{t('directDebit')}</a></li>
                        <li className="aside-submenu"><a href="#">{t('massDebit')}</a></li>
                        <li className="aside-submenu"><a href="#">{t('fileTransfers')}</a></li>
                        <li className="aside-submenu"><a href="#">{t('newPeriodicTransfers')}</a></li>
                        <li className="aside-submenu"><a href="#">{t('paymentsToSebra')}</a></li>
                        <li className="aside-submenu"><a href="#">{t('creditTransfer')} CY</a></li>
                        <li className="aside-submenu"><a href="#">{t('innerBranchTransfer')} CY</a></li>
                        <p className="px-2 py-2 text-gray-500 border-t border-gray-300 text-xs uppercase">{t('pruchaseSaleCurrency')}</p>
                        <li className="aside-submenu"><a href="#">{t('pruchaseSaleCurrency')}</a></li>
                        <li className="aside-submenu"><a href="#">{t('courseNegotiation')}</a></li>
                        <p className="px-2 py-2 text-gray-500 border-t border-gray-300 text-xs uppercase">{t('registers')}</p>
                        <li className="aside-submenu"><a href="#">{t('regPerTransfers')}</a></li>
                        <li className="aside-submenu"><a href="#">{t('reciversTransfers')}</a></li>
                    </SidebarItem>
                    <SidebarItem icon={MdAllInbox} label={t('statements')}>
                        <li className="aside-submenu"><a href="#">{t('accountStatement')}</a></li>
                        <li className="aside-submenu"><a href="#">{t('creditCardStatement')}</a></li>
                    </SidebarItem>
                    <li className="custom-li"><a href="#">
                        <IoIosPaper className="inline-block mr-2" />
                        {t('accounts')}
                    </a></li>
                    <li className="custom-li"><a href="#">
                        <BsSafeFill className="inline-block mr-2" />
                        {t('deposits')}
                    </a></li>
                    <li className="custom-li"><a href="#">
                        <FaCreditCard className="inline-block mr-2" />
                        {t('cards')}
                    </a></li>
                    <li className="custom-li"><a href="#">
                        <FaPenAlt className="inline-block mr-2" />    
                        {t('signatureTransfers')}
                    </a></li>
                    <li className="custom-li"><a href="#">
                        <IoDocumentsSharp className="inline-block mr-2" />
                        {t('orderedDocuments')}
                    </a></li>
                    <SidebarItem icon={IoIosMailOpen} label="Услуги">
                        <li className="aside-submenu"><a href="#">Отчети по e-mail за сметки</a></li>
                        <li className="aside-submenu"><a href="#">Извлечения по e-mail за карти</a></li>
                        <li className="aside-submenu"><a href="#">Картови авторизации по e-mail</a></li>
                        <li className="aside-submenu"><a href="#">Преводи по SWIFT по e-mail</a></li>
                    </SidebarItem>
                    <SidebarItem icon={FaWallet} label="Комунални услуги">
                    <p className="px-2 py-2 text-gray-500 text-xs uppercase">ПЛАЩАНЕ НА ЗАДЪЛЖЕНИЯ</p>
                        <li className="aside-submenu"><a href="#">Задължения очакващи плащане</a></li>
                        <li className="aside-submenu"><a href="#">Плащане на задължения</a></li>
                        <li className="aside-submenu"><a href="#">Плащане на общински данъци и такси</a></li>
                        <li className="aside-submenu"><a href="#">Еднократно плащане</a></li>
                        <p className="px-2 py-2 text-gray-500 border-t border-gray-300 text-xs uppercase">АБОНАТНИ СМЕТКИ</p>
                        <li className="aside-submenu"><a href="#"></a>Добавяне на абонатна сметка</li>
                        <li className="aside-submenu"><a href="#"></a>Регистрирани абонатни сметки</li>
                        <p className="px-2 py-2 text-gray-500 border-t border-gray-300 text-xs uppercase">ДРУГИ</p>
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
                    {t('home')}
                </div>
                {/* Top Info Boxes */}
                <div className="px-6 py-2">
                <section className="grid grid-cols-1 sm1 lg:grid-cols-3 gap-8 py-4">
                    <div className="bg-gray-100 text-center block py-4 px-12">
                        {t('netAvailable')}
                        <span className="text-2xl text-blue-800 block font-semibold">50 203 000.03 BGN</span>
                        </div>
                    <div className="bg-gray-100 text-center block py-4 px-12">
                        {t('totalCurrentBalance')}
                        <span className="text-2xl text-blue-800 block bottom-0 font-semibold">75 000.00 BGN</span>
                    </div>
                    <div className="bg-gray-100 text-center block py-4 px-12">
                        {t('totalNetAvailability')}
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