// src/lib/utils/cn.ts

/**
 * File purpose:
 * Provides a safe class-name merge helper for the Asancha Admin frontend.
 *
 * Role in the project:
 * This file centralises conditional class merging for UI components, layout
 * components, forms, tables, modals, drawers, badges, cards, and admin screens.
 *
 * Key exports:
 * - cn merges class names using clsx and tailwind-merge.
 *
 * Business relevance:
 * asancha-admin uses Tailwind CSS and CSS Modules. This utility keeps styling
 * predictable and prevents conflicting Tailwind classes from producing broken
 * admin UI states.
 *
 * Security note:
 * This utility is styling-only. It must not contain authentication,
 * authorization, permission, review, payment, document, verification, or audit
 * business logic.
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
