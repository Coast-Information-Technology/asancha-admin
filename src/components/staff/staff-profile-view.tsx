/**
 * Renders the authenticated staff member's profile from the current session.
 * The session is hydrated by the local auth route, which reads GET /users/me.
 */

'use client';

import type { ReactNode } from 'react';

import { useStaffSession } from '../../features/auth/hooks/use-staff-session';
import { getApiErrorMessage } from '../../lib/api/api-error';
import type { StaffUserSummary } from '../../lib/auth/staff-session';
import { formatDateTime } from '../../lib/formatters/date';
import { formatRoleLabel } from '../../lib/formatters/role-label';
import { formatStatusLabel, getStatusTone } from '../../lib/formatters/status-label';
import { useStaffAuthStore, type StaffAuthUser } from '../../store/staff-auth.store';
import { Alert } from '../ui/alert/alert';
import { Badge, type BadgeTone } from '../ui/badge/badge';
import { Button } from '../ui/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card/card';
import { Skeleton } from '../ui/skeleton/skeleton';

import styles from './staff-profile.module.css';

const FALLBACK_VALUE = 'Not available';

interface DetailRowProps {
  label: string;
  children: ReactNode;
}

function DetailRow({ label, children }: DetailRowProps) {
  return (
    <div className={styles.detailRow}>
      <dt className={styles.detailLabel}>{label}</dt>
      <dd className={styles.detailValue}>{children}</dd>
    </div>
  );
}

function getBadgeTone(status: unknown): BadgeTone {
  const tone = getStatusTone(status);

  return tone === 'pending' ? 'warning' : tone;
}

function getVerificationStatus(user: StaffUserSummary): string {
  if (user.isVerified === true) {
    return 'verified';
  }

  if (user.isVerified === false) {
    return 'unverified';
  }

  return 'unknown';
}

function getAccountInitials(displayName: string, email: string): string {
  const words = displayName.trim().split(/\s+/).filter(Boolean);

  if (words.length >= 2) {
    return `${words[0]?.[0] ?? ''}${words[1]?.[0] ?? ''}`.toUpperCase();
  }

  return (words[0]?.slice(0, 2) || email.slice(0, 2)).toUpperCase();
}

function toProfileUser(user: StaffAuthUser): StaffUserSummary {
  return {
    publicId: user.staffPublicId,
    email: user.email,
    phoneNumber: user.phoneNumber,
    firstName: user.firstName,
    lastName: user.lastName,
    displayName: user.displayName,
    role: user.role,
    accountStatus: user.accountStatus,
    isVerified: user.isVerified,
    emailVerifiedAt: user.emailVerifiedAt,
    onboardingStatus: user.onboardingStatus,
    isActive: user.isActive,
    isSuspended: user.isSuspended,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function ProfileSkeleton() {
  return (
    <div aria-label="Loading profile" className={styles.profileStack} role="status">
      <Card>
        <CardContent className={styles.skeletonHero}>
          <Skeleton height="4.5rem" rounded width="4.5rem" />
          <div className={styles.skeletonCopy}>
            <Skeleton height="1rem" width="8rem" />
            <Skeleton height="2rem" width="18rem" />
            <Skeleton height="1rem" width="14rem" />
          </div>
        </CardContent>
      </Card>
      <div className={styles.infoGrid}>
        {['contact', 'status'].map((section) => (
          <Card key={section}>
            <CardHeader>
              <Skeleton height="1.25rem" width="9rem" />
            </CardHeader>
            <CardContent className={styles.skeletonRows}>
              <Skeleton height="2.25rem" />
              <Skeleton height="2.25rem" />
              <Skeleton height="2.25rem" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function StaffProfileView() {
  const storedUser = useStaffAuthStore((state) => state.user);
  const sessionQuery = useStaffSession({ enabled: true });
  const sessionUser = sessionQuery.data?.session?.user;
  const user = sessionUser ?? (storedUser ? toProfileUser(storedUser) : null);

  if (sessionQuery.isLoading && !user) {
    return <ProfileSkeleton />;
  }

  if (sessionQuery.isError && !user) {
    return (
      <Alert title="Unable to load your profile" tone="danger">
        {getApiErrorMessage(sessionQuery.error)}
      </Alert>
    );
  }

  if (!user) {
    return (
      <Alert title="Staff profile unavailable" tone="warning">
        Your authenticated staff profile could not be found. Please sign in again.
      </Alert>
    );
  }

  // GET /users/me currently provides email but no firstName/displayName.
  const displayName = user.email;
  const verificationStatus = getVerificationStatus(user);
  const accountStatus = user.accountStatus;
  const onboardingStatus = user.onboardingStatus ?? 'unknown';
  const initials = getAccountInitials(displayName, user.email);

  return (
    <div className={styles.profileStack}>
      <Card className={styles.profileHero}>
        <CardContent className={styles.heroContent}>
          <div aria-hidden="true" className={styles.avatar}>
            {initials}
          </div>

          <div className={styles.identity}>
            <div className={styles.eyebrow}>Authenticated staff account</div>
            <h2 className={styles.profileName}>{displayName}</h2>
            <p className={styles.profileEmail}>{user.email}</p>
            <div className={styles.badgeRow}>
              <Badge tone="info">{formatRoleLabel(user.role)}</Badge>
              <Badge tone={getBadgeTone(accountStatus)}>{formatStatusLabel(accountStatus)}</Badge>
            </div>
          </div>

          <div className={styles.profileId}>
            <span>Public staff ID</span>
            <code>{user.publicId}</code>
          </div>
        </CardContent>
      </Card>

      <div className={styles.infoGrid}>
        <Card>
          <CardHeader>
            <CardTitle>Contact details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className={styles.detailList}>
              <DetailRow label="Email">
                <a className={styles.valueLink} href={`mailto:${user.email}`}>
                  {user.email}
                </a>
              </DetailRow>
              <DetailRow label="Phone number">
                {user.phoneNumber ? (
                  <a className={styles.valueLink} href={`tel:${user.phoneNumber}`}>
                    {user.phoneNumber}
                  </a>
                ) : (
                  FALLBACK_VALUE
                )}
              </DetailRow>
              <DetailRow label="Role">{formatRoleLabel(user.role)}</DetailRow>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account status</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className={styles.detailList}>
              <DetailRow label="Account">
                <Badge tone={getBadgeTone(accountStatus)}>{formatStatusLabel(accountStatus)}</Badge>
              </DetailRow>
              <DetailRow label="Verification">
                <Badge tone={getBadgeTone(verificationStatus)}>
                  {formatStatusLabel(verificationStatus)}
                </Badge>
              </DetailRow>
              <DetailRow label="Onboarding">
                <Badge tone={getBadgeTone(onboardingStatus)}>
                  {formatStatusLabel(onboardingStatus)}
                </Badge>
              </DetailRow>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account dates</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className={styles.dateGrid}>
            <div className={styles.dateItem}>
              <dt>Account created</dt>
              <dd>{formatDateTime(user.createdAt, { fallback: FALLBACK_VALUE })}</dd>
            </div>
            <div className={styles.dateItem}>
              <dt>Email verified</dt>
              <dd>{formatDateTime(user.emailVerifiedAt, { fallback: FALLBACK_VALUE })}</dd>
            </div>
            <div className={styles.dateItem}>
              <dt>Last updated</dt>
              <dd>{formatDateTime(user.updatedAt, { fallback: FALLBACK_VALUE })}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}

export function StaffProfileActions() {
  return (
    <>
      <Button href="/my-profile/security" variant="secondary">
        Security
      </Button>
      <Button href="/my-profile/notifications" variant="secondary">
        Notification preferences
      </Button>
    </>
  );
}
