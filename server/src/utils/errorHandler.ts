import { Response } from 'express';

export class AppError extends Error {
    public statusCode: number;
    public isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = 'Resource not found') {
        super(message, 404);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = 'Unauthorized access') {
        super(message, 401);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = 'Access forbidden') {
        super(message, 403);
    }
}

export const sendErrorResponse = (res: Response, error: any): void => {
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
        message = Object.values(error.errors).map((err: any) => err.message).join(', ');
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
        message = 'Token expired'
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

// Async error wrapper
export const catchAsync = (fn: Function) => {
    return (req: any, res: Response, next: any) => {
        Promise.resolve(fn(req, res, next)).catch((error) => {
            sendErrorResponse(res, error);
        });
    };
};