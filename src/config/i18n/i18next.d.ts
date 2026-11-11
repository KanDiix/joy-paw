import 'i18next';
// Types only: the app loads translations through virtual-vite-i18n-resources, never from the JSON files.
/* eslint-disable no-restricted-imports */
import type about from 'locales/en/about.json';
import type common from 'locales/en/common.json';
import type errors from 'locales/en/errors.json';
import type home from 'locales/en/home.json';

declare module 'i18next' {
    // Declaration merging requires an interface.
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface CustomTypeOptions {
        defaultNS: 'common';
        // English is the reference language; i18n.spec.ts guarantees fr has the same keys.
        resources: { common: typeof common; home: typeof home; about: typeof about; errors: typeof errors };
    }
}
