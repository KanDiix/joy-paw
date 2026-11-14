import { useId } from 'react';

type PawMarkProps = {
    className?: string;
    /** Draws the paw on the sage gradient tile (logo). Without it, the paw alone takes `currentColor`. */
    hasTile?: boolean;
};

/** JoyPaw brand mark. Decorative: the accessible name comes from the surrounding element. */
export const PawMark = ({ className, hasTile = true }: PawMarkProps) => {
    const gradientId = useId();
    const pawColor = hasTile ? 'var(--jp-cream)' : 'currentColor';
    // The golden toe is Joy's: the single warm accent of the mark.
    const accentColor = hasTile ? 'var(--jp-gold)' : 'currentColor';

    return <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
        {hasTile && <>
            <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="var(--jp-sage-500)" />
                    <stop offset="1" stopColor="var(--jp-sage-800)" />
                </linearGradient>
            </defs>
            <rect width="32" height="32" rx="9.5" fill={`url(#${gradientId})`} />
        </>}
        <g fill={pawColor}>
            <ellipse cx="8.7" cy="13.4" rx="2.25" ry="2.65" transform="rotate(-22 8.7 13.4)" />
            <ellipse cx="13.1" cy="9.2" rx="2.35" ry="2.85" transform="rotate(-7 13.1 9.2)" />
            <ellipse cx="18.9" cy="9.2" rx="2.35" ry="2.85" transform="rotate(7 18.9 9.2)" />
            <path d="M16 15.4c-3.9 0-7.3 3.6-7.3 6.6 0 2.1 1.7 3.4 3.6 3.4 1.5 0 2.4-.8 3.7-.8s2.2.8 3.7.8c1.9 0 3.6-1.3 3.6-3.4 0-3-3.4-6.6-7.3-6.6Z" />
        </g>
        <ellipse cx="23.3" cy="13.4" rx="2.25" ry="2.65" transform="rotate(22 23.3 13.4)" fill={accentColor} />
    </svg>;
};
