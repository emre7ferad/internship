import { FaCog, FaLock, FaPenNib, FaUser, FaEdit } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { MdEdit, MdEditDocument } from "react-icons/md";
import { RiSafe3Fill } from "react-icons/ri";
import { PiCreditCardFill } from "react-icons/pi";
import { TbBadge3DFilled } from "react-icons/tb";
import { HiCreditCard } from "react-icons/hi";
import DropdownItem from "../Dropdown";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useModuleManagement } from "../../hooks/useModuleManagement";
import ModuleManagementModal from "../ModuleManagementModal";

export const SettingsDropdown: React.FC = () => {
    const { t } = useTranslation('navbar');
    const { isAdmin } = useAuth();
    const { modules, isModalOpen, openModal, closeModal, handleSaveModules } = useModuleManagement();

    const settingsItems = [
        { icon: <FaUser />, label: t('personalData'), href: '#'},
        { icon: <FaEdit />, label: t('moduleManagement'), href: '#', onClick: openModal},
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
        <>
            <DropdownItem label={t('settings')} icon={<FaCog />}>
                {isAdmin && (
                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer space-x-2 border-b border-gray-200">
                        <Link to="/admin">
                            <span className="flex items-center text-blue-800">
                                <FaCog className="mr-2" />
                                {t('admin')}
                            </span>
                        </Link>
                    </li>
                )}
                {settingsItems.map((item, index) => (
                    <li key={index} className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-blue-800 cursor-pointer">
                        {item.onClick ? (
                            <button onClick={item.onClick} className="w-full text-left flex items-center cursor-pointer">
                                <span className="mr-2">{item.icon}</span>
                                {item.label}
                            </button>
                        ) : (
                            <a href={item.href} className="w-full flex items-center">
                                <span className="mr-2">{item.icon}</span>
                                {item.label}
                            </a>
                        )}
                    </li>
                ))}
            </DropdownItem>

            {/* Module Management Modal */}
            <ModuleManagementModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={handleSaveModules}
                modules={modules}
            />
        </>
    )
}