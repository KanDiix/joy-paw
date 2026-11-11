import { render } from '@testing-library/react';
import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';

type WrapperOptions = {
    initialEntries?: string[];
};

/** Renders `ui` inside the same providers as the app (minus the browser router). */
export const renderWrapped = (ui: ReactNode, { initialEntries = ['/'] }: WrapperOptions = {}) => {
    const Wrapper = ({ children }: { children: ReactNode }) => <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>;
    return render(ui, { wrapper: Wrapper });
};
