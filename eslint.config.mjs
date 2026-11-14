import js from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const sharedConfigs = [
    js.configs.recommended,
    tseslint.configs.recommended,
    eslintReact.configs['recommended-typescript'],
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
    jsxA11y.flatConfigs.recommended,
];

const projectRules = {
    // Props are typed with a `type` alias, not an `interface`.
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
    // XSS: raw HTML and `javascript:` URLs bypass React's escaping.
    '@eslint-react/dom-no-dangerously-set-innerhtml': 'error',
    '@eslint-react/dom-no-script-url': 'error',
    'no-restricted-imports': [
        'error',
        {
            patterns: [
                { group: ['../*', './../*'], message: 'Use bare aliases (e.g. routes/RoutePaths), not parent-relative paths.' },
                { group: ['locales/*', '**/locales/**/*.json'], message: 'Load translations through virtual-vite-i18n-resources.' },
            ],
        },
    ],
};

/** Same rules, with every `error` turned into a `warn` (options kept, `off` untouched). */
const asWarnings = rules =>
    Object.fromEntries(
        Object.entries(rules).map(([name, entry]) => {
            const [severity, ...options] = Array.isArray(entry) ? entry : [entry];
            return [name, severity === 'error' || severity === 2 ? ['warn', ...options] : entry];
        }),
    );

const allRules = Object.assign({}, ...sharedConfigs.flat().map(config => config.rules ?? {}), projectRules);

export default defineConfig([
    globalIgnores(['dist', 'coverage']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: sharedConfigs,
        languageOptions: {
            globals: globals.browser,
        },
        rules: projectRules,
    },
    {
        // Tests: lint problems are reported as warnings, not errors.
        files: ['src/**/*.spec.{ts,tsx}', 'src/test/**'],
        languageOptions: { globals: { ...globals.browser, ...globals.vitest } },
        rules: asWarnings(allRules),
    },
]);
