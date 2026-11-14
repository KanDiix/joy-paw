import { HomeSections, RoutePaths } from 'routes/RoutePaths';

describe('RoutePaths', () => {
    it('builds the public routes', () => {
        expect(RoutePaths.home()).toBe('/');
        expect(RoutePaths.about()).toBe('/about');
    });

    it('builds the landing page section anchors', () => {
        expect(RoutePaths.homeSection(HomeSections.waitlist)).toBe('/#waitlist');
        expect(RoutePaths.homeSection(HomeSections.howItWorks)).toBe('/#how-it-works');
    });
});
