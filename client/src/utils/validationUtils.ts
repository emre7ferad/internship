export type ValidationRules = {
    [key: string]: {
        required?: boolean;
        pattern?: RegExp;
        minLength?: number;
        maxLength?: number;
        customValidator?: (value: string) => string | null;
        errorMessages: {
            required?: string;
            pattern?: string;
            minLength?: string;
            maxLength?: string;
            custom?: string;
        };
    };
};

export const getRegisterValidationRules = (t: (key: string) => string): ValidationRules => ({
    egn: {
        required: true,
        pattern: /^\d{10}$/,
        errorMessages: {
            required: t('egnEnter'),
            pattern: t('invalidEgn')
        }
    },
    fullNameCyrillic: {
        required: true,
        pattern: /^[\u0400-\u04FF\s]+$/,
        errorMessages: {
            required: t('nameCyrillicEnter'),
            pattern: t('invalidCyrillicName')
        }
    },
    fullNameLatin: {
        required: true,
        pattern: /^[A-Za-z\s]+$/,
        errorMessages: {
            required: t('nameLatinEnter'),
            pattern: t('invalidLatinName')
        }
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessages: {
            required: t('emailEnter'),
            pattern: t('invalidEmail')
        }
    },
    phone: {
        required: true,
        pattern: /^(?:\+359|0)\d{9}$/,
        errorMessages: {
            required: t('phoneEnter'),
            pattern: t('invalidPhone')
        }
    },
    address: {
        required: true,
        errorMessages: {
            required: t('addressEnter')
        }
    },
    username: {
        required: true,
        customValidator: (value) => /[\u0400-\u04FF]/.test(value) ? 'invalidUsername' : null,
        errorMessages: {
            required: t('usernameEnter'),
            pattern: t('invalidUsername')
        }
    },
    password: {
        required: true,
        minLength: 6,
        maxLength: 24,
        errorMessages: {
            required: t('passwordEnter'),
            minLength: t('passwordSecurityLength6'),
            maxLength: t('passwordSecurityLength24')
        }
    },
    confirmPassword: {
        required: true,
        errorMessages: {
            required: t('pleaseConfirmPassword'),
            custom: t('invalidConfirmPassword')
        }
    }
});

export const validateField = (
    fieldName: string,
    value: string,
    rules: ValidationRules,
    password?: string
): string | null => {
    const fieldRules = rules[fieldName];
    if(!fieldRules) return null;

    if (fieldRules.required && !value.trim()) {
        return fieldRules.errorMessages.required || null;
    }

    if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
        return fieldRules.errorMessages.pattern || null;
    }

    if (fieldRules.minLength && value.length < fieldRules.minLength) {
        return fieldRules.errorMessages.minLength || null;
    }

    if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
        return fieldRules.errorMessages.maxLength || null;
    }

    if (fieldRules.customValidator) {
        const customError = fieldRules.customValidator(value);
        if (customError) {
            return fieldRules.errorMessages.custom || null;
        }
    }

    if (fieldName === 'confirmPassword' && password && value !== password) {
        return fieldRules.errorMessages.custom || null;
    }

    return null;
};