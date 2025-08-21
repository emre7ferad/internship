"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userService_1 = require("../services/userService");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
/**
 * Create a new user
 * POST /api/users
 */
router.post('/', async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await userService_1.UserService.createUser(userData);
        res.status(201).json(newUser);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                error: error.message,
                code: 'USER_CREATION_ERROR'
            });
        }
        else {
            res.status(500).json({
                error: 'Възникна неизвестна грешка',
                code: 'UNKNOWN_ERROR'
            });
        }
    }
});
// Apply authentication middleware to all routes below
router.use(authMiddleware_1.authenticateToken);
/**
 * Get user profile
 * GET /api/users/profile
 */
router.get('/profile', async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({
                error: 'User not authenticated',
                code: 'NOT_AUTHENTICATED'
            });
        }
        const user = await userService_1.UserService.getUserById(userId);
        res.status(200).json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({
                error: error.message,
                code: 'USER_NOT_FOUND'
            });
        }
        else {
            res.status(500).json({
                error: 'Internal server error',
                code: 'INTERNAL_ERROR'
            });
        }
    }
});
/**
 * Update user profile
 * PUT /api/users/profile
 */
router.put('/profile', async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({
                error: 'User not authenticated',
                code: 'NOT_AUTHENTICATED'
            });
        }
        const updateData = req.body;
        const updatedUser = await userService_1.UserService.updateUserProfile(userId, updateData);
        res.status(200).json(updatedUser);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                error: error.message,
                code: 'UPDATE_ERROR'
            });
        }
        else {
            res.status(500).json({
                error: 'Internal server error',
                code: 'INTERNAL_ERROR'
            });
        }
    }
});
/**
 * Change password
 * PUT /api/users/change-password
 */
router.put('/change-password', async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({
                error: 'User not authenticated',
                code: 'NOT_AUTHENTICATED'
            });
        }
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                error: 'Current password and new password are required',
                code: 'MISSING_PASSWORDS'
            });
        }
        const result = await userService_1.UserService.changePassword(userId, currentPassword, newPassword);
        res.status(200).json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                error: error.message,
                code: 'PASSWORD_CHANGE_ERROR'
            });
        }
        else {
            res.status(500).json({
                error: 'Internal server error',
                code: 'INTERNAL_ERROR'
            });
        }
    }
});
/**
 * Get all users (admin only)
 * GET /api/users
 */
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = await userService_1.UserService.getAllUsers(page, limit);
        res.status(200).json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                error: error.message,
                code: 'FETCH_USERS_ERROR'
            });
        }
        else {
            res.status(500).json({
                error: 'Internal server error',
                code: 'INTERNAL_ERROR'
            });
        }
    }
});
/**
 * Get user by ID (admin only)
 * GET /api/users/:id
 */
router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userService_1.UserService.getUserById(userId);
        res.status(200).json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({
                error: error.message,
                code: 'USER_NOT_FOUND'
            });
        }
        else {
            res.status(500).json({
                error: 'Internal server error',
                code: 'INTERNAL_ERROR'
            });
        }
    }
});
/**
 * Delete user (admin only)
 * DELETE /api/users/:id
 */
router.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await userService_1.UserService.deleteUser(userId);
        res.status(200).json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({
                error: error.message,
                code: 'USER_NOT_FOUND'
            });
        }
        else {
            res.status(500).json({
                error: 'Internal server error',
                code: 'INTERNAL_ERROR'
            });
        }
    }
});
exports.default = router;
