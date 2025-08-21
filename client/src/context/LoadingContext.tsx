import React, { createContext, useContext, useEffect, useState } from "react";
import { loadingBus } from "../hooks/loadingBus";

type LoadingContextType = {
    isLoading: boolean;
    count: number;
    start: () => void;
    stop: () => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const unsubscribe = loadingBus.subscribe(setCount);
        return () => { unsubscribe(); };
    }, []);

    const value: LoadingContextType = {
        isLoading: count > 0,
        count,
        start: () => loadingBus.start(),
        stop: () => loadingBus.stop()
    };

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const ctx = useContext(LoadingContext);
    if (!ctx) throw new Error('useLoading must be used within a LoadingProvider');
    return ctx;
};