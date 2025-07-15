import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaBell, FaCog, FaPowerOff, FaAndroid, FaApple, FaClipboardList, FaDesktop } from 'react-icons/fa';
import { BsInfoLg } from "react-icons/bs";


type NavbarProps = {
    loggedIn: boolean;
    setLoggedIn: (value: boolean) => void;
}
const Navbar: React.FC<NavbarProps> = ({ loggedIn, setLoggedIn }) => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login'
    const isRegisterPage = location.pathname === '/register'
    const navigate = useNavigate();

    const handleLogout = () => {
        setLoggedIn(false);
        navigate('/login');
    }

    return (
        <header className='bg-white px-6 py-4 flex justify-between items-center'>
            <div className='flex items-center space-x-4'>
                <Link to=''>
                    <img src="/logo.png" alt="Fibank Logo" className='h-10'/>
                </Link>
            </div>

                {loggedIn ? (
                    <>
                        <div className='flex justify-between items-center w-full text-sm text-gray-500'>

                            <div></div>
                            <div className='flex items-center space-x-6'>
                                <button>ENGLISH</button>
                                <a href='#' className='relative flex items-center space-x-1 cursor-pointer hover:text-blue-800'>
                                    <div className='relative'>
                                        <FaEnvelope className='text-lg'/>
                                        <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1'>2</span>
                                    </div>
                                    <span>СЪОБЩЕНИЯ</span>
                                </a>
                                <a href='#' className='relative flex items-center space-x-1 cursor-pointer hover:text-blue-800'>
                                    <div className='relative'>
                                        <FaBell className='text-lg'/>
                                        <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1'>3</span>
                                    </div>
                                    <span>ИЗВЕСТИЯ</span>
                                </a>
                                <a href='#' className='relative flex items-center space-x-1 cursor-pointer hover:text-blue-800'>
                                    <FaCog/>
                                    <span className='relative flex items-center space-x-1 cursor-pointer hover:text-blue-800'>НАСТРОЙКИ</span>
                                </a>
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
                    </>
                    ) : (
                    <>
                        <div className='flex-grow flex justify-center space-x-6 text-sm text-gray-500'>
                            <button>ENGLISH</button>
                            <a href="#" className='flex items-center space-x-1 hover:text-blue-800'>
                                <FaDesktop/>
                                Към Сайта
                            </a>
                            <a href="#" className='flex items-center space-x-1 hover:text-blue-800'>
                                <FaAndroid/>
                                <FaApple/>
                                <span>Мобилно Приложение</span>
                            </a>
                            <a href="#" className='flex items-center space-x-1 hover:text-blue-800'>
                                <FaClipboardList/>
                                <span>Промени в ОУ трафика</span>
                            </a>
                            <a href="#" className='flex items-center space-x-1 hover:text-blue-800'>
                                <BsInfoLg/>
                                <span>Помощ</span>
                            </a>
                        </div>

                        <div className='flex-shrink-0 space-x-2'>
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
                )}
        </header>
    )
}

export default Navbar