/*
 * app/verification/[verificationType]/page.tsx
 *
 * File purpose:
 * Provides the type-specific Verification workspace route while backend
 * verification endpoints and payloads are being confirmed.
 *
 * Role in the project:
 * This dynamic route keeps the sidebar links navigable for onboarding,
 * properties, payments, API partners, property transactions, and queries.
 *
 * Business relevance:
 * Each verification type owns its review workflow while sharing common
 * attention, assignment, document, query, and audit concepts.
 *
 * Security note:
 * This route renders no records or sensitive verification evidence until the
 * backend authorizes and supplies the corresponding data.
 */

import { BackendPendingPage } from '../../../src/components/layout/page-shell/backend-pending-page';

const VERIFICATION_WORKSPACES: Record<string, { title: string; description: string }> = {
  onboarding: {
    title: 'Onboarding verification',
    description: 'Review manual verification work connected to onboarding records.',
  },
  properties: {
    title: 'Property verification',
    description: 'Review manual verification work connected to property records.',
  },
  payments: {
    title: 'Payment verification',
    description: 'Review payment evidence and payment verification workflows.',
  },
  'api-partners': {
    title: 'API Partner verification',
    description: 'Review verification work connected to API Partner access.',
  },
  'property-transactions': {
    title: 'Property Transaction verification',
    description: 'Review verification work connected to property transaction cases.',
  },
  queries: {
    title: 'Verification Queries',
    description: 'Review verification queries requiring customer or staff action.',
  },
};

interface VerificationTypePageProps {
  params: Promise<{ verificationType: string }>;
}

export default async function VerificationTypePage({ params }: VerificationTypePageProps) {
  const { verificationType } = await params;
  const workspace = VERIFICATION_WORKSPACES[verificationType] ?? {
    title: 'Verification workspace',
    description: 'Review a selected manual verification workspace.',
  };

  return (
    <BackendPendingPage
      backendScope={`Verification ${verificationType}`}
      description={workspace.description}
      plannedWork={[
        'Backend-backed filters for status, assignment, priority, and attention state',
        'Safe record detail navigation using public identifiers',
        'Document versions, correction queries, and review history',
        'Role-aware review actions after backend contract confirmation',
      ]}
      title={workspace.title}
    />
  );
}
