// app/review-queues/verification-reviews/page.tsx

import { VerificationReviewsTable } from '../../../src/components/verification-reviews/verification-reviews-table';
import { ManagementListPage } from '../../../src/components/layout/page-shell/management-list-page';
import { DEMO_VERIFICATION_REVIEWS } from '../../../src/lib/demo/management-demo-data';

export default function VerificationReviewQueuePage() {
  const reviews = DEMO_VERIFICATION_REVIEWS.filter((review) => review.status !== 'approved');

  return (
    <ManagementListPage
      description="Verification review queue for profile, company, property, and service-provider trust workflows."
      filters={[
        { label: 'All reviews', href: '/verification-reviews' },
        { label: 'Pending', href: '/verification-reviews?status=pending' },
        { label: 'Correction required', href: '/verification-reviews?status=correction_required' },
      ]}
      metrics={[
        {
          label: 'Queue records',
          value: String(reviews.length),
          detail: 'Demo reviews requiring action',
          tone: 'warning',
        },
        { label: 'High risk', value: '1', detail: 'Priority risk review', tone: 'danger' },
        { label: 'Unassigned', value: '1', detail: 'Needs staff assignment', tone: 'info' },
        {
          label: 'Approved outside queue',
          value: '1',
          detail: 'Completed verification record',
          tone: 'success',
        },
      ]}
      title="Verification review queue"
      totalLabel={`${reviews.length} queued reviews`}
    >
      <VerificationReviewsTable reviews={reviews} />
    </ManagementListPage>
  );
}
