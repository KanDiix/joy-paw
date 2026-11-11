// For later — logging strategy not decided yet.
// Will be the single entry point for errors and diagnostics (console, remote monitoring, user
// notification). Every render error (components/common/ErrorBoundary) and, once API calls exist,
// every query/mutation failure will go through it. Until then, use console.error and keep the call
// sites easy to find.
