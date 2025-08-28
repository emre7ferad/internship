import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AccountsTable from "../components/AccountsTable";
import TransactionsTable from "../components/TransactionsTable";
import SignatureTable from "../components/SignatureTable";
import CardsTable from "../components/CardsTable";
import DebtsTable from "../components/DebtsTable";
import CreditsTable from "../components/CreditsTable";
import ExchangeRatesTable from "../components/ExchangeRatesTable";
import { useTranslation } from "react-i18next";
import { useModuleManagement } from "../hooks/useModuleManagement";

const Dashboard = () => {
    const [infoFibankOpen, setInfoFibankOpen] = useState(false);
    const [moreInfoOpen, setMoreInfoOpen] = useState(false);
    const { t } = useTranslation('dashboard');
    const { getActiveModules, modules } = useModuleManagement();

    // Force re-render when modules change
    const [renderKey, setRenderKey] = useState(0);

    // Watch for changes in modules and force re-render
    useEffect(() => {
        setRenderKey(prev => prev + 1);
    }, [modules]);

    const activeModules = getActiveModules();

    const renderModule = (moduleId: string) => {
        switch (moduleId) {
            case 'accounts':
                return <AccountsTable key={`${moduleId}-${renderKey}`} />;
            case 'signatureTransfers':
                return <SignatureTable key={`${moduleId}-${renderKey}`} />;
            case 'cards':
                return <CardsTable key={`${moduleId}-${renderKey}`} />;
            case 'transactions':
                return <TransactionsTable key={`${moduleId}-${renderKey}`} />;
            case 'debts':
                return <DebtsTable key={`${moduleId}-${renderKey}`} />;
            case 'credits':
                return <CreditsTable key={`${moduleId}-${renderKey}`} />;
            case 'exchangeRates':
                return <ExchangeRatesTable key={`${moduleId}-${renderKey}`} />;
            default:
                return null;
        }
    };

    return(
        <div className="lg:m-5 lg:flex bg-white">
           {/* Sidebar */}
           <Sidebar
                infoFibankOpen={infoFibankOpen}
                moreInfoOpen={moreInfoOpen}
                setInfoFibankOpen={setInfoFibankOpen}
                setMoreInfoOpen={setMoreInfoOpen}
           />

           {/* Main content */}
            <main className="w-full flex-grow">
                <div className="border-b text-center lg:text-left border-gray-300 lg:px-6 lg:py-2 text-gray-500">
                    {t('home')}
                </div>
                {/* Top Info Boxes */}
                <div className="px-6 py-2">
                <section className="grid grid-cols-1 sm1 lg:grid-cols-3 gap-8 py-4">
                    <div className="bg-gray-100 text-center block py-4 px-12">
                        {t('netAvailable')}
                        <span className="text-2xl text-blue-800 block font-semibold">50 203 000.03 BGN</span>
                        </div>
                    <div className="bg-gray-100 text-center block py-4 px-12">
                        {t('totalCurrentBalance')}
                        <span className="text-2xl text-blue-800 block bottom-0 font-semibold">75 000.00 BGN</span>
                    </div>
                    <div className="bg-gray-100 text-center block py-4 px-12">
                        {t('totalNetAvailability')}
                        <span className="text-2xl text-blue-800 block font-semibold">20 000.00 BGN</span>
                    </div>
                </section>

                {/* Render active modules in order */}
                {activeModules.map(module => renderModule(module.id))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;