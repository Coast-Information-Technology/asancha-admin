// src/components/profiles/profiles-table.tsx

/**
 * File purpose:
 * Renders a reusable profiles table for Asancha Admin.
 *
 * Role in the project:
 * This component displays safe profile list rows with profile type, status,
 * verification status, related user context, company context, timestamps, and a
 * navigation action to the profile detail page.
 *
 * Key exports:
 * - ProfilesTable renders profile list items.
 *
 * Business relevance:
 * Profile tables power role-specific profile screens and review/support
 * workflows for investors, owners, agents, sourcers, and service providers.
 *
 * Security note:
 * Profile rows must use public IDs only and must not expose ObjectIds, private
 * KYC notes, internal admin notes, restricted document URLs, secrets, or
 * unauthorised audit details.
 */

import { Badge } from '../ui/badge/badge';
import { Button } from '../ui/button/button';

import { PROFILE_VERIFICATION_STATUS_LABELS } from '../../features/profiles/constants/profiles.constants';
import type {
  ProfileListItem,
  ProfileVerificationStatus,
} from '../../features/profiles/types/profiles.types';

import { ProfileStatusBadge } from './profile-status-badge';
import { ProfileTypeBadge } from './profile-type-badge';

import styles from './profiles.module.css';

export interface ProfilesTableProps {
  profiles: readonly ProfileListItem[];
  emptyTitle?: string;
  emptyDescription?: string;
}

function getVerificationTone(status: ProfileVerificationStatus) {
  if (status === 'approved') {
    return 'success';
  }

  if (status === 'rejected' || status === 'flagged') {
    return 'danger';
  }

  if (status === 'pending' || status === 'in_review') {
    return 'warning';
  }

  return 'neutral';
}

export function ProfilesTable({
  profiles,
  emptyTitle = 'No profiles found',
  emptyDescription = 'No profile records match this view yet. Try adjusting filters when live search is connected.',
}: ProfilesTableProps) {
  if (profiles.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>{emptyTitle}</p>
        <p className={styles.emptyDescription}>{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Profile</th>
            <th scope="col">Type</th>
            <th scope="col">Status</th>
            <th scope="col">Verification</th>
            <th scope="col">Company</th>
            <th scope="col">Created</th>
            <th scope="col">Updated</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.profilePublicId}>
              <td>
                <p className={styles.profileTitle}>{profile.displayName}</p>
                <div className={styles.profileMeta}>
                  <span>{profile.emailLabel}</span>
                  <span aria-hidden="true">•</span>
                  <span>{profile.profilePublicId}</span>
                  <span aria-hidden="true">•</span>
                  <span>User: {profile.userPublicId}</span>
                </div>
              </td>

              <td>
                <ProfileTypeBadge profileType={profile.profileType} />
              </td>

              <td>
                <ProfileStatusBadge status={profile.status} />
              </td>

              <td>
                <Badge tone={getVerificationTone(profile.verificationStatus)}>
                  {PROFILE_VERIFICATION_STATUS_LABELS[profile.verificationStatus]}
                </Badge>
              </td>

              <td>{profile.companyLabel ?? 'Not linked'}</td>

              <td>{profile.createdAtLabel}</td>

              <td>{profile.updatedAtLabel ?? 'Not available'}</td>

              <td>
                <Button href={profile.href} size="sm" variant="secondary">
                  Open
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
