import { useSyncExternalStore } from 'react';

const subscribe = (onChange: () => void) => {
    window.addEventListener('scroll', onChange, { passive: true });
    return () => window.removeEventListener('scroll', onChange);
};

/** True once the page is scrolled past `threshold` pixels. Re-renders only when that flips. */
export const useHasScrolled = (threshold = 8) => useSyncExternalStore(subscribe, () => window.scrollY > threshold);
