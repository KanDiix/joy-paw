import resources from 'virtual-vite-i18n-resources';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from 'config/i18n/i18n';

/** Flattens `{ a: { b: 'x' } }` into `['a.b']`. */
const flattenKeys = (value: unknown, prefix = ''): string[] =>
    typeof value === 'object' && value !== null
        ? Object.entries(value).flatMap(([key, child]) => flattenKeys(child, prefix === '' ? key : `${prefix}.${key}`))
        : [prefix];

describe('translations', () => {
    const reference = resources[DEFAULT_LANGUAGE];

    it.each(SUPPORTED_LANGUAGES)('has a folder for %s', language => {
        expect(resources[language]).toBeDefined();
    });

    it.each(SUPPORTED_LANGUAGES)('%s has exactly the same namespaces and keys as the default language', language => {
        expect(Object.keys(resources[language] ?? {}).sort()).toEqual(Object.keys(reference).sort());
        for (const namespace of Object.keys(reference)) {
            expect(flattenKeys(resources[language]?.[namespace]).sort(), `namespace ${namespace}`).toEqual(flattenKeys(reference[namespace]).sort());
        }
    });
});
