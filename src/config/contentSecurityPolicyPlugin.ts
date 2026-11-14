import type { Plugin } from 'vite';

/**
 * Content Security Policy: the browser only runs scripts and applies styles served by the site itself,
 * so an injected `<script>`, inline event handler or `javascript:` URL is refused.
 * Add a source here when the app starts using one (e.g. the API origin in `connect-src`).
 */
export const CONTENT_SECURITY_POLICY = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self'",
    // `data:` for the SVG icons embedded in Bootstrap's CSS.
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "manifest-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
].join('; ');

/**
 * Adds the policy as a `<meta>` tag, because GitHub Pages cannot send HTTP headers.
 * Build only: the dev server relies on inline scripts (React Refresh) and inline styles (CSS HMR).
 * A `<meta>` policy cannot set `frame-ancestors`; that one needs a host that sends headers.
 */
export const contentSecurityPolicyPlugin = (): Plugin => ({
    name: 'content-security-policy',
    apply: 'build',
    transformIndexHtml: () => [
        { tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: CONTENT_SECURITY_POLICY }, injectTo: 'head-prepend' },
    ],
});
