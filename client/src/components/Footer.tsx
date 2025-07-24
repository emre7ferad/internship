import { useTranslation } from "react-i18next";
const Footer = () => {
  const { t } = useTranslation('footers')

  return (
    <footer className="bg-gray-100 w-full text-gray-700 py-4">
      <div className="flex flex-wrap flex-col items-center md:flex-row md:justify-center md:space-x-6 space-y-2 md:space-y-0 text-sm px-2 text-center md:text-left">
        <a href="#" className="hover:underline">{t('howToAddAccount')} &gt;</a>
        <span className="text-gray-300 hidden md:inline">|</span>
        <a href="#" className="hover:underline">{t('everythingWithSingleUser')} (SSO) &gt;</a>
        <span className="text-gray-300 hidden md:inline">|</span>
        <a href="#" className="hover:underline">{t('registerProcess')} &gt;</a>
        <span className="text-gray-300 hidden md:inline">|</span>
        <a href="#" className="hover:underline">{t('eSignature')} &gt;</a>
        <span className="text-gray-300 hidden md:inline">|</span>
        <a href="#" className="hover:underline">{t('taxesAndCommissions')} &gt;</a>
        <span className="text-gray-300 hidden md:inline">|</span>
        <a href="#" className="hover:underline">{t('documents')} &gt;</a>
      </div>
      <div className="text-center text-sm mt-3">
        <p>&copy; {t('copy')}</p>
      </div>
    </footer>
  );
};
export default Footer;