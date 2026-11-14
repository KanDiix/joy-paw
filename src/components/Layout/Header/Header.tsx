import classNames from 'classnames';
import { type CSSProperties, type MouseEvent, useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { ArrowIcon } from 'components/common/ArrowIcon/ArrowIcon';
import { BrandLogo } from 'components/common/Logo/BrandLogo';
import { LanguageSwitcher } from 'components/common/LanguageSwitcher/LanguageSwitcher';
import { useHasScrolled } from 'components/Layout/Header/useHasScrolled';
import { HomeSections, RoutePaths } from 'routes/RoutePaths';

/** Must match the `xl` breakpoint of the `d-xl-*` classes below. */
const DESKTOP_MEDIA_QUERY = '(min-width: 1200px)';

const NAV_ITEMS = [
    { key: 'discover', section: HomeSections.discover },
    { key: 'owners', section: HomeSections.owners },
    { key: 'professionals', section: HomeSections.professionals },
    { key: 'resources', section: HomeSections.resources },
] as const;

export const Header = () => {
    const { t } = useTranslation();
    const hasScrolled = useHasScrolled();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const drawerId = useId();

    const handleOpenMenu = () => {
        dialogRef.current?.showModal();
        setIsMenuOpen(true);
    };
    // Every way of closing (button, link, Escape, backdrop) goes through the dialog, whose `close` event syncs the state.
    const handleCloseMenu = () => dialogRef.current?.close();
    const handleDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
        // The dialog spans the viewport: only clicks outside the panel land on it directly.
        if (event.target === event.currentTarget) {
            handleCloseMenu();
        }
    };

    // The drawer has no place on desktop: close it if the viewport grows past the breakpoint.
    useEffect(() => {
        if (!isMenuOpen) {
            return;
        }
        const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
        const handleChange = (event: MediaQueryListEvent) => {
            if (event.matches) {
                dialogRef.current?.close();
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [isMenuOpen]);

    return (
        <header className={classNames('site-header', { 'is-scrolled': hasScrolled })}>
            <div className="container-xl site-header__bar d-flex align-items-center gap-3">
                <BrandLogo />

                <nav className="d-none d-xl-block mx-auto" aria-label={t('layout.mainNavigation')}>
                    <ul className="list-unstyled d-flex align-items-center gap-1 mb-0">
                        {NAV_ITEMS.map(({ key, section }) => (
                            <li key={key}>
                                <Link to={RoutePaths.homeSection(section)} className="site-nav__link">
                                    {t(`layout.nav.${key}`)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="d-flex align-items-center gap-2 ms-auto ms-xl-0">
                    <div className="d-none d-xl-block">
                        <LanguageSwitcher />
                    </div>
                    {/* No auth yet: until it exists, signing in leads to the waitlist. */}
                    <Link to={RoutePaths.homeSection(HomeSections.waitlist)} className="btn btn-joy-ghost d-none d-xl-inline-flex">
                        {t('layout.signIn')}
                    </Link>
                    <Link to={RoutePaths.homeSection(HomeSections.waitlist)} className="btn btn-joy d-none d-md-inline-flex">
                        {t('layout.notifyMe')}
                        <ArrowIcon />
                    </Link>
                    <button
                        type="button"
                        className="menu-toggle d-xl-none"
                        aria-label={t('layout.menu.open')}
                        aria-expanded={isMenuOpen}
                        aria-controls={drawerId}
                        onClick={handleOpenMenu}
                    >
                        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
                            <path d="M4 7h16M4 12h16M4 17h10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Native modal dialog: focus trap, Escape, inert page and focus return come from the browser. */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- backdrop click is a pointer shortcut; Escape and the close button cover the keyboard. */}
            <dialog
                ref={dialogRef}
                id={drawerId}
                className="menu-drawer"
                aria-label={t('layout.menu.label')}
                onClose={() => setIsMenuOpen(false)}
                onClick={handleDialogClick}
            >
                <div className="menu-drawer__panel">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <BrandLogo onClick={handleCloseMenu} />
                        <button type="button" className="menu-toggle" aria-label={t('layout.menu.close')} onClick={handleCloseMenu}>
                            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
                                <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>

                    <nav aria-label={t('layout.mainNavigation')}>
                        <ul className="list-unstyled d-flex flex-column gap-1 mb-0">
                            {NAV_ITEMS.map(({ key, section }, index) => (
                                <li key={key} className="menu-drawer__item" style={{ '--item-index': index } as CSSProperties}>
                                    <Link to={RoutePaths.homeSection(section)} className="menu-drawer__link" onClick={handleCloseMenu}>
                                        {t(`layout.nav.${key}`)}
                                        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
                                            <path
                                                d="m6 3.5 4.5 4.5L6 12.5"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="mt-auto pt-4 d-flex flex-column gap-3">
                        <LanguageSwitcher />
                        <Link to={RoutePaths.homeSection(HomeSections.waitlist)} className="btn btn-joy-outline btn-lg" onClick={handleCloseMenu}>
                            {t('layout.signIn')}
                        </Link>
                        <Link to={RoutePaths.homeSection(HomeSections.waitlist)} className="btn btn-joy btn-lg" onClick={handleCloseMenu}>
                            {t('layout.notifyMe')}
                            <ArrowIcon />
                        </Link>
                    </div>
                </div>
            </dialog>
        </header>
    );
};
