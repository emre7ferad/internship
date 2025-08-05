import { useTranslation } from "react-i18next";
import { FaEnvelope } from "react-icons/fa";

export const MessagesLink: React.FC = () => {
    const { t } = useTranslation('navbar');

    return (
        <a href="#" className="relative flex items-center space-x-1 cursor-pointer hover:text-blue-800">
            <div className="relative">
                <FaEnvelope className="text-lg" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">2</span>
            </div>
            <span>{t('messages')}</span>
        </a>
    );
};