import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppRoutes } from 'routes/AppRoutes';
import { RoutePaths } from 'routes/RoutePaths';
import { renderWrapped } from 'test/utils';

describe('AppRoutes', () => {
    it('renders the home page', () => {
        renderWrapped(<AppRoutes />, { initialEntries: [RoutePaths.home()] });
        expect(screen.getByRole('heading', { level: 1, name: 'Welcome to JoyPaw' })).toBeDefined();
    });

    it('renders the about page', () => {
        renderWrapped(<AppRoutes />, { initialEntries: [RoutePaths.about()] });
        expect(screen.getByRole('heading', { level: 1, name: 'About' })).toBeDefined();
    });

    it('renders the not found page for an unknown URL', () => {
        renderWrapped(<AppRoutes />, { initialEntries: ['/does-not-exist'] });
        expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeDefined();
    });

    it('navigates from the footer', async () => {
        renderWrapped(<AppRoutes />);
        await userEvent.click(screen.getByRole('link', { name: 'About' }));
        expect(screen.getByRole('heading', { level: 1, name: 'About' })).toBeDefined();
    });
});
