// src/components/ui/tabs/tabs.tsx

/**
 * File purpose:
 * Provides shared Tabs primitives for the Asancha Admin frontend.
 *
 * Role in the project:
 * Used for detail pages such as users, staff, companies, properties, documents,
 * verification reviews, payments, and my profile.
 *
 * Security note:
 * Hiding a tab does not authorize or block data. Backend visibility remains final.
 */

import type { ReactNode } from 'react';

import { cn } from '../../../lib/utils/cn';

import styles from './tabs.module.css';

export interface TabItem {
  key: string;
  label: string;
  href?: string;
  disabled?: boolean;
}

export interface TabsProps {
  items: readonly TabItem[];
  activeKey: string;
  onChange?: (key: string) => void;
  children?: ReactNode;
}

export function Tabs({ items, activeKey, onChange, children }: TabsProps) {
  return (
    <div className={styles.root}>
      <div aria-label="Tabs" className={styles.list} role="tablist">
        {items.map((item) => (
          <button
            aria-selected={item.key === activeKey}
            className={cn(styles.tab, item.key === activeKey && styles.active)}
            disabled={item.disabled}
            key={item.key}
            onClick={() => onChange?.(item.key)}
            role="tab"
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>
      {children ? <div className={styles.panel}>{children}</div> : null}
    </div>
  );
}
