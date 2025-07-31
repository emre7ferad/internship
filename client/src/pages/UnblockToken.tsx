import ContactsFooter from "../components/ContactsFooter";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import FormInput from "../components/UnblockTokenFormInput";
import FormSection from "../components/UnblockTokenFormSection";

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
                <FormSection className="px-6 max-w-3xl text-center md:text-left space-y-6 md:space-y-4" >
                    <FormInput 
                        name="serialNumberToken"
                        label="serialNumber TOKEN"
                        type="text"
                        translationKey="serialNumber"
                    />
                    <FormInput 
                        name="username"
                        label={t('username')}
                        type="text"
                    />
                    <FormInput
                        name="email"
                        label="E-Mail"
                        type="email"
                    />
                </FormSection>

                <FormSection hasBorderTop>
                    <FormInput
                        name="firstCode"
                        label={t('firstCode')}
                        type="password"
                        layout="flex"
                    />
                    <FormInput
                        name="secondCode"
                        label={t('secondCode')}
                        type="password"
                        layout="flex"
                    />
                    <FormInput
                        name="thirdCode"
                        label={t('thirdCode')}
                        type="password"
                        layout="flex"
                    />
                </FormSection>
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