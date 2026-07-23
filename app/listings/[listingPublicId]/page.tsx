// app/listings/[listingPublicId]/page.tsx

import { Badge } from '../../../src/components/ui/badge/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../src/components/ui/card/card';
import { ManagementDetailPage } from '../../../src/components/layout/page-shell/management-detail-page';
import { getDemoListing } from '../../../src/lib/demo/management-demo-data';

export interface ListingDetailPageProps {
  params: Promise<{ listingPublicId: string }>;
}

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const { listingPublicId } = await params;
  const listing = getDemoListing(listingPublicId);

  return (
    <ManagementDetailPage
      description="Listing lifecycle detail with connected property, review, visibility, reservation, activities, and audit workflows."
      links={[
        {
          label: 'Connected property',
          href: `/properties/${listing.propertySummary.propertyPublicId}`,
        },
        { label: 'Review', href: `/listings/${listing.listingPublicId}/review` },
        { label: 'Visibility', href: `/listings/${listing.listingPublicId}/visibility` },
        { label: 'Activities', href: `/listings/${listing.listingPublicId}/activities` },
        { label: 'Audit', href: `/listings/${listing.listingPublicId}/audit` },
        { label: 'All listings', href: '/listings' },
      ]}
      publicId={listing.listingPublicId}
      recordLabel={listing.propertySummary.locationLabel}
      recordName={listing.title}
      status={listing.status.replace(/_/g, ' ')}
      statusTone={
        listing.status === 'published'
          ? 'success'
          : listing.status === 'reserved'
            ? 'danger'
            : 'warning'
      }
      summary={listing.summary}
      title="Listing detail"
    >
      <section aria-label="Listing workflow state" className="asancha-card-grid">
        <MetaCard label="Property" value={listing.propertySummary.propertyTitleLabel} />
        <MetaCard label="Review" value={listing.reviewStatus.replace(/_/g, ' ')} />
        <MetaCard label="Visibility" value={listing.visibilityStatus.replace(/_/g, ' ')} />
        <MetaCard label="Reservation" value={listing.reservationStatus.replace(/_/g, ' ')} />
        <MetaCard label="Value" value={listing.priceLabel ?? 'Not provided'} />
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Publication readiness</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="asancha-cluster">
            <Badge tone={listing.reviewStatus === 'approved' ? 'success' : 'warning'}>
              Review: {listing.reviewStatus.replace(/_/g, ' ')}
            </Badge>
            <Badge tone={listing.visibilitySummary.isPubliclyVisible ? 'success' : 'neutral'}>
              Publicly visible: {listing.visibilitySummary.isPubliclyVisible ? 'Yes' : 'No'}
            </Badge>
            <Badge tone="info">{listing.activitySummary.total} activity events</Badge>
            <Badge tone="danger">
              {listing.auditSummary.highRiskActionsCount} high-impact actions
            </Badge>
          </div>
        </CardContent>
      </Card>
    </ManagementDetailPage>
  );
}

function MetaCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <strong>{value}</strong>
      </CardContent>
    </Card>
  );
}
