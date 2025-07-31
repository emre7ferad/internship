import { useState } from "react";
import { getRegisterValidationRules, validateField } from "../utils/validationUtils";

export const useForm = (initialState: any, t: (key: string) => string) => {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [password, setPassword] = useState('');

    const validationRules = getRegisterValidationRules(t);

    const handleChange = (fieldName: string, value: string) => {
        setFormData((prev: any) => ({ ...prev, [fieldName]: value}));

        if (fieldName === 'password') {
            setPassword(value);
        }

        const error = validateField(
            fieldName,
            value,
            validationRules,
            fieldName === 'confirmPassword' ? password: undefined
        );

        setErrors((prev) => ({
            ...prev,
            [fieldName]: error || ''
        }));
    };

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        Object.keys(formData).forEach((fieldName) => {
            const error = validateField(
                fieldName,
                formData[fieldName],
                validationRules,
                password
            );
            if (error) {
                newErrors[fieldName] = error;
            }
        });

        if (formData.confirmPassword !== password) {
            newErrors.confirmPassword = t('invalidPasswordConfirm');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return { formData, errors, handleChange, validateForm, setFormData };
};