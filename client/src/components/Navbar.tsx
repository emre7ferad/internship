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
import { IoDocumentText, IoPhonePortrait } from 'react-icons/io5';
import { GoRepoLocked } from 'react-icons/go';
import MobileAppPopover from './MobileAppPopover';
import { useState, useEffect } from 'react';
import NotificationsDropdown from './NotificationsDropdown';
import NotificationsList from './NotificationsList';
import { useAuth } from '../context/AuthContext';

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

    useEffect(() => {
        if (!user || !token) {
            setNotifications([]);
            return;
        };

        const fetchNotifications = async () => {
            try {
                const response = await fetch(`http://localhost:5000/notifications/${user.userId}`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data);
                }
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
            }
        };

        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, [user, token]);

    const handleMarkAsRead = async (notificationId: string) => {
        // Optimistically update the UI for a better user experience
        setNotifications(prev => prev.map(n => n._id === notificationId ? { ...n, read: true } : n));
        try {
            await fetch(`http://localhost:5000/notifications/${notificationId}/read`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${token}` },
            });
        } catch (error) {
            // If the API call fails, revert the change (optional)
            console.error("Failed to mark as read:", error);
            // You could add logic here to revert the optimistic update if needed
        }
    };

    const handleDelete = async (notificationId: string) => {
        // Optimistically update the UI
        setNotifications(prev => prev.filter(n => n._id !== notificationId));
        try {
            await fetch(`http://localhost:5000/notifications/${notificationId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
        } catch (error) {
            console.error("Failed to delete notification:", error);
            // Optionally revert the optimistic update on failure
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
                    <div className={`${isMobile ? 'flex flex-col space-y-4' : 'flex items-center space-x-6'}`}>
                        <button>ENGLISH</button>
                        <a href='#' className='relative flex items-center space-x-1 cursor-pointer hover:text-blue-800'>
                            <div className='relative'>
                                <FaEnvelope className='text-lg'/>
                                <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1'>2</span>
                            </div>
                            <span>СЪОБЩЕНИЯ</span>
                        </a>
                        <NotificationsDropdown label="ИЗВЕСТИЯ" icon={<FaBell/>} unreadCount={unreadCount}>
                            <NotificationsList 
                                notifications={notifications}
                                onMarkAsRead={handleMarkAsRead}
                                onDelete={handleDelete}
                            />
                        </NotificationsDropdown>
                        
                        <DropdownItem label="НАСТРОЙКИ" icon={<FaCog />}>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <FaUser className='flex mr-2'/>
                                        Лични данни
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <MdEdit className='flex mr-2'/>
                                        Общи настройки
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <MdEditDocument className='flex mr-2'/>
                                        Настройки на сметка
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <RiSafe3Fill className='flex mr-2'/>
                                        Настройки на депозит
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <PiCreditCardFill className='flex mr-2'/>
                                        Настройки на карта
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <TbBadge3DFilled className='flex mr-2'/>
                                        3D сигурност на карти
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <FaLock className='flex mr-2'/>
                                        Промяна на парола
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <HiCreditCard className='flex mr-2'/>
                                        Регистриране на сертификат
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <FaPenNib className='flex mr-2'/>
                                        Регистриране на КЕБ
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <FaUnlock className='flex mr-2'/>
                                        Деблокиране на Token
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <TbKeyFilled className='flex mr-2'/>
                                        Промяна ПИН Token
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <FaBell className='flex mr-2'/>
                                        E-mail и SMS известие
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <FiBell className='flex mr-2'/>
                                        SMS известие за карти
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                                <a href="#">
                                    <span className='flex items-center justify-center'>
                                        <IoPhonePortrait className='flex mr-2'/>
                                        Мобилно приложение Fibank
                                    </span>
                                </a>
                            </li>
                        </DropdownItem>
                        <a href='#'>
                            <img src="/profile.jpg" alt="Profile" className='h-8 w-8 rounded-full border border-gray-300 hover:cursor-pointer' />
                        </a>
                        <button
                            onClick={handleLogout} 
                            className='flex items-center space-x-1 cursor-pointer hover:text-red-600'>
                                <FaPowerOff/>
                                <span>ИЗХОД</span>
                        </button>
                    </div>
                </div>
        )
    }

    const LoggedOutNavLinks = ({ isMobile }: {isMobile: boolean}) => {
        return(
            <>
                <div className={`flex-grow text-gray-500 ${isMobile ? 'flex flex-col space-y-4 items-start text-md' : 'flex justify-center items-center space-x-6 text-sm'}`}>
                    <button>ENGLISH</button>
                    <a href="#" className='flex items-center space-x-1 hover:text-blue-800'>
                        <FaDesktop/>
                        Към Сайта
                    </a>
                    <MobileAppPopover />
                    <a href="#" className='flex items-center space-x-1 hover:text-blue-800'>
                        <FaClipboardList/>
                        <span>Промени в ОУ трафика</span>
                    </a>
                    <DropdownItem icon={<BsInfoLg/>} label="Помощ">
                        <h2 className='font-semibold px-4 py-2'>ИНФОРМАЦИЯ</h2>
                        <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                            <a href="#">
                                <span className='flex items-center justify-center'>
                                    <IoDocumentText className='flex mr-2'/>
                                    Помощни статии
                                </span>
                            </a>
                        </li>
                        <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                            <a href="#">
                                <span className='flex items-center justify-center'>
                                    <MdOutlineQuestionMark className='flex mr-2'/>
                                    Често задавани въпроси
                                </span>
                            </a>
                        </li>
                        <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                            <a href="#">
                                <span className='flex items-center justify-center'>
                                    <GoRepoLocked className='flex mr-2'/>
                                    Съвети за сигурност
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
                                    <GoRepoLocked className='flex mr-2'/>
                                    Съвети за сигурност
                                </span>
                            </a>
                        </li>
                    </DropdownItem>
                </div>

                <div className={`${isMobile ? 'flex flex-col space-y-2' : 'flex-shrink-0 space-x-2'}`}>
                    {!isLoginPage && (
                        <Link to="/login" 
                        className='bg-blue-800 text-white font-bold px-8 py-2 hover:bg-blue-600 transition'>
                            ВХОД
                        </Link>
                    )}
                    {!isRegisterPage && (
                        <Link to="/register"
                        className='bg-gray-200 text-black font-bold px-8 py-2 hover:bg-blue-800 hover:text-white transition'>
                            РЕГИСТРАЦИЯ
                        </Link>
                    )}
                </div>
            </>
        )
    }

    return (
        <>
        <header className='w-full bg-white px-6 py-4 flex justify-between items-center'>
            <div className='flex items-center space-x-4'>
                <Link to=''>
                    <img src="/logo.png" alt="Fibank Logo" className='h-10'/>
                </Link>
            </div>

            <div className='hidden md:flex justify-end items-center flex-1'>
                {user ? <LoggedInNavLinks isMobile={false} /> : <LoggedOutNavLinks isMobile={false}/>}
            </div>

            <div className='md:hidden flex items-center'>
                <button onClick={handleIsMobileMenuOpen}>
                    {isMobileMenuOpen ? ( <FaTimes size={24} />) : <FaBars size={24} />}
                </button>
            </div>
        </header>

            {isMobileMenuOpen && (
                <div className='md:hidden bg-white text-lg px-6 py-4 shadow-lg space-y-4 flex flex-col items-center text-center'>
                    {user ? <LoggedInNavLinks isMobile={true}/> : <LoggedOutNavLinks isMobile={true}/>}
                </div>
            )}
        </>
    )
}

export default Navbar;