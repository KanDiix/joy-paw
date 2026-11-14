/** Route patterns, used only by `AppRoutes`. Links are built with `RoutePaths` below. */
export const RoutePatterns = {
    home: '/',
    about: '/about',
    notFound: '*',
} as const;

/**
 * Anchors of the landing page sections, targeted by the header and footer links.
 * The sections themselves are not built yet: each anchor must match the `id` of its section once it exists.
 */
export const HomeSections = {
    discover: 'discover',
    vision: 'vision',
    howItWorks: 'how-it-works',
    owners: 'owners',
    professionals: 'professionals',
    resources: 'resources',
    waitlist: 'waitlist',
    contact: 'contact',
    legalNotice: 'legal-notice',
    privacy: 'privacy',
} as const;

export type HomeSection = (typeof HomeSections)[keyof typeof HomeSections];

/**
 * Never hardcode an internal URL — build it here.
 * Parameterised routes go through `generatePath` from `react-router`.
 */
export const RoutePaths = {
    home: () => RoutePatterns.home,
    homeSection: (section: HomeSection) => `${RoutePatterns.home}#${section}`,
    about: () => RoutePatterns.about,
};
