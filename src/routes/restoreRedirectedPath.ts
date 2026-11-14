/** Query parameter set by the GitHub Pages `404.html` (see `.github/pages/404.html`). */
export const REDIRECT_PARAM = 'redirect';

/**
 * GitHub Pages has no SPA fallback: a deep link such as `/about` hits its `404.html`,
 * which sends the browser back to the app root with the requested path in `?redirect=`.
 * This puts that path back in the address bar before the router reads it.
 */
export const restoreRedirectedPath = (basename: string = import.meta.env.BASE_URL) => {
    const redirect = new URLSearchParams(window.location.search).get(REDIRECT_PARAM);
    // Must stay an app path: `//host` would be a protocol-relative URL.
    if (redirect === null || !redirect.startsWith('/') || redirect.startsWith('//')) {
        return;
    }
    window.history.replaceState(null, '', `${basename.replace(/\/$/, '')}${redirect}`);
};
