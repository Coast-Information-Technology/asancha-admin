// src/hooks/use-click-outside.ts

/**
 * File purpose:
 * Provides a click-outside hook for the Asancha Admin frontend.
 *
 * Role in the project:
 * This hook helps close dropdowns, popovers, command menus, staff avatar menus,
 * mobile drawers, filters, and lightweight overlays when staff users click
 * outside the target element.
 *
 * Key exports:
 * - useClickOutside registers pointer/focus escape behaviour for one element.
 *
 * Business relevance:
 * Staff workflows need predictable UI behaviour, especially in dense admin
 * screens with menus, filters, modals, and action panels.
 *
 * Security note:
 * Closing a UI element is not a permission check. Backend permissions and
 * action guards remain required for all sensitive admin operations.
 */

'use client';

import { RefObject, useEffect } from 'react';

export interface UseClickOutsideOptions {
  enabled?: boolean;
  listenForEscape?: boolean;
  eventType?: 'mousedown' | 'pointerdown' | 'click';
}

export function useClickOutside<TElement extends HTMLElement>(
  ref: RefObject<TElement | null>,
  onClickOutside: () => void,
  options: UseClickOutsideOptions = {},
): void {
  const { enabled = true, listenForEscape = true, eventType = 'pointerdown' } = options;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handlePointerEvent = (event: MouseEvent | PointerEvent): void => {
      const element = ref.current;
      const target = event.target;

      if (!element || !(target instanceof Node)) {
        return;
      }

      if (!element.contains(target)) {
        onClickOutside();
      }
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClickOutside();
      }
    };

    document.addEventListener(eventType, handlePointerEvent);

    if (listenForEscape) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener(eventType, handlePointerEvent);

      if (listenForEscape) {
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [enabled, eventType, listenForEscape, onClickOutside, ref]);
}
