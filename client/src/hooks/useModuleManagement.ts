import { useState, useEffect, useCallback } from 'react';
import type { ModuleConfig } from '../types/moduleManagement';
import { useAuth } from '../context/AuthContext';
import { http } from '../services/http';
import { API_ENDPOINTS } from '../utils/apiUtils';
import { useLoading } from '../context/LoadingContext';

export const useModuleManagement = () => {
    const { user } = useAuth();
    const { start, stop } = useLoading();
    const [modules, setModules] = useState<ModuleConfig[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const defaultModules: ModuleConfig[] = [
        {
            id: 'accounts',
            label: 'accounts',
            icon: 'IoIosPaper',
            isActive: true,
            order: 1,
            description: 'Shows accounts information and balances'
        },
        {
            id: 'signatureTransfers',
            label: 'signatureTransfers',
            icon: 'FaPenAlt',
            isActive: true,
            order: 2,
            description: 'Transfers waiting for signature'
        },
        {
            id: 'cards',
            label: 'cards',
            icon: 'FaCreditCard',
            isActive: true,
            order: 3,
            description: 'Credit and debit cards description'
        },
        {
            id: 'debts',
            label: 'debts',
            icon: 'FaWallet',
            isActive: true,
            order: 4,
            description: 'Liabilities and debts information'
        },
        {
            id: 'transactions',
            label: 'transactions',
            icon: 'BiSolidCoinStack',
            isActive: true,
            order: 5,
            description: 'Last 5 transactions'
        },
        {
            id: 'credits',
            label: 'credits',
            icon: 'FaHandHoldingUsd',
            isActive: true,
            order: 6,
            description: 'Credit and loan information'
        },
        {
            id: 'exchangeRates',
            label: 'exchangeRates',
            icon: 'IoStatsChart',
            isActive: false,
            order: 7,
            description: 'Currency exchange rates'
        }
    ];

    const fetchModules = useCallback(async () => {
        if (!user?.userId) return;

        try {
            start();
            const response = await http.get(API_ENDPOINTS.users.modules) as { modules: ModuleConfig[] };
            const userModules = response.modules || [];

            if (userModules.length > 0 ) {
                setModules(userModules);
            } else {
                setModules(defaultModules);
            }
        } catch (error) {
            console.error('Error fetching modules:', error);
            const savedModules = localStorage.getItem('userModules');
            if (savedModules) {
                try {
                    const parsed = JSON.parse(savedModules);
                    setModules(parsed);
                } catch (parseError) {
                    console.error('Error parsing saved modules:', parseError);
                    setModules(defaultModules);
                }
            } else {
                setModules(defaultModules);
            }
        } finally {
            stop();
        }
    }, [user?.userId]);

    const saveModulesToDatabase = useCallback(async (updatedModules: ModuleConfig[]) => {
        if (!user?.userId) return;

        try {
            start();
            await http.put(API_ENDPOINTS.users.modules, { modules: updatedModules})
            console.log('Modules saved to database successfully');
        } catch (error) {
            console.error('Error saving modules to database:', error);
            localStorage.setItem('userModules', JSON.stringify(updatedModules));
        } finally {
            stop();
        }
    }, [user?.userId]);

    useEffect(() => {
        fetchModules();
    }, [fetchModules]);

    const openModal = useCallback(() => setIsModalOpen(true), []);
    const closeModal = useCallback(() => setIsModalOpen(false), []);

    const handleSaveModules = useCallback(async (updatedModules: ModuleConfig[]) => {
        console.log('Saving modules:', updatedModules);
        setModules(updatedModules);

        await saveModulesToDatabase(updatedModules);

        localStorage.setItem('userModules', JSON.stringify(updatedModules));

        closeModal();
    }, [closeModal, saveModulesToDatabase]);

    const getActiveModules = useCallback(() => {
        const active = modules.filter(module => module.isActive).sort((a, b) => a.order - b.order);
        console.log('Active modules:', active);
        return active;
    }, [modules]);

    return {
        modules,
        isModalOpen,
        openModal,
        closeModal,
        handleSaveModules,
        getActiveModules
    };
};