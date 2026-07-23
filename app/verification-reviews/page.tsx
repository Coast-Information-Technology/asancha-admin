// app/verification-reviews/page.tsx

import { VerificationReviewsTable } from '../../src/components/verification-reviews/verification-reviews-table';
import {
  ManagementListPage,
  type ManagementListMetric,
} from '../../src/components/layout/page-shell/management-list-page';
import { DEMO_VERIFICATION_REVIEWS } from '../../src/lib/demo/management-demo-data';

const metrics: readonly ManagementListMetric[] = [
  {
    label: 'All reviews',
    value: '4',
    detail: 'Profile, company, property, and provider reviews',
    tone: 'info',
  },
  {
    label: 'Pending or in review',
    value: '2',
    detail: 'Awaiting or receiving staff assessment',
    tone: 'warning',
  },
  { label: 'Approved', value: '1', detail: 'Verification workflow completed', tone: 'success' },
  {
    label: 'High risk or critical',
    value: '1',
    detail: 'Requires priority operational attention',
    tone: 'danger',
  },
];

export default function VerificationReviewsPage() {
  return (
    <ManagementListPage
      description="All verification reviews with target, risk, priority, assignment, and related workflow context."
      filters={[
        { label: 'Pending', href: '/verification-reviews?status=pending' },
        { label: 'In review', href: '/verification-reviews?status=in_review' },
        { label: 'Correction required', href: '/verification-reviews?status=correction_required' },
        { label: 'Status view', href: '/verification-reviews/status' },
      ]}
      metrics={metrics}
      title="Verification reviews"
      totalLabel="4 reviews"
    >
      <VerificationReviewsTable reviews={DEMO_VERIFICATION_REVIEWS} />
    </ManagementListPage>
  );
}
