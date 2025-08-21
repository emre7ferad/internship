import { useEffect, useState } from "react";
import { accountService, type Account } from "../services/accountService";
import { useAuth } from "../context/AuthContext";
import { IoClose } from "react-icons/io5";
import { IoIosPaper } from "react-icons/io";
import { useTranslation } from "react-i18next";

interface AccountSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (selectedAccounts: Account[]) => void;
    title?: string;
    maxSelection?: number;
    selectedAccountsIds?: string[];
    additionalText?: string;
}

interface AccountOption {
    account: Account;
    isSelected: boolean;
}

const AccountSelectionModal: React.FC<AccountSelectionModalProps> = ({
    isOpen,
    onClose,
    onSave,
    title,
    maxSelection = 3,
    selectedAccountsIds = [],
    additionalText = '',
}) => {
    const { user } = useAuth();
    const { t } = useTranslation('dashboard');
    const baseTitle = title ?? `${t('settings')} -`;
    const [accounts, setAccounts] = useState<AccountOption[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedCount, setSelectedCount] = useState(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (isOpen && user?.userId) {
            fetchAccounts();
        }
    }, [isOpen, user]);

    const fetchAccounts = async () => {
        if (!user?.userId) return;

        setError(null);

        try {
            const accountData = await accountService.getUserAccounts(user.userId);

            const accountsWithSelection = accountData.map(account => ({
                account,
                isSelected: selectedAccountsIds.includes(account._id)
            }));

            setAccounts(accountsWithSelection);
            setSelectedCount(accountsWithSelection.filter(acc => acc.isSelected).length);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to load accounts';
            console.error('Error fetching accounts', errorMessage);
        } finally {
            setLoaded(true);
        }
    };

    const handleAccountToggle = (accountId: string) => {
        setAccounts(prevAccounts => {
            const updatedAccounts = prevAccounts.map(acc => {
                if (acc.account._id === accountId) {
                    if (acc.isSelected) {
                        return { ...acc, isSelected: false };
                    }
                    if (selectedCount < maxSelection) {
                        return { ...acc, isSelected: true };
                    }
                    return acc;
                }
                return acc;
            });

            const newSelectedCount = updatedAccounts.filter(acc => acc.isSelected).length;
            setSelectedCount(newSelectedCount);

            return updatedAccounts;
        });
    };

    const handleSave = () => {
        const selectedAccounts = accounts
            .filter(acc => acc.isSelected)
            .map(acc => acc.account);

        onSave(selectedAccounts);
        onClose();
    };

    const handleClose = () => {
        setAccounts(prevAccounts =>
            prevAccounts.map(acc => ({ ...acc, isSelected: false}))
        );
        setSelectedCount(0);
        onClose();
    };

    const fullTitle = additionalText ? `${baseTitle} ${additionalText}` : baseTitle;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white/60 flex items-center justify-center z-50">
            <div className="bg-white shadow-md border border-gray-300 w-full max-w-lg mx-4 max-h-[104vh] overflow-y-auto overflow-x-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-300">
                    <h2 className="text-lg font-semibold">{fullTitle}</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
                        aria-label="Close modal"
                    >
                        <IoClose className="w-5 h-5" />
                    </button>
                </div>

                <div className="border-b border-gray-300">
                    {!loaded? (
                        <div className="py-8"/>
                    ) : error ? (
                        <div className=" text-center py-8">
                            <p className="text-red-500 mb-4">{error}</p>
                            <button
                                onClick={fetchAccounts}
                                className="px-4 py-2 bg-blue-800 text-white hover:bg-blue-700 transition-colors"
                            >
                                {t('retry')}
                            </button>
                        </div>
                    ) : accounts.length === 0 ? (
                        <div className="text-center py-6 text-gray-500">{t('noAccounts')}</div>
                    ) : (
                        <>
                            <div className="p-4 font-semibold">
                                <p className="text-sm">{t('selectUpTo', { count: maxSelection })}</p>
                            </div>

                            <div className="border border-gray-300 overflow-hidden">
                                <div className="bg-gray-100 flex items-center p-3 border-b border-gray-300">
                                    <div className="flex-1 font-medium text-gray-700 px-4">{t('account')}</div>
                                    <div className="w-24 font-medium text-gray-700 text-right pr-4">{t('currency')}</div>
                                </div>

                                {/* Table body */}
                                <div className="max-h-64 overflow-y-auto">
                                    {accounts.map(({ account, isSelected }) => (
                                        <div 
                                            key={account._id}
                                            className={`flex items-center p-3 border-b border-gray-200 hover:bg-gray-50 ${
                                                isSelected ? '' : ''
                                            }`}
                                        >
                                            <div className="w-12 flex items-center justify-center">
                                                <input 
                                                    type="checkbox" 
                                                    checked={isSelected}
                                                    onChange={() => handleAccountToggle(account._id)}
                                                    disabled={!isSelected && selectedCount >= maxSelection}
                                                    className="w-4 h-4 text-blue-800 border-gray-300 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2">
                                                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-800">
                                                        <IoIosPaper className="text-white w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">
                                                            {account.accountType}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {account.accountNumber}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-24 text-right pr-4">
                                                <span className="text-sm font-medium text-gray-700">
                                                    {account.currency}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="flex-justify-end space-x-3 p-6 border-t border-gray-200">
                    <button
                        onClick={handleSave}
                        disabled={selectedCount === 0}
                        className={`px-6 py-1 transition-colors ${
                            selectedCount === 0
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-800 text-white hover:bg-blue-700 cursor-pointer'
                        }`}
                    >
                        {t('save')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountSelectionModal;