import { useState } from "react"
import { FaAndroid, FaApple } from "react-icons/fa"
import { useTranslation } from "react-i18next";

const MobileAppPopover: React.FC = () => {
    const [hovered, setHovered] = useState(false)
    const { t } = useTranslation('navbar')
    return (
        <div 
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        >
            <a href="#" className="flex items-center space-x-1 hover:text-blue-800">
                    <FaAndroid/>
                    <FaApple />
                <span>{t('mobileApp')}</span>
            </a>

            {hovered && (
                <div className="absolute left-0 top-full w-64 rounded-lg shadow-lg bg-white z-50">
                  <div className="relative w-full h-64 flex flex-col justify-between items-center overflow-hidden">
                    <h1 className="absolute top-2 z-20 ml-2 mr-4 text-black text-lg text-left drop-shadow-md px-2">
                      {t('mobileAppText')}
                    </h1>
                    <img
                      src="fibank-mobile-app.png"
                      alt="FibankMobile"
                      className="absolute inset-0 w-full h-full object-cover z-10"
                    />
                      <button className="absolute bottom-3 z-20 justify-center bg-white hover:bg-gray-100 text-black font-semibold cursor-pointer border border-gray-300 px-12 py-1.5 rounded-xs shadow-md">
                        {t('learnMore')}
                      </button>
                  </div>
                </div>
            )}
        </div>
    );
};

export default MobileAppPopover;