import { IoIosSettings } from "react-icons/io";
import { IoCard } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const CardsTable = () => {
    const { t } = useTranslation('dashboard')
    return (
        <section className="hidden lg:block border my-5 border-gray-300 shadow-md">
                <div className="flex justify-between items-stretch border-b border-gray-300 bg-white">
                        <h2 className="text-lg pl-4 py-2 font-semibold flex items-center uppercase">{t('cards')}</h2>
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
                    <table className="w-full text-right border-b border-gray-300">
                        <thead className="bg-gray-100 text-center">
                            <tr>
                                <td className="px-4 py-2 text-left">{t('card')}</td>
                                <td className="py-2 w-14 text-center">{t('currency')}</td>
                                <td className="py-2 w-30">{t('availability')}</td>
                                <td className="py-2 w-30">{t('debts')}</td>
                                <td className="py-2 w-30">{t('minDownPayment')}</td>
                                <td className="py-2 w-30">{t('payOffBy')}</td>
                                <td className="py-2 w-45">3D {t('security')}</td>
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
                                    <p>{t('activated')}</p>
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
                                    <p>{t('notActivated')}</p>
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
                                    <p>{t('notActivated')}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <section className="flex bg-gray-100 space-x-2 pl-4 p-3">
                        <button className="flex items-center border bg-red-500 border-gray-300 hover:bg-red-700 cursor-pointer text-white py-1 px-5 font-bold">
                            {t('payOff')} &gt;
                        </button>
                    </section>
                </section>
    )
};

export default CardsTable;