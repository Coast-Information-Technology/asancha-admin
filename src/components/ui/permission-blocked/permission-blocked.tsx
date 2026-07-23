/** Shared permission-blocked state for restricted staff views and actions. */

import type { ReactNode } from 'react';

import styles from './permission-blocked.module.css';

export interface PermissionBlockedProps {
  title?: string;
  description?: string;
  action?: ReactNode;
}

export function PermissionBlocked({
  title = 'Access restricted',
  description = 'You do not have permission to access this admin area.',
  action,
}: PermissionBlockedProps) {
  return (
    <section aria-live="polite" className={styles.blocked} role="status">
      <div aria-hidden="true" className={styles.icon}>
        !
      </div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      {action ? <div className={styles.action}>{action}</div> : null}
    </section>
  );
}
