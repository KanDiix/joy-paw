import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import resources from 'virtual-vite-i18n-resources';

export const DEFAULT_NAMESPACE = 'common';
export const DEFAULT_LANGUAGE = 'en';
export const SUPPORTED_LANGUAGES = ['en', 'fr'] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

/** Keeps `<html lang>` in sync with the active language (screen readers, hyphenation, SEO). */
const syncDocumentLanguage = (language: string) => {
    document.documentElement.lang = language;
};

export const initI18n = async () => {
    i18n.on('languageChanged', syncDocumentLanguage);
    await i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            resources,
            fallbackLng: DEFAULT_LANGUAGE,
            supportedLngs: SUPPORTED_LANGUAGES,
            nonExplicitSupportedLngs: true,
            load: 'languageOnly',
            defaultNS: DEFAULT_NAMESPACE,
            ns: Object.keys(resources[DEFAULT_LANGUAGE] ?? {}),
            interpolation: { escapeValue: false },
            detection: {
                order: ['localStorage', 'navigator'],
                caches: ['localStorage'],
            },
        });
};

// Locale files edited during `yarn start` are pushed by the i18n-resources Vite plugin.
if (import.meta.hot) {
    import.meta.hot.on('locales-update', (updated: typeof resources) => {
        for (const [language, namespaces] of Object.entries(updated)) {
            for (const [namespace, bundle] of Object.entries(namespaces)) {
                i18n.addResourceBundle(language, namespace, bundle, true, true);
            }
        }
        void i18n.changeLanguage(i18n.language);
    });
}

export { i18n };
