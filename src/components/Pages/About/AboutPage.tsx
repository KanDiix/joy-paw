import { useTranslation } from 'react-i18next';
import { PageHeader } from 'components/common/PageHeader/PageHeader';

export const AboutPage = () => {
    const { t } = useTranslation('about');

    return <>
        <PageHeader title={t('title')} />
        <p>{t('description')}</p>
    </>;
};
