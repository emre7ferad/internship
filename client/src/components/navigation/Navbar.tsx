import { Link, useNavigate } from 'react-router-dom';
import { FaTimes, FaBars } from 'react-icons/fa';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LoggedInNavLinks } from './LoggedInNavLinks';
import { LoggedOutNavLinks } from './LoggedOutNavLinks';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleIsMobileMenuOpen = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <>
      <header className='w-full bg-white px-6 py-2 flex justify-between items-center'>
        <div className='flex items-center space-x-4'>
          <Link to=''>
            <img src="/logo.png" alt="Fibank Logo" className='h-10'/>
          </Link>
        </div>

        <div className='hidden lg:flex justify-end items-center flex-1'>
          {user ? (
            <LoggedInNavLinks isMobile={false} onLogout={handleLogout} />
          ) : (
            <LoggedOutNavLinks isMobile={false} />
          )}
        </div>

        <div className='lg:hidden flex items-center'>
          <button onClick={handleIsMobileMenuOpen}>
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className='lg:hidden bg-white text-lg px-6 py-4 shadow-lg space-y-4 flex flex-col items-center text-center'>
          {user ? (
            <LoggedInNavLinks isMobile={true} onLogout={handleLogout} />
          ) : (
            <LoggedOutNavLinks isMobile={true} />
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;