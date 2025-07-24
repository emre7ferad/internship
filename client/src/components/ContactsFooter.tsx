import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { IoMdChatboxes } from "react-icons/io";
import { BsBank2 } from "react-icons/bs";
import { GrAtm } from "react-icons/gr";
import { useTranslation } from "react-i18next";

const ContactsFooter = () => {
  const { t } = useTranslation('footers')

  return (
    <footer className="w-full bg-gray-50 pt-6 px-2 sm:px-4 lg:px-10 mt-15">
      <h2 className="font-semibold text-md flex justify-center text-center text-base sm:text-lg lg:text-xl">
        {t('header')}
      </h2>
      <div className="
        flex flex-col sm:flex-row lg:flex-row
        justify-center items-center
        text-gray-500 my-2
        space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-8
        text-sm sm:text-base lg:text-lg
      ">
        <p className="flex items-center space-x-2">
          <FaPhoneAlt />
          <span className="text-blue-800 font-semibold">0700 12 777</span>
          <span className="hidden sm:inline">({t('24/7')})*</span>
        </p>
        <p className="flex items-center space-x-2">
          <FaEnvelope />
          <span>E-Mail: </span>
          <span className="text-blue-800 font-bold">e-bank@fibank.bg</span>
        </p>
        <p className="flex items-center space-x-2 hover:text-blue-800 hover:underline">
          <IoMdChatboxes />
          <a href="#">{t('chat')} <span className="text-blue-800 font-bold">{t('messageUs')}</span></a>
        </p>
      </div>
      <p className="text-center my-2 text-md sm:text-sm text-base lg:text-lg">
      {t('calls')}
      </p>
      <h2 className="font-semibold text-md flex justify-center my-2 text-center text-base sm:text-lg lg:text-xl">
        {t('seeWhereWeAre')}
      </h2>
      <div className="
        flex flex-col sm:flex-row lg:flex-row
        justify-center items-center
        text-gray-500
        space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6
        text-sm sm:text-base lg:text-lg
      ">
        <a href="#" className="flex items-center hover:text-blue-800 hover:underline">
          <BsBank2 />
          <span className="mx-1">{t('branches')}&gt;</span>
        </a>
        <span className="text-gray-300 hidden sm:inline">|</span>
        <a href="#" className="flex items-center hover:text-blue-800 hover:underline">
          <GrAtm />
          <span className="mx-1">{t('atms')}&gt;</span>
        </a>
      </div>
    </footer>
  );
};
export default ContactsFooter;