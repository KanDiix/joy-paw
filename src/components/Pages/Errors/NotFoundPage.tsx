import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { RoutePaths } from 'routes/RoutePaths';

export const NotFoundPage = () => {
    const { t } = useTranslation('errors');
    return (
        <div className="text-center py-5">
            <h1 className="h3">{t('notFound.title')}</h1>
            <p className="text-secondary">{t('notFound.message')}</p>
            <Link to={RoutePaths.home()} className="btn btn-outline-primary">
                {t('backHome')}
            </Link>
        </div>
    );
};
