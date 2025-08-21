import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  isMobile?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ isMobile }) => {
  const { i18n } = useTranslation('navbar');
  const currentLanguage = i18n.language;

  return (
    <button 
      onClick={() => i18n.changeLanguage(currentLanguage === 'bg' ? 'en' : 'bg')}
      className={`hover:text-blue-800 cursor-pointer ${isMobile ? 'text-md' : 'text-sm'}`}
    >
      {currentLanguage === 'bg' ? 'ENGLISH' : 'БЪЛГАРСКИ'}
    </button>
  );
}; 