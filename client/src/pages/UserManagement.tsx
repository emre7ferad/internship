import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoading } from '../context/LoadingContext';
import { http } from '../services/http';
import { API_ENDPOINTS } from '../utils/apiUtils';
import { FaArrowLeft, FaChevronLeft, FaChevronRight, FaEdit, FaEye, FaFilter, FaSearch, FaTrash, FaUser, FaUsers, FaUserShield } from 'react-icons/fa';

interface User {
    _id: string;
    username: string;
    email: string;
    nameCyrillic: string;
    nameLatin: string;
    phone: string;
    address: string;
    isAdmin: boolean;
    role: string;
    createdAt: string;
    egn: string;
}

interface UserManagementProps {
    onBack: () => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ onBack }) => {
    const { t, i18n } = useTranslation('admin');
    const tableClassName = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
    const { start: startLoading, stop: stopLoading } = useLoading();
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(20);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<Partial<User>>({});

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        filterUsers();
        setCurrentPage(1);
    }, [users, searchTerm]);

    const fetchUsers = async () => {
        startLoading();
        try {
            const response = await http.get<{ success: boolean, data: User[] }>(API_ENDPOINTS.admin.users);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            stopLoading();
        }
    }

    const filterUsers = () => {
        const filtered = users.filter(user => 
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.nameCyrillic.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.nameLatin.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.egn.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = totalPages -3; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }
        return pageNumbers;
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user);
        setIsEditModalOpen(true);
    };

    const handleViewUser = (user: User) => {
        setSelectedUser(user);
        setIsViewModalOpen(true);
    };

    const handleDeleteUser = (user: User) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleUpdateUser = async () => {
        if (!editingUser._id) return;

        startLoading();
        try {
            await http.patch(API_ENDPOINTS.admin.updateUserStatus(editingUser._id), {
                isAdmin: editingUser.isAdmin,
            });

            setUsers(prev => prev.map(user =>
                user._id === editingUser._id
                ? { ...user, isAdmin: editingUser.isAdmin! }
                : user
            ));

            setIsEditModalOpen(false);
            setEditingUser({});
        } catch (error) {
            console.error('Error updating user:', error);
        } finally {
            stopLoading();
        }
    };

    const handleConfirmDelete = async () => {
        if (!selectedUser) return;

        startLoading();
        try {
            await http.delete(API_ENDPOINTS.admin.deleteUser(selectedUser._id));

            setUsers(prev => prev.filter(user => user._id !== selectedUser._id));
            setIsDeleteModalOpen(false);
            setSelectedUser(null);
        } catch (error) {
            console.error('Error deleting user:', error);
        } finally {
            stopLoading();
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const locale = i18n.language === 'bg' ? 'bg-BG' : 'en-US';
        return date.toLocaleDateString(locale);
    };

    return (
        <div className='min-h-screen bg-gray-50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {/* HEADER */}
                <div className='mb-8'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-4'>
                            <button
                                onClick={onBack}
                                className='flex items-center text-gray-600 hover:text-gray-900'
                            >
                                <FaArrowLeft className='mr-2' />
                                {t('backToDashboard')}
                            </button>
                            <h1 className='text-3xl font-bold text-gray-900'>{t('userManagement')}</h1>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <FaUsers className='text-2xl text-blue-800' />
                            <span className='text-lg font-medium text-gray-700'>
                                {filteredUsers.length} {t('users')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
                    <div className='flex items-center space-x-4'>
                        <div className='flex-1 relative'>
                            <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                            <input 
                                type="text"
                                placeholder={t('searchUsers')}
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            />
                        </div>
                        <button className='flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200'>
                            <FaFilter className='mr-2' />
                            {t('filter')}
                        </button>
                    </div>
                </div>
                {/* Users Table */}
                <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                    <div className='overflow-x-auto'>
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead className='bg-gray-50'>
                                <tr>
                                    <th className={tableClassName}>{t('user')}</th>
                                    <th className={tableClassName}>{t('email')}</th>
                                    <th className={tableClassName}>{t('role')}</th>
                                    <th className={tableClassName}>{t('createdAt')}</th>
                                    <th className={tableClassName}>{t('actions')}</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-200'>
                                {currentUsers.map((user) => (
                                    <tr key={user._id} className='hover:bg-gray-50'>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <div className='flex items-center'>
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                        {user.isAdmin ? (
                                                            <FaUserShield className="text-blue-600" />
                                                        ) : (
                                                            <FaUser className="text-gray-600" />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {user.username}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {user.nameCyrillic}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                user.isAdmin
                                                    ? 'bg-purple-100 text-purple-800'
                                                    : 'bg-green-100 text-green-800'
                                            }`}>
                                                {user.isAdmin ? t('admin') : t('user')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(user.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleViewUser(user)}
                                                    className="text-blue-600 hover:text-blue-900 cursor-pointer"
                                                    title={t('viewUser')}
                                                >
                                                    <FaEye />
                                                </button>
                                                <button
                                                    onClick={() => handleEditUser(user)}
                                                    className="text-green-600 hover:text-green-900 cursor-pointer"
                                                    title={t('editUser')}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(user)}
                                                    className="text-red-600 hover:text-red-900 cursor-pointer"
                                                    title={t('deleteUser')}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Pagination */}
                {totalPages > 1 && (
                    <div className='bg-white rounded-lg shadow-md p-4 mt-6'>
                        <div className='flex items-center justify-between'>
                            <div className='text-sm text-gray-700'>
                                {t('showing')} {indexOfFirstUser + 1} {t('to')} {Math.min(indexOfLastUser, filteredUsers.length)} {t('of')} {filteredUsers.length} {t('users')}
                            </div>
                            
                            <div className='flex items-center space-x-2'>
                                {/* Previous button */}
                                <button
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                    className='px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                                >
                                    <FaChevronLeft className='w-4 h-4' />
                                </button>

                                {/* Page numbers */}
                                {getPageNumbers().map((pageNumber, index) => (
                                    <button
                                        key={index}
                                        onClick={() => typeof pageNumber === 'number' ? handlePageChange(pageNumber) : null}
                                        disabled={pageNumber === '...'}
                                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                                            pageNumber === currentPage
                                                ? 'bg-blue-600 text-white'
                                                : pageNumber === '...'
                                                ? 'text-gray-400 cursor-default'
                                                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        {pageNumber}
                                    </button>
                                ))}

                                {/* Next button */}
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className='px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                                >
                                    <FaChevronRight className='w-4 h-4' />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {/* Edit User Modal */}
                {isEditModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">{t('editUser')}</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        {t('username')}
                                    </label>
                                    <input
                                        type="text"
                                        value={editingUser.username || ''}
                                        disabled
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        {t('email')}
                                    </label>
                                    <input
                                        type="email"
                                        value={editingUser.email || ''}
                                        disabled
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        {t('role')}
                                    </label>
                                    <select
                                        value={editingUser.isAdmin ? 'admin' : 'user'}
                                        onChange={(e) => setEditingUser(prev => ({ 
                                            ...prev, 
                                            isAdmin: e.target.value === 'admin' 
                                        }))}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="user">{t('user')}</option>
                                        <option value="admin">{t('admin')}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                >
                                    {t('cancel')}
                                </button>
                                <button
                                    onClick={handleUpdateUser}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                >
                                    {t('saveChanges')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* View User Modal */}
                {isViewModalOpen && selectedUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">{t('userDetails')}</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">{t('username')}</label>
                                        <p className="mt-1 text-sm text-gray-900">{selectedUser.username}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">{t('email')}</label>
                                        <p className="mt-1 text-sm text-gray-900">{selectedUser.email}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">{t('nameCyrillic')}</label>
                                        <p className="mt-1 text-sm text-gray-900">{selectedUser.nameCyrillic}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">{t('nameLatin')}</label>
                                        <p className="mt-1 text-sm text-gray-900">{selectedUser.nameLatin}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">{t('phone')}</label>
                                        <p className="mt-1 text-sm text-gray-900">{selectedUser.phone}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">{t('egn')}</label>
                                        <p className="mt-1 text-sm text-gray-900">{selectedUser.egn}</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{t('address')}</label>
                                    <p className="mt-1 text-sm text-gray-900">{selectedUser.address}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{t('role')}</label>
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                        selectedUser.isAdmin
                                            ? 'bg-purple-100 text-purple-800'
                                            : 'bg-green-100 text-green-800'
                                    }`}>
                                        {selectedUser.isAdmin ? t('admin') : t('user')}
                                    </span>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">{t('createdAt')}</label>
                                    <p className="mt-1 text-sm text-gray-900">{formatDate(selectedUser.createdAt)}</p>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={() => setIsViewModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                >
                                    {t('close')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {isDeleteModalOpen && selectedUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">{t('confirmDelete')}</h3>
                            <p className="text-sm text-gray-600 mb-6">
                                {t('deleteUserWarning')} <strong>{selectedUser.username}</strong>?
                            </p>
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                >
                                    {t('cancel')}
                                </button>
                                <button
                                    onClick={handleConfirmDelete}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                                >
                                    {t('delete')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserManagement;