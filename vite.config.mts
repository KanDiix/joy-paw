import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vitest/config';
import { i18nResourcesPlugin } from './src/config/i18n/i18nResourcesPlugin.ts';

// Forward slashes so aliased paths stay valid ids on Windows too.
const srcDir = resolve(import.meta.dirname, 'src').replaceAll('\\', '/');

/**
 * Every top-level folder under `src/` is importable by its bare name
 * (`import { RoutePaths } from 'routes/RoutePaths'`).
 * Mirrored by `paths: { "*": ["./src/*"] }` in `tsconfig.json` — keep both in sync.
 */
const srcAliases = readdirSync(srcDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => ({ find: new RegExp(`^${entry.name}(?=/|$)`), replacement: `${srcDir}/${entry.name}` }));

export default defineConfig(({ mode }) => ({
    plugins: [
        react(),
        i18nResourcesPlugin(resolve(srcDir, 'locales')),
        mode === 'analyze' && visualizer({ filename: 'dist/stats.html', open: true, gzipSize: true }),
    ],
    resolve: {
        alias: [
            // Sass: `@use '~/css/variables'` resolves from `src/`.
            { find: /^~\//, replacement: `${srcDir}/` },
            ...srcAliases,
        ],
    },
    server: {
        port: 3000,
        open: true,
    },
    build: {
        sourcemap: mode !== 'production',
    },
    test: {
        environment: 'happy-dom',
        environmentOptions: { happyDOM: { url: 'http://localhost:3000' } },
        globals: true,
        setupFiles: ['src/test/index.ts'],
        include: ['src/**/*.spec.{ts,tsx}'],
        coverage: {
            provider: 'v8',
            include: ['src/**/*.{ts,tsx}'],
            exclude: ['src/**/*.spec.{ts,tsx}', 'src/test/**', 'src/config/i18n/i18nResourcesPlugin.ts', 'src/typings.d.ts'],
        },
    },
}));
