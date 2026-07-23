/** Shared empty-state component for lists, queues, and unavailable relationships. */

import type { ReactNode } from 'react';

import styles from './empty-state.module.css';

export interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <section aria-live="polite" className={styles.emptyState}>
      {icon ? (
        <div aria-hidden="true" className={styles.icon}>
          {icon}
        </div>
      ) : null}
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      {action ? <div className={styles.action}>{action}</div> : null}
    </section>
  );
}
