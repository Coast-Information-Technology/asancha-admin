// src/components/ui/skeleton/skeleton.tsx

/**
 * File purpose:
 * Provides the shared Skeleton primitive for the Asancha Admin frontend.
 *
 * Role in the project:
 * Used for loading states in dashboards, tables, cards, forms, detail pages,
 * sidebars, and review panels.
 *
 * Security note:
 * Loading placeholders must not reveal hidden or unauthorized records.
 */

import type { HTMLAttributes } from 'react';

import { cn } from '../../../lib/utils/cn';

import styles from './skeleton.module.css';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  rounded?: boolean;
}

export function Skeleton({
  width,
  height,
  rounded = false,
  className,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(styles.skeleton, rounded && styles.rounded, className)}
      style={{
        width,
        height,
        ...style,
      }}
      {...props}
    />
  );
}
