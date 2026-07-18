// app/profiles/[profilePublicId]/page.tsx

import { Badge } from '../../../src/components/ui/badge/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../src/components/ui/card/card';
import { ManagementDetailPage } from '../../../src/components/layout/page-shell/management-detail-page';
import { getDemoProfile } from '../../../src/lib/demo/management-demo-data';

export interface ProfileDetailPageProps {
  params: Promise<{ profilePublicId: string }>;
}

function getStatusTone(status: string) {
  if (status === 'approved') return 'success';
  if (status === 'rejected' || status === 'suspended') return 'danger';
  if (status === 'pending' || status === 'under_review' || status === 'correction_requested') return 'warning';
  return 'neutral';
}

export default async function ProfileDetailPage({ params }: ProfileDetailPageProps) {
  const { profilePublicId } = await params;
  const profile = getDemoProfile(profilePublicId);

  return (
    <ManagementDetailPage
      description="Business profile detail with related user, company, property, listing, document, and verification workflows."
      links={[
        { label: 'Related user', href: `/users/${profile.userPublicId}` },
        { label: 'Related company', href: '/companies/co_demo_001' },
        { label: 'All profiles', href: '/profiles' },
        { label: 'Verification reviews', href: '/verification-reviews' },
      ]}
      publicId={profile.profilePublicId}
      recordLabel={profile.profileType.replace(/_/g, ' ')}
      recordName={profile.displayName}
      status={profile.status.replace(/_/g, ' ')}
      statusTone={getStatusTone(profile.status)}
      summary={profile.summary}
      title="Profile detail"
    >
      <section aria-label="Profile related records" className="asancha-card-grid">
        <RelatedCard label="Properties" value={profile.relatedSummary.relatedPropertiesCount} href="/properties" />
        <RelatedCard label="Listings" value={profile.relatedSummary.relatedListingsCount} href="/listings" />
        <RelatedCard label="Documents" value={profile.relatedSummary.relatedDocumentsCount} href="/documents" />
        <RelatedCard label="Verification reviews" value={profile.relatedSummary.relatedVerificationReviewsCount} href="/verification-reviews" />
      </section>

      <Card>
        <CardHeader><CardTitle>Profile context</CardTitle></CardHeader>
        <CardContent>
          <div className="asancha-cluster">
            <Badge tone="info">User: {profile.userPublicId}</Badge>
            <Badge tone={profile.verificationStatus === 'approved' ? 'success' : 'warning'}>Verification: {profile.verificationStatus.replace(/_/g, ' ')}</Badge>
            {profile.relatedSummary.relatedCompanyLabel ? <Badge tone="neutral">Company: {profile.relatedSummary.relatedCompanyLabel}</Badge> : null}
          </div>
        </CardContent>
      </Card>
    </ManagementDetailPage>
  );
}

function RelatedCard({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Card>
      <CardHeader><CardTitle>{label}</CardTitle></CardHeader>
      <CardContent><div className="asancha-cluster-between"><strong>{value}</strong><a href={href}>Open</a></div></CardContent>
    </Card>
  );
}
