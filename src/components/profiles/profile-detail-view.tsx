// src/components/profiles/profile-detail-view.tsx

/**
 * File purpose:
 * Renders the live Asancha Admin profile detail experience.
 *
 * Role in the project:
 * This component loads GET /admin/profiles/:profilePublicId and presents the
 * profile through a cover, summary-card, and tabbed detail layout.
 *
 * Business relevance:
 * Staff can scan profile identity, account state, completion, verification, and
 * safe related workflows without leaving the profile record.
 *
 * Security note:
 * The page uses public IDs and backend-supplied safe fields only. Profile data
 * is read-only until a profile update endpoint is confirmed by the backend.
 */

'use client';

import { useState, type ReactNode } from 'react';

import {
  PROFILE_STATUS_LABELS,
  PROFILE_TYPE_ROUTES,
  PROFILE_VERIFICATION_STATUS_LABELS,
} from '../../features/profiles/constants/profiles.constants';
import { useProfilesDetail } from '../../features/profiles/hooks/use-profiles-detail';
import type { ProfileDetail as ProfileDetailData } from '../../features/profiles/types/profiles.types';
import { getApiErrorMessage } from '../../lib/api/api-error';
import { Alert } from '../ui/alert/alert';
import { Badge, type BadgeTone } from '../ui/badge/badge';
import { Button } from '../ui/button/button';
import { Card, CardContent, CardHeader } from '../ui/card/card';
import { PageShell } from '../layout/page-shell/page-shell';
import { Skeleton } from '../ui/skeleton/skeleton';

import { ProfileStatusBadge } from './profile-status-badge';
import { ProfileTypeBadge } from './profile-type-badge';

import styles from './profile-detail-view.module.css';

export interface ProfileDetailViewProps {
  profilePublicId: string;
}

type ProfileTab = 'account' | 'verification' | 'related';

const TABS: readonly { id: ProfileTab; label: string }[] = [
  { id: 'account', label: 'Account information' },
  { id: 'verification', label: 'Verification' },
  { id: 'related', label: 'Related workflows' },
];

function getStatusTone(status: ProfileDetailData['status']): BadgeTone {
  if (status === 'approved' || status === 'completed') return 'success';
  if (status === 'rejected' || status === 'suspended') return 'danger';
  if (
    status === 'pending' ||
    status === 'under_review' ||
    status === 'correction_requested' ||
    status === 'on_hold'
  ) {
    return 'warning';
  }

  return 'neutral';
}

function getVerificationTone(status: ProfileDetailData['verificationStatus']): BadgeTone {
  if (status === 'approved') return 'success';
  if (status === 'rejected' || status === 'flagged') return 'danger';
  if (status === 'not_available') return 'neutral';
  return 'warning';
}

function formatValue(value: string) {
  return value.replace(/_/g, ' ');
}

function getInitials(profile: ProfileDetailData) {
  const name = profile.displayName || profile.emailLabel;
  const parts = name.split(/\s+/).filter(Boolean);

  if (parts.length > 1) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }

  return name.slice(0, 2).toUpperCase();
}

function ProfileLoadingState() {
  return (
    <PageShell title="Profile">
      <div className={styles.loadingLayout}>
        <Skeleton className={styles.loadingCover} height="13rem" />
        <div className={styles.loadingColumns}>
          <Card className={styles.loadingSummaryCard}>
            <CardContent className={styles.loadingSummaryContent}>
              <Skeleton className={styles.loadingAvatar} height="7rem" rounded width="7rem" />
              <Skeleton height="1rem" width="8rem" />
              <Skeleton height="0.8rem" width="13rem" />
              <Skeleton height="1.5rem" rounded width="7rem" />
              <div className={styles.loadingRows}>
                <Skeleton height="2.5rem" width="100%" />
                <Skeleton height="2.5rem" width="100%" />
                <Skeleton height="2.5rem" width="100%" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className={styles.loadingTabs}>
              <Skeleton height="1rem" width="8rem" />
              <Skeleton height="1rem" width="7rem" />
              <Skeleton height="1rem" width="6rem" />
              <Skeleton height="1rem" width="8rem" />
            </CardHeader>
            <CardContent className={styles.loadingFields}>
              {Array.from({ length: 6 }, (_, index) => (
                <div className={styles.loadingField} key={`profile-field-skeleton-${index}`}>
                  <Skeleton height="0.7rem" width="5rem" />
                  <Skeleton height="2.6rem" width="100%" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

export function ProfileDetailView({ profilePublicId }: ProfileDetailViewProps) {
  const profileQuery = useProfilesDetail(profilePublicId);
  const [activeTab, setActiveTab] = useState<ProfileTab>('account');

  if (profileQuery.isLoading && !profileQuery.data) {
    return <ProfileLoadingState />;
  }

  if (profileQuery.isError || !profileQuery.data) {
    return (
      <PageShell title="Profile">
        <Alert title="Unable to load profile" tone="danger">
          <p>{getApiErrorMessage(profileQuery.error)}</p>
          <Button onClick={() => void profileQuery.refetch()} variant="secondary">
            Try again
          </Button>
        </Alert>
      </PageShell>
    );
  }

  const profile = profileQuery.data;
  const roleRoute =
    profile.profileType === 'general' ? null : PROFILE_TYPE_ROUTES[profile.profileType];

  return (
    <PageShell title="Profile">
      <div className={styles.profileLayout}>
        <section aria-label="Profile cover" className={styles.cover}>
          <div className={styles.coverPattern} />
          <div className={styles.coverActions}>
            <Button href="/profiles" size="sm" variant="secondary">
              Back to profiles
            </Button>
            <Button
              disabled={profileQuery.isFetching}
              loading={profileQuery.isFetching}
              onClick={() => void profileQuery.refetch()}
              size="sm"
              variant="secondary"
            >
              Refresh
            </Button>
          </div>
        </section>

        <div className={styles.profileColumns}>
          <ProfileSummaryCard profile={profile} roleRoute={roleRoute} />

          <main className={styles.detailPanel}>
            <nav aria-label="Profile detail sections" className={styles.tabs} role="tablist">
              {TABS.map((tab) => (
                <button
                  aria-selected={activeTab === tab.id}
                  className={activeTab === tab.id ? styles.tabActive : styles.tab}
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            <div className={styles.tabContent}>
              {activeTab === 'account' ? <AccountTab profile={profile} /> : null}
              {activeTab === 'verification' ? <VerificationTab profile={profile} /> : null}
              {activeTab === 'related' ? (
                <RelatedTab profile={profile} roleRoute={roleRoute} />
              ) : null}
            </div>
          </main>
        </div>
      </div>
    </PageShell>
  );
}

function ProfileSummaryCard({
  profile,
  roleRoute,
}: {
  profile: ProfileDetailData;
  roleRoute: string | null;
}) {
  return (
    <aside aria-label="Profile summary" className={styles.summaryCard}>
      <div className={styles.summaryIdentity}>
        <div aria-hidden="true" className={styles.avatar}>
          {getInitials(profile)}
        </div>
        <h2>{profile.displayName}</h2>
        <p>{profile.emailLabel}</p>
        <div className={styles.identityBadges}>
          <ProfileTypeBadge profileType={profile.profileType} />
          <Badge tone={getStatusTone(profile.status)}>
            {PROFILE_STATUS_LABELS[profile.status]}
          </Badge>
        </div>
      </div>

      <div className={styles.summaryRows}>
        <SummaryRow label="Verification">
          <Badge tone={getVerificationTone(profile.verificationStatus)}>
            {PROFILE_VERIFICATION_STATUS_LABELS[profile.verificationStatus]}
          </Badge>
        </SummaryRow>
        <SummaryRow label="Account status">
          <Badge tone={profile.isActive ? 'success' : 'danger'}>
            {profile.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </SummaryRow>
        <SummaryRow label="Profile created" value={profile.createdAtLabel} />
      </div>

      <div className={styles.summaryActions}>
        <Button href={`/users/${encodeURIComponent(profile.userPublicId)}`} variant="secondary">
          View related user
        </Button>
        {roleRoute ? (
          <Button href={roleRoute} variant="ghost">
            View similar profiles
          </Button>
        ) : null}
      </div>
    </aside>
  );
}

function SummaryRow({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: ReactNode;
}) {
  return (
    <div className={styles.summaryRow}>
      <span>{label}</span>
      {children ?? <strong>{value}</strong>}
    </div>
  );
}

function AccountTab({ profile }: { profile: ProfileDetailData }) {
  return (
    <section aria-labelledby="account-information-heading" className={styles.tabSection}>
      <div className={styles.sectionHeading}>
        <div>
          <h2 id="account-information-heading">Account information</h2>
          <p>Read-only account details returned by the profile service.</p>
        </div>
        <Badge tone="neutral">Read only</Badge>
      </div>

      <dl className={styles.fieldGrid}>
        <ReadOnlyField label="First name" value={profile.firstName ?? 'Not provided'} />
        <ReadOnlyField label="Last name" value={profile.lastName ?? 'Not provided'} />
        <ReadOnlyField label="Phone number" value={profile.phoneNumber ?? 'Not provided'} />
        <ReadOnlyField label="Email address" value={profile.emailLabel} />
        <ReadOnlyField
          label="Preferred contact method"
          value={profile.preferredContactMethod ?? 'Not provided'}
        />
        <ReadOnlyField
          label="Profile type"
          value={<ProfileTypeBadge profileType={profile.profileType} />}
        />
        <ReadOnlyField label="Created" value={profile.createdAtLabel} />
        <ReadOnlyField label="Last updated" value={profile.updatedAtLabel ?? 'Not available'} />
      </dl>
    </section>
  );
}

function VerificationTab({ profile }: { profile: ProfileDetailData }) {
  return (
    <section aria-labelledby="verification-heading" className={styles.tabSection}>
      <div className={styles.sectionHeading}>
        <div>
          <h2 id="verification-heading">Verification</h2>
          <p>Current verification and profile readiness state.</p>
        </div>
      </div>

      <dl className={styles.fieldGrid}>
        <ReadOnlyField
          label="Verification status"
          value={
            <Badge tone={getVerificationTone(profile.verificationStatus)}>
              {PROFILE_VERIFICATION_STATUS_LABELS[profile.verificationStatus]}
            </Badge>
          }
        />
        <ReadOnlyField
          label="Profile completion"
          value={formatValue(profile.profileCompletionStatus ?? 'not_available')}
        />
        <ReadOnlyField
          label="Profile status"
          value={<ProfileStatusBadge status={profile.status} />}
        />
        <ReadOnlyField label="Account status" value={profile.isActive ? 'Active' : 'Inactive'} />
      </dl>
    </section>
  );
}

function RelatedTab({
  profile,
  roleRoute,
}: {
  profile: ProfileDetailData;
  roleRoute: string | null;
}) {
  const related = profile.relatedSummary;

  return (
    <section aria-labelledby="related-workflows-heading" className={styles.tabSection}>
      <div className={styles.sectionHeading}>
        <div>
          <h2 id="related-workflows-heading">Related workflows</h2>
          <p>Navigate to records associated with this profile.</p>
        </div>
      </div>

      <div className={styles.relatedGrid}>
        <RelatedLink
          label="Related user"
          href={`/users/${encodeURIComponent(profile.userPublicId)}`}
        />
        <RelatedLink label="All profiles" href="/profiles" />
        {roleRoute ? <RelatedLink label="Similar profiles" href={roleRoute} /> : null}
        <RelatedLink label="Verification reviews" href="/verification-reviews" />
      </div>

      {related ? (
        <div className={styles.relatedCounts}>
          <RelatedCount
            label="Properties"
            value={related.relatedPropertiesCount}
            href="/properties"
          />
          <RelatedCount label="Listings" value={related.relatedListingsCount} href="/listings" />
          <RelatedCount label="Documents" value={related.relatedDocumentsCount} href="/documents" />
          <RelatedCount
            label="Verification reviews"
            value={related.relatedVerificationReviewsCount}
            href="/verification-reviews"
          />
        </div>
      ) : null}
    </section>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className={styles.readOnlyField}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function RelatedLink({ label, href }: { label: string; href: string }) {
  return (
    <Card className={styles.relatedLinkCard}>
      <CardContent>
        <div className="asancha-cluster-between">
          <strong>{label}</strong>
          <Button href={href} size="sm" variant="secondary">
            Open
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function RelatedCount({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <div className={styles.relatedCount}>
      <span>{label}</span>
      <strong>{value}</strong>
      <Button href={href} size="sm" variant="ghost">
        View
      </Button>
    </div>
  );
}
