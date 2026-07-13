// src/components/ui/command-menu/command-menu.tsx

/**
 * File purpose:
 * Provides a shared CommandMenu primitive for the Asancha Admin frontend.
 *
 * Role in the project:
 * Used for global search, command palette, and quick navigation.
 *
 * Security note:
 * Command results must be permission-filtered by backend and frontend guidance.
 */

'use client';

import type { ReactNode } from 'react';
import { useMemo } from 'react';

import { Input } from '../input/input';

import styles from './command-menu.module.css';

export interface CommandMenuItem {
  key: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  onSelect: () => void;
}

export interface CommandMenuProps {
  query: string;
  items: readonly CommandMenuItem[];
  onQueryChange: (query: string) => void;
  emptyText?: string;
}

export function CommandMenu({
  query,
  items,
  onQueryChange,
  emptyText = 'No results found.',
}: CommandMenuProps) {
  const filteredItems = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return items;
    }

    return items.filter((item) => {
      return `${item.label} ${item.description ?? ''}`.toLowerCase().includes(search);
    });
  }, [items, query]);

  return (
    <div className={styles.root}>
      <Input
        aria-label="Search admin commands"
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search users, queues, payments, messages..."
        value={query}
      />

      <div className={styles.list} role="listbox">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <button className={styles.item} key={item.key} onClick={item.onSelect} type="button">
              {item.icon ? <span className={styles.icon}>{item.icon}</span> : null}
              <span>
                <strong>{item.label}</strong>
                {item.description ? <small>{item.description}</small> : null}
              </span>
            </button>
          ))
        ) : (
          <div className={styles.empty}>{emptyText}</div>
        )}
      </div>
    </div>
  );
}
