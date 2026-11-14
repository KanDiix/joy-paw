import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router';
import { Footer } from 'components/Layout/Footer/Footer';
import { Header } from 'components/Layout/Header/Header';

const MAIN_CONTENT_ID = 'main-content';

export const Layout = () => {
    const { t } = useTranslation();

    return (
        <div className="d-flex flex-column min-vh-100">
            <a href={`#${MAIN_CONTENT_ID}`} className="skip-link">
                {t('layout.skipToContent')}
            </a>
            <Header />
            <main id={MAIN_CONTENT_ID} tabIndex={-1} className="container-xl flex-grow-1 py-4">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
