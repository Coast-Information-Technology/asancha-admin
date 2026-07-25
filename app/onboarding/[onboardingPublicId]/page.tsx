/*
 * app/onboarding/[onboardingPublicId]/page.tsx
 *
 * File purpose:
 * Provides the Next.js App Router entry point for one Admin Onboarding detail
 * record.
 *
 * Role in the project:
 * This route receives the onboarding public ID from the URL and delegates the
 * live record display to the shared OnboardingDetailView component.
 *
 * Business relevance:
 * Authorised staff use this page to inspect onboarding progress, verification
 * readiness, timestamps, and safe role-specific workflow data.
 *
 * Security note:
 * The route uses public IDs only. Backend authorization and the onboarding API
 * normalization layer remain responsible for access control and redaction.
 */

import { OnboardingDetailView } from '../../../src/components/onboarding/onboarding-detail-view';

interface OnboardingDetailPageProps {
  params: Promise<{ onboardingPublicId: string }>;
}

export default async function OnboardingDetailPage({ params }: OnboardingDetailPageProps) {
  const { onboardingPublicId } = await params;

  return <OnboardingDetailView onboardingPublicId={onboardingPublicId} />;
}
