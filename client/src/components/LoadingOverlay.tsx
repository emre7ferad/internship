import type React from "react";
import { useLoading } from "../context/LoadingContext";

const LoadingOverlay: React.FC = () => {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-white/50 flex items-center justify-center">
            <div className="flex items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-800 border-b-transparent"></div>
                <span className="ml-3 text-gray-700 font-medium">Loading...</span>
            </div>
        </div>
    );
};

export default LoadingOverlay;