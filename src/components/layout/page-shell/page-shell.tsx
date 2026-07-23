// src/components/layout/page-shell/page-shell.tsx

/**
 * File purpose:
 * Provides a reusable page shell for Asancha Admin screens.
 *
 * Role in the project:
 * This component standardises page title, description, actions, breadcrumbs,
 * and content spacing across dashboards, queues, modules, detail pages, and
 * settings screens.
 *
 * Key exports:
 * - PageShell renders consistent admin page structure.
 *
 * Business relevance:
 * Admin pages must remain clear, accessible, and operationally consistent.
 *
 * Security note:
 * Page layout does not authorize access. Route guards and backend enforcement
 * remain required.
 */

import Link from 'next/link';
import type { ReactNode } from 'react';

import type { BreadcrumbItem } from '../../../types/routes.types';
import { cn } from '../../../lib/utils/cn';

import styles from './page-shell.module.css';

export interface PageShellProps {
  title: string;
  description?: string;
  breadcrumbs?: readonly BreadcrumbItem[];
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function PageShell({
  title,
  description,
  breadcrumbs = [],
  actions,
  children,
  className,
}: PageShellProps) {
  return (
    <div className={cn(styles.shell, className)}>
      {breadcrumbs.length > 0 ? (
        <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
          <ol>
            {breadcrumbs.map((item, index) => (
              <li key={`${item.label}-${index}`}>
                {item.href && !item.current ? (
                  <Link href={item.href}>{item.label}</Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      <header className={styles.header}>
        <div className={styles.heading}>
          <h1 className={styles.title}>{title}</h1>
          {description ? <p className={styles.description}>{description}</p> : null}
        </div>

        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </header>

      <div className={styles.content}>{children}</div>
    </div>
  );
}
