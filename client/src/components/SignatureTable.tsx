import { IoIosSettings } from "react-icons/io";
import TablesBtn from "./TablesBtn";
import { IoAddSharp, IoTicket } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { GoX } from "react-icons/go";
import { FaPenNib } from "react-icons/fa";

const SignatureTable = () => {
    return (
        <section className="hidden lg:block border my-5 border-gray-300 shadow-md">
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
                                    <TablesBtn icon={<MdEdit />} ariaLabel="РЕДАКТИРАНЕ"/>
                                    <TablesBtn icon = {<GoX />} ariaLabel="ОТКАЖЕТЕ"/>
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
                                    <TablesBtn icon={<MdEdit />}  ariaLabel="РЕДАКТИРАНЕ"/>
                                    <TablesBtn icon = {<GoX />} ariaLabel="ОТКАЖЕТЕ"/>
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
                                    <TablesBtn icon={<MdEdit />}  ariaLabel="РЕДАКТИРАНЕ"/>
                                    <TablesBtn icon = {<GoX />} ariaLabel="ОТКАЖЕТЕ"/>
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
    )
};
export default SignatureTable;