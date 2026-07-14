// src/components/users/user-detail-header.tsx

/**
 * File purpose:
 * Renders the reusable user detail header for Asancha Admin.
 *
 * Role in the project:
 * This component displays safe user identity, role, account status,
 * verification status, timestamps, and related-count summary.
 *
 * Key exports:
 * - UserDetailHeader renders safe user detail summary.
 *
 * Business relevance:
 * User detail headers provide quick support context before staff review tabs.
 *
 * Security note:
 * This header must not expose ObjectIds, private notes, restricted documents,
 * secrets, raw provider payloads, or unauthorised audit details.
 */

import type { UserDetail } from '../../features/users/types/users.types';

import { UserRoleBadge } from './user-role-badge';
import { UserStatusBadge } from './user-status-badge';

import styles from './users.module.css';

export interface UserDetailHeaderProps {
  user: UserDetail;
}

export function UserDetailHeader({ user }: UserDetailHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div>
          <h2 className={styles.headerTitle}>{user.displayName}</h2>
          <p className={styles.headerDescription}>
            Safe user detail summary for public ID {user.userPublicId}. Internal identifiers must
            never be displayed.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <UserRoleBadge role={user.role} />
          <UserStatusBadge status={user.status} />
        </div>
      </div>

      <div className={styles.headerGrid}>
        <div className={styles.headerItem}>
          <span className={styles.headerItemLabel}>Email</span>
          <span className={styles.headerItemValue}>{user.emailLabel}</span>
        </div>

        <div className={styles.headerItem}>
          <span className={styles.headerItemLabel}>Phone</span>
          <span className={styles.headerItemValue}>{user.phoneLabel ?? 'Not available'}</span>
        </div>

        <div className={styles.headerItem}>
          <span className={styles.headerItemLabel}>Created</span>
          <span className={styles.headerItemValue}>{user.createdAtLabel}</span>
        </div>

        <div className={styles.headerItem}>
          <span className={styles.headerItemLabel}>Last seen</span>
          <span className={styles.headerItemValue}>{user.lastSeenAtLabel ?? 'Not available'}</span>
        </div>

        <div className={styles.headerItem}>
          <span className={styles.headerItemLabel}>Profiles</span>
          <span className={styles.headerItemValue}>{user.relatedCounts.profiles}</span>
        </div>

        <div className={styles.headerItem}>
          <span className={styles.headerItemLabel}>Messages</span>
          <span className={styles.headerItemValue}>{user.relatedCounts.messages}</span>
        </div>
      </div>
    </header>
  );
}
