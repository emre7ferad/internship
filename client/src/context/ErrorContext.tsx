import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { errorBus, type ErrorPayload } from '../hooks/errorBus';

export type UiError = {
    id: string;
    message: string;
    detail?: string;
    status?: number;
    url?: string;
};

type ErrorContextType = {
    errors: UiError[];
    addError: (message: string, detail?: string) => void;
    removeError: (id: string) => void;
    clear: () => void;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [errors, setErrors] = useState<UiError[]>([]);

    const addError = (message: string, detail?: string) => {
        const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
        setErrors(prev => [...prev, { id, message, detail }]);
    };

    const removeError = (id: string) => setErrors (prev => prev.filter(e => e.id !== id));
    const clear = () => setErrors([]);

    useEffect(() => {
        const unsubscribe = errorBus.subscribe((p: ErrorPayload) => {
            addError(p.message, p.detail ?? (p.status ? `${p.status} ${p.url ?? ''}`.trim() : undefined));
        });
        return () => { unsubscribe(); };
    }, []);

    const value = useMemo(() => ({ errors, addError, removeError, clear }), [errors]);
    return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>;
}

export const useError = () => {
    const ctx = useContext(ErrorContext);
    if (!ctx) throw new Error('useError must be used within an ErrorProvider');
    return ctx;
};