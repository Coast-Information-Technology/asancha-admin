// src/components/ui/data-table/data-table.tsx

/**
 * File purpose:
 * Provides a lightweight typed DataTable primitive for the Asancha Admin
 * frontend.
 *
 * Role in the project:
 * Used as the base for users, staff, queues, payments, documents, bookings,
 * messages, API access, AI, audit logs, and settings tables.
 *
 * Security note:
 * DataTable action visibility is UI guidance only. Backend permissions remain
 * the final authority.
 */

import type { ReactNode } from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table/table';
import { Button } from '../button/button';

import styles from './data-table.module.css';

export interface DataTableColumn<TItem> {
  key: string;
  header: string;
  render: (item: TItem) => ReactNode;
  hideOnMobile?: boolean;
}

export interface DataTableAction<TItem> {
  key: string;
  label: string;
  onSelect: (item: TItem) => void;
  hidden?: (item: TItem) => boolean;
  disabled?: (item: TItem) => boolean;
}

export interface DataTableProps<TItem> {
  items: readonly TItem[];
  columns: readonly DataTableColumn<TItem>[];
  getRowKey: (item: TItem) => string;
  actions?: readonly DataTableAction<TItem>[];
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function DataTable<TItem>({
  items,
  columns,
  getRowKey,
  actions = [],
  loading = false,
  emptyTitle = 'No records found',
  emptyDescription = 'Try adjusting your filters or search terms.',
}: DataTableProps<TItem>) {
  if (loading) {
    return <div className={styles.state}>Loading records…</div>;
  }

  if (items.length === 0) {
    return (
      <div className={styles.state}>
        <strong>{emptyTitle}</strong>
        <span>{emptyDescription}</span>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead className={column.hideOnMobile ? styles.hideOnMobile : undefined} key={column.key}>
              {column.header}
            </TableHead>
          ))}
          {actions.length > 0 ? <TableHead>Actions</TableHead> : null}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={getRowKey(item)}>
            {columns.map((column) => (
              <TableCell className={column.hideOnMobile ? styles.hideOnMobile : undefined} key={column.key}>
                {column.render(item)}
              </TableCell>
            ))}
            {actions.length > 0 ? (
              <TableCell>
                <div className={styles.actions}>
                  {actions
                    .filter((action) => !action.hidden?.(item))
                    .map((action) => (
                      <Button
                        disabled={action.disabled?.(item)}
                        key={action.key}
                        onClick={() => action.onSelect(item)}
                        size="sm"
                        variant="secondary"
                      >
                        {action.label}
                      </Button>
                    ))}
                </div>
              </TableCell>
            ) : null}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
