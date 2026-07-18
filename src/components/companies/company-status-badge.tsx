// src/components/companies/company-status-badge.tsx

/**
 * File purpose:
 * Renders an accessible company status badge for Asancha Admin.
 *
 * Role in the project:
 * This component displays company lifecycle and review states with text and a
 * visual marker that does not rely on colour alone.
 *
 * Key exports:
 * - CompanyStatusBadge renders a company status label.
 *
 * Business relevance:
 * Company status helps staff understand whether a company is pending,
 * under review, approved, rejected, on hold, suspended, or still in draft.
 *
 * Security note:
 * Status display is informational only. Backend status transitions,
 * permissions, and audit logging remain final.
 */

import { COMPANY_STATUS_LABELS } from '../../features/companies/constants/companies.constants';
import type { CompanyStatus } from '../../features/companies/types/companies.types';

import styles from './companies.module.css';

export interface CompanyStatusBadgeProps {
  status: CompanyStatus;
}

function getCompanyStatusClassName(status: CompanyStatus): string {
  if (status === 'approved') {
    return `${styles.badge} ${styles.badgeSuccess}`;
  }

  if (status === 'rejected' || status === 'suspended') {
    return `${styles.badge} ${styles.badgeDanger}`;
  }

  if (status === 'pending' || status === 'under_review') {
    return `${styles.badge} ${styles.badgeWarning}`;
  }

  if (status === 'on_hold') {
    return `${styles.badge} ${styles.badgeInfo}`;
  }

  return `${styles.badge} ${styles.badgeNeutral}`;
}

export function CompanyStatusBadge({ status }: CompanyStatusBadgeProps) {
  return (
    <span className={getCompanyStatusClassName(status)}>
      <span aria-hidden="true" className={styles.badgeDot} />
      <span>{COMPANY_STATUS_LABELS[status]}</span>
    </span>
  );
}
