import js from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
    globalIgnores(['dist', 'coverage']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            eslintReact.configs['recommended-typescript'],
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            jsxA11y.flatConfigs.recommended,
        ],
        languageOptions: {
            globals: globals.browser,
        },
        rules: {
            // Props are typed with a `type` alias, not an `interface`.
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
            '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        { group: ['../*', './../*'], message: 'Use bare aliases (e.g. routes/RoutePaths), not parent-relative paths.' },
                        { group: ['locales/*', '**/locales/**/*.json'], message: 'Load translations through virtual-vite-i18n-resources.' },
                    ],
                },
            ],
        },
    },
    {
        files: ['src/**/*.spec.{ts,tsx}', 'src/test/**'],
        languageOptions: { globals: { ...globals.browser, ...globals.vitest } },
    },
]);
