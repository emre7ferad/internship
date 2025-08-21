"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/**
 * User Service - Handles business logic for user operations
 */
class UserService {
    /**
     * Create a new user
     */
    static async createUser(userData) {
        try {
            // Check for existing user with same email, username, or EGN
            const existingUser = await User_1.default.findOne({
                $or: [
                    { email: userData.email },
                    { username: userData.username },
                    { egn: userData.egn }
                ]
            });
            if (existingUser) {
                if (existingUser.email === userData.email) {
                    throw new Error('Имейлът вече съществува');
                }
                if (existingUser.username === userData.username) {
                    throw new Error('Потребителското име вече съществува');
                }
                if (existingUser.egn === userData.egn) {
                    throw new Error('Потребител с това ЕГН вече съществува');
                }
            }
            // Hash password
            const hashedPassword = await bcryptjs_1.default.hash(userData.password, 10);
            // Create new user
            const newUser = new User_1.default({
                ...userData,
                password: hashedPassword
            });
            const savedUser = await newUser.save();
            return savedUser;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Get user by ID
     */
    static async getUserById(userId) {
        try {
            const user = await User_1.default.findById(userId)
                .select('-password') // Exclude password
                .populate('notifications')
                .populate('messages');
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Get user by username
     */
    static async getUserByUsername(username) {
        try {
            const user = await User_1.default.findOne({ username });
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Get user by email
     */
    static async getUserByEmail(email) {
        try {
            const user = await User_1.default.findOne({ email });
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Update user profile
     */
    static async updateUserProfile(userId, updateData) {
        try {
            // Check if email is being updated and if it's already taken
            if (updateData.email) {
                const existingUser = await User_1.default.findOne({
                    email: updateData.email,
                    _id: { $ne: userId }
                });
                if (existingUser) {
                    throw new Error('Имейлът вече съществува');
                }
            }
            const updatedUser = await User_1.default.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true }).select('-password');
            if (!updatedUser) {
                throw new Error('User not found');
            }
            return updatedUser;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Change user password
     */
    static async changePassword(userId, currentPassword, newPassword) {
        try {
            const user = await User_1.default.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            // Verify current password
            const isCurrentPasswordValid = await bcryptjs_1.default.compare(currentPassword, user.password);
            if (!isCurrentPasswordValid) {
                throw new Error('Current password is incorrect');
            }
            // Hash new password
            const hashedNewPassword = await bcryptjs_1.default.hash(newPassword, 10);
            // Update password
            user.password = hashedNewPassword;
            await user.save();
            return { message: 'Password changed successfully' };
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Delete user
     */
    static async deleteUser(userId) {
        try {
            const deletedUser = await User_1.default.findByIdAndDelete(userId);
            if (!deletedUser) {
                throw new Error('User not found');
            }
            return { message: 'User deleted successfully' };
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Get all users (admin only)
     */
    static async getAllUsers(page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const users = await User_1.default.find()
                .select('-password')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });
            const total = await User_1.default.countDocuments();
            return {
                users,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit)
                }
            };
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Add notification to user
     */
    static async addNotificationToUser(userId, notificationId) {
        try {
            const user = await User_1.default.findByIdAndUpdate(userId, { $push: { notifications: notificationId } }, { new: true });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Remove notification from user
     */
    static async removeNotificationFromUser(userId, notificationId) {
        try {
            const user = await User_1.default.findByIdAndUpdate(userId, { $pull: { notifications: notificationId } }, { new: true });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.UserService = UserService;
