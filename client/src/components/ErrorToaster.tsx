import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useError } from "../context/ErrorContext";

const AUTO_CLOSE_MS = 5000;

const ErrorToaster: React.FC = () => {
    const { t } = useTranslation('others');
    const { errors, removeError } = useError();

    useEffect(() => {
        const timers = errors.map(err => 
            setTimeout(() => removeError(err.id), AUTO_CLOSE_MS)
        );
        return () => timers.forEach(clearTimeout);
    }, [errors, removeError]);

    if (errors.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-[9999] space-y-3 w-80">
            {errors.map(err => (
                <div key={err.id} className="bg-white border border-red-300 shadow-lg p-3">
                    <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-red-700">
                            {t('somethingWentWrong')}
                        </h4>
                        <button
                            onClick={() => removeError(err.id)}
                            className="text-gray-500 hover:text-gray-700"
                            aria-label="Dismiss"
                        >
                            ×
                        </button>
                    </div>
                    <p className="text-sm text-gray-800 mt-1">{err.message}</p>
                    {err.detail && (
                        <p className="text-xs text-gray-500 mt-1 break-words">{err.detail}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ErrorToaster;