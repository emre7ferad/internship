import { FaCog, FaLock, FaPenNib, FaUser } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { MdEdit, MdEditDocument } from "react-icons/md";
import { RiSafe3Fill } from "react-icons/ri";
import { PiCreditCardFill } from "react-icons/pi";
import { TbBadge3DFilled } from "react-icons/tb";
import { HiCreditCard } from "react-icons/hi";
import DropdownItem from "../Dropdown";

export const SettingsDropdown: React.FC = () => {
    const { t } = useTranslation('navbar');

    const settingsItems = [
        { icon: <FaUser />, label: t('personalData'), href: '#'},
        { icon: <MdEdit />, label: t('generalSettings'), href: '#'},
        { icon: <MdEditDocument />, label: t('accountSettings'), href: '#'},
        { icon: <RiSafe3Fill />, label: t('depositSettings'), href: '#'},
        { icon: <PiCreditCardFill />, label: t('cardSettings'), href: '#'},
        { icon: <TbBadge3DFilled />, label: t('3dSecurity'), href: '#'},
        { icon: <FaLock />, label: t('changePassword'), href: '#'},
        { icon: <HiCreditCard />, label: t('registerCertificate'), href: '#'},
        { icon: <FaPenNib />, label: t('registerKeb'), href: '#'},
    ];

    return (
        <DropdownItem label={t('settings')} icon={<FaCog />}>
            {settingsItems.map((item, index) => (
                <li key={index} className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2">
                    <a href={item.href}>
                        <span className="flex items-center justify-center">
                            <span className="flex mr-2">{item.icon}</span>
                            {item.label}
                        </span>
                    </a>
                </li>
            ))}
        </DropdownItem>
    )
}