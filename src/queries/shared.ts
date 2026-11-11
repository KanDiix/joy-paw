// For later — the site makes no API calls for now.
// Will hold the shared React Query helpers (query-key builder, mutation wrapper that invalidates the
// right keys and logs failures through services/Logger). Each domain will then get its own
// queries/<Domain>/<Domain>.queries.ts exporting a *Keys factory and its use* hooks.
// Adding the first query also means adding @tanstack/react-query and a QueryClientProvider in boot-client.tsx.
