import { useTranslation } from 'react-i18next';
import { PageHeader } from 'components/common/PageHeader/PageHeader';

export const HomePage = () => {
    const { t } = useTranslation('home');

    return <PageHeader title={t('title')} subtitle={t('subtitle')} />;
};
