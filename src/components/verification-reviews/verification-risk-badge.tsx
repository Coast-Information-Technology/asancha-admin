// src/components/verification-reviews/verification-risk-badge.tsx

/**
 * File purpose:
 * Renders an accessible verification risk badge for Asancha Admin.
 *
 * Role in the project:
 * This component displays safe verification risk labels with text and a visual
 * marker that does not rely on colour alone.
 *
 * Key exports:
 * - VerificationRiskBadge renders a verification risk label.
 *
 * Business relevance:
 * Verification risk labels help authorised staff prioritise KYC/AML readiness,
 * profile/company/property/API-partner review, document checks, and sensitive
 * action unlocks.
 *
 * Security note:
 * This component displays a safe label only. It must not expose raw risk
 * payloads, private KYC notes, internal notes, document URLs, ObjectIds, or
 * unauthorised audit context. Backend redaction remains final.
 */

import { VERIFICATION_RISK_RATING_LABELS } from '../../features/verification-reviews/constants/verification-reviews.constants';
import type { VerificationRiskRating } from '../../features/verification-reviews/types/verification-reviews.types';

import styles from './verification-reviews.module.css';

export interface VerificationRiskBadgeProps {
  riskRating: VerificationRiskRating;
}

function getVerificationRiskClassName(riskRating: VerificationRiskRating): string {
  if (riskRating === 'critical' || riskRating === 'high') {
    return `${styles.badge} ${styles.badgeDanger}`;
  }

  if (riskRating === 'medium') {
    return `${styles.badge} ${styles.badgeWarning}`;
  }

  if (riskRating === 'low') {
    return `${styles.badge} ${styles.badgeInfo}`;
  }

  return `${styles.badge} ${styles.badgeNeutral}`;
}

export function VerificationRiskBadge({ riskRating }: VerificationRiskBadgeProps) {
  return (
    <span className={getVerificationRiskClassName(riskRating)}>
      <span aria-hidden="true" className={styles.badgeDot} />
      <span>{VERIFICATION_RISK_RATING_LABELS[riskRating]}</span>
    </span>
  );
}
