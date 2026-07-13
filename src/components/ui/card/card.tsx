// src/components/ui/card/card.tsx

/**
 * File purpose:
 * Provides shared Card primitives for the Asancha Admin frontend.
 *
 * Role in the project:
 * Used across dashboards, panels, details, summaries, review queues, settings,
 * and empty/error states.
 *
 * Security note:
 * Card layout does not protect sensitive data. Redaction must happen before
 * rendering.
 */

import type { HTMLAttributes } from 'react';

import { cn } from '../../../lib/utils/cn';

import styles from './card.module.css';

export function Card({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={cn(styles.card, className)} {...props} />;
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.header, className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn(styles.title, className)} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn(styles.description, className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.content, className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.footer, className)} {...props} />;
}
