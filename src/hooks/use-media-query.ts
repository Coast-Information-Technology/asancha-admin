// src/hooks/use-media-query.ts

/**
 * File purpose:
 * Provides a client-side media query hook for the Asancha Admin frontend.
 *
 * Role in the project:
 * This hook helps layout components detect responsive breakpoints for admin
 * shell, sidebar, mobile top bar, mobile drawer, tables, modals, and dense
 * operational screens.
 *
 * Key exports:
 * - useMediaQuery returns whether a media query currently matches.
 * - useIsMobile returns whether the viewport is below the admin mobile
 *   breakpoint.
 *
 * Business relevance:
 * asancha-admin must remain usable across desktop and mobile staff workflows.
 * Responsive behaviour improves usability but does not replace backend
 * permission enforcement or route protection.
 *
 * Security note:
 * This hook is UI-only. It must not contain authentication, authorization,
 * staff permission, payment, document, verification, or audit business logic.
 */

'use client';

import { useEffect, useState } from 'react';

const DEFAULT_MOBILE_QUERY = '(max-width: 767px)';

export function useMediaQuery(query: string, defaultValue = false): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
      return defaultValue;
    }

    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
      return;
    }

    const mediaQueryList = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent): void => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

export function useIsMobile(query = DEFAULT_MOBILE_QUERY): boolean {
  return useMediaQuery(query);
}
