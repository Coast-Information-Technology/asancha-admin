/*
 * src/components/onboarding/onboarding-table.tsx
 *
 * File purpose:
 * Renders the safe Admin Onboarding records table.
 *
 * Role in the project:
 * This component displays confirmed onboarding list records, workflow state,
 * verification state, dates, and navigation to public-ID detail pages.
 *
 * Business relevance:
 * Staff use this queue to identify incomplete onboarding and records waiting
 * for verification review across supported public business roles.
 *
 * Security note:
 * Rows display safe public IDs and sanitized data only. Backend authorization,
 * redaction, and audit logging remain final.
 */

import { Badge } from '../ui/badge/badge';
import { Button } from '../ui/button/button';
import { Skeleton } from '../ui/skeleton/skeleton';

import {
  ONBOARDING_PROFILE_TYPE_LABELS,
  ONBOARDING_STATUS_LABELS,
  ONBOARDING_VERIFICATION_LABELS,
} from '../../features/onboarding/constants/onboarding.constants';
import type {
  OnboardingListItem,
  OnboardingStatus,
  OnboardingVerificationStatus,
} from '../../features/onboarding/types/onboarding.types';

import styles from './onboarding.module.css';

export interface OnboardingTableProps {
  items: readonly OnboardingListItem[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

function statusTone(status: OnboardingStatus) {
  if (status === 'completed') return 'success' as const;
  if (status === 'rejected') return 'danger' as const;
  if (status === 'in_progress' || status === 'submitted' || status === 'on_hold') {
    return 'warning' as const;
  }

  return 'neutral' as const;
}

function verificationTone(status: OnboardingVerificationStatus) {
  if (status === 'approved') return 'success' as const;
  if (status === 'rejected' || status === 'flagged') return 'danger' as const;
  if (status === 'pending' || status === 'in_review') return 'warning' as const;

  return 'neutral' as const;
}

export function OnboardingTable({
  items,
  isLoading = false,
  emptyTitle = 'No onboarding records found',
  emptyDescription = 'No onboarding records match the selected filters.',
}: OnboardingTableProps) {
  if (!isLoading && items.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>{emptyTitle}</p>
        <p className={styles.emptyDescription}>{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div aria-busy={isLoading} className={styles.tableWrap}>
      <table className={styles.table}>
        <caption className="asancha-sr-only">
          {isLoading ? 'Loading onboarding records' : 'Onboarding records'}
        </caption>
        <thead>
          <tr>
            <th scope="col">Onboarding record</th>
            <th scope="col">Profile type</th>
            <th scope="col">Status</th>
            <th scope="col">Verification</th>
            <th scope="col">Current step</th>
            <th scope="col">Submitted</th>
            <th scope="col">Data sections</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: 6 }, (_, index) => <OnboardingSkeletonRow key={index} />)
            : items.map((item) => (
                <tr key={item.onboardingPublicId}>
                  <td>
                    <p className={styles.recordTitle}>{item.email}</p>
                    <div className={styles.recordMeta}>
                      <span>{item.onboardingPublicId}</span>
                      <span>User: {item.userPublicId}</span>
                    </div>
                  </td>
                  <td>
                    <Badge tone="info">{ONBOARDING_PROFILE_TYPE_LABELS[item.profileType]}</Badge>
                  </td>
                  <td>
                    <Badge tone={statusTone(item.status)}>
                      {ONBOARDING_STATUS_LABELS[item.status]}
                    </Badge>
                  </td>
                  <td>
                    <Badge tone={verificationTone(item.verificationStatus)}>
                      {ONBOARDING_VERIFICATION_LABELS[item.verificationStatus]}
                    </Badge>
                  </td>
                  <td className={styles.mutedText}>{item.currentStep ?? 'Not started'}</td>
                  <td className={styles.mutedText}>{item.submittedAtLabel ?? 'Not submitted'}</td>
                  <td className={styles.mutedText}>{item.dataSectionCount}</td>
                  <td>
                    <Button href={item.href} size="sm" variant="secondary">
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

function OnboardingSkeletonRow() {
  return (
    <tr aria-hidden="true">
      <td>
        <div className={styles.skeletonStack}>
          <Skeleton height="0.9rem" width="14rem" />
          <Skeleton height="0.7rem" width="18rem" />
          <Skeleton height="0.7rem" width="15rem" />
        </div>
      </td>
      <td>
        <Skeleton height="1.5rem" rounded width="7rem" />
      </td>
      <td>
        <Skeleton height="1.5rem" rounded width="6rem" />
      </td>
      <td>
        <Skeleton height="1.5rem" rounded width="6rem" />
      </td>
      <td>
        <Skeleton height="0.8rem" width="7rem" />
      </td>
      <td>
        <Skeleton height="0.8rem" width="8rem" />
      </td>
      <td>
        <Skeleton height="0.8rem" width="2rem" />
      </td>
      <td>
        <Skeleton height="2rem" rounded width="4.5rem" />
      </td>
    </tr>
  );
}
