// src/components/users/user-detail-view.tsx

/**
 * File purpose:
 * Renders the complete User Details profile-management interface for Asancha
 * Admin.
 *
 * Role in the project:
 * This component turns the confirmed GET /admin/users/:userPublicId response
 * into a structured profile header, summary sidebar, read-only detail tabs,
 * refresh feedback, and permission-aware account actions.
 *
 * Key exports:
 * - UserDetailView renders the live user detail route.
 *
 * Business relevance:
 * Staff need a clear identity context before moving into account, profile,
 * verification, security, activity, and related-resource workflows.
 *
 * Security note:
 * Only backend-safe public user fields are rendered. Frontend role checks guide
 * the interface only; backend authorization remains final for every action.
 */

'use client';

import { useState, type ReactNode } from 'react';

import { useUserDetail } from '../../features/users/hooks/use-user-detail';
import type { UserDetail } from '../../features/users/types/users.types';
import { getApiErrorMessage, isApiError } from '../../lib/api/api-error';
import { canPerformPermissionAction } from '../../lib/permissions/action-permissions';
import { getStaffRoleLabel } from '../../lib/auth/staff-role-guards';
import { useStaffAuthStore } from '../../store/staff-auth.store';
import { Alert } from '../ui/alert/alert';
import { Badge, type BadgeTone } from '../ui/badge/badge';
import { Button } from '../ui/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card/card';
import { EmptyState } from '../ui/empty-state/empty-state';
import { ErrorState } from '../ui/error-state/error-state';
import { Input } from '../ui/input/input';
import { PermissionBlocked } from '../ui/permission-blocked/permission-blocked';
import { Skeleton } from '../ui/skeleton/skeleton';
import { Tabs, type TabItem } from '../ui/tabs/tabs';
import { PageShell } from '../layout/page-shell/page-shell';
import { UserRoleBadge } from './user-role-badge';
import { UserStatusBadge } from './user-status-badge';

import styles from './users.module.css';

export interface UserDetailViewProps {
  userPublicId: string;
}

const USER_DETAIL_TABS = [
  { key: 'account', label: 'Account information' },
  { key: 'profile', label: 'Profile details' },
  { key: 'verification', label: 'Verification' },
  { key: 'security', label: 'Security' },
  { key: 'activity', label: 'Activity / audit history' },
] as const satisfies readonly TabItem[];

type UserDetailSection = (typeof USER_DETAIL_TABS)[number]['key'];

interface FeedbackState {
  title: string;
  message: string;
  tone: 'success' | 'danger';
}

function formatLabel(value: string) {
  return value.replace(/_/g, ' ').replace(/^\w/, (character) => character.toUpperCase());
}

function getInitials(email: string) {
  const localPart = email.split('@')[0] ?? email;
  const words = localPart.split(/[._-]+/).filter(Boolean);

  if (words.length >= 2) {
    return `${words[0]?.[0] ?? ''}${words[1]?.[0] ?? ''}`.toUpperCase();
  }

  return localPart.slice(0, 2).toUpperCase();
}

function getVerificationTone(status: UserDetail['verificationStatus']): BadgeTone {
  if (status === 'approved') return 'success';
  if (status === 'rejected' || status === 'flagged') return 'danger';
  if (status === 'not_started') return 'neutral';

  return 'warning';
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return <Input label={label} readOnly value={value} />;
}

function ReadOnlyStatusField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.readOnlyField}>
      <span className={styles.readOnlyLabel}>{label}</span>
      <div className={styles.readOnlyStatus}>{children}</div>
    </div>
  );
}

function UserDetailSkeleton() {
  return (
    <div aria-label="Loading user details" className={styles.detailSkeleton} role="status">
      <Card className={styles.profileCover}>
        <div className={styles.coverSkeleton}>
          <Skeleton height="0.9rem" width="7rem" />
          <Skeleton height="2rem" width="20rem" />
          <Skeleton height="0.9rem" width="15rem" />
        </div>
      </Card>

      <div className={styles.detailLayout}>
        <aside className={styles.summaryColumn}>
          <Card>
            <CardContent className={styles.summarySkeleton}>
              <Skeleton height="5rem" rounded width="5rem" />
              <Skeleton height="1.4rem" width="12rem" />
              <Skeleton height="0.9rem" width="16rem" />
              <div className={styles.skeletonBadgeRow}>
                <Skeleton height="1.5rem" rounded width="5rem" />
                <Skeleton height="1.5rem" rounded width="6rem" />
              </div>
              <div className={styles.skeletonSummaryRows}>
                <Skeleton height="2.3rem" />
                <Skeleton height="2.3rem" />
                <Skeleton height="2.3rem" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton height="1.2rem" width="8rem" />
            </CardHeader>
            <CardContent className={styles.skeletonActions}>
              <Skeleton height="3.5rem" />
              <Skeleton height="2.5rem" width="11rem" />
            </CardContent>
          </Card>
        </aside>

        <Card className={styles.detailPanel}>
          <CardHeader>
            <div className={styles.skeletonTabs}>
              {USER_DETAIL_TABS.map((tab) => (
                <Skeleton height="2.6rem" key={tab.key} width="8rem" />
              ))}
            </div>
          </CardHeader>
          <CardContent className={styles.skeletonPanelContent}>
            <Skeleton height="1.4rem" width="12rem" />
            <div className={styles.skeletonFieldGrid}>
              {Array.from({ length: 6 }, (_, index) => (
                <Skeleton height="4rem" key={index} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function UserDetailView({ userPublicId }: UserDetailViewProps) {
  const userQuery = useUserDetail(userPublicId);
  const actorRole = useStaffAuthStore((state) => state.user?.role ?? null);
  const [activeSection, setActiveSection] = useState<UserDetailSection>('account');
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const user = userQuery.data;

  async function handleRefresh() {
    setFeedback(null);
    const result = await userQuery.refetch();

    if (result.error) {
      setFeedback({
        title: 'Refresh failed',
        message: getApiErrorMessage(result.error),
        tone: 'danger',
      });
      return;
    }

    setFeedback({
      title: 'User details refreshed',
      message: 'The latest user account information is now displayed.',
      tone: 'success',
    });
  }

  if (userQuery.isLoading && !user) {
    return (
      <PageShell description="Loading the selected user record." title="User details">
        <UserDetailSkeleton />
      </PageShell>
    );
  }

  if (userQuery.isError && !user) {
    const isNotFound = isApiError(userQuery.error) && userQuery.error.statusCode === 404;

    return (
      <PageShell description="Review a safe user account record." title="User details">
        {isNotFound ? (
          <EmptyState
            action={
              <Button href="/users" variant="secondary">
                Return to users
              </Button>
            }
            description="The user may have been removed, or you may not have permission to view this record."
            title="User not found"
          />
        ) : (
          <ErrorState
            action={
              <Button loading={userQuery.isFetching} onClick={() => void handleRefresh()}>
                Try again
              </Button>
            }
            description={getApiErrorMessage(userQuery.error)}
            title="Unable to load user details"
          />
        )}
      </PageShell>
    );
  }

  if (!user) {
    return (
      <PageShell description="Review a safe user account record." title="User details">
        <EmptyState
          action={
            <Button href="/users" variant="secondary">
              Return to users
            </Button>
          }
          description="No user data was returned for this record."
          title="User details unavailable"
        />
      </PageShell>
    );
  }

  if (userQuery.isFetching) {
    return (
      <PageShell
        actions={
          <Button disabled loading>
            Refreshing
          </Button>
        }
        description="Refreshing the selected user record."
        title="User details"
      >
        <UserDetailSkeleton />
      </PageShell>
    );
  }

  const canUpdateUserStatus = canPerformPermissionAction({
    action: 'update_user_status',
    role: actorRole,
  });

  return (
    <PageShell
      actions={
        <Button
          loading={userQuery.isFetching}
          onClick={() => void handleRefresh()}
          variant="secondary"
        >
          Refresh details
        </Button>
      }
      description="Review account identity, status, verification, security, and related user workflows."
      title="User details"
    >
      {feedback ? (
        <Alert title={feedback.title} tone={feedback.tone}>
          {feedback.message}
        </Alert>
      ) : null}

      <div aria-busy={userQuery.isFetching} className={styles.detailPage}>
        <Card className={styles.profileCover}>
          <div className={styles.coverContent}>
            <div className={styles.coverEyebrow}>Asancha user account</div>
            <h2 className={styles.coverTitle}>{user.emailLabel}</h2>
            <p className={styles.coverDescription}>
              Public user record · {formatLabel(user.role)} · {user.userPublicId}
            </p>
          </div>
        </Card>

        <div className={styles.detailLayout}>
          <aside className={styles.summaryColumn}>
            <Card className={styles.summaryCard}>
              <CardContent className={styles.summaryContent}>
                <div aria-hidden="true" className={styles.profileAvatar}>
                  {getInitials(user.emailLabel)}
                </div>
                <div className={styles.summaryIdentity}>
                  <h2 className={styles.summaryName}>{user.emailLabel}</h2>
                  <p className={styles.summaryEmail}>{user.emailLabel}</p>
                </div>
                <div className={styles.summaryBadges}>
                  <UserRoleBadge role={user.role} />
                  <UserStatusBadge status={user.status} />
                  <Badge tone={getVerificationTone(user.verificationStatus)}>
                    {user.isVerified ? 'Verified' : 'Not verified'}
                  </Badge>
                </div>
                <dl className={styles.summaryMetadata}>
                  <SummaryMetadata label="Created" value={user.createdAtLabel} />
                  <SummaryMetadata label="Updated" value={user.updatedAtLabel ?? 'Not available'} />
                  <SummaryMetadata label="Public ID" value={user.userPublicId} />
                  <SummaryMetadata
                    label="Password setup"
                    value={user.mustChangePassword ? 'Change required' : 'Current'}
                  />
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className={styles.cardTitleRow}>
                  <CardTitle>Account actions</CardTitle>
                  <Badge tone="muted">Read only</Badge>
                </div>
              </CardHeader>
              <CardContent className={styles.actionContent}>
                {canUpdateUserStatus ? (
                  <>
                    <Alert title="Status action unavailable" tone="warning">
                      The backend status endpoint is pending confirmation and repair.
                    </Alert>
                    <Button
                      disabled
                      title="User status updates are pending backend confirmation."
                      variant="secondary"
                    >
                      Change account status
                    </Button>
                  </>
                ) : (
                  <PermissionBlocked
                    description={`${getStaffRoleLabel(actorRole)} staff cannot activate, suspend, disable, or restore user accounts.`}
                    title="Status updates restricted"
                  />
                )}
                <p className={styles.actionNote}>
                  Account update endpoints are not included in the confirmed read-only user detail
                  contract. No update request is submitted from this page.
                </p>
              </CardContent>
            </Card>
          </aside>

          <section aria-label="User information" className={styles.detailPanel}>
            <Card>
              <Tabs
                activeKey={activeSection}
                items={USER_DETAIL_TABS}
                onChange={(key) => setActiveSection(key as UserDetailSection)}
              >
                <div className={styles.detailTabPanel}>
                  {renderDetailSection(activeSection, user)}
                </div>
              </Tabs>
            </Card>
          </section>
        </div>
      </div>
    </PageShell>
  );
}

function SummaryMetadata({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.summaryMetadataRow}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function renderDetailSection(section: UserDetailSection, user: UserDetail) {
  if (section === 'account') {
    return (
      <div className={styles.sectionStack}>
        <section>
          <div className={styles.sectionHeading}>
            <div>
              <h3>Account information</h3>
              <p>Read-only account values returned by the confirmed admin user endpoint.</p>
            </div>
            <Badge tone="muted">Read only</Badge>
          </div>
          <div className={styles.readOnlyGrid}>
            <ReadOnlyField label="Email address" value={user.emailLabel} />
            <ReadOnlyField label="Phone number" value={user.phoneLabel ?? 'Not provided'} />
            <ReadOnlyField label="Role" value={formatLabel(user.role)} />
            <ReadOnlyStatusField label="Account status">
              <UserStatusBadge status={user.status} />
            </ReadOnlyStatusField>
            <ReadOnlyStatusField label="Verification status">
              <Badge tone={getVerificationTone(user.verificationStatus)}>
                {user.isVerified ? 'Verified' : 'Not verified'}
              </Badge>
            </ReadOnlyStatusField>
            <ReadOnlyField
              label="Password setup"
              value={user.mustChangePassword ? 'Change required' : 'Current'}
            />
          </div>
        </section>

        <section>
          <div className={styles.sectionHeading}>
            <div>
              <h3>Account dates</h3>
              <p>Lifecycle timestamps supplied by the backend.</p>
            </div>
          </div>
          <div className={styles.readOnlyGrid}>
            <ReadOnlyField label="Created" value={user.createdAtLabel} />
            <ReadOnlyField label="Last updated" value={user.updatedAtLabel ?? 'Not available'} />
            <ReadOnlyField label="Public user ID" value={user.userPublicId} />
          </div>
        </section>
      </div>
    );
  }

  if (section === 'verification') {
    return (
      <div className={styles.sectionStack}>
        <section>
          <div className={styles.sectionHeading}>
            <div>
              <h3>Verification overview</h3>
              <p>Current verification status from the user account record.</p>
            </div>
            <Badge tone={getVerificationTone(user.verificationStatus)}>
              {user.isVerified ? 'Verified' : 'Not verified'}
            </Badge>
          </div>
          <div className={styles.readOnlyGrid}>
            <ReadOnlyField
              label="Verification state"
              value={formatLabel(user.verificationStatus)}
            />
            <ReadOnlyField label="Account email" value={user.emailLabel} />
          </div>
        </section>
        <EmptyState
          description="Document-level verification details and review history will appear when their related backend endpoints are confirmed."
          title="No verification review details available"
        />
      </div>
    );
  }

  if (section === 'security') {
    return (
      <div className={styles.sectionStack}>
        <section>
          <div className={styles.sectionHeading}>
            <div>
              <h3>Security overview</h3>
              <p>Safe security indicators available from the user record.</p>
            </div>
          </div>
          <div className={styles.readOnlyGrid}>
            <ReadOnlyField
              label="Email verification"
              value={user.isVerified ? 'Verified' : 'Not verified'}
            />
            <ReadOnlyField
              label="Password setup"
              value={user.mustChangePassword ? 'Change required' : 'Current'}
            />
            <ReadOnlyField label="Account active" value={user.isActive ? 'Yes' : 'No'} />
            <ReadOnlyField label="Account suspended" value={user.isSuspended ? 'Yes' : 'No'} />
          </div>
        </section>
        <Alert title="Sensitive security actions are unavailable" tone="info">
          Password, session, and account recovery controls are not exposed until their protected
          backend contracts are available.
        </Alert>
      </div>
    );
  }

  if (section === 'profile') {
    return (
      <EmptyState
        description="The confirmed user detail response does not include first name, display name, or business profile details. These will be connected when profile endpoints are confirmed."
        title="Profile details unavailable"
      />
    );
  }

  return (
    <EmptyState
      description="Activity and audit history require separate backend endpoints and permission-aware data."
      title="No activity history available"
    />
  );
}
