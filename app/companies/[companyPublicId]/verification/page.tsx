// app/companies/[companyPublicId]/verification/page.tsx

import { VerificationReviewsTable } from '../../../../src/components/verification-reviews/verification-reviews-table';
import { ManagementDetailPage } from '../../../../src/components/layout/page-shell/management-detail-page';
import {
  DEMO_VERIFICATION_REVIEWS,
  getDemoCompany,
} from '../../../../src/lib/demo/management-demo-data';

export interface CompanyVerificationPageProps {
  params: Promise<{ companyPublicId: string }>;
}

export default async function CompanyVerificationPage({ params }: CompanyVerificationPageProps) {
  const { companyPublicId } = await params;
  const company = getDemoCompany(companyPublicId);
  const reviews = DEMO_VERIFICATION_REVIEWS.filter(
    (review) => review.targetSummary.targetPublicId === company.companyPublicId,
  );

  return (
    <ManagementDetailPage
      description="Company verification reviews with target, risk, priority, and assignment context."
      links={[
        { label: 'Company overview', href: `/companies/${company.companyPublicId}` },
        { label: 'Members', href: `/companies/${company.companyPublicId}/members` },
        { label: 'Documents', href: `/companies/${company.companyPublicId}/documents` },
        { label: 'All verification reviews', href: '/verification-reviews' },
      ]}
      publicId={company.companyPublicId}
      recordLabel="Company verification"
      recordName={company.companyName}
      status={company.verificationStatus.replace(/_/g, ' ')}
      statusTone={
        company.verificationStatus === 'approved'
          ? 'success'
          : company.verificationStatus === 'flagged'
            ? 'danger'
            : 'warning'
      }
      summary="Verification records are connected to the company public ID and use the global verification review contract."
      title="Company verification"
    >
      <VerificationReviewsTable
        reviews={reviews.length > 0 ? reviews : DEMO_VERIFICATION_REVIEWS.slice(0, 1)}
      />
    </ManagementDetailPage>
  );
}
