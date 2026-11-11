import { Environment, getEnvironment, isDebugEnvironment } from 'config/constants';

describe('constants', () => {
    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it.each([
        ['localhost', Environment.Local],
        ['127.0.0.1', Environment.Local],
        ['funland-dev.example.com', Environment.Dev],
        ['funland-uat.example.com', Environment.Uat],
        ['funland.example.com', Environment.Prod],
    ])('resolves %s to %s', (hostname, expected) => {
        expect(getEnvironment(hostname)).toBe(expected);
    });

    it('lets VITE_ENVIRONMENT override the hostname', () => {
        vi.stubEnv('VITE_ENVIRONMENT', Environment.Uat);
        expect(getEnvironment('funland.example.com')).toBe(Environment.Uat);
    });

    it('enables debug tooling on local and dev only', () => {
        expect(isDebugEnvironment(Environment.Local)).toBe(true);
        expect(isDebugEnvironment(Environment.Dev)).toBe(true);
        expect(isDebugEnvironment(Environment.Uat)).toBe(false);
        expect(isDebugEnvironment(Environment.Prod)).toBe(false);
    });
});
