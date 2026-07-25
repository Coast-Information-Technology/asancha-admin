/*
 * src/components/onboarding/onboarding-detail-view.tsx
 *
 * File purpose:
 * Renders one live Admin Onboarding detail record.
 *
 * Role in the project:
 * This view loads GET /admin/onboarding/:onboardingPublicId and presents safe
 * metadata plus sanitized role-specific onboarding sections.
 *
 * Business relevance:
 * Staff need a complete, readable review surface for submitted and in-progress
 * onboarding without confusing onboarding state with verification approval.
 *
 * Security note:
 * Sensitive document URLs, payout details, bank data, secrets, and internal
 * identifiers are excluded by the API normalization layer before rendering.
 */

'use client';

import { useRouter } from 'next/navigation';

import {
  ONBOARDING_PROFILE_TYPE_LABELS,
  ONBOARDING_STATUS_LABELS,
  ONBOARDING_VERIFICATION_LABELS,
} from '../../features/onboarding/constants/onboarding.constants';
import { useOnboardingDetail } from '../../features/onboarding/hooks/use-onboarding-detail';
import type {
  OnboardingStatus,
  OnboardingVerificationStatus,
} from '../../features/onboarding/types/onboarding.types';
import { getApiErrorMessage } from '../../lib/api/api-error';
import { Alert } from '../ui/alert/alert';
import { Badge } from '../ui/badge/badge';
import { Button } from '../ui/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card/card';
import { Skeleton } from '../ui/skeleton/skeleton';
import { PageShell } from '../layout/page-shell/page-shell';

import styles from './onboarding.module.css';

interface OnboardingDetailViewProps {
  onboardingPublicId: string;
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

export function OnboardingDetailView({ onboardingPublicId }: OnboardingDetailViewProps) {
  const router = useRouter();
  const onboardingQuery = useOnboardingDetail(onboardingPublicId);
  const record = onboardingQuery.data;

  if (onboardingQuery.isLoading) {
    return <OnboardingDetailSkeleton />;
  }

  if (onboardingQuery.isError || !record) {
    return (
      <PageShell
        actions={
          <Button onClick={() => router.back()} variant="secondary">
            Back
          </Button>
        }
        description="The requested onboarding record could not be loaded."
        title="Onboarding record"
      >
        <Alert title="Unable to load onboarding record" tone="danger">
          {getApiErrorMessage(onboardingQuery.error)}
        </Alert>
      </PageShell>
    );
  }

  return (
    <PageShell
      actions={
        <div className="asancha-cluster">
          <Button href="/onboarding" variant="secondary">
            All onboarding
          </Button>
          <Button href={`/users/${encodeURIComponent(record.userPublicId)}`} variant="secondary">
            Open user
          </Button>
        </div>
      }
      description="Safe onboarding progress and role-specific data returned by the backend."
      title="Onboarding record"
    >
      <div className={styles.detailStack}>
        <Card>
          <CardHeader>
            <div className={styles.detailHeader}>
              <div className={styles.detailHeading}>
                <p className={styles.detailEyebrow}>Onboarding record</p>
                <h2 className={styles.detailTitle}>{record.email}</h2>
                <p className={styles.detailId}>{record.onboardingPublicId}</p>
              </div>
              <div className={styles.detailBadges}>
                <Badge tone="info">{ONBOARDING_PROFILE_TYPE_LABELS[record.profileType]}</Badge>
                <Badge tone={statusTone(record.status)}>
                  {ONBOARDING_STATUS_LABELS[record.status]}
                </Badge>
                <Badge tone={verificationTone(record.verificationStatus)}>
                  {ONBOARDING_VERIFICATION_LABELS[record.verificationStatus]}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className={styles.metadataGrid}>
              <MetadataItem label="User public ID" value={record.userPublicId} />
              <MetadataItem
                label="Business profile type"
                value={ONBOARDING_PROFILE_TYPE_LABELS[record.businessProfileType]}
              />
              <MetadataItem label="Current step" value={record.currentStep ?? 'Not started'} />
              <MetadataItem label="Created" value={record.createdAtLabel} />
              <MetadataItem label="Updated" value={record.updatedAtLabel} />
              <MetadataItem label="Submitted" value={record.submittedAtLabel ?? 'Not submitted'} />
              <MetadataItem label="Completed" value={record.completedAtLabel ?? 'Not completed'} />
              <MetadataItem label="Safe sections" value={String(record.dataSectionCount)} />
            </div>
          </CardContent>
        </Card>

        <div className={styles.sectionStack}>
          {record.dataSections.map((section) => (
            <Card key={section.key}>
              <CardHeader>
                <div className={styles.sectionHeader}>
                  <CardTitle className={styles.sectionTitle}>{section.label}</CardTitle>
                  <Badge tone="muted">{section.fields.length} fields</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className={styles.fieldGrid}>
                  {section.fields.map((field) => (
                    <div className={styles.field} key={`${section.key}-${field.label}`}>
                      <span className={styles.fieldLabel}>{field.label}</span>
                      <span className={styles.fieldValue}>{field.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
          {record.dataSections.length === 0 ? (
            <Alert title="No safe onboarding fields available" tone="neutral">
              The backend returned no displayable non-sensitive nested fields for this record.
            </Alert>
          ) : null}
        </div>
      </div>
    </PageShell>
  );
}

function MetadataItem({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.metadataItem}>
      <span className={styles.metadataLabel}>{label}</span>
      <span className={styles.metadataValue}>{value}</span>
    </div>
  );
}

function OnboardingDetailSkeleton() {
  return (
    <PageShell description="Loading onboarding record details." title="Onboarding record">
      <div aria-busy="true" className={styles.skeletonDetail}>
        <Card>
          <CardHeader>
            <div className={styles.skeletonStack}>
              <Skeleton height="0.75rem" width="8rem" />
              <Skeleton height="1.5rem" width="18rem" />
              <Skeleton height="0.75rem" width="24rem" />
            </div>
          </CardHeader>
          <CardContent>
            <div className={styles.skeletonGrid}>
              {Array.from({ length: 8 }, (_, index) => (
                <div className={styles.metadataItem} key={index}>
                  <Skeleton height="0.7rem" width="6rem" />
                  <Skeleton height="0.9rem" width="10rem" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton height="1.1rem" width="12rem" />
          </CardHeader>
          <CardContent>
            <div className={styles.skeletonGrid}>
              {Array.from({ length: 6 }, (_, index) => (
                <div className={styles.field} key={index}>
                  <Skeleton height="0.7rem" width="7rem" />
                  <Skeleton height="0.9rem" width="12rem" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
