// app/verification-reviews/[verificationReviewPublicId]/page.tsx

import { Badge } from '../../../src/components/ui/badge/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../src/components/ui/card/card';
import { ManagementDetailPage } from '../../../src/components/layout/page-shell/management-detail-page';
import { getDemoVerificationReview } from '../../../src/lib/demo/management-demo-data';

export interface VerificationReviewDetailPageProps {
  params: Promise<{ verificationReviewPublicId: string }>;
}

export default async function VerificationReviewDetailPage({ params }: VerificationReviewDetailPageProps) {
  const { verificationReviewPublicId } = await params;
  const review = getDemoVerificationReview(verificationReviewPublicId);

  return (
    <ManagementDetailPage
      description="Verification review detail with target, risk, documents, messages, and audit workflows."
      links={[
        { label: 'Documents', href: `/verification-reviews/${review.verificationReviewPublicId}/documents` },
        { label: 'Messages', href: `/verification-reviews/${review.verificationReviewPublicId}/messages` },
        { label: 'Review action', href: `/verification-reviews/${review.verificationReviewPublicId}/review` },
        { label: 'Audit', href: `/verification-reviews/${review.verificationReviewPublicId}/audit` },
        { label: 'All verification reviews', href: '/verification-reviews' },
      ]}
      publicId={review.verificationReviewPublicId}
      recordLabel={review.targetSummary.targetType.replace(/_/g, ' ')}
      recordName={review.title}
      status={review.status.replace(/_/g, ' ')}
      statusTone={review.status === 'approved' ? 'success' : review.status === 'rejected' ? 'danger' : 'warning'}
      summary={review.safeSummary}
      title="Verification review detail"
    >
      <section aria-label="Verification review context" className="asancha-card-grid">
        <MetaCard label="Target" value={review.targetSummary.targetLabel} />
        <MetaCard label="Target public ID" value={review.targetSummary.targetPublicId} />
        <MetaCard label="Risk rating" value={review.riskRating} />
        <MetaCard label="Priority" value={review.priority} />
        <MetaCard label="Assigned to" value={review.assignedToLabel ?? 'Unassigned'} />
        <MetaCard label="Documents" value={`${review.documentSummary.total} related`} />
        <MetaCard label="Open message threads" value={String(review.messageSummary.openThreads)} />
        <MetaCard label="High-impact audit actions" value={String(review.auditSummary.highImpactActionsCount)} />
      </section>

      <Card>
        <CardHeader><CardTitle>Safe review context</CardTitle></CardHeader>
        <CardContent>
          <div className="asancha-cluster">
            <Badge tone="info">Target: {review.targetSummary.targetPublicId}</Badge>
            <Badge tone={review.riskRating === 'high' || review.riskRating === 'critical' ? 'danger' : 'warning'}>Risk: {review.riskRating}</Badge>
            <Badge tone="neutral">{review.messageSummary.unreadThreads} unread thread(s)</Badge>
          </div>
        </CardContent>
      </Card>
    </ManagementDetailPage>
  );
}

function MetaCard({ label, value }: { label: string; value: string }) {
  return <Card><CardHeader><CardTitle>{label}</CardTitle></CardHeader><CardContent><strong>{value}</strong></CardContent></Card>;
}
