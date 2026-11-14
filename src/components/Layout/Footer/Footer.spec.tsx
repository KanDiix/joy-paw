import { screen, within } from '@testing-library/react';
import { Footer } from 'components/Layout/Footer/Footer';
import { renderWrapped } from 'test/utils';

describe('Footer', () => {
    it('invites visitors to join the waitlist', () => {
        renderWrapped(<Footer />);
        const waitlist = screen.getByRole('region', { name: 'Be among the first to discover JoyPaw' });

        expect(within(waitlist).getByRole('link', { name: 'Get notified at launch' }).getAttribute('href')).toBe('/#waitlist');
    });

    it('groups its links in labelled navigation columns', () => {
        renderWrapped(<Footer />);

        const discover = screen.getByRole('navigation', { name: 'Discover' });
        expect(within(discover).getByRole('link', { name: 'About' }).getAttribute('href')).toBe('/about');

        const professionals = screen.getByRole('navigation', { name: 'Professionals' });
        expect(within(professionals).getAllByRole('link')).toHaveLength(4);
        expect(within(professionals).getByText('More specialities soon')).toBeDefined();

        const legal = screen.getByRole('navigation', { name: 'Legal' });
        expect(within(legal).getByRole('link', { name: 'Privacy policy' })).toBeDefined();
    });

    it('ends with the copyright and the tribute to Joy', () => {
        renderWrapped(<Footer />);
        const footer = screen.getByRole('contentinfo');

        expect(within(footer).getByText('© JoyPaw')).toBeDefined();
        expect(within(footer).getByText(/In memory of Joy/)).toBeDefined();
    });
});
