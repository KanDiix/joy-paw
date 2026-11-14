import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from 'components/Layout/Header/Header';
import { renderWrapped } from 'test/utils';

const setScrollY = (value: number) => {
    Object.defineProperty(window, 'scrollY', { value, configurable: true });
    act(() => {
        window.dispatchEvent(new Event('scroll'));
    });
};

describe('Header', () => {
    afterEach(() => {
        setScrollY(0);
    });

    it('links the logo, the navigation and the launch call to action', () => {
        renderWrapped(<Header />);

        expect(screen.getByRole('link', { name: 'JoyPaw, home' }).getAttribute('href')).toBe('/');
        expect(screen.getByRole('link', { name: 'Pet owners' }).getAttribute('href')).toBe('/#owners');
        expect(screen.getByRole('link', { name: 'Get notified at launch' }).getAttribute('href')).toBe('/#waitlist');
    });

    it('opens the mobile drawer and closes it with its close button', async () => {
        renderWrapped(<Header />);
        const toggle = screen.getByRole('button', { name: 'Open menu' });
        expect(toggle.getAttribute('aria-expanded')).toBe('false');

        await userEvent.click(toggle);
        const drawer = screen.getByRole('dialog', { name: 'Menu' });
        expect(drawer.hasAttribute('open')).toBe(true);
        expect(toggle.getAttribute('aria-expanded')).toBe('true');

        await userEvent.click(screen.getByRole('button', { name: 'Close menu' }));
        expect(drawer.hasAttribute('open')).toBe(false);
        expect(toggle.getAttribute('aria-expanded')).toBe('false');
    });

    it('closes the mobile drawer when a link is followed', async () => {
        renderWrapped(<Header />);
        await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));
        const drawer = screen.getByRole('dialog', { name: 'Menu' });

        const drawerLink = drawer.querySelector('a[href="/#professionals"]');
        expect(drawerLink).not.toBeNull();
        await userEvent.click(drawerLink as HTMLAnchorElement);
        expect(drawer.hasAttribute('open')).toBe(false);
    });

    it('switches to its scrolled style once the page scrolls', () => {
        renderWrapped(<Header />);
        const header = screen.getByRole('banner');
        expect(header.classList.contains('is-scrolled')).toBe(false);

        setScrollY(120);
        expect(header.classList.contains('is-scrolled')).toBe(true);
    });
});
