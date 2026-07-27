/*
 * src/components/onboarding/onboarding-detail-view.tsx
 *
 * File purpose:
 * Renders one live Admin Onboarding detail record in a structured operations
 * workspace.
 *
 * Role in the project:
 * This view loads GET /admin/onboarding/:onboardingPublicId and presents the
 * record summary, workflow progress, account metadata, verification state, and
 * sanitized role-specific onboarding sections.
 *
 * Business relevance:
 * Staff need a quick way to understand who owns an onboarding record, where the
 * workflow currently stands, and which safe data is available for review.
 *
 * Security note:
 * Sensitive document URLs, payout details, bank data, secrets, and internal
 * identifiers are excluded by the API normalization layer before rendering.
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  ONBOARDING_PROFILE_TYPE_LABELS,
  ONBOARDING_STATUS_LABELS,
  ONBOARDING_VERIFICATION_LABELS,
} from '../../features/onboarding/constants/onboarding.constants';
import { useOnboardingDetail } from '../../features/onboarding/hooks/use-onboarding-detail';
import type {
  OnboardingDataSection,
  OnboardingStatus,
  OnboardingVerificationStatus,
} from '../../features/onboarding/types/onboarding.types';
import { getApiErrorMessage } from '../../lib/api/api-error';
import { Alert } from '../ui/alert/alert';
import { Badge } from '../ui/badge/badge';
import { Button } from '../ui/button/button';
import { Skeleton } from '../ui/skeleton/skeleton';
import { PageShell } from '../layout/page-shell/page-shell';

import styles from './onboarding.module.css';

interface OnboardingDetailViewProps {
  onboardingPublicId: string;
}

type DetailTab = 'overview' | 'account' | 'data' | 'verification';

const DETAIL_TABS: readonly { id: DetailTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'account', label: 'Account information' },
  { id: 'data', label: 'Onboarding data' },
  { id: 'verification', label: 'Verification' },
];

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

function getInitials(email: string): string {
  const localPart = email.split('@')[0] ?? email;
  const parts = localPart.split(/[._-]+/).filter(Boolean);

  if (parts.length > 1) {
    return `${parts[0]?.[0] ?? ''}${parts[1]?.[0] ?? ''}`.toUpperCase();
  }

  return localPart.slice(0, 2).toUpperCase();
}

function getProgressPercent(status: OnboardingStatus, sectionCount: number): number {
  if (status === 'completed') return 100;
  if (status === 'submitted') return 90;
  if (status === 'in_progress') return Math.min(75, Math.max(15, sectionCount * 20));
  if (status === 'rejected' || status === 'on_hold') return 65;

  return 0;
}

function getWorkflowSteps(
  profileType: string,
  sections: readonly OnboardingDataSection[],
): readonly { title: string; value: string; state: 'complete' | 'current' | 'upcoming' }[] {
  const sectionSteps = sections.map((section, index) => ({
    title: section.label,
    value: `${section.fields.length} safe fields available`,
    state: 'complete' as const,
    index,
  }));

  if (sectionSteps.length > 0) {
    return sectionSteps.map(({ title, value }) => ({ title, value, state: 'complete' }));
  }

  const roleLabel =
    ONBOARDING_PROFILE_TYPE_LABELS[profileType as keyof typeof ONBOARDING_PROFILE_TYPE_LABELS] ??
    'Business';

  return [
    { title: `${roleLabel} profile`, value: 'Profile information', state: 'complete' },
    { title: 'Business details', value: 'Role-specific details', state: 'upcoming' },
    { title: 'Verification', value: 'Documents and declarations', state: 'upcoming' },
    { title: 'Review and submit', value: 'Final onboarding confirmation', state: 'upcoming' },
  ];
}

export function OnboardingDetailView({ onboardingPublicId }: OnboardingDetailViewProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');
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

  const progressPercent = getProgressPercent(record.status, record.dataSectionCount);
  const workflowSteps = getWorkflowSteps(record.profileType, record.dataSections);

  return (
    <PageShell
      breadcrumbs={[
        { href: '/onboarding', label: 'Onboarding' },
        { current: true, label: record.email },
      ]}
      description="Review onboarding progress, account context, and verification readiness."
      title="Onboarding"
    >
      <div className={styles.detailWorkspace}>
        <aside className={styles.summaryPanel} aria-label="Onboarding record summary">
          <div className={styles.summaryHero}>
            <div aria-hidden="true" className={styles.summaryAvatar}>
              {getInitials(record.email)}
            </div>
            <div className={styles.summaryIdentity}>
              <h2 className={styles.summaryName}>{record.email}</h2>
              <p className={styles.summarySubtitle}>
                {ONBOARDING_PROFILE_TYPE_LABELS[record.profileType]} onboarding
              </p>
            </div>
            <div className={styles.summaryBadges}>
              <Badge tone={statusTone(record.status)}>
                {ONBOARDING_STATUS_LABELS[record.status]}
              </Badge>
              <Badge tone={verificationTone(record.verificationStatus)}>
                {ONBOARDING_VERIFICATION_LABELS[record.verificationStatus]}
              </Badge>
            </div>
          </div>

          <div className={styles.summaryRows}>
            <SummaryRow label="Current step" value={record.currentStep ?? 'Not started'} />
            <SummaryRow label="Created" value={record.createdAtLabel} />
            <SummaryRow label="Last updated" value={record.updatedAtLabel} />
            <SummaryRow label="Submitted" value={record.submittedAtLabel ?? 'Not submitted'} />
            <SummaryRow label="User public ID" value={record.userPublicId} mono />
          </div>

          <div className={styles.summaryActions}>
            <Button
              href={`/users/${encodeURIComponent(record.userPublicId)}`}
              fullWidth
              variant="secondary"
            >
              View user record
            </Button>
            <Button href="/onboarding" fullWidth variant="ghost">
              Back to onboarding
            </Button>
          </div>
        </aside>

        <main className={styles.mainPanel}>
          <nav aria-label="Onboarding detail sections" className={styles.tabList}>
            {DETAIL_TABS.map((tab) => (
              <button
                aria-current={activeTab === tab.id ? 'page' : undefined}
                className={`${styles.tabButton} ${activeTab === tab.id ? styles.tabActive : ''}`}
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className={styles.tabPanel}>
            {activeTab === 'overview' ? (
              <OverviewPanel
                currentStep={record.currentStep}
                progressPercent={progressPercent}
                status={record.status}
                workflowSteps={workflowSteps}
              />
            ) : null}
            {activeTab === 'account' ? <AccountPanel record={record} /> : null}
            {activeTab === 'data' ? <DataPanel sections={record.dataSections} /> : null}
            {activeTab === 'verification' ? (
              <VerificationPanel
                status={record.verificationStatus}
                submittedAt={record.submittedAtLabel}
              />
            ) : null}
          </div>
        </main>
      </div>
    </PageShell>
  );
}

function SummaryRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className={styles.summaryRow}>
      <span className={styles.summaryLabel}>{label}</span>
      <span className={`${styles.summaryValue} ${mono ? styles.summaryMono : ''}`}>{value}</span>
    </div>
  );
}

function OverviewPanel({
  currentStep,
  progressPercent,
  status,
  workflowSteps,
}: {
  currentStep?: string;
  progressPercent: number;
  status: OnboardingStatus;
  workflowSteps: readonly {
    title: string;
    value: string;
    state: 'complete' | 'current' | 'upcoming';
  }[];
}) {
  return (
    <div className={styles.panelStack}>
      <section className={styles.progressSection}>
        <div className={styles.panelHeading}>
          <div>
            <h2 className={styles.panelTitle}>Onboarding</h2>
            <p className={styles.panelDescription}>
              Follow the record through the role-specific onboarding workflow.
            </p>
          </div>
          <strong className={styles.progressPercent}>{progressPercent}% completed</strong>
        </div>
        <div
          aria-label={`${progressPercent}% completed`}
          className={styles.progressBar}
          role="progressbar"
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={progressPercent}
        >
          <span className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
        </div>
        <div className={styles.progressSteps}>
          {workflowSteps.map((step, index) => (
            <div className={styles.progressStep} key={`${step.title}-${index}`}>
              <div
                className={`${styles.stepMarker} ${styles[`step${step.state[0].toUpperCase()}${step.state.slice(1)}`]}`}
              >
                {step.state === 'complete' ? '✓' : index + 1}
              </div>
              <div className={styles.stepContent}>
                <strong className={styles.stepTitle}>{step.title}</strong>
                <span className={styles.stepValue}>{step.value}</span>
                <span className={styles.stepMeta}>
                  {step.state === 'complete'
                    ? 'Complete'
                    : step.state === 'current'
                      ? (currentStep ?? 'Current step')
                      : status === 'in_progress'
                        ? 'Not started'
                        : 'Awaiting workflow progress'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function AccountPanel({
  record,
}: {
  record: NonNullable<ReturnType<typeof useOnboardingDetail>['data']>;
}) {
  return (
    <section className={styles.panelStack}>
      <div className={styles.panelHeading}>
        <div>
          <span className={styles.tabEyebrow}>Record context</span>
          <h2 className={styles.panelTitle}>Account information</h2>
          <p className={styles.panelDescription}>
            Read-only identity and lifecycle information returned with this onboarding record.
          </p>
        </div>
      </div>
      <div className={styles.infoSections}>
        <section className={styles.infoSection}>
          <div className={styles.infoSectionHeading}>
            <div>
              <h3 className={styles.infoSectionTitle}>Identity and role</h3>
              <p className={styles.infoSectionDescription}>
                The account and business context associated with this record.
              </p>
            </div>
            <Badge tone="info">Read only</Badge>
          </div>
          <div className={styles.accountGrid}>
            <MetadataItem label="Email address" value={record.email} />
            <MetadataItem
              label="Profile type"
              value={ONBOARDING_PROFILE_TYPE_LABELS[record.profileType]}
            />
            <MetadataItem
              label="Business profile type"
              value={ONBOARDING_PROFILE_TYPE_LABELS[record.businessProfileType]}
            />
            <MetadataItem label="User public ID" value={record.userPublicId} />
            <MetadataItem label="Onboarding public ID" value={record.onboardingPublicId} />
          </div>
        </section>

        <section className={styles.infoSection}>
          <div className={styles.infoSectionHeading}>
            <div>
              <h3 className={styles.infoSectionTitle}>Lifecycle</h3>
              <p className={styles.infoSectionDescription}>
                Timeline and workflow state supplied by the backend.
              </p>
            </div>
            <Badge tone={statusTone(record.status)}>
              {ONBOARDING_STATUS_LABELS[record.status]}
            </Badge>
          </div>
          <div className={styles.accountGrid}>
            <MetadataItem label="Current step" value={record.currentStep ?? 'Not started'} />
            <MetadataItem label="Created" value={record.createdAtLabel} />
            <MetadataItem label="Last updated" value={record.updatedAtLabel} />
            <MetadataItem label="Submitted" value={record.submittedAtLabel ?? 'Not submitted'} />
            <MetadataItem label="Completed" value={record.completedAtLabel ?? 'Not completed'} />
          </div>
        </section>
      </div>
    </section>
  );
}

function DataPanel({ sections }: { sections: readonly OnboardingDataSection[] }) {
  return (
    <section className={styles.panelStack}>
      <div className={styles.panelHeading}>
        <div>
          <span className={styles.tabEyebrow}>Role-specific submission</span>
          <h2 className={styles.panelTitle}>Onboarding data</h2>
          <p className={styles.panelDescription}>
            Review the safe fields submitted for this user’s business role. Sensitive document and
            financial values are intentionally excluded.
          </p>
        </div>
        <Badge tone="info">{sections.length} sections</Badge>
      </div>
      {sections.length > 0 ? (
        <div className={styles.dataSections}>
          {sections.map((section, index) => (
            <details className={styles.dataSection} key={section.key} open={index === 0}>
              <summary className={styles.dataSectionSummary}>
                <span>
                  <strong>{section.label}</strong>
                  <small>{section.fields.length} safe fields available</small>
                </span>
                <span aria-hidden="true" className={styles.dataSectionChevron} />
              </summary>
              <div className={styles.dataSectionBody}>
                <div className={styles.fieldGrid}>
                  {section.fields.map((field) => (
                    <div className={styles.field} key={`${section.key}-${field.label}`}>
                      <span className={styles.fieldLabel}>{field.label}</span>
                      <span className={styles.fieldValue}>{field.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      ) : (
        <Alert title="No safe onboarding fields available" tone="neutral">
          The backend returned no displayable non-sensitive nested fields for this record.
        </Alert>
      )}
    </section>
  );
}

function VerificationPanel({
  status,
  submittedAt,
}: {
  status: OnboardingVerificationStatus;
  submittedAt?: string;
}) {
  return (
    <section className={styles.panelStack}>
      <div className={styles.panelHeading}>
        <div>
          <h2 className={styles.panelTitle}>Verification</h2>
          <p className={styles.panelDescription}>
            Verification remains a separate review decision from onboarding completion.
          </p>
        </div>
        <Badge tone={verificationTone(status)}>{ONBOARDING_VERIFICATION_LABELS[status]}</Badge>
      </div>
      <div className={styles.verificationNotice}>
        <strong>Current verification state</strong>
        <span>
          {status === 'pending'
            ? 'This onboarding record is complete or submitted and is awaiting verification review.'
            : 'The backend verification state is shown here for staff context.'}
        </span>
      </div>
      <div className={styles.accountGrid}>
        <MetadataItem label="Verification status" value={ONBOARDING_VERIFICATION_LABELS[status]} />
        <MetadataItem label="Submitted at" value={submittedAt ?? 'Not submitted'} />
      </div>
    </section>
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
    <PageShell description="Loading onboarding record details." title="Onboarding">
      <div aria-busy="true" className={styles.detailWorkspace}>
        <aside className={styles.summaryPanel}>
          <div className={styles.summaryHero}>
            <Skeleton height="5.75rem" rounded width="5.75rem" />
            <div className={styles.skeletonStack}>
              <Skeleton height="1rem" width="12rem" />
              <Skeleton height="0.75rem" width="9rem" />
            </div>
            <div className={styles.detailBadges}>
              <Skeleton height="1.5rem" rounded width="5rem" />
              <Skeleton height="1.5rem" rounded width="6rem" />
            </div>
          </div>
          <div className={styles.summaryRows}>
            {Array.from({ length: 5 }, (_, index) => (
              <div className={styles.summaryRow} key={index}>
                <Skeleton height="0.7rem" width="5rem" />
                <Skeleton height="0.8rem" width="8rem" />
              </div>
            ))}
          </div>
        </aside>
        <section className={styles.mainPanel}>
          <div className={styles.skeletonTabs}>
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton height="2.8rem" key={index} width="8rem" />
            ))}
          </div>
          <div className={styles.tabPanel}>
            <div className={styles.skeletonStack}>
              <Skeleton height="1.4rem" width="12rem" />
              <Skeleton height="0.8rem" width="26rem" />
              <Skeleton height="0.8rem" width="100%" />
            </div>
            <div className={styles.skeletonStepGrid}>
              {Array.from({ length: 4 }, (_, index) => (
                <div className={styles.skeletonStep} key={index}>
                  <Skeleton height="1.75rem" rounded width="1.75rem" />
                  <Skeleton height="0.8rem" width="8rem" />
                  <Skeleton height="0.7rem" width="6rem" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
