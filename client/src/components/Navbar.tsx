import { Link, useLocation } from 'react-router-dom';
import { FaEnvelope, FaBell, FaCog, FaPowerOff, FaAndroid, FaApple, FaClipboardList, FaDesktop } from 'react-icons/fa';
import { BsInfoLg } from "react-icons/bs";

interface NavbarProps{
    loggedIn: boolean;
}
const Navbar = ({ loggedIn } : NavbarProps) => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login'
    const isRegisterPage = location.pathname === '/register'

    return (
        <header className='bg-white shadow-md px-6 py-4 flex justify-between items-center'>
            <div className='flex items-center space-x-4'>
                <img src="/logo.png" alt="Fibank Logo" className='h-10'/>
            </div>

                {loggedIn ? (
                    <>
                        <div className='flex justify-between items-center w-full text-sm text-gray-500'>

                            <div></div>
                            <div className='flex items-center space-x-6'>
                                <button>ENGLISH</button>
                                <div className='relative flex items-center space-x-1 cursor-pointer hover:text-blue-600'>
                                    <div className='relative'>
                                        <FaEnvelope className='text-lg'/>
                                        <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1'>2</span>
                                    </div>
                                    <span>СЪОБЩЕНИЯ</span>
                                </div>
                                <div className='relative flex items-center space-x-1 cursor-pointer hover:text-blue-600'>
                                    <div className='relative'>
                                        <FaBell className='text-lg'/>
                                        <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1'>3</span>
                                    </div>
                                    <span>ИЗВЕСТИЯ</span>
                                </div>
                                <div className='relative flex items-center space-x-1 cursor-pointer hover:text-blue-600'>
                                    <FaCog/>
                                    <span className='relative flex items-center space-x-1 cursor-pointer hover:text-blue-600'>НАСТРОЙКИ</span>
                                </div>
                                <div>
                                    <img src="/profile.jpg" alt="Profile" className='h-8 w-8 rounded-full border border-gray-300 hover:cursor-pointer' />
                                </div>
                                <div className='flex items-center space-x-1 cursor-pointer hover:text-red-600'>
                                    <FaPowerOff/>
                                    <span>ИЗХОД</span>
                                </div>
                            </div>
                        </div>
                    </>
                    ) : (
                    <>
                        <div className='flex-grow flex justify-center space-x-6 text-sm text-gray-500'>
                            <button>ENGLISH</button>
                            <a href="#" className='flex items-center space-x-1 hover:text-blue-600'>
                                <FaDesktop/>
                                Към Сайта
                            </a>
                            <a href="#" className='flex items-center space-x-1 hover:text-blue-600'>
                                <FaAndroid/>
                                <FaApple/>
                                <span>Мобилно Приложение</span>
                            </a>
                            <a href="#" className='flex items-center space-x-1 hover:text-blue-600'>
                                <FaClipboardList/>
                                <span>Промени в ОУ трафика</span>
                            </a>
                            <a href="#" className='flex items-center space-x-1 hover:text-blue-600'>
                                <BsInfoLg/>
                                <span>Помощ</span>
                            </a>
                        </div>

                        <div className='flex-shrink-0 space-x-2'>
                            {!isLoginPage && (
                                <Link to="/login" 
                                className='bg-blue-600 text-white font-bold px-8 py-2 hover:bg-blue-700 transition'>
                                    ВХОД
                                </Link>
                            )}
                            {!isRegisterPage && (
                                <Link to="/register"
                                className='bg-gray-200 text-black font-bold px-8 py-2 hover:bg-blue-700 hover:text-white transition'>
                                    РЕГИСТРАЦИЯ
                                </Link>
                            )}
                        </div>
                    </>
                )}
        </header>
    )
}

export default Navbar