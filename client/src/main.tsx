  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import { BrowserRouter } from 'react-router-dom';
  import App from './App.tsx';
  import './index.css';
  import { AuthProvider } from './context/AuthContext.tsx';
  import './i18n';
  import ErrorBoundary from './components/ErrorBoundary.tsx';
  import { ErrorProvider } from './context/ErrorContext.tsx';
  import ErrorToaster from './components/ErrorToaster.tsx';
  import { LoadingProvider } from './context/LoadingContext.tsx';
  import LoadingOverlay from './components/LoadingOverlay.tsx';

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <LoadingProvider>
        <ErrorProvider>
          <ErrorBoundary>
            <BrowserRouter>
              <AuthProvider>
                <App />
                <ErrorToaster />
              </AuthProvider>
            </BrowserRouter>
          </ErrorBoundary>
        </ErrorProvider>
        <LoadingOverlay />
      </LoadingProvider>
    </React.StrictMode>
  );