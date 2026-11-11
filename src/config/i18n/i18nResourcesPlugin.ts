import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import type { Plugin } from 'vite';

const VIRTUAL_ID = 'virtual-vite-i18n-resources';
const RESOLVED_ID = `\0${VIRTUAL_ID}`;
export const LOCALES_UPDATE_EVENT = 'locales-update';

type Resources = Record<string, Record<string, unknown>>;

/**
 * Reads `<localesDir>/<language>/<namespace>.json` into `{ [language]: { [namespace]: json } }`.
 */
const loadResources = (localesDir: string): Resources => {
    const resources: Resources = {};
    for (const language of readdirSync(localesDir)) {
        const languageDir = join(localesDir, language);
        if (!statSync(languageDir).isDirectory()) {
            continue;
        }
        resources[language] = {};
        for (const file of readdirSync(languageDir)) {
            if (file.endsWith('.json')) {
                const namespace = file.slice(0, -'.json'.length);
                resources[language][namespace] = JSON.parse(readFileSync(join(languageDir, file), 'utf-8'));
            }
        }
    }
    return resources;
};

/**
 * Exposes every translation file through the `virtual-vite-i18n-resources` module and pushes a
 * `locales-update` HMR event when one of them changes, so the running app updates without a reload.
 */
export const i18nResourcesPlugin = (localesDir: string): Plugin => ({
    name: 'i18n-resources',
    resolveId: id => (id === VIRTUAL_ID ? RESOLVED_ID : undefined),
    load(id) {
        if (id !== RESOLVED_ID) {
            return undefined;
        }
        const resources = loadResources(localesDir);
        return `export default ${JSON.stringify(resources)};`;
    },
    handleHotUpdate({ file, server }) {
        const relativePath = relative(localesDir, file);
        if (relativePath.startsWith('..') || !relativePath.endsWith('.json')) {
            return undefined;
        }
        server.ws.send({
            type: 'custom',
            event: LOCALES_UPDATE_EVENT,
            data: loadResources(localesDir),
        });
        const module = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (module) {
            server.moduleGraph.invalidateModule(module);
        }
        // Handled: no full reload, no module propagation.
        return [];
    },
});
