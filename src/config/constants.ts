export const Environment = {
    Local: 'local',
    Dev: 'dev',
    Uat: 'uat',
    Prod: 'prod',
} as const;

export type Environment = (typeof Environment)[keyof typeof Environment];

const isEnvironment = (value: unknown): value is Environment => Object.values(Environment).includes(value as Environment);

/**
 * Resolves the runtime environment.
 * `VITE_ENVIRONMENT` wins when set (e.g. in `.env.local`), otherwise the hostname decides.
 */
export const getEnvironment = (hostname: string = window.location.hostname): Environment => {
    const fromEnv: unknown = import.meta.env.VITE_ENVIRONMENT;
    if (isEnvironment(fromEnv)) {
        return fromEnv;
    }
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return Environment.Local;
    }
    if (hostname.includes('-dev')) {
        return Environment.Dev;
    }
    if (hostname.includes('-uat')) {
        return Environment.Uat;
    }
    return Environment.Prod;
};

/** Debug tooling (and, later, verbose logging) is enabled on these environments only. */
export const isDebugEnvironment = (environment: Environment = getEnvironment()) =>
    environment === Environment.Local || environment === Environment.Dev;
