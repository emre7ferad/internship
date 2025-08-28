import React from 'react';
import { useTranslation } from 'react-i18next';

const ExchangeRatesTable: React.FC = () => {
    const { t } = useTranslation('dashboard');

    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">{t('exchangeRates')}</h2>
            <div className="text-gray-600">
                <p>{t('exchangeRatesDescription')}</p>
                {/* Add your exchange rates table content here */}
            </div>
        </div>
    );
};

export default ExchangeRatesTable;
