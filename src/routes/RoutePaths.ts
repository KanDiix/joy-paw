/** Route patterns, used only by `AppRoutes`. Links are built with `RoutePaths` below. */
export const RoutePatterns = {
    home: '/',
    about: '/about',
    notFound: '*',
} as const;

/**
 * Never hardcode an internal URL — build it here.
 * Parameterised routes go through `generatePath` from `react-router`.
 */
export const RoutePaths = {
    home: () => RoutePatterns.home,
    about: () => RoutePatterns.about,
};
