import { RoutePaths } from 'routes/RoutePaths';

describe('RoutePaths', () => {
    it('builds the public routes', () => {
        expect(RoutePaths.home()).toBe('/');
        expect(RoutePaths.about()).toBe('/about');
    });
});
