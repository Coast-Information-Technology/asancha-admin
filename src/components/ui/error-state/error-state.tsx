/** Shared recoverable error-state component for admin routes and resources. */

import type { ReactNode } from 'react';

import styles from './error-state.module.css';

export interface ErrorStateProps {
  title?: string;
  description: string;
  action?: ReactNode;
  errorCode?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  description,
  action,
  errorCode,
}: ErrorStateProps) {
  return (
    <section aria-live="assertive" className={styles.errorState} role="alert">
      <div className={styles.icon} aria-hidden="true">
        !
      </div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      {errorCode ? <p className={styles.code}>Reference: {errorCode}</p> : null}
      {action ? <div className={styles.action}>{action}</div> : null}
    </section>
  );
}
