// src/hooks/use-debounce.ts

/**
 * File purpose:
 * Provides debounce hooks for the Asancha Admin frontend.
 *
 * Role in the project:
 * This hook supports search inputs, table filters, command menus, admin lookup
 * fields, and other user-driven UI values that should not trigger immediate
 * updates on every keystroke.
 *
 * Key exports:
 * - useDebounce returns a delayed version of a value.
 * - useDebouncedCallback returns a debounced callback function.
 *
 * Business relevance:
 * Debouncing improves staff experience and reduces unnecessary frontend API
 * calls in dense admin workflows such as users, staff, documents, payments,
 * bookings, messages, and audit log search.
 *
 * Security note:
 * Debouncing is UI behaviour only. Backend rate limiting, permissions, and
 * query allow-lists remain mandatory.
 */

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export function useDebounce<TValue>(value: TValue, delayMs = 350): TValue {
  const [debouncedValue, setDebouncedValue] = useState<TValue>(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [delayMs, value]);

  return debouncedValue;
}

export function useDebouncedCallback<TArgs extends readonly unknown[]>(
  callback: (...args: TArgs) => void,
  delayMs = 350,
): (...args: TArgs) => void {
  const timeoutRef = useRef<number | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: TArgs) => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        callbackRef.current(...args);
      }, delayMs);
    },
    [delayMs],
  );
}
