"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const errorHandler_1 = require("../utils/errorHandler");
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new errorHandler_1.ValidationError('Username and password are required');
        }
        const user = await User_1.default.findOne({ username });
        if (!user) {
            throw new errorHandler_1.UnauthorizedError('Invalid username or password');
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new errorHandler_1.UnauthorizedError('Invalid username or password');
        }
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not configured');
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, username: user.username } });
    }
    catch (error) {
        console.error('Login error: ', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};
exports.login = login;
const logout = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Успешен изход"
        });
    }
    catch (error) {
        console.error('Logout error: ', error);
        res.status(500).json({
            success: false,
            error: "Грешка при изход"
        });
    }
};
exports.logout = logout;
