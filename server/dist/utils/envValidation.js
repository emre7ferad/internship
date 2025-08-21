"use strict";
/**
 * Environment Variable Validation
 * Validates all required environment variables on application startup
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.logEnvironmentConfig = exports.getEnvConfig = exports.validateEnvironment = void 0;
// Required environment variables for different environments
const requiredEnvVars = {
    development: ['MONGODB_URI', 'JWT_SECRET', 'CLIENT_URL'],
    production: ['MONGODB_URI', 'JWT_SECRET', 'CLIENT_URL'],
    test: ['MONGODB_URI', 'JWT_SECRET']
};
// Validate environment variables
const validateEnvironment = () => {
    const nodeEnv = process.env.NODE_ENV || 'development';
    const required = requiredEnvVars[nodeEnv] || requiredEnvVars.development;
    const missingVars = [];
    // Check for missing required variables
    for (const varName of required) {
        if (!process.env[varName]) {
            missingVars.push(varName);
        }
    }
    if (missingVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingVars.join(', ')}\n` +
            `Please check your .env file and ensure all required variables are set.`);
    }
    // Validate specific variables
    const config = {
        NODE_ENV: nodeEnv,
        PORT: parseInt(process.env.PORT || '5000', 10),
        MONGODB_URI: process.env.MONGODB_URI,
        JWT_SECRET: process.env.JWT_SECRET,
        CLIENT_URL: process.env.CLIENT_URL,
    };
    // Optional Cloudinary variables
    if (process.env.CLOUDINARY_CLOUD_NAME) {
        config.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
        config.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
        config.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
        // If one Cloudinary var is set, all should be set
        if (!config.CLOUDINARY_API_KEY || !config.CLOUDINARY_API_SECRET) {
            throw new Error('If CLOUDINARY_CLOUD_NAME is set, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET must also be set.');
        }
    }
    // Validate PORT
    if (isNaN(config.PORT) || config.PORT < 1 || config.PORT > 65535) {
        throw new Error('PORT must be a valid number between 1 and 65535');
    }
    // Validate MongoDB URI
    if (!config.MONGODB_URI.startsWith('mongodb://') && !config.MONGODB_URI.startsWith('mongodb+srv://')) {
        throw new Error('MONGODB_URI must be a valid MongoDB connection string');
    }
    // Validate CLIENT_URL
    try {
        new URL(config.CLIENT_URL);
    }
    catch {
        throw new Error('CLIENT_URL must be a valid URL');
    }
    return config;
};
exports.validateEnvironment = validateEnvironment;
// Get validated environment configuration
const getEnvConfig = () => {
    try {
        return (0, exports.validateEnvironment)();
    }
    catch (error) {
        console.error('Environment validation failed:', error);
        process.exit(1);
    }
};
exports.getEnvConfig = getEnvConfig;
// Log environment configuration (without sensitive data)
const logEnvironmentConfig = (config) => {
    console.log('Environment Configuration:');
    console.log(`  NODE_ENV: ${config.NODE_ENV}`);
    console.log(`  PORT: ${config.PORT}`);
    console.log(`  MONGODB_URI: ${config.MONGODB_URI.substring(0, 20)}...`);
    console.log(`  CLIENT_URL: ${config.CLIENT_URL}`);
    console.log(`  JWT_SECRET: ${config.JWT_SECRET ? '[SET]' : '[NOT SET]'}`);
    console.log(`  Cloudinary: ${config.CLOUDINARY_CLOUD_NAME ? '[CONFIGURED]' : '[NOT CONFIGURED]'}`);
};
exports.logEnvironmentConfig = logEnvironmentConfig;
