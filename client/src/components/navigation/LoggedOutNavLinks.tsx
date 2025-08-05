import { Link, useLocation } from 'react-router-dom';
import { FaDesktop, FaClipboardList, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { BsInfoLg } from 'react-icons/bs';
import { IoMdChatboxes } from 'react-icons/io';
import { MdOutlineQuestionMark } from 'react-icons/md';
import { GoRepoLocked } from 'react-icons/go';
import { useTranslation } from 'react-i18next';
import DropdownItem from '../Dropdown';
import MobileAppPopover from './MobileAppPopover';
import { LanguageSwitcher } from './LanguageSwitcher';
import { IoDocumentText } from 'react-icons/io5';

interface LoggedOutNavLinksProps {
  isMobile: boolean;
}

export const LoggedOutNavLinks: React.FC<LoggedOutNavLinksProps> = ({ isMobile }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const { t } = useTranslation('navbar');

  return (
    <>
      <div className={`flex-grow text-gray-500 ${isMobile ? 'flex flex-col space-y-4 items-center text-md' : 'flex justify-center items-center space-x-6 text-sm'}`}>
        <LanguageSwitcher isMobile={isMobile} />
        
        <a href="#" className='flex items-center space-x-1 hover:text-blue-800'>
          <FaDesktop/>
          {t('toWebsite')}
        </a>
        
        <MobileAppPopover />
        
        <a href="#" className='flex items-center space-x-1 hover:text-blue-800'>
          <FaClipboardList/>
          {t('OUChanges')}
        </a>
        
        <DropdownItem icon={<BsInfoLg/>} label={t('help')}>
          <h2 className='font-semibold px-4 py-2'>{t('information')}</h2>
          <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
            <a href="#">
              <span className='flex items-center justify-center'>
                <IoDocumentText className='flex mr-2'/>
                {t('helpArticles')}
              </span>
            </a>
          </li>
          <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
            <a href="#">
              <span className='flex items-center justify-center'>
                <MdOutlineQuestionMark className='flex mr-2'/>
                {t('frequentlyAskedQuestions')}
              </span>
            </a>
          </li>
          <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
            <a href="#">
              <span className='flex items-center justify-center'>
                <GoRepoLocked className='flex mr-2'/>
                {t('securityTips')}
              </span>
            </a>
          </li>
          <h2 className='font-semibold px-4 py-2 border-t border-gray-300'>Връзка с нас</h2>
          <li className="flex items-center hover:bg-gray-100 hover:text-blue-800 cursor-pointer px-4 py-2 space-x-2">
            <span className='flex items-center justify-center'>
              <FaPhoneAlt className='flex mr-2'/>
              0700 12 777
            </span>
          </li>
          <li className="flex items-center hover:bg-gray-100 hover:text-blue-800 cursor-pointer px-4 py-2 space-x-2">
            <a href="#">
              <span className='flex items-center justify-center'>
                <FaEnvelope className='flex mr-2'/>
                help@fibank.bg
              </span>
            </a>
          </li>
          <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
            <a href="#">
              <span className='flex items-center justify-center'>
                <IoMdChatboxes className='flex mr-2'/>
                {t('onlineChat')}
              </span>
            </a>
          </li>
        </DropdownItem>
      </div>

      <div className={`${isMobile ? 'flex flex-col space-y-2' : 'flex-shrink-0 space-x-2'}`}>
        {!isLoginPage && (
          <Link to="/login" 
          className='bg-blue-800 text-white font-bold px-8 py-2 hover:bg-blue-600 transition'>
            {t('login')}
          </Link>
        )}
        {!isRegisterPage && (
          <Link to="/register"
          className='bg-gray-200 text-black font-bold px-8 py-2 hover:bg-blue-800 hover:text-white transition'>
            {t('register')}
          </Link>
        )}
      </div>
    </>
  );
};