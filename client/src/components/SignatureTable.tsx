import { IoIosSettings } from "react-icons/io";
import TablesBtn from "./TablesBtn";
import { IoAddSharp, IoTicket } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { GoX } from "react-icons/go";
import { FaPenNib } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const SignatureTable = () => {
    const { t } = useTranslation('dashboard')
    return (
        <section className="hidden lg:block border my-5 border-gray-300 shadow-md">
                <div className="flex justify-between items-stretch border-b border-gray-300 bg-white">
                        <h2 className="text-lg pl-4 py-2 font-semibold flex items-center uppercase">{t('forSignature')}</h2>
                        <div className="flex items-stretch">
                            <a href="#" className="flex items-center px-3 border-l border-gray-300 hover:text-blue-800">
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
                    <table className="w-full text-left border-b border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>    
                                <th className="px-4 py-2">{t('typeOfPayment')} &darr;</th>
                                <td className="pl-4 py-2 w-40">{t('payer')}</td>
                                <td className="pl-4 py-2 w-40">{t('receiver')}</td>
                                <td className="pl-4 py-2 w-40 text-center">{t('amountAndCurrency')}</td>
                                <td className="pl-4 py-2 w-20"></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="table-td">
                                    <p>{t('transferOrder')}</p>
                                    <a href="#" className="text-blue-800">{t('intrabankTransfer')}</a>    
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
                                    <TablesBtn icon={<MdEdit />} ariaLabel={t('edit')}/>
                                    <TablesBtn icon = {<GoX />} ariaLabel={t('cancel')}/>
                                </td>
                            </tr>
                            <tr>
                                <td className="table-td bg-gray-100">
                                    <p>{t('transferOrder')}</p>
                                    <a href="#" className="text-blue-800">{t('creditTransfer')}</a>
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
                                    <TablesBtn icon={<MdEdit />}  ariaLabel={t('edit')}/>
                                    <TablesBtn icon = {<GoX />} ariaLabel={t('cancel')}/>
                                </td>
                            </tr>
                            <tr>
                                <td className="table-td">
                                    <p>{t('transferOrder')}</p>
                                    <a href="#" className="text-blue-800">{t('transferOwnAcc')}</a>

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
                                    <TablesBtn icon={<MdEdit />}  ariaLabel={t('edit')}/>
                                    <TablesBtn icon = {<GoX />} ariaLabel={t('cancel')}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <section className="flex bg-gray-100 space-x-2 pl-4 p-3">
                        <button className="flex items-center border bg-blue-800 border-gray-300 hover:bg-blue-600 cursor-pointer text-white py-1 px-2 font-bold">
                            <FaPenNib/>
                            <span className="px-2 uppercase">{t('sign')}</span>
                        </button>
                        <button className="flex items-center border bg-blue-800 border-gray-300 hover:bg-blue-600 cursor-pointer text-white py-1 px-2 font-bold">
                            <IoTicket />
                            <span className="px-2 uppercase">TOKEN</span>
                        </button>
                        <button className="flex items-center border bg-white border-gray-300 hover:bg-gray-200 cursor-pointer py-1 px-2 font-bold">
                            <GoX />
                            <span className="px-2 uppercase">{t('cancel')}</span>
                        </button>
                    </section>
                </section>
    )
};
export default SignatureTable;