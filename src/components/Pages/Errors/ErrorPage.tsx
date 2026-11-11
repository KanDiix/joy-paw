import { useTranslation } from 'react-i18next';

type ErrorPageProps = {
    onRetry?: () => void;
};

export const ErrorPage = ({ onRetry }: ErrorPageProps) => {
    const { t } = useTranslation('errors');
    return (
        <div className="text-center py-5" role="alert">
            <h1 className="h3">{t('generic.title')}</h1>
            <p className="text-secondary">{t('generic.message')}</p>
            {onRetry !== undefined && (
                <button type="button" className="btn btn-primary" onClick={onRetry}>
                    {t('generic.retry')}
                </button>
            )}
        </div>
    );
};
