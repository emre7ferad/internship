import type { IconType } from "react-icons";
import { useEffect, useRef, useState } from "react";
import type { ReactNode, FC } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import sidebarConfig from "../config/sidebarConfig.json";
import { RiPieChart2Fill } from "react-icons/ri";
import { IoIosPaper, IoIosCash, IoIosMailOpen } from "react-icons/io";
import { MdAllInbox, MdEditDocument, MdDiscount } from "react-icons/md";
import { BsSafeFill, BsBank2, BsInfoLg } from "react-icons/bs";
import { FaCreditCard, FaPenAlt, FaWallet, FaNewspaper, FaDesktop, FaAndroid, FaApple } from "react-icons/fa";
import { IoDocumentsSharp, IoStatsChart } from "react-icons/io5";
import { GrAtm } from "react-icons/gr";
import { BiSolidCoinStack } from "react-icons/bi";

const iconMap: Record<string, IconType> = {
  RiPieChart2Fill,
  IoIosPaper,
  IoIosCash,
  MdAllInbox,
  BsSafeFill,
  FaCreditCard,
  FaPenAlt,
  IoDocumentsSharp,
  IoIosMailOpen,
  FaWallet,
  MdEditDocument,
  BsBank2,
  GrAtm,
  IoStatsChart,
  FaNewspaper,
  MdDiscount,
  BsInfoLg,
  FaDesktop,
  FaAndroid,
  FaApple,
  BiSolidCoinStack
};

interface SidebarItemProps {
  icon: IconType;
  label: string;
  children?: ReactNode;
  className?: string;
}

const SidebarItem: FC<SidebarItemProps> = ({ icon: Icon, label, children, className = "" }) => {
  const [hovered, setHovered] = useState(false);
  const [clickOpen, setClickOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
  const itemRef = useRef<HTMLLIElement>(null);

  const isOpen = clickOpen || hovered;

  useEffect(() => {
    const handleSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleSize)
    return () => window.removeEventListener('resize', handleSize);
  }, []);

  useEffect(() => {
    if (!clickOpen || isLargeScreen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
        setClickOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [clickOpen, isLargeScreen]);

  return (
    <li
      ref={itemRef}
      className={`relative ${className}`}
      onMouseEnter={() => {
        if (isLargeScreen) setHovered(true);
      }}
      onMouseLeave={() => {
        if (isLargeScreen) setHovered(false)
      }}
    >
      <div 
        className="custom-li-hover flex items-center justify-between w-full px-2 py-2 text-left cursor-pointer"
        onClick={() => {
          if (!isLargeScreen && children) {
            setClickOpen((prev) => !prev)
          }
        }}>
        <span className="flex ml-5 lg:ml-0 items-center justify-center lg:justify-start w-full">
          <Icon className="inline-block mr-2" />
          {label}
        </span>
        {children && <FiChevronRight className="ml-auto" />}
      </div>

      {isOpen && children && (
        <ul className="bg-white z-10 border border-gray-200 lg:absolute lg:left-full lg:top-0 w-full">
          {children}
        </ul>
      )}
    </li>
  );
};

interface SidebarProps {
  infoFibankOpen: boolean;
  moreInfoOpen: boolean;
  setInfoFibankOpen: (open: boolean) => void;
  setMoreInfoOpen: (open: boolean) => void;
}

const Sidebar: FC<SidebarProps> = ({
  infoFibankOpen,
  moreInfoOpen,
  setInfoFibankOpen,
  setMoreInfoOpen
}) => {
  const { t } = useTranslation('dashboard');

  const renderChildItem = (child: any) => {
    if(child.type === 'section') {
      return (
        <p key={child.label} className="px-2 py-2 text-gray-500 text-xs uppercase">{t(child.label)}</p>
      );
    }

    return (
      <li key={child.label} className="aside-submenu">
        <a href={child.href || "#"}>
          {t(child.label)}
          {child.suffix && child.suffix}
        </a>
      </li>
    );
  };

  const renderMainItem = (item: any) => {
    const Icon = iconMap[item.icon];

    switch (item.type) {
      case 'button':
        return (
          <button key={item.label} className={item.className}>
            <Icon className="inline-block mr-2" />
            <span>{t(item.label)}</span>
          </button>
        );
      
      case 'link':
        return (
          <li key={item.label} className={item.className}>
            <a href="#">
              <Icon className="inline-block mr-2" />
              {t(item.label)}
            </a>
          </li>
        );

      case 'dropdown':
        return (
          <SidebarItem key={item.label} icon={Icon} label={t(item.label)}>
            {item.children?.map(renderChildItem)}
          </SidebarItem>
        );
      
      default:
        return null;
    }
  };

  const renderInfoSection = (section: any, isOpen: boolean, setIsOpen: (open: boolean) => void) => {
    return (
      <div key={section.title} className="text-gray-700 border-t border-gray-300 w-full py-2">
        <p 
          className="text-gray-500 text-xs px-2 cursor-pointer hover:text-blue-800 flex items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {t(section.title)}
          {isOpen ? (
            <FiChevronDown className="ml-2" />
          ) : (
            <FiChevronRight className="ml-2" />
          )}
        </p>
        {isOpen && (
          <ul className="text-gray-700 text-md">
            {section.items.map((item: any) => {
              const Icon = iconMap[item.icon];
              const SecondaryIcon = item.secondaryIcon ? iconMap[item.secondaryIcon] : null;
              
              return (
                <li key={item.label} className="custom-li">
                  <a href={item.href || "#"}>
                    <Icon className="inline-block mr-2" />
                    {SecondaryIcon && <SecondaryIcon className="inline-block mr-2" />}
                    {t(item.label)}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  };

  return (
    <aside className="w-full lg:w-80 text-center lg:text-left bg-white space-y-2 border-r lg:py-2 border-gray-300">
      <p className="text-gray-500 text-xs px-2">{t('accountingDate')}</p>
      <div className="space-y-1 border-b border-gray-300 pb-2 px-2">
        <button className="flex items-center space-x-2">
          <img src="/profile.jpg" alt="profile" className="h-8 w-8 rounded-full" />
          <div className="text-left">
            <p className="text-gray-500 text-xs">{t('user')}</p>
            <p>{t('filipFilipov')}</p>
          </div>
        </button>
        <button className="flex items-center space-x-2">
          <img src="/company-logo.png" alt="company-logo" className="h-8 w-8 rounded-full"/>
          <div className="text-left">
            <p className="text-gray-500 text-xs">{t('client')}</p>
            <p>{t('uizEOOD')}</p>
          </div>
        </button>
      </div>
      
      <ul className="space-y-1 text-md w-full text-gray-700">
        {sidebarConfig.mainItems.map(renderMainItem)}
      </ul>
      
      {renderInfoSection(sidebarConfig.infoSections[0], infoFibankOpen, setInfoFibankOpen)}
      {renderInfoSection(sidebarConfig.infoSections[1], moreInfoOpen, setMoreInfoOpen)}
    </aside>
  );
};

export default Sidebar;