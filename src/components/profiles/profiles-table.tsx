// src/components/profiles/profiles-table.tsx

/**
 * File purpose:
 * Renders the Asancha Admin profiles table and its loading and empty states.
 *
 * Role in the project:
 * This component displays normalized records returned by GET /admin/profiles
 * and provides navigation to each public profile detail page.
 *
 * Business relevance:
 * Staff can distinguish general profiles from role-specific business profiles,
 * review completion and verification state, and open related workflows.
 *
 * Security note:
 * Profile rows use public IDs and safe backend fields only. Backend visibility,
 * authorization, redaction, and audit logging remain final.
 */

import { Badge } from '../ui/badge/badge';
import { Button } from '../ui/button/button';
import { Skeleton } from '../ui/skeleton/skeleton';

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
  isLoading?: boolean;
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
  isLoading = false,
  emptyTitle = 'No profiles found',
  emptyDescription = 'No profile records match this view. Try another profile section or filter.',
}: ProfilesTableProps) {
  if (profiles.length === 0 && !isLoading) {
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
          {isLoading
            ? Array.from({ length: 6 }, (_, index) => (
                <tr key={`profile-skeleton-${index}`}>
                  <td>
                    <div className={styles.skeletonStack}>
                      <Skeleton height="0.9rem" width="9rem" />
                      <Skeleton height="0.7rem" width="15rem" />
                    </div>
                  </td>
                  <td>
                    <Skeleton height="1.5rem" rounded width="6rem" />
                  </td>
                  <td>
                    <Skeleton height="1.5rem" rounded width="5rem" />
                  </td>
                  <td>
                    <Skeleton height="1.5rem" rounded width="6rem" />
                  </td>
                  <td>
                    <Skeleton height="0.8rem" width="5rem" />
                  </td>
                  <td>
                    <Skeleton height="0.8rem" width="7rem" />
                  </td>
                  <td>
                    <Skeleton height="0.8rem" width="7rem" />
                  </td>
                  <td>
                    <Skeleton height="2rem" rounded width="4.5rem" />
                  </td>
                </tr>
              ))
            : profiles.map((profile) => (
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
