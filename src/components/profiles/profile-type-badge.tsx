// src/components/profiles/profile-type-badge.tsx

/**
 * File purpose:
 * Renders an accessible profile type badge for Asancha Admin.
 *
 * Role in the project:
 * This component displays investor, property owner, property agent, property
 * sourcer, and service provider profile type labels consistently.
 *
 * Key exports:
 * - ProfileTypeBadge renders a profile type label.
 *
 * Business relevance:
 * Profile type determines the business context and review workflow for a public
 * user profile.
 *
 * Security note:
 * Type display is not authorization. Backend permissions and profile visibility
 * remain final.
 */

import { PROFILE_TYPE_LABELS } from '../../features/profiles/constants/profiles.constants';
import type { ProfileType } from '../../features/profiles/types/profiles.types';

import styles from './profiles.module.css';

export interface ProfileTypeBadgeProps {
  profileType: ProfileType;
}

function getProfileTypeClassName(profileType: ProfileType): string {
  if (profileType === 'investor') {
    return `${styles.badge} ${styles.badgeInfo}`;
  }

  if (profileType === 'property_owner') {
    return `${styles.badge} ${styles.badgeSuccess}`;
  }

  if (profileType === 'property_agent') {
    return `${styles.badge} ${styles.badgeWarning}`;
  }

  if (profileType === 'property_sourcer') {
    return `${styles.badge} ${styles.badgeInfo}`;
  }

  return `${styles.badge} ${styles.badgeNeutral}`;
}

export function ProfileTypeBadge({ profileType }: ProfileTypeBadgeProps) {
  return (
    <span className={getProfileTypeClassName(profileType)}>
      <span aria-hidden="true" className={styles.badgeDot} />
      <span>{PROFILE_TYPE_LABELS[profileType]}</span>
    </span>
  );
}
