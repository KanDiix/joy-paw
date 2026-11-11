// Vitest setup file (see `test.setupFiles` in vite.config.mts).
import { cleanup } from '@testing-library/react';
import { i18n, initI18n } from 'config/i18n/i18n';

await initI18n();

beforeEach(async () => {
    // Tests assert on English text, whatever the language a previous test switched to.
    await i18n.changeLanguage('en');
});

afterEach(() => {
    cleanup();
    vi.useRealTimers();
    localStorage.clear();
});
