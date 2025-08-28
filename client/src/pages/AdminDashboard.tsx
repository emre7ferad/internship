import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";
import { http } from "../services/http";
import { API_ENDPOINTS } from "../utils/apiUtils";
import { FaUsers, FaCreditCard, FaExchangeAlt, FaChartBar, FaCog } from "react-icons/fa";
import UserManagement from "./UserManagement";

interface AdminStats {
    totalUsers: number;
    totalAccounts: number;
    totalTransactions: number;
    activeUsers: number;
}

const AdminDashboard: React.FC = () => {
    const { t } = useTranslation('admin');
    const { user } = useAuth();
    const { start: startLoading, stop: stopLoading } = useLoading();
    const [stats, setStats] = useState<AdminStats>({
        totalUsers: 0,
        totalAccounts: 0,
        totalTransactions: 0,
        activeUsers: 0,
    });
    const [currentView, setCurrentView] = useState<'dashboard' | 'users'>('dashboard');
    
    useEffect(() => {
        if (currentView === 'dashboard') {
            fetchAdminStats();
        }
    }, [currentView]);

    const fetchAdminStats = async () => {
        startLoading();

        try {
            const data = await http.get<{ success: boolean; data: AdminStats}>(API_ENDPOINTS.admin.stats);
            setStats(data.data);
        } catch (error) {
            console.error('Error fetching admin stats:', error);
            console.log(error);
        } finally {
            stopLoading();
        }
    };

    const StatCard = ({ title, value, icon: Icon, color }: {
        title: string;
        value: number;
        icon: React.ComponentType<{ className?: string}>;
        color: string;
    }) => (
        <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${color}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
                </div>
                <Icon className="text-3xl text-gray-400" />
            </div>
        </div>
    );

    if (currentView === 'users') {
        return <UserManagement onBack={() => setCurrentView('dashboard')} />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">{t('adminDashboard')}</h1>
                    <p className="text-gray-600">{t('welcomeBack')}, {user?.username}</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title={t('totalUsers')}
                        value={stats.totalUsers}
                        icon={FaUsers}
                        color="border-blue-500"
                    />
                    <StatCard 
                        title={t('totalAccounts')}
                        value={stats.totalAccounts}
                        icon={FaCreditCard}
                        color="border-green-500"
                    />
                    <StatCard 
                        title={t('totalTransactions')}
                        value={stats.totalTransactions}
                        icon={FaExchangeAlt}
                        color="border-purple-500"
                    />
                    <StatCard 
                        title={t('activeUsers')}
                        value={stats.activeUsers}
                        icon={FaChartBar}
                        color="border-orange-500"
                    />
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('quickActions')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button 
                            onClick={() => setCurrentView('users')}
                            className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            <FaUsers className="mr-2 text-blue-600" />
                            <span>{t('manageUsers')}</span>
                        </button>
                        <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                            <FaCreditCard className="mr-2 text-green-600"/>
                            <span>{t('manageAccounts')}</span>
                        </button>
                        <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                            <FaCog className="mr-2 text-gray-600"/>
                            <span>{t('systemSettings')}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;