"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = exports.sendErrorResponse = exports.ForbiddenError = exports.UnauthorizedError = exports.NotFoundError = exports.ValidationError = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
class ValidationError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}
exports.ValidationError = ValidationError;
class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized access') {
        super(message, 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends AppError {
    constructor(message = 'Access forbidden') {
        super(message, 403);
    }
}
exports.ForbiddenError = ForbiddenError;
const sendErrorResponse = (res, error) => {
    let statusCode = 500;
    let message = 'Internal server error';
    // Handle custom AppError instances
    if (error instanceof AppError) {
        statusCode = error.statusCode;
        message = error.message;
    }
    // Handle Mongoose validation errors
    else if (error.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(error.errors).map((err) => err.message).join(', ');
    }
    //Handle invalid ObjectId errors
    else if (error.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid ID format';
    }
    // Handle duplicate key errors
    else if (error.code === 11000) {
        statusCode = 400;
        const field = Object.keys(error.keyValue)[0];
        message = `${field} already exists`;
    }
    // Handle JWT errors
    else if (error.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Token expired';
    }
    //Handle other errors
    else if (error.message) {
        message = error.message;
    }
    //Log error for debugging
    console.error('Error: ', {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
    });
    res.status(statusCode).json({
        success: false,
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
};
exports.sendErrorResponse = sendErrorResponse;
// Async error wrapper
const catchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((error) => {
            (0, exports.sendErrorResponse)(res, error);
        });
    };
};
exports.catchAsync = catchAsync;
