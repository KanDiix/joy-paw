/// <reference types="vite/client" />

declare module 'virtual-vite-i18n-resources' {
    import type { Resource } from 'i18next';

    const resources: Resource;
    export default resources;
}

// Declaration merging with Vite's ImportMetaEnv requires an interface.
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface ImportMetaEnv {
    readonly VITE_ENVIRONMENT?: string;
}
