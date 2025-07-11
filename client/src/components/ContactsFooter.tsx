import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { IoMdChatboxes } from "react-icons/io";
import { BsBank2 } from "react-icons/bs";
import { GrAtm } from "react-icons/gr";

const ContactsFooter = () => {
    return (
        <footer className="w-full bottom-0 bg-gray-50 py-6 px-50 mt-15">
            <h2 className="font-semibold text-md flex justify-center">За всички въпроси нашите служители Ви очакват на:</h2>
            <div className="flex justify-center text-gray-500 my-2">
                <p className="justify-center items-center flex space-x-2 mx-5">
                    <FaPhoneAlt/>
                    <span className="text-blue-800 font-semibold">0700 12 777</span>
                    <span>(денонощно)*</span>        
                </p>
                <p className="justify-center items-center flex space-x-2 mx-5">
                    <FaEnvelope/>
                    <span>E-Mail: </span>
                    <span className="text-blue-800 font-bold">e-bank@fibank.bg</span>
                </p>
                <p className="justify-center items-center flex space-x-2 mx-5 hover:text-blue-800 hover:underline">
                    <IoMdChatboxes/>
                    <a href="#">Чат: <span className="text-blue-800 font-bold">Пишете ни</span></a>
                </p>
            </div>
            <p className="text-center my-2">
                Разговорите към национален номер 0700 12 777 се таксуват според определените от Вашия оператор цени за обаждане към номера тип 0700 на Vivacom. За абонати на Vivacom обаждане към този номер се таксуват като обаждане към стационарен номер в мрежата на Vivacom.
            </p>
            <h2 className="font-semibold text-md flex justify-center my-2"> Вижте къде се намираме:</h2>
            <div className="flex justify-center text-gray-500">
                <a href="#" className="flex items-center mx-2 hover:text-blue-800 hover:underline">
                    <BsBank2/>
                      <span className="mx-1">Клонове&gt;</span>
                </a>
                <span className="text-gray-300 mx-2">|</span>
                <a href="#" className="flex items-center mx-2 hover:text-blue-800 hover:underline">
                    <GrAtm/>
                    <span className="mx-1">Банкомати&gt;</span>
                </a>
            </div>
        </footer>
    )
}
export default ContactsFooter