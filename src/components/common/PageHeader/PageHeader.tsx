import type { ReactNode } from 'react';

type PageHeaderProps = {
    title: string;
    subtitle?: string;
    actions?: ReactNode;
};

export const PageHeader = ({ title, subtitle, actions }: PageHeaderProps) => (
    <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-4">
        <div>
            <h1 className="h3 mb-1">{title}</h1>
            {subtitle !== undefined && <p className="text-secondary mb-0">{subtitle}</p>}
        </div>
        {actions !== undefined && <div className="d-flex gap-2">{actions}</div>}
    </div>
);
