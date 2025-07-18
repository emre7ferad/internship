import { RiPieChart2Fill } from "react-icons/ri";
import { FaAlignLeft, FaPenAlt, FaWallet, FaNewspaper, FaDesktop, FaCoins, FaApple, FaAndroid } from "react-icons/fa";
import { IoIosCash, IoIosPaper, IoIosMailOpen, IoIosSettings } from "react-icons/io";
import { BsSafeFill } from "react-icons/bs";
import { FaCreditCard, FaPenNib } from "react-icons/fa6";
import { IoDocumentsSharp, IoStatsChart, IoAddSharp, IoTicket, IoCard } from "react-icons/io5";
import { MdEditDocument } from "react-icons/md";
import { MdAllInbox, MdDiscount, MdEdit } from "react-icons/md";
import { BsBank2, BsInfoLg } from "react-icons/bs";
import { GrAtm } from "react-icons/gr";
import { BiSolidCoinStack } from "react-icons/bi";
import { GoX } from "react-icons/go";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import { useState } from "react";
import React from "react";
import SidebarItem from "../components/Sidebar";

{/* TODO да се оправи CSS и таблиците */}
type TablesBtnProps ={
    icon: React.ReactNode;
}
const TablesBtn: React.FC<TablesBtnProps> = ({ icon }) => (
    <button 
        className="flex justify-center items-center w-10 h-10 border border-gray-300 text-gray-700 hover:text-blue-800 hover:bg-gray-100 cursor-pointer"
        type="button"
    >
        {icon}
    </button>
);

const Dashboard = () => {

    const [infoFibankOpen, setInfoFibankOpen] = useState(false);
    const [moreInfoOpen, setMoreInfoOpen] = useState(false);

    return(
        <div className="m-5 flex bg-white">
           {/* Sidebar */}
            <aside className="w-80 bg-white space-y-2 border-r py-2 border-gray-300">
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
                    <button className="bg-red-500 px-11 m-2 text-lg cursor-pointer hover:bg-red-700 text-white font-semibold p-1 my-1">
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
            <main  className="flex-grow">
                <div className="border-b border-gray-300 px-6 py-2 text-gray-500">
                    Начало
                </div>
                {/* Top Info Boxes */}
                <div className="px-6 py-2">
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
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
                <section className="border my-5 border-gray-300 shadow-md">
                    <div className="flex justify-between items-stretch border-b border-gray-300 bg-white">
                        <h2 className="text-lg pl-4 py-2 font-semibold flex items-center">СМЕТКИ</h2>
                        <div className="flex items-stretch">
                            <a href="#" className="flex items-center px-3 border-l border-gray-300 hover:text-blue-800">
                                Вижте всички &gt;
                            </a>
                            <button className="flex items-center justify-center border-l border-gray-300 w-12 text-gray-700 hover:text-blue-800 cursor-pointer">
                                <IoIosSettings className="text-lg" />
                            </button>
                        </div>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 text-center">
                            <tr>
                                <td className="pl-4 py-2 w-68 text-left">Сметка</td>
                                <td className="py-2 w-18">Валута</td>
                                <td className="py-2 w-40">Разполагаемост</td>
                                <td className="py-2 w-40">Начално<br />салдо за деня</td>
                                <td className="py-2">Текущо салдо</td>
                                <td className="py-2">Дължими<br />суми  от такси</td>
                                <td className="py-2 w-40">Действия</td>
                            </tr>
                        </thead>
                        <tbody className="text-right">
                            <tr>
                                <td className="table-td text-left flex items-center space-x-2">
                                    <a href="#" className="inline-flex items-center justify-center bg-blue-800 rounded-full w-8 h-8">
                                        <IoIosPaper className="text-white w-5 h-5"/>
                                    </a>
                                    <span>
                                        <p>Разпл. сметка физ. лица</p>
                                        <a href="#" className="text-blue-800">91501BG10BGNW0WT7 &gt;</a>
                                    </span>
                                </td>
                                <td className="table-td">BGN</td>
                                <td className="table-td">50 150 000.00</td>
                                <td className="table-td">49 620 000.00</td>
                                <td className="table-td">51 000.00</td>
                                <td className="table-td text-blue-800">2.33</td>
                                <td className="table-td border-none flex">
                                    <TablesBtn icon={<BiSolidCoinStack />}/>
                                    <TablesBtn icon={<FaAlignLeft />}/>
                                    <TablesBtn icon={<FaCoins />}/>
                                    <TablesBtn icon={<MdAllInbox />}/>
                                </td>
                            </tr>
                            <tr>
                                <td className="table-td text-left flex items-center bg-gray-100 space-x-2">
                                    <a href="#" className="inline-flex items-center justify-center bg-blue-800 rounded-full w-8 h-8">
                                        <IoIosPaper className="text-white w-5 h-5"/>
                                    </a>
                                    <span>
                                        <p>Свободно разп. сметка</p>
                                        <a href="#" className="text-blue-800">915010BGN0WQDF &gt;</a>
                                    </span>
                                </td>
                                <td className="table-td bg-gray-100">BGN</td>
                                <td className="table-td bg-gray-100">25 000.00</td>
                                <td className="table-td bg-gray-100">28 000.00</td>
                                <td className="table-td bg-gray-100">25 000.00</td>
                                <td className="table-td bg-gray-100 text-blue-800">3.5</td>
                                <td className="table-td border-none bg-gray-100 flex">
                                    <TablesBtn icon={<BiSolidCoinStack />}/>
                                    <TablesBtn icon={<FaAlignLeft />}/>
                                    <TablesBtn icon={<FaCoins />}/>
                                    <TablesBtn icon={<MdAllInbox />}/>
                                </td>
                            </tr>
                            <tr>
                                <td className="table-td text-left flex items-center space-x-2">
                                    <a href="#" className="inline-flex items-center justify-center bg-blue-800 rounded-full w-8 h-8">
                                        <IoIosPaper className="text-white w-5 h-5"/>
                                    </a>
                                    <span>
                                        <p>Разпл. сметка физ. лица</p>
                                        <a href="#" className="text-blue-800">90501004592444 &gt;</a>
                                    </span>
                                </td>
                                <td className="table-td">USD</td>
                                <td className="table-td">0.01</td>
                                <td className="table-td">100.00</td>
                                <td className="table-td">0.01</td>
                                <td className="table-td text-blue-800">2.74</td>
                                <td className="table-td border-none flex">
                                    <TablesBtn icon={<BiSolidCoinStack />}/>
                                    <TablesBtn icon={<FaAlignLeft />}/>
                                    <TablesBtn icon={<FaCoins />}/>
                                    <TablesBtn icon={<MdAllInbox />}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                {/* For Signature Table */}
                <section className="border my-5 border-gray-300 shadow-md">
                <div className="flex justify-between items-stretch border-b border-gray-300 bg-white">
                        <h2 className="text-lg pl-4 py-2 font-semibold flex items-center">ЗА ПОДПИС</h2>
                        <div className="flex items-stretch">
                            <a href="#" className="flex items-center px-3 border-l border-gray-300 hover:text-blue-800">
                                Вижте всички &gt;
                            </a>
                            <button className="flex items-center justify-center border-l border-gray-300 w-12 text-gray-700 hover:text-blue-800 cursor-pointer">
                                <IoIosSettings className="text-lg" />
                            </button>
                        </div>
                    </div>
                    <table className="w-full text-left border-b border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>    
                                <th className="px-4 py-2">Вид плащане &darr;</th>
                                <td className="pl-4 py-2 w-40">Платец</td>
                                <td className="pl-4 py-2 w-40">Получател</td>
                                <td className="pl-4 py-2 w-40 text-center">Сума и валута</td>
                                <td className="pl-4 py-2 w-20"></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="table-td">
                                    <p>Преводно нареждане</p>
                                    <a href="#" className="text-blue-800">Вътрешнобанков превод</a>    
                                </td>
                                <td className="table-td">
                                    <p>Филип Илиев Филипов</p>
                                    <p>BG14FINV915010BGN0VWVT</p>
                                    </td>
                                <td className="table-td">
                                    <p>Бортис ООД</p>
                                    <p>BG19FINV91501015849744</p>
                                </td>
                                <td className="table-td text-right">1 500.00 BGN</td>
                                <td className="table-td border-none flex">
                                    <TablesBtn icon={<IoAddSharp />} />
                                    <TablesBtn icon={<MdEdit />} />
                                    <TablesBtn icon = {<GoX />} />
                                </td>
                            </tr>
                            <tr>
                                <td className="table-td bg-gray-100">
                                    <p>Преводно нареждане</p>
                                    <a href="#" className="text-blue-800">Кредитен превод</a>
                                </td>
                                <td className="table-td bg-gray-100">
                                    <p>Филип Илиев Филипов</p>
                                    <p>BG14FINV915010BGN0VWVT</p>
                                </td>
                                <td className="table-td bg-gray-100">
                                    <p>Нивобус ООД</p>
                                    <p>BG23UNCR70001521769897</p>    
                                </td>
                                <td className="table-td bg-gray-100 text-right">500.00 BGN</td>
                                <td className="table-td border-none flex bg-gray-100">
                                    <TablesBtn icon={<IoAddSharp />} />
                                    <TablesBtn icon={<MdEdit />} />
                                    <TablesBtn icon = {<GoX />} />
                                </td>
                            </tr>
                            <tr>
                                <td className="table-td">
                                    <p>Преводно нареждане</p>
                                    <a href="#" className="text-blue-800">Превод собствени сметки</a>

                                </td>
                                <td className="table-td">
                                    <p>Филип Илиев Филипов</p>
                                    <p>BG57FINV915010BGN0WQDF</p>
                                </td>
                                <td className="table-td">
                                    <p>УИЗ ЕООД</p>
                                    <p>BG44FINV91501004592444</p>    
                                </td>
                                <td className="table-td text-right">200.00 USD</td>
                                <td className="table-td border-none flex">
                                    <TablesBtn icon={<IoAddSharp />} />
                                    <TablesBtn icon={<MdEdit />} />
                                    <TablesBtn icon = {<GoX />} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <section className="flex bg-gray-100 space-x-2 pl-4 p-3">
                        <button className="flex items-center border bg-blue-800 border-gray-300 hover:bg-blue-600 cursor-pointer text-white py-1 px-2 font-bold">
                            <FaPenNib/>
                            <span className="px-2">ПОДПИШЕТЕ</span>
                        </button>
                        <button className="flex items-center border bg-blue-800 border-gray-300 hover:bg-blue-600 cursor-pointer text-white py-1 px-2 font-bold">
                            <IoTicket />
                            <span className="px-2">TOKEN</span>
                        </button>
                        <button className="flex items-center border bg-white border-gray-300 hover:bg-gray-200 cursor-pointer py-1 px-2 font-bold">
                            <GoX />
                            <span className="px-2">ОТКАЖЕТЕ</span>
                        </button>
                    </section>
                </section>

                {/*Cards Table */}
                <section className="border my-5 border-gray-300 shadow-md">
                <div className="flex justify-between items-stretch border-b border-gray-300 bg-white">
                        <h2 className="text-lg pl-4 py-2 font-semibold flex items-center">КАРТИ</h2>
                        <div className="flex items-stretch">
                            <a href="#" className="flex items-center px-3 border-l border-gray-300 hover:text-blue-800">
                                Вижте всички &gt;
                            </a>
                            <button className="flex items-center justify-center border-l border-gray-300 w-12 text-gray-700 hover:text-blue-800 cursor-pointer">
                                <IoIosSettings className="text-lg" />
                            </button>
                        </div>
                    </div>
                    <table className="w-full text-right border-b border-gray-300">
                        <thead className="bg-gray-100 text-center">
                            <tr>
                                <td className="px-4 py-2 text-left">Карта</td>
                                <td className="py-2 w-14 text-center">Валута</td>
                                <td className="py-2 w-30">Наличност</td>
                                <td className="py-2 w-30">Задължения</td>
                                <td className="py-2 w-30">Мин. вноска</td>
                                <td className="py-2 w-30">Погасете до</td>
                                <td className="py-2 w-45">3D Сигурност</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="table-td text-left flex">
                                    <img src="/Mastercard-logo.png" alt="MasterCard Logo" className="pl-2 w-15 h-8 space-x-4" />
                                    <span className="pl-5">
                                        <p>MasterCard Standard</p>
                                        <p>****2251</p>
                                    </span>
                                </td>
                                <td className="table-td">BGN</td>
                                <td className="table-td">17 500.00</td>
                                <td className="table-td text-red-500">12 000.00</td>
                                <td className="table-td text-red-500">2 000.00</td>
                                <td className="table-td">05/02/2015</td>
                                <td className="table-td border-none flex items-center justify-center">
                                    <IoCard />
                                    <p>Активирана</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="table-td text-left flex">
                                    <img src="/Visa-Logo.png" alt="Visa Logo" className="pl-2 w-15 h-6 space-x-4" />
                                    <span className="pl-5">
                                        <p>Visa Electron</p>
                                        <p>****1482</p>
                                    </span>
                                </td>
                                <td className="table-td">EUR</td>
                                <td className="table-td">3 000.00</td>
                                <td className="table-td text-red-500">2 000.00</td>
                                <td className="table-td text-red-500">200.00</td>
                                <td className="table-td">05/02/1025</td>
                                <td className="table-td border-none flex items-center justify-center">
                                    <IoCard />
                                    <p>Неактивирана</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="table-td text-left flex">
                                    <img src="/Mastercard-logo.png" alt="MasterCard Logo" className="pl-2 w-15 h-8 space-x-4" />
                                    <span className="pl-5">
                                        <p>MasterCard Standard</p>
                                        <p>****9640</p>
                                    </span>
                                </td>
                                <td className="table-td">USD</td>
                                <td className="table-td">10.01</td>
                                <td className="table-td text-red-500">20.00</td>
                                <td className="table-td text-red-500">2.50</td>
                                <td className="table-td">05/02/2015</td>
                                <td className="table-td border-none flex items-center justify-center">
                                    <IoCard />
                                    <p>Неактивирана</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <section className="flex bg-gray-100 space-x-2 pl-4 p-3">
                        <button className="flex items-center border bg-red-500 border-gray-300 hover:bg-red-700 cursor-pointer text-white py-1 px-5 font-bold">
                            Погасете &gt;
                        </button>
                    </section>
                </section>
                </div>
            </main>
        </div>
    )
}

export default Dashboard