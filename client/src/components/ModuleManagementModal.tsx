import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { ModuleConfig, ModuleManagementProps } from '../types/moduleManagement';
import { FaFileAlt, FaQuestionCircle, FaSave, FaTimes, FaUndo } from 'react-icons/fa';
import { CgArrowsV } from 'react-icons/cg';

const ModuleManagementModal: React.FC<ModuleManagementProps> = ({
    isOpen,
    onClose,
    onSave,
    modules: initialModules
}) => {
    const { t } = useTranslation('dashboard');
    const [modules, setModules] = useState<ModuleConfig[]>(initialModules);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    useEffect(() => {
        setModules(initialModules);
    }, [initialModules]);

    const handleModuleToggle = (moduleId: string) => {
        setModules(prev => prev.map(module => 
            module.id === moduleId 
                ? { ...module, isActive: !module.isActive }
                : module
        ));
    };

    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
        e.preventDefault();
        
        if (draggedIndex === null || draggedIndex === dropIndex) return;

        const newModules = [...modules];
        const draggedModule = newModules[draggedIndex];
        
        // Remove the dragged item
        newModules.splice(draggedIndex, 1);
        
        // Insert at the new position
        newModules.splice(dropIndex, 0, draggedModule);
        
        // Update order numbers
        const updatedModules = newModules.map((module, index) => ({
            ...module,
            order: index + 1
        }));
        
        setModules(updatedModules);
        setDraggedIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    const handleResetToDefault = () => {
        const defaultModules = [
            { id: 'accounts', label: 'accounts', icon: 'FaFileAlt', isActive: true, order: 1, description: 'Shows accounts information and balances' },
            { id: 'signatureTransfers', label: 'signatureTransfers', icon: 'FaFileAlt', isActive: true, order: 2, description: 'Transfers waiting for signature' },
            { id: 'cards', label: 'cards', icon: 'FaFileAlt', isActive: true, order: 3, description: 'Credit and debit cards description' },
            { id: 'transactions', label: 'transactions', icon: 'FaFileAlt', isActive: true, order: 4, description: 'Last 5 transactions' },
            { id: 'debts', label: 'debts', icon: 'FaFileAlt', isActive: true, order: 5, description: 'Liabilities and debts information' },
            { id: 'credits', label: 'credits', icon: 'FaFileAlt', isActive: true, order: 6, description: 'Credit and loan information' },
            { id: 'exchangeRates', label: 'exchangeRates', icon: 'FaFileAlt', isActive: true, order: 7, description: 'Currency exchange rates' }
        ];
        setModules(defaultModules);
    };

    const handleSave = () => {
        onSave(modules);
        window.location.reload(); // Refresh the page after saving
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-10">
            <div className="bg-white border border-gray-300 rounded-lg shadow-xl max-w-4xl mx-4 w-128 max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {t('moduleManagement')}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <FaTimes className="text-xl" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
                    {/* Table */}
                    <div className="bg-white overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t('module')}
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t('status')}
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {modules.map((module, index) => (
                                    <tr
                                        key={module.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, index)}
                                        onDragOver={(e) => handleDragOver(e, index)}
                                        onDrop={(e) => handleDrop(e, index)}
                                        onDragEnd={handleDragEnd}
                                        className={`hover:bg-gray-50 transition-colors border border-gray-200 mb-2 bg-white ${
                                            draggedIndex === index ? 'opacity-50' : ''
                                        }`}
                                    >
                                        <td className="px-4 py-4 whitespace-nowrap border-r border-gray-200">
                                            <div className="flex items-center space-x-3">
                                                <input
                                                    type="checkbox"
                                                    checked={module.isActive}
                                                    onChange={() => handleModuleToggle(module.id)}
                                                    className="w-4 h-4 border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                                />
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center">
                                                        <FaFileAlt className="text-white text-lg" />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {t(module.label)}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap border-r border-gray-200">
                                            <span className='inline-flex px-2 py-1 text-xs font-semibold rounded-full'>
                                                {module.isActive ? t('active') : t('inactive')}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap border-r border-gray-200">
                                            <CgArrowsV className="text-gray-400 text-lg  hover:text-gray-600 cursor-move" />
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="relative group">
                                                <FaQuestionCircle className="text-gray-400 hover:text-gray-600 cursor-help" />
                                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-white border border-gray-300 rounded-md shadow-lg p-2 text-xs text-gray-700 whitespace-nowrap z-[99999]">
                                                    {module.description}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
                    <button
                        onClick={handleResetToDefault}
                        className="flex items-center justify-center w-10 h-10 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                        title="Reset to Default"
                    >
                        <FaUndo className="text-sm" />
                    </button>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                        >
                            {t('cancel')}
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-800 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                        >
                            <FaSave className="text-sm" />
                            <span>{t('saveChanges')}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModuleManagementModal;