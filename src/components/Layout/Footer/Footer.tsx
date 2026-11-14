import { type ReactNode, useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { ArrowIcon } from 'components/common/ArrowIcon/ArrowIcon';
import { BrandLogo } from 'components/common/Logo/BrandLogo';
import { PawMark } from 'components/common/Logo/PawMark';
import { HomeSections, RoutePaths } from 'routes/RoutePaths';

type FooterLink = {
    label: string;
    to: string;
};

type FooterColumnProps = {
    title: string;
    links: FooterLink[];
    footnote?: ReactNode;
};

const FooterColumn = ({ title, links, footnote }: FooterColumnProps) => {
    const headingId = useId();

    return (
        <nav aria-labelledby={headingId}>
            <h2 id={headingId} className="site-footer__heading">
                {title}
            </h2>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                {links.map(({ label, to }) => (
                    <li key={label}>
                        <Link to={to} className="site-footer__link">
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
            {footnote}
        </nav>
    );
};

export const Footer = () => {
    const { t } = useTranslation();
    const waitlistTitleId = useId();
    const professionalsPath = RoutePaths.homeSection(HomeSections.professionals);

    return (
        <footer className="site-footer">
            <div className="container-xl">
                <section className="waitlist-card" aria-labelledby={waitlistTitleId}>
                    <PawMark className="waitlist-card__watermark" hasTile={false} />
                    <div className="row align-items-center g-4 position-relative">
                        <div className="col-lg-8">
                            <h2 id={waitlistTitleId} className="waitlist-card__title">
                                {t('layout.footer.waitlist.title')}
                            </h2>
                            <p className="waitlist-card__text mb-0">{t('layout.footer.waitlist.text')}</p>
                        </div>
                        <div className="col-lg-4 text-lg-end">
                            <Link to={RoutePaths.homeSection(HomeSections.waitlist)} className="btn btn-joy-gold btn-lg">
                                {t('layout.notifyMe')}
                                <ArrowIcon />
                            </Link>
                        </div>
                    </div>
                </section>

                <div className="row gy-5 gx-4 site-footer__columns">
                    <div className="col-12 col-lg-4">
                        <BrandLogo />
                        <p className="site-footer__description mt-3 mb-0">{t('layout.footer.description')}</p>
                    </div>
                    <div className="col-6 col-md-4 col-lg-2 offset-lg-1">
                        <FooterColumn
                            title={t('layout.footer.discover.title')}
                            links={[
                                { label: t('layout.footer.discover.about'), to: RoutePaths.about() },
                                { label: t('layout.footer.discover.vision'), to: RoutePaths.homeSection(HomeSections.vision) },
                                { label: t('layout.footer.discover.howItWorks'), to: RoutePaths.homeSection(HomeSections.howItWorks) },
                                { label: t('layout.footer.discover.resources'), to: RoutePaths.homeSection(HomeSections.resources) },
                            ]}
                        />
                    </div>
                    <div className="col-6 col-md-4 col-lg-3">
                        <FooterColumn
                            title={t('layout.footer.professionals.title')}
                            links={[
                                { label: t('layout.footer.professionals.trainers'), to: professionalsPath },
                                { label: t('layout.footer.professionals.behaviourists'), to: professionalsPath },
                                { label: t('layout.footer.professionals.groomers'), to: professionalsPath },
                                { label: t('layout.footer.professionals.osteopaths'), to: professionalsPath },
                            ]}
                            footnote={<p className="badge-soon mt-3 mb-0">{t('layout.footer.professionals.moreSoon')}</p>}
                        />
                    </div>
                    <div className="col-6 col-md-4 col-lg-2">
                        <FooterColumn
                            title={t('layout.footer.legal.title')}
                            links={[
                                { label: t('layout.footer.legal.contact'), to: RoutePaths.homeSection(HomeSections.contact) },
                                { label: t('layout.footer.legal.legalNotice'), to: RoutePaths.homeSection(HomeSections.legalNotice) },
                                { label: t('layout.footer.legal.privacy'), to: RoutePaths.homeSection(HomeSections.privacy) },
                            ]}
                        />
                    </div>
                </div>

                <div className="site-footer__bottom d-flex flex-column flex-sm-row justify-content-between gap-2">
                    <p className="mb-0">{t('layout.footer.copyright')}</p>
                    <p className="site-footer__tribute mb-0">
                        {t('layout.footer.tribute')} <span aria-hidden="true">🐾</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};
