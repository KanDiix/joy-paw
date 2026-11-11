import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import { LanguageSwitcher } from 'components/Layout/LanguageSwitcher';
import { RoutePaths } from 'routes/RoutePaths';

const navLinkClassName = ({ isActive }: { isActive: boolean }) => classNames('nav-link', { active: isActive });

export const Header = () => {
    const { t } = useTranslation();

    return (
        <header className="navbar navbar-expand bg-body-tertiary border-bottom">
            <nav className="container-xl" aria-label={t('layout.mainNavigation')}>
                <NavLink to={RoutePaths.home()} className="navbar-brand fw-semibold">
                    {t('layout.appName')}
                </NavLink>
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <NavLink to={RoutePaths.home()} className={navLinkClassName} end>
                            {t('layout.nav.home')}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={RoutePaths.about()} className={navLinkClassName}>
                            {t('layout.nav.about')}
                        </NavLink>
                    </li>
                </ul>
                <LanguageSwitcher />
            </nav>
        </header>
    );
};
