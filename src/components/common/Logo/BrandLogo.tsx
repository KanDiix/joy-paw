import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { PawMark } from 'components/common/Logo/PawMark';
import { RoutePaths } from 'routes/RoutePaths';

type BrandLogoProps = {
    onClick?: () => void;
};

/** Mark + wordmark, linking back to the home page. */
export const BrandLogo = ({ onClick }: BrandLogoProps) => {
    const { t } = useTranslation();

    return (
        <Link to={RoutePaths.home()} className="brand-logo" aria-label={t('layout.homeLink')} onClick={onClick}>
            <PawMark className="brand-logo__mark" />
            <span className="brand-logo__wordmark" aria-hidden="true">
                Joy<span className="brand-logo__accent">Paw</span>
            </span>
        </Link>
    );
};
