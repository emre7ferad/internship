import ContactsFooter from "../components/ContactsFooter";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
const UnblockToken = () => {
    const { t } = useTranslation('unblockToken')

    return (
        <>
        <div className="border border-gray-300 shadow-md my-10 bg-white max-w-3xl mx-auto">
            {/*Header section*/}
            <section className="space-y-2 p-6 uppercase">
                <h2 className="text-2xl font-semibold">{t('header')} (TOKEN)</h2>
                <p>{t('formIs')} <span className="font-semibold">{t('only')}</span> {t('forClients')} <a href="#" className="text-blue-800">{t('here')}.</a></p>
            </section>

            {/*Form section*/}
            <form className="py-6 space-y-6 border-t border-gray-300">
                {/*First input section*/}
                <div className="px-6 max-w-3xl text-center md:text-left space-y-6 md:space-y-4">
                    <div className="md:grid md:grid-cols-2 items-center">
                        <label htmlFor="serialNumberToken" className="font-semibold md:text-left">{t('serialNumber')} TOKEN</label>
                        <input type="text" className="border border-gray-300 p-1 w-full justify-self-end focus:outline-none"/>
                    </div>
                    <div className="md:grid md:grid-cols-2 items-center">
                        <label htmlFor="username" className="font-semibold">{t('username')}</label>
                        <input type="text" className="border border-gray-300 p-1 w-full justify-self-end focus:outline-none"/>
                    </div>
                    <div className="md:grid md:grid-cols-2 items-center">
                        <label htmlFor="email" className="font-semibold">E-mail:</label>
                        <input type="email" className="border border-gray-300 p-1 w-full justify-self-end focus:outline-none"/>
                    </div>
                </div>

                {/*Second input section*/}
                <div className="max-w-3xl border-t border-gray-300">
                    <div className="md:flex text-center md:text-left items-center justify-between px-6 py-4">
                        <p className="w-full">{t('firstCode')}</p>
                        <input type="password" className="border border-gray-300 p-1 w-full md:w-92 focus:outline-none"/>
                    </div>
                    <div className="md:flex text-center md:text-left items-center justify-between px-6 py-4">
                        <p className="w-full">{t('secondCode')}</p>
                        <input type="password" className="border border-gray-300 p-1 w-full md:w-92 focus:outline-none"/>
                    </div>
                    <div className="md:flex text-center md:text-left items-center justify-between px-6 py-4">
                        <p className="w-full">{t('thirdCode')}</p>
                        <input type="password" className="border border-gray-300 p-1 w-full md:w-92 focus:outline-none"/>
                    </div>
                </div>
            </form>

            {/*Buttons section */}
            <section className="text-center md:text-right space-x-5 p-4 border-t border-gray-300 ">
                <button className="bg-white border border-gray-300 text-black font-bold hover:bg-gray-100 cursor-pointer p-2">{t('cancelBtn')}</button>
                <button className="bg-blue-800 text-white font-bold hover:bg-blue-600 cursor-pointer py-2 px-4">{t('unblockBtn')}</button>
            </section>
        </div>
        <ContactsFooter/>
        <Footer/>
        </>
    );
};

export default UnblockToken;