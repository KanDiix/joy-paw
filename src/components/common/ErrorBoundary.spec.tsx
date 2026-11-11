import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from 'components/common/ErrorBoundary';

let shouldThrow = true;

const Unstable = () => {
    if (shouldThrow) {
        throw new Error('boom');
    }
    return <p>Recovered</p>;
};

describe('ErrorBoundary', () => {
    it('shows the error page and recovers on retry', async () => {
        vi.spyOn(console, 'error').mockImplementation(() => undefined);
        render(
            <ErrorBoundary>
                <Unstable />
            </ErrorBoundary>,
        );
        expect(screen.getByRole('alert')).toBeDefined();

        shouldThrow = false;
        await userEvent.click(screen.getByRole('button', { name: 'Retry' }));
        expect(screen.getByText('Recovered')).toBeDefined();
    });
});
