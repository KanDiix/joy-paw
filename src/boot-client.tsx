import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { ErrorBoundary } from 'components/common/ErrorBoundary';
import { initI18n } from 'config/i18n/i18n';
import { AppRoutes } from 'routes/AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'css/main.scss';

const boot = async () => {
    await initI18n();

    const container = document.getElementById('root');
    if (container === null) {
        throw new Error('Missing #root element in index.html');
    }

    createRoot(container).render(
        <StrictMode>
            <ErrorBoundary>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </ErrorBoundary>
        </StrictMode>,
    );
};

void boot();
