import { restoreRedirectedPath } from 'routes/restoreRedirectedPath';

const currentUrl = () => `${window.location.pathname}${window.location.search}${window.location.hash}`;

describe('restoreRedirectedPath', () => {
    afterEach(() => {
        window.history.replaceState(null, '', '/');
    });

    it('restores the path carried by the redirect parameter under the basename', () => {
        window.history.replaceState(null, '', `/le-fun/dev/?redirect=${encodeURIComponent('/about?tab=1#team')}`);

        restoreRedirectedPath('/le-fun/dev/');

        expect(currentUrl()).toBe('/le-fun/dev/about?tab=1#team');
    });

    it('works with the root basename', () => {
        window.history.replaceState(null, '', `/?redirect=${encodeURIComponent('/about')}`);

        restoreRedirectedPath('/');

        expect(currentUrl()).toBe('/about');
    });

    it('leaves the URL alone without a redirect parameter', () => {
        window.history.replaceState(null, '', '/le-fun/?lang=fr');

        restoreRedirectedPath('/le-fun/');

        expect(currentUrl()).toBe('/le-fun/?lang=fr');
    });

    it.each(['about', '//evil.example/about'])('ignores a redirect that is not an app path (%s)', redirect => {
        const url = `/le-fun/?redirect=${encodeURIComponent(redirect)}`;
        window.history.replaceState(null, '', url);

        restoreRedirectedPath('/le-fun/');

        expect(currentUrl()).toBe(url);
    });
});
