import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ErrorPage } from 'components/Pages/Errors/ErrorPage';

type ErrorBoundaryProps = {
    children: ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
};

/** Last line of defense for render errors. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false };

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        // Temporary: replace with services/Logger once logging is decided.
        console.error(error, info.componentStack);
    }

    render() {
        return this.state.hasError ? <ErrorPage onRetry={() => this.setState({ hasError: false })} /> : this.props.children;
    }
}
