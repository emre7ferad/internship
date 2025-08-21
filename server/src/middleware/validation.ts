import { Request, Response, NextFunction } from 'express';

interface ValidationError {
    field: string;
    message: string;
}

interface ValidationResult {
    isValid: boolean;
    errors: ValidationError[];
}

// Helper function to create validation result
const createValidationResult = (isValid: boolean, errors: ValidationError[]): ValidationResult => ({
    isValid,
    errors
});

//Validation functions

    //Login validation
export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const errors: ValidationError[] = [];

    //Username validation
    if (!username) {
        errors.push({ field: 'username', message: 'Username is required' });
    } else if (typeof username !== 'string') {
        errors.push({ field: 'username', message: 'Username must be a string' });
    }

    //Password validation
    if(!password) {
        errors.push({ field: 'password', message: 'Password is required'});
    } else if (password.length < 6 || password.length > 24) {
        errors.push({ field: 'password', message: 'Invalid password'});
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: errors
        });
    }

    next();
};

    //Register validation
export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    const { egn, nameCyrillic, nameLatin, email, phone, address, username, password, confirmPassword } = req.body;
    const errors: ValidationError[] = [];

    //EGN validation
    if (!egn) {
        errors.push({ field: 'egn', message: 'EGN is required' });
    } else if (typeof egn !== 'string') {
        errors.push({ field: 'egn', message: 'EGN must be a string' });
    } else if (!/^\d{10}$/.test(egn)) {
        errors.push({ field: 'egn', message: 'EGN must be exactly 10 digits'})
    }

    //Name in Cyrillic validation
    if (!nameCyrillic) {
        errors.push({ field: 'nameCyrillic', message: 'Name in Cyrillic is required' });
    } else if (typeof nameCyrillic !== 'string') {
        errors.push({ field: 'nameCyrillic', message: 'Name in Cyrillic must be a string' });
    } else if (nameCyrillic.trim().length < 2 || nameCyrillic.trim().length > 50) {
        errors.push({ field: 'nameCyrillic', message: 'Name in Cyrillic must be between 2 and 50 characters' });
    } else if (!/^[а-яА-Я\s]+$/.test(nameCyrillic)) {
        errors.push({ field: 'nameCyrillic', message: 'Name in Cyrillic must contain only cyrillic characters'})
    }

    //Name in Latin validation
    if (!nameLatin) {
        errors.push({ field: 'nameLatin', message: 'Name in Latin is required' })
    } else if (typeof nameLatin !== 'string') {
        errors.push({ field: 'nameLatin', message: 'Name in Latin must be a string' });
    } else if (nameLatin.trim().length < 2 || nameLatin.trim().length > 50) {
        errors.push({ field: 'nameLatin', message: 'Name in Latin must be between 2 and 50 characters' });
    } else if (!/^[a-zA-Z\s]+$/.test(nameLatin)) {
        errors.push({ field: 'nameLatin', message: 'Name in Latin must contain only latin characters'})
    }

    //Email validation
    if (!email) {
        errors.push({ field: 'email', message: 'Email is required' });
    } else if (typeof email !== 'string') {
        errors.push({ field: 'email', message: 'Email must be a string' });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push({ field: 'email', message: 'Invalid email format' });
    }

    //Phone validation
    if (!phone) {
        errors.push({ field: 'phone', message: 'Phone is required' });
    } else if (typeof phone !== 'string') {
        errors.push({ field: 'phone', message: 'Phone must be a string' });
    } else if (!/^[\d\s\-\+\(\)]+$/.test(phone)) {
        errors.push({ field: 'phone', message: 'Invalid phone number format' });
    } else if (phone.length < 8 || phone.length > 15) {
        errors.push({ field: 'phone', message: 'Phone number must be between 8 and 15 digits' });
    }

    //Address validation
    if (!address) {
        errors.push({ field: 'address', message: 'Address is required' });
    } else if (typeof address !== 'string') {
        errors.push({ field: 'address', message: 'Address must be a string' });
    } else if (address.trim().length < 5 || address.trim().length > 200) {
        errors.push({ field: 'address', message: 'Address must be between 5 and 200 characters' });
    }

    //Username validation
    if (!username) {
        errors.push({ field: 'username', message: 'Username is required' });
    } else if (typeof username !== 'string') {
        errors.push({ field: 'username', message: 'Username must be a string' });
    } else if (username.trim().length < 3 || username.trim().length > 20) {
        errors.push({ field: 'username', message: 'Username must be between 3 and 20 characters' });
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
        errors.push({ field: 'username', message: 'Username must contain only letters and numbers' });
    }

    //Password validation
    if (!password) {
        errors.push({ field: 'password', message: 'Password is required' });
    } else if (typeof password !== 'string') {
        errors.push({ field: 'password', message: 'Password must be a string' });
    } else if (password.trim().length < 6 || password.trim().length > 24) {
        errors.push({ field: 'password', message: 'Password must be between 6 and 24 characters' });
    } else {
        const hasLetter = /[A-Za-z]/.test(password);
        const hasDigit = /\d/.test(password);

        if (!hasLetter || !hasDigit) {
            errors.push({ field: 'password', message: 'Password must contain letters and numbers'})
        }
    }

    //Confirm password validation
    if (!confirmPassword) {
        errors.push({ field: 'confirmPassword', message: 'Password confirmation is required' });
    } else if (confirmPassword !== password) {
        errors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
    }

    // Check for errors

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: errors
        });
    }

    next();
};

// Account validation
export const validateAccount = (req: Request, res: Response, next: NextFunction) => {
    const { accountType, currency, balance, status } = req.body;
    const errors: ValidationError[] = [];

    //Account type validation
    if (!accountType) {
        errors.push({ field: 'accountType', message: 'Account type is required' });
    } else if (typeof accountType !== 'string') {
        errors.push({ field: 'accountType', message: 'Account type must be a string' });
    } else if (!['checking', 'savings', 'business', 'investment', 'credit'].includes(accountType.toLowerCase())) {
        errors.push({ field: 'accountType', message: 'Invalid account type' });
    }

    //Currency validation
    if (!currency) {
        errors.push({ field: 'currency', message: 'Currency is required' });
    } else if (typeof currency !== 'string') {
        errors.push({ field: 'currency', message: 'Currency must be a string' });
    } else if (!/^[A-Z]{3}$/.test(currency)) {
        errors.push({ field: 'currency', message: 'Invalid currency format' });
    }

    //Balance validation
    if (balance !== undefined) {
        if (typeof balance !== 'number') {
            errors.push({ field: 'balance', message: 'Balance must be a number' });
        }
    }

    //Status validation
    if (status !== undefined) {
        if (typeof status !== 'string') {
            errors.push({ field: 'status', message: 'Status must be a string' });
        } else if (!['active', 'inactive', 'suspended'].includes(status.toLowerCase())) {
            errors.push({ field: 'status', message: 'Invalid status' });
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: errors
        });
    }

    next();
};

export const validateAccountUpdate = (req: Request, res: Response, next: NextFunction) => {
    const { accountType, status } = req.body;
    const errors: ValidationError[] = [];

    //Account type validation
    if (accountType !== undefined) {
        if (typeof accountType !== 'string') {
            errors.push({ field: 'accountType', message: 'Account type must be a string' });
        } else if (!['checking', 'savings', 'business', 'investment', 'credit'].includes(accountType.toLowerCase())) {
            errors.push({ field: 'accountType', message: 'Invalid account type' });
        }
    }

    //Status validation
    if (status !== undefined) {
        if (typeof status !== 'string') {
            errors.push({ field: 'status', message: 'Status must be a string' });
        } else if (!['active', 'inactive', 'suspended'].includes(status.toLowerCase())) {
            errors.push({ field: 'status', message: 'Invalid status' });
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: errors
        });
    }

    next();
};

export const validateBalanceUpdate = (req: Request, res: Response, next: NextFunction) => {
    const { amount, type } = req.body;
    const errors: ValidationError[] = [];

    //Account type validation
    if (!amount) {
        errors.push({ field: 'amount', message: 'Amount is required' });
    } else if (typeof amount !== 'number') {
        errors.push({ field: 'amount', message: 'Amount must be a number' })
    }

    if (!type) {
        errors.push({ field: 'type', message: 'Type is required' });
    } else if (typeof type !== 'string') {
        errors.push({ field: 'type', message: 'Type must be a string' });
    } else if (!['deposit', 'withdrawal', 'transfer'].includes(type.toLowerCase())) {
        errors.push({ field: 'type', message: 'Invalid transaction type' });
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: errors
        });
    }

    next();
};

//Transaction validation
export const validateTransaction = (req: Request, res: Response, next: NextFunction) => {
    const { type, amount, currency, description } = req.body;
    const errors: ValidationError[] = [];

    //Type validation
    if (!type) {
        errors.push({ field: 'type', message: 'Transaction type is required' });
    } else if (typeof type !== 'string') {
        errors.push({ field: 'type', message: 'Transaction type must be a string' });
    } else if (!['deposit', 'withdrawal', 'transfer'].includes(type.toLowerCase())) {
        errors.push({ field: 'type', message: 'Invalid transaction type' });
    }

    //Amount validation
    if (!amount) {
        errors.push({ field: 'amount', message: 'Amount is required' });
    } else if (typeof amount !== 'number') {
        errors.push({ field: 'amount', message: 'Amount must be a number' });
    } else if (amount <0) {
        errors.push({ field: 'amount', message: 'Amount cannot be negative' });
    }

    //Currency validation
    if (!currency) {
        errors.push({ field: 'currency', message: 'Currency is required' });
    } else if (typeof currency !== 'string') {
        errors.push({ field: 'currency', message: 'Currency must be a string' });
    } else if (!/^[A-Z]{3}$/.test(currency)) {
        errors.push({ field: 'currency', message: 'Invalid currency format' });
    }

    //Description validation
    if (!description) {
        errors.push({ field: 'description', message: 'Description is required' });
    } else if (typeof description !== 'string') {
        errors.push({ field: 'description', message: 'Description must be a string' });
    } else if (description.trim().length <3 || description.trim().length > 300) {
        errors.push({ field: 'description', message: 'Description must be between 3 and 300 characters' });
    }

    if (errors.length >0) {
        return res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: errors
        });
    }

    next();
};

//Transaction update validation
export const validateTransactionUpdate = (req: Request, res: Response, next: NextFunction) => {
    const { type, amount, currency, description } = req.body;
    const errors: ValidationError[] = [];

    //Type validation
    if (type !== undefined) {
        if (typeof type !== 'string') {
            errors.push({ field: 'type', message: 'Transaction type must be a string' });
        } else if (!['deposit', 'withdrawal', 'transfer'].includes(type.toLowerCase())) {
            errors.push({ field: 'type', message: 'Invalid transaction type' });
        }
    }

    //Amount validation
    if (amount !== undefined) {
        if (typeof amount !== 'number') {
            errors.push({ field: 'amount', message: 'Amount must be a number' });
        } else if (amount < 0) {
            errors.push({ field: 'amount', message: 'Amount cannot be negative' });
        }
    }

    //Currency validation
    if (currency !== undefined) {
        if (typeof currency !== 'string') {
            errors.push({ field: 'currency', message: 'Currency must be a string' });
        } else if (!/^[A-Z]{3}$/.test(currency)) {
            errors.push({ field: 'currency', message: 'Invalid currency format' });
        }
    }

    //Description validation
    if (description !== undefined) {
        if (typeof description !== 'string') {
            errors.push({ field: 'description', message: 'Description must be a string' });
        } else if (description.trim().length <3 || description.trim().length > 300) {
            errors.push({ field: 'description', message: 'Description must be between 3 and 300 characters' });
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: errors
        });
    }

    next();
};