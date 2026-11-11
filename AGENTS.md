# FunLand Project Guide

## Project overview

<!-- TODO: project description to be written. -->

## Current scope

FunLand is a **public** site: no authentication and no API calls for now. It has two pages, Home and About, plus a "not found" fallback. The site is translated into English and French.

Several building blocks are planned but deliberately not implemented yet: API calls, authentication and logging. Each one already has its file in the tree, empty except for a comment that says what it will do (see [Planned building blocks](#planned-building-blocks)). Keep these files as placeholders and don't implement them unless you are asked to. When you do implement one, add its dependencies at the same time, not before.

## Architecture

Single-page React application bundled by Vite and deployed as a static site. Three layers:

```
src/components   # presentation: Layout, Pages, reusable common components
src/queries      # server state: one folder per domain, React Query hooks (planned, empty for now)
src/services     # outbound calls and domain logic: API client, Auth, Logger, helpers
```

Components never call an outbound service directly. Once the API exists, server state will be owned by `@tanstack/react-query`: a component calls a `use*` hook from `src/queries/<Domain>/<Domain>.queries.ts` and reads `{ data, isPending, isError }`. There will be no `store/`, no reducers and no `normalizr`. Client-only state stays local to the component (`useState`), or goes in a small context provider when several components share it.

`boot-client.tsx` initialises i18n, then wraps the tree:

```
StrictMode → ErrorBoundary → BrowserRouter → AppRoutes
```

The first API call will add a `QueryClientProvider` on top of this tree.

## Directory structure

```
src/
├── boot-client.tsx           # entry point: i18n, providers, render
├── typings.d.ts              # virtual i18n module, ImportMetaEnv
├── components/
│   ├── common/               # ErrorBoundary, PageHeader, ...
│   ├── Layout/               # page chrome: Layout, Header, LanguageSwitcher
│   └── Pages/                # About, Errors (ErrorPage, NotFoundPage), Home
├── config/
│   ├── i18n/                 # i18next setup
│   └── constants.ts          # Environment / getEnvironment / isDebugEnvironment
├── css/                      # main.scss (Bootstrap) + _utilities.scss
├── locales/
│   ├── en/                   # one JSON file per namespace: common, home, about, errors
│   └── fr/                   # same namespaces and same keys as en/
├── queries/
│   └── shared.ts             # placeholder: shared React Query helpers
├── routes/
│   ├── AppRoutes.tsx         # the route tree
│   ├── RoutePaths.ts         # RoutePatterns + RoutePaths (URL builders)
│   └── ProtectedRoute.tsx    # placeholder: auth guard
├── services/
│   ├── ApiService/ApiClient.ts  # placeholder: API client
│   ├── AuthService.ts        # placeholder: authentication
│   └── Logger.ts             # placeholder: logging
└── test/
    ├── index.ts              # Vitest setup
    ├── utils.tsx             # renderWrapped
    └── ApiMocks.ts           # placeholder: HTTP mocking helpers
```

Imports are **bare aliases**, not relative paths or `@/`. Every top-level folder under `src/` is importable by name, for example `import { RoutePaths } from 'routes/RoutePaths'`. The aliases are declared twice and the two declarations must stay in sync: `resolve.alias` in `vite.config.mts` (built automatically from the folders in `src/`) and `paths: { "*": ["./src/*"] }` in `tsconfig.json`. Sass uses `~` as the `src` prefix. ESLint rejects parent-relative imports (`../`).

## Tech stack

- React 19.3, TypeScript 6, Vite 8 (`vite.config.mts`), Yarn 4.18 (Berry, `.yarnrc.yml`, `nodeLinker: node-modules`)
- Routing: `react-router` 8.5
- UI: `bootstrap` 5.3 (Sass), `classnames`, sass
- i18n: `i18next` + `react-i18next` + `i18next-browser-languagedetector` (en, fr)
- Tests: Vitest + `happy-dom` + Testing Library (`@testing-library/react`, `@testing-library/user-event`)
- Lint: flat config in `eslint.config.mjs` (`typescript-eslint`, `@eslint-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`). No Prettier.

Don't add a dependency until code uses it. When a planned building block is implemented, its libraries come with it.

## Internationalisation

- Supported languages: `en` (default and fallback) and `fr`, declared in `SUPPORTED_LANGUAGES` in `config/i18n/i18n.ts`.
- Each language has the same namespace files: `common` (layout, navigation, language names), plus one file per page (`home`, `about`) and `errors`. A new page gets its own namespace in **both** languages.
- `src/config/i18n/i18n.spec.ts` fails if `fr` and `en` differ by a namespace or a key, so add a key to both languages at once.
- The language is detected from `localStorage` first, then from the browser. The choice made in the `LanguageSwitcher` is remembered in `localStorage`. `<html lang>` follows the active language.
- Translations are loaded through the `virtual-vite-i18n-resources` virtual module (`src/config/i18n/i18nResourcesPlugin.ts`). Its `locales-update` HMR hook means that editing a file under `locales/` updates the running app without a reload. Never import a locale JSON file directly; ESLint rejects it.
- All user-visible text goes through `useTranslation`, including accessibility labels.

## Routing

Routes are centralised in `src/routes/`. `RoutePatterns` holds the patterns and is used only by `AppRoutes`. Never hardcode an internal URL. Build it from `RoutePaths`, using `generatePath` for parameterised routes. Every route is rendered inside `Layout`. The `*` pattern renders `NotFoundPage`.

To add a page:

1. Create the component in `components/Pages/<Name>/<Name>Page.tsx`.
2. Add its pattern to `RoutePatterns`, its builder to `RoutePaths`, and its route to `AppRoutes`.
3. Add its namespace in `locales/en/` and `locales/fr/`.
4. Add a link in `Header` if it belongs in the navigation.

## Planned building blocks

These parts are planned but not implemented. Each file below exists and holds only a comment.

| Area    | Placeholder files                                                      | What it will do                                                                                   |
| ------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| API     | `services/ApiService/ApiClient.ts`, `queries/shared.ts`, `test/ApiMocks.ts` | API client; React Query hooks per domain behind a `*Keys` factory; HTTP mocks at the network boundary |
| Auth    | `services/AuthService.ts`, `routes/ProtectedRoute.tsx`                 | Sign-in, current user and rights; guarding of the protected routes                                 |
| Logging | `services/Logger.ts`                                                   | A single entry point for errors and diagnostics (console, remote monitoring, user notification)   |

Principles to keep in mind now, so that adding these later stays cheap:

- **Logging.** The approach is not decided yet. Until it is, report errors with `console.error` at a few easy-to-find places (currently only `ErrorBoundary`), so they can all be routed through `services/Logger` later. Don't install a logging or monitoring library on your own initiative.
- **API.** No `fetch` calls in components. When the API arrives:
  - Every call goes through `services/ApiService` and a hook in `queries/`.
  - Each domain has a `*Keys` factory, and keys are never written inline.
  - A mutation invalidates the keys it affects.
  - In tests, mock HTTP at the network boundary, never the client itself.
  - If the client is generated, never edit the generated files by hand.
- **Auth.** Don't spread "is the user signed in" checks across components. Route guards go in `ProtectedRoute`, and rights checks go through `AuthService`.

## Environments

`config/constants.ts` resolves the environment (`local`, `dev`, `uat`, `prod`):

- `VITE_ENVIRONMENT` (for example in `.env.local`) takes precedence.
- Otherwise the hostname decides: `localhost` and `127.0.0.1` give `local`, a host containing `-dev` gives `dev`, one containing `-uat` gives `uat`, and any other host gives `prod`.

`isDebugEnvironment()` is the switch for debug tooling, and later for verbose logging.

## Code conventions

- Type component props with a `type` alias, not an `interface` (enforced by ESLint). Mark optional props with `?`.
- Reuse before creating: check `components/common/` and `src/services/` before you add a component, hook or helper.
- Prefix booleans with `is`, `has`, `can` or `should`. Name local handlers `handleX` and callback props `onX`.
- Match the filename to the primary exported symbol.
- Prefer Bootstrap utility classes over custom CSS. `_utilities.scss` only holds what Bootstrap doesn't cover. Use `classnames` for conditional classes.
- Don't test for missing data with a bare falsy check, because `0`, `false` and `''` can be valid values. Use explicit nullish checks.
- Keep accessibility in mind: use landmarks, one `h1` per page (rendered by `PageHeader`), and labels on every form control. `eslint-plugin-jsx-a11y` is on.

## Testing

- Vitest with `happy-dom`, globals enabled, coverage via `@vitest/coverage-v8`.
- Specs are colocated with the code they test: `RoutePaths.ts` → `RoutePaths.spec.ts`.
- Render components with `renderWrapped` from `src/test/utils.tsx`, which supplies a `MemoryRouter` (`initialEntries` picks the URL). Test from the user's point of view: query by role and accessible name, and interact with `@testing-library/user-event`.
- The setup (`src/test/index.ts`) initialises i18n and resets the language to `en` before each test. Assert on English text.
- Keep tests deterministic and independent of their order. Freeze time with `vi.useFakeTimers()` rather than relying on the current date.

## Useful commands

```
yarn              # install (Yarn 4, pinned in .yarn/releases — no global install needed beyond Yarn itself)
yarn start        # dev server (Vite, port 3000)
yarn typecheck    # tsc -b
yarn lint         # eslint src --max-warnings=0
yarn lint:fix
yarn test         # vitest run --coverage
yarn test:watch
yarn build        # production build (alias of build:prod)
yarn build:dev    # development build (sourcemaps, development mode)
yarn analyze      # production build + bundle visualiser
yarn preview      # serve the built bundle
```

Before you consider a change done, `typecheck`, `lint` (zero warnings) and `test` must all pass.
