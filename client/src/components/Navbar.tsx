import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaBell, FaCog, FaPowerOff, FaClipboardList, FaDesktop, FaUser, FaLock, FaPenNib, FaUnlock, FaPhoneAlt, FaTimes, FaBars } from 'react-icons/fa';
import { MdEdit, MdEditDocument, MdOutlineQuestionMark } from 'react-icons/md';
import { BsInfoLg } from "react-icons/bs";
import DropdownItem from './Dropdown';
import { RiSafe3Fill } from 'react-icons/ri';
import { PiCreditCardFill } from 'react-icons/pi';
import { TbBadge3DFilled, TbKeyFilled } from 'react-icons/tb';
import { HiCreditCard } from 'react-icons/hi';
import { FiBell } from 'react-icons/fi';
import { IoDocumentText } from 'react-icons/io5';
import { GoRepoLocked } from 'react-icons/go';
import MobileAppPopover from './MobileAppPopover';
import { useState, useEffect } from 'react';
import NotificationsDropdown from './NotificationsDropdown';
import NotificationsList from './NotificationsList';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { IoMdChatboxes } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

interface Notification {
  _id: string;
  title: string;
  content: string;
  read: boolean;
  date: Date;
}

const Navbar: React.FC = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, token, logout } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const { t, i18n } = useTranslation('navbar');
    const currentLanguage = i18n.language

    useEffect(() => {
        if (!user || !token) {
            setNotifications([]);
            return;
        };

        const fetchNotifications = async () => {
            try {
                const response = axios.get(`http://localhost:5000/notifications/${user.userId}`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                const { data } = await response;
                setNotifications(data);
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
            }
        };

        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, [user, token]);

    const handleMarkAsRead = async (notificationId: string) => {
        setNotifications(prev => prev.map(n => n._id === notificationId ? { ...n, read: true } : n));
        try {
            axios.patch(`http://localhost:5000/notifications/${notificationId}/read`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
        } catch (error) {
            console.error("Failed to mark as read:", error);
        }
    };

    const handleDelete = async (notificationId: string) => {
        setNotifications(prev => prev.filter(n => n._id !== notificationId));
        try {
            axios.delete(`http://localhost:5000/notifications/${notificationId}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
        } catch (error) {
            console.error("Failed to delete notification:", error);
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleIsMobileMenuOpen = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    }
    
    const LoggedInNavLinks = ({ isMobile }: { isMobile : boolean}) => {
        return (
                <div className={`text-gray-500 ${isMobile ? 'flex flex-col space-y-4 text-md' : 'flex justify-end items-center space-x-6 text-sm'}`}>
                    <div className={`${isMobile ? 'flex flex-col items-center space-y-4' : 'flex items-center space-x-7 pr-3'}`}>
                        <button 
                        onClick={() => i18n.changeLanguage(currentLanguage === 'bg' ? 'en' : 'bg')}
                        className='hover:text-blue-800 cursor-pointer'
                        >
                            {currentLanguage === 'bg' ? 'ENGLISH' : 'БЪЛГАРСКИ'}
                        </button>
                        <a href='#' className='relative flex items-center space-x-1 cursor-pointer hover:text-blue-800'>
                            <div className='relative'>
                                <FaEnvelope className='text-lg'/>
                                <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1'>2</span>
                            </div>
                            <span>{t('messages')}</span>
                        </a>
                        <NotificationsDropdown label={t('notifications')} icon={<FaBell/>} unreadCount={unreadCount}>
                            <NotificationsList 
                                notifications={notifications}
                                onMarkAsRead={handleMarkAsRead}
                                onDelete={handleDelete}
                            />
                        </NotificationsDropdown>
                        
                        <DropdownItem label={t('settings')} icon={<FaCog />}>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <FaUser className='flex mr-2'/>
                                        {t('personalData')}
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <MdEdit className='flex mr-2'/>
                                        {t('generalSettings')}
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <MdEditDocument className='flex mr-2'/>
                                        {t('accountSettings')}
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <RiSafe3Fill className='flex mr-2'/>
                                        {t('depositSettings')}
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <PiCreditCardFill className='flex mr-2'/>
                                        {t('cardSettings')}
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <TbBadge3DFilled className='flex mr-2'/>
                                        {t('3dSecurity')}
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <FaLock className='flex mr-2'/>
                                        {t('changePassword')}
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <HiCreditCard className='flex mr-2'/>
                                        {t('registerCertificate')}
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <FaPenNib className='flex mr-2'/>
                                        {t('registerKeb')}
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <FaUnlock className='flex mr-2'/>
                                        {t('unblockToken')}
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <TbKeyFilled className='flex mr-2'/>
                                        {t('changePinToken')}
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <FaBell className='flex mr-2'/>
                                        {t('emailAndSms')}
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <FiBell className='flex mr-2'/>
                                        {t('smsAlert')}
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <MobileAppPopover/>
                            </li>
                        </DropdownItem>
                        <a href='#' className='md:border-x md:border-gray-300 px-3'>
                            <img src="/profile.jpg" alt="Profile" className='h-8 w-8 rounded-full border border-gray-300 hover:cursor-pointer' />
                        </a>
                        <button
                            onClick={handleLogout} 
                            className='flex items-center space-x-1 cursor-pointer hover:text-red-600'>
                                <FaPowerOff/>
                                <span>{t('logout')}</span>
                        </button>
                    </div>
                </div>
        )
    }

    const LoggedOutNavLinks = ({ isMobile }: {isMobile: boolean}) => {
        return(
            <>
                <div className={`flex-grow text-gray-500 ${isMobile ? 'flex flex-col space-y-4 items-center text-md' : 'flex justify-center items-center space-x-6 text-sm'}`}>
                    <button 
                    onClick={() => i18n.changeLanguage(currentLanguage === 'bg' ? 'en' : 'bg')}
                    className='hover:text-blue-800 cursor-pointer'
                    >
                        {currentLanguage === 'bg' ? 'ENGLISH' : 'БЪЛГАРСКИ'}
                    </button>
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
        )
    }

    return (
        <>
        <header className='w-full bg-white px-6 py-2 flex justify-between items-center'>
            <div className='flex items-center space-x-4'>
                <Link to=''>
                    <img src="/logo.png" alt="Fibank Logo" className='h-10'/>
                </Link>
            </div>

            <div className='hidden lg:flex justify-end items-center flex-1'>
                {user ? <LoggedInNavLinks isMobile={false} /> : <LoggedOutNavLinks isMobile={false}/>}
            </div>

            <div className='lg:hidden flex items-center'>
                <button onClick={handleIsMobileMenuOpen}>
                    {isMobileMenuOpen ? ( <FaTimes size={24} />) : <FaBars size={24} />}
                </button>
            </div>
        </header>

            {isMobileMenuOpen && (
                <div className='lg:hidden bg-white text-lg px-6 py-4 shadow-lg space-y-4 flex flex-col items-center text-center'>
                    {user ? <LoggedInNavLinks isMobile={true}/> : <LoggedOutNavLinks isMobile={true}/>}
                </div>
            )}
        </>
    )
}

export default Navbar;