// src/components/ui/table/table.tsx

/**
 * File purpose:
 * Provides shared semantic table primitives for the Asancha Admin frontend.
 *
 * Role in the project:
 * Used by data tables and feature-specific admin tables.
 *
 * Security note:
 * Table rendering does not authorize data access. Backend endpoints must enforce
 * resource visibility and redaction.
 */

import type {
  HTMLAttributes,
  TableHTMLAttributes,
  ThHTMLAttributes,
  TdHTMLAttributes,
} from 'react';

import { cn } from '../../../lib/utils/cn';

import styles from './table.module.css';

export function Table({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className={styles.wrapper}>
      <table className={cn(styles.table, className)} {...props} />
    </div>
  );
}

export function TableHeader(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={styles.header} {...props} />;
}

export function TableBody(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={styles.body} {...props} />;
}

export function TableFooter(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tfoot className={styles.footer} {...props} />;
}

export function TableRow({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn(styles.row, className)} {...props} />;
}

export function TableHead({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={cn(styles.head, className)} {...props} />;
}

export function TableCell({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn(styles.cell, className)} {...props} />;
}
