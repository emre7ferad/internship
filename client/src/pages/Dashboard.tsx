import { RiPieChart2Fill } from "react-icons/ri";
import { FaAlignLeft, FaPenAlt, FaWallet, FaNewspaper, FaDesktop, FaCoins, FaApple, FaAndroid } from "react-icons/fa";
import { IoIosCash, IoIosPaper, IoIosMailOpen, IoIosSettings } from "react-icons/io";
import { BsSafeFill } from "react-icons/bs";
import { FaCreditCard, } from "react-icons/fa6";
import { IoDocumentsSharp, IoStatsChart } from "react-icons/io5";
import { MdEditDocument } from "react-icons/md";
import { MdAllInbox, MdDiscount } from "react-icons/md";
import { BsBank2, BsInfoLg } from "react-icons/bs";
import { GrAtm } from "react-icons/gr";
import { BiSolidCoinStack } from "react-icons/bi";
import { useState } from "react";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";

{/* TODO да се оправи CSS и таблиците */}

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
                    <li className="custom-li-hover"><a href="#">
                        <FaAlignLeft className="inline-block mr-2" />
                        Справки
                    </a></li>
                    <li className="custom-li-hover"><a href="#">
                        <IoIosCash className="inline-block mr-2" />
                        Плащания
                    </a></li>
                    <li className="custom-li-hover"><a href="#">
                        <MdAllInbox className="inline-block mr-2" />
                        Извлечения
                    </a></li>
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
                    <li className="custom-li-hover"><a href="#">
                        <IoIosMailOpen className="inline-block mr-2" />
                        Услуги
                    </a></li>
                    <li className="custom-li-hover"><a href="#">
                        <FaWallet className="inline-block mr-2" />
                        Комунални услуги
                    </a></li>
                    <li className="custom-li-hover"><a href="#">
                        <MdEditDocument className="inline-block mr-2" />
                        Декларации
                    </a></li>
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
                            <button className="flex items-center px-3 border-l border-gray-300">
                                Вижте всички &gt;
                            </button>
                            <button className="flex items-center justify-center border-l border-gray-300 w-12 text-gray-700 hover:text-blue-800 cursor-pointer">
                                <IoIosSettings className="text-lg" />
                            </button>
                        </div>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="pl-4 py-2">Сметка</th>
                                <td className="pl-4 py-2">Валута</td>
                                <td className="pl-4 py-2">Разполагаемост</td>
                                <td className="pl-4 py-2">Начално салдо за деня</td>
                                <td className="pl-4 py-2">Текущо салдо</td>
                                <td className="pl-4 py-2">Дължими лихви и такси</td>
                                <td className="pl-4 py-2">Действия</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="pl-4 py-2">
                                    <p>Разпл. сметка физ. лица</p>
                                    <span>91501BG10BGNW0WT7 &gt;</span>
                                </td>
                                <td className="pl-4 py-2">BGN</td>
                                <td className="pl-4 py-2">50 150 000.00</td>
                                <td className="pl-4 py-2">49 620 000.00</td>
                                <td className="pl-4 py-2">51 000.00</td>
                                <td className="pl-4 py-2">2.33</td>
                                <td className="pl-4 py-2 flex">
                                    <button className="flex justify-center items-center w-10 h-10 border border-gray-300 text-gray-700 hover:text-blue-800 hover:bg-gray-100"><BiSolidCoinStack /></button>
                                    <button className="flex items-center justify-center w-10 h-10 border border-gray-300 text-gray-700 hover:text-blue-800 hover:bg-gray-100"><FaAlignLeft /></button>
                                    <button className="flex items-center justify-center w-10 h-10 border border-gray-300 text-gray-700 hover:text-blue-800 hover:bg-gray-100"><FaCoins /></button>
                                    <button className="flex items-center justify-center w-10 h-10 border border-gray-300 text-gray-700 hover:text-blue-800 hover:bg-gray-100"><MdAllInbox /></button>
                                </td>
                            </tr>
                            <tr>
                                <td className="pl-4 py-2">Свободно разп. сметка</td>
                                <td className="pl-4 py-2">BGN</td>
                                <td className="pl-4 py-2">25 000.00</td>
                                <td className="pl-4 py-2">28 000.00</td>
                                <td className="pl-4 py-2">25 000.00</td>
                                <td className="pl-4 py-2">3.5</td>
                                <td className="pl-4 py-2 flex">
                                    <button className="flex justify-center items-center w-10 h-10 border border-gray-300 text-gray-700 hover:text-blue-800 hover:bg-gray-100"><BiSolidCoinStack /></button>
                                    <button className="flex items-center justify-center w-10 h-10 border border-gray-300 text-gray-700 hover:text-blue-800 hover:bg-gray-100"><FaAlignLeft /></button>
                                    <button className="flex items-center justify-center w-10 h-10 border border-gray-300 text-gray-700 hover:text-blue-800 hover:bg-gray-100"><FaCoins /></button>
                                    <button className="flex items-center justify-center w-10 h-10 border border-gray-300 text-gray-700 hover:text-blue-800 hover:bg-gray-100"><MdAllInbox /></button>
                                </td>
                            </tr>
                            <tr>
                                <td className="pl-4 py-2">USD Account</td>
                                <td className="pl-4 py-2">USD</td>
                                <td className="pl-4 py-2">0.01</td>
                                <td className="pl-4 py-2">100.00</td>
                                <td className="pl-4 py-2">0.01</td>
                                <td className="pl-4 py-2">2.74</td>
                                <td className="pl-4 py-2 flex">
                                    <button className="flex justify-center items-center w-10 h-10 border border-gray-300 text-gray-700 hover:text-blue-800 hover:bg-gray-100"><BiSolidCoinStack /></button>
                                    <button className="flex items-center justify-center w-10 h-10 border border-gray-300 text-gray-700 hover:text-blue-800 hover:bg-gray-100"><FaAlignLeft /></button>
                                    <button className="flex items-center justify-center w-10 h-10 border border-gray-300 text-gray-700 hover:text-blue-800 hover:bg-gray-100"><FaCoins /></button>
                                    <button className="flex items-center justify-center w-10 h-10 border border-gray-300 text-gray-700 hover:text-blue-800 hover:bg-gray-100"><MdAllInbox /></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                {/* For Signature Table */}
                <section className="pl-2 border border-gray-300 shadow-md">
                    <h2  className="flex justify-between items-stretch border-b border-gray-300 bg-white text-lg px-4 py-2 font-semibold">ЗА ПОДПИС</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Вид нареждане</th>
                                <th>Платец</th>
                                <th>Получател</th>
                                <th>Сума и валута</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Преводно нареждане</td>
                                <td>Филип Илиев Филипов</td>
                                <td>Бортис ООД</td>
                                <td>1 500.00 BGN</td>
                                <td>
                                    <button></button>
                                    <button>РЕДАКТИРАЙТЕ</button>
                                    <button>ОТКАЖЕТЕ</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Преводно нареждане</td>
                                <td>Филип Илиев Филипов</td>
                                <td>Нивобус ООД</td>
                                <td>500.00 BGN</td>
                                <td>
                                    <button></button>
                                    <button>РЕДАКТИРАЙТЕ</button>
                                    <button>ОТКАЖЕТЕ</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Преводно нареждане</td>
                                <td>Филип Илиев Филипов</td>
                                <td>УИЗ ЕООД</td>
                                <td>200.00 USD</td>
                                <td>
                                    <button></button>
                                    <button>РЕДАКТИРАЙТЕ</button>
                                    <button>ОТКАЖЕТЕ</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button>ПОДПИШЕТЕ</button>
                    <button>TOKEN</button>
                    <button>ОТКАЖЕТЕ</button>
                </section>

                {/*Cards Table */}
                <section className="px-2 py-4 border border-gray-300 shadow-md mt-4">
                    <h2>КАРТИ</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Карта</th>
                                <th>Валута</th>
                                <th>Наличност</th>
                                <th>Задължения</th>
                                <th>Мин. вноска</th>
                                <th>Погасете до</th>
                                <th>3D Сигурност</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>MasterCard Standart</th>
                                <th>BGN</th>
                                <th>17 500.00</th>
                                <th>12 000.00</th>
                                <th>2000.00</th>
                                <th>05/02/2015</th>
                                <th>
                                    <button></button>
                                    <p>Активирана</p>
                                </th>
                            </tr>
                            <tr>
                                <th>Visa Electron</th>
                                <th>EUR</th>
                                <th>3 000.00</th>
                                <th>2 000.00</th>
                                <th>200.00</th>
                                <th>05/02/1025</th>
                                <th>
                                    <button></button>
                                    <p>Неактивирана</p>
                                </th>
                            </tr>
                            <tr>
                                <th>MasterCard Standart</th>
                                <th>USD</th>
                                <th>10.01</th>
                                <th>00.00</th>
                                <th>2.50</th>
                                <th>05/02/2015</th>
                                <th>
                                    <button></button>
                                    <p>Неактивирана</p>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                    <button>ПОГАСЕТЕ</button>
                </section>
                </div>
            </main>
        </div>
    )
}

export default Dashboard