import React from "react";
import { withTranslation, type WithTranslation } from "react-i18next";

type ErrorBoundaryProps = {
    children: React.ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
    error?: Error;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps & WithTranslation, ErrorBoundaryState> {
    
    constructor(props: ErrorBoundaryProps & WithTranslation) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo){
        console.error('Uncaught UI error:', error, info);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: undefined });
    };

    render() {
        const { t } = this.props

        if (this.state.hasError) {
            return (
                <div className="p-6 text-center">
                    <h2 className="text-xl font-semibold mb-2">{t('somethingWentWrong')}</h2>
                    <button
                        onClick={this.handleRetry}
                        className="px-4 py-2 bg-blue-800 text-white hover:bg-blue-700"
                    >
                        {t('retry')}
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default withTranslation('others')(ErrorBoundary);