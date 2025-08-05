"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenExpiration = exports.isTokenExpired = exports.verifyToken = exports.generateToken = exports.getJWTSecret = exports.validateJWTSecret = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Validate JWT secret on startup
const validateJWTSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET environment variable is not set. Please check your .env file.');
    }
    if (secret.length < 32) {
        throw new Error('JWT_SECRET must be at least 32 characters long for security.');
    }
    if (secret === 'your-secret-key' || secret === 'default-secret') {
        throw new Error('JWT_SECRET is using a default value. Please set a secure secret.');
    }
    return secret;
};
exports.validateJWTSecret = validateJWTSecret;
// Get JWT secret with validation
const getJWTSecret = () => {
    try {
        return (0, exports.validateJWTSecret)();
    }
    catch (error) {
        console.error('JWT Secret validation failed:', error);
        process.exit(1); // Exit if JWT secret is not properly configured
    }
};
exports.getJWTSecret = getJWTSecret;
// JWT token generation with proper typing
const generateToken = (payload) => {
    const secret = (0, exports.getJWTSecret)();
    return jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn: '8h',
        issuer: 'fibank-api',
        audience: 'fibank-client'
    });
};
exports.generateToken = generateToken;
// JWT token verification with proper typing
const verifyToken = (token) => {
    const secret = (0, exports.getJWTSecret)();
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret, {
            issuer: 'fibank-api',
            audience: 'fibank-client'
        });
        return decoded;
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            throw new Error('Token has expired');
        }
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            throw new Error('Invalid token');
        }
        else {
            throw new Error('Token verification failed');
        }
    }
};
exports.verifyToken = verifyToken;
// Check if token is expired
const isTokenExpired = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.decode(token);
        if (!decoded || !decoded.exp)
            return true;
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
    }
    catch {
        return true;
    }
};
exports.isTokenExpired = isTokenExpired;
// Get token expiration time
const getTokenExpiration = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.decode(token);
        if (!decoded || !decoded.exp)
            return null;
        return new Date(decoded.exp * 1000);
    }
    catch {
        return null;
    }
};
exports.getTokenExpiration = getTokenExpiration;
