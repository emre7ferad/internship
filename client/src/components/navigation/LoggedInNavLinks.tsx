import { useTranslation } from 'react-i18next';
import { FaPowerOff } from 'react-icons/fa';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MessagesLink } from './MessagesLink';
import { SettingsDropdown } from './SettingsDropdown';
import NotificationsDropdown from './NotificationsDropdown';
import NotificationsList from './NotificationsList';
import { useNotifications } from '../../hooks/useNotifications';
import { FaBell } from 'react-icons/fa';

interface LoggedInNavLinksProps {
  isMobile: boolean;
  onLogout: () => void;
}

export const LoggedInNavLinks: React.FC<LoggedInNavLinksProps> = ({ 
  isMobile, 
  onLogout 
}) => {
  const { t } = useTranslation('navbar');
  const { notifications, unreadCount, handleMarkAsRead, handleDelete } = useNotifications();

  return (
    <div className={`text-gray-500 ${isMobile ? 'flex flex-col space-y-4 text-md' : 'flex justify-end items-center space-x-6 text-sm'}`}>
      <div className={`${isMobile ? 'flex flex-col items-center space-y-4' : 'flex items-center space-x-7 pr-3'}`}>
        <LanguageSwitcher isMobile={isMobile} />
        <MessagesLink />
        <NotificationsDropdown label={t('notifications')} icon={<FaBell/>} unreadCount={unreadCount}>
          <NotificationsList 
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDelete}
          />
        </NotificationsDropdown>
        <SettingsDropdown />

        <a href='#' className='md:border-x md:border-gray-300 px-3'>
          <img src="/profile.jpg" alt="Profile" className='h-8 w-8 rounded-full border border-gray-300 hover:cursor-pointer' />
        </a>
        <button
          onClick={onLogout} 
          className='flex items-center space-x-1 cursor-pointer hover:text-red-600'>
          <FaPowerOff/>
          <span>{t('logout')}</span>
        </button>
      </div>
    </div>
  );
};