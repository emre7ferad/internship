import { Request, Response } from 'express';
import User from '../models/User';
import Account from '../models/Account';
import Transaction from '../models/Transaction';
import { NotFoundError } from '../utils/errorHandler';

export const getAdminStats = async (req: Request, res: Response): Promise<void> => {
    try {
        const totalUsers = await User.countDocuments();
        const totalAccounts = await Account.countDocuments();
        const totalTransactions = await Transaction.countDocuments();
        const activeUsers = await User.countDocuments({ totalUsers });

        res.json({
            success: true,
            data: {
                totalUsers,
                totalAccounts,
                totalTransactions,
                activeUsers
            }
        });
    } catch (error) {
        console.error('Error fetching admin stats: ', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch admin statistics'
        });
    }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find({}, {password: 0});

        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('Error fetching users: ', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch users'
        });
    }
};

export const updateUserStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const { isAdmin } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { isAdmin },
            { new: true, select: '-password' }
        );

        if (!user) {
            throw new NotFoundError('User not found');
        }

        res.json ({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Error updating user status: ', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update user status'
        });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        
        if (!user) {
            throw new NotFoundError('User not found');
        }

        await Account.deleteMany({ user: userId });
        await Transaction.deleteMany({
            $or: [
                { 'account.user': userId },
                { 'senderAccount.user': userId },
                { 'receiverAccount.user': userId }
            ]
        });

        await User.findByIdAndDelete(userId);
        res.json({
            success: true,
            message: 'User deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting user: ', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete user'
        });
    }
};