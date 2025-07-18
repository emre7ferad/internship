import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { IoMdChatboxes } from "react-icons/io";
import { BsBank2 } from "react-icons/bs";
import { GrAtm } from "react-icons/gr";

const ContactsFooter = () => {
  return (
    <footer className="w-full bg-gray-100 py-6 px-2 sm:px-4 md:px-10 mt-15">
      <h2 className="font-semibold text-md flex justify-center text-center text-base sm:text-lg md:text-xl">
        За всички въпроси нашите служители Ви очакват на:
      </h2>
      <div className="
        flex flex-col sm:flex-row md:flex-row
        justify-center items-center
        text-gray-500 my-2
        space-y-2 sm:space-y-0 sm:space-x-4 md:space-x-8
        text-sm sm:text-base md:text-lg
      ">
        <p className="flex items-center space-x-2">
          <FaPhoneAlt />
          <span className="text-blue-800 font-semibold">0700 12 777</span>
          <span className="hidden sm:inline">(денонощно)*</span>
        </p>
        <p className="flex items-center space-x-2">
          <FaEnvelope />
          <span>E-Mail: </span>
          <span className="text-blue-800 font-bold">e-bank@fibank.bg</span>
        </p>
        <p className="flex items-center space-x-2 hover:text-blue-800 hover:underline">
          <IoMdChatboxes />
          <a href="#">Чат: <span className="text-blue-800 font-bold">Пишете ни</span></a>
        </p>
      </div>
      <p className="text-center my-2 text-xs sm:text-sm md:text-base lg:text-lg">
        Разговорите към национален номер 0700 12 777 се таксуват според определените от Вашия оператор цени за обаждане към номера тип 0700 на Vivacom. За абонати на Vivacom обаждане към този номер се таксуват като обаждане към стационарен номер в мрежата на Vivacom.
      </p>
      <h2 className="font-semibold text-md flex justify-center my-2 text-center text-base sm:text-lg md:text-xl">
        Вижте къде се намираме:
      </h2>
      <div className="
        flex flex-col sm:flex-row md:flex-row
        justify-center items-center
        text-gray-500
        space-y-2 sm:space-y-0 sm:space-x-4 md:space-x-6
        text-sm sm:text-base md:text-lg
      ">
        <a href="#" className="flex items-center hover:text-blue-800 hover:underline">
          <BsBank2 />
          <span className="mx-1">Клонове&gt;</span>
        </a>
        <span className="text-gray-300 hidden sm:inline">|</span>
        <a href="#" className="flex items-center hover:text-blue-800 hover:underline">
          <GrAtm />
          <span className="mx-1">Банкомати&gt;</span>
        </a>
      </div>
    </footer>
  );
};
export default ContactsFooter;