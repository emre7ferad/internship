import { useTranslation } from "react-i18next";

interface PasswordStrengthIndicatorProps {
    strength: number;
    password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
    strength,
    password
}) => {
    const { t } = useTranslation('register')

    const getBarClass = () => {
        if (strength === 0) return "w-0"
        if (password.length < 6 || password.length > 24) return "w-1/4 bg-red-500";
        if (strength === 1) return "w-1/4 bg-red-500";
        if (strength === 2) return "w-2/4 bg-yellow-500";
        if (strength === 3) return "w-3/4 bg-green-500";
        return "w-full bg-blue-800"
    };

    const getMessage = () => {
        if (password.length === 0) return t('passwordSecurity0');
        if (!/^[\x00-\x7F]*$/.test(password)) return t('passwordSecurityInvalid');
        if (password.length > 24) return t('passwordSecurityLength24');
        if (password.length < 6) return t('passwordSecurityLength6');
        if (strength === 1) return t('passwordSecurity1');
        if (strength === 2) return t('passwordSecurity2');
        if (strength === 3) return t('passwordSecurity3');
        return t('passwordSecurity4');
    }

    return (
        <div className="mb-4">
            <div className="h-2 w-full bg-gray-200">
                <div className={`h-2 transition-all duration-300 ${getBarClass()}`} />
            </div>
            <span className="text-xs text-gray-600">{getMessage()}</span>
        </div>
    );
};

export default PasswordStrengthIndicator;
