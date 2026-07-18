// app/properties/[propertyPublicId]/page.tsx

import { Badge } from '../../../src/components/ui/badge/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../src/components/ui/card/card';
import { ManagementDetailPage } from '../../../src/components/layout/page-shell/management-detail-page';
import { getDemoProperty } from '../../../src/lib/demo/management-demo-data';

export interface PropertyDetailPageProps {
  params: Promise<{ propertyPublicId: string }>;
}

function getStatusTone(status: string) {
  if (status === 'approved') return 'success';
  if (status === 'rejected' || status === 'suspended') return 'danger';
  if (status === 'submitted' || status === 'under_review' || status === 'correction_requested') return 'warning';
  return 'neutral';
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { propertyPublicId } = await params;
  const property = getDemoProperty(propertyPublicId);

  return (
    <ManagementDetailPage
      description="Property overview with source, documents, listings, reservations, and activity workflows."
      links={[
        { label: 'Documents', href: `/properties/${property.propertyPublicId}/documents` },
        { label: 'Listings', href: `/properties/${property.propertyPublicId}/listings` },
        { label: 'Activities', href: `/properties/${property.propertyPublicId}/activities` },
        { label: 'All properties', href: '/properties' },
      ]}
      publicId={property.propertyPublicId}
      recordLabel={property.locationLabel}
      recordName={property.title}
      status={property.status.replace(/_/g, ' ')}
      statusTone={getStatusTone(property.status)}
      summary={property.summary}
      title="Property detail"
    >
      <section aria-label="Property related records" className="asancha-card-grid">
        <RelatedCard label="Documents" value={property.relatedSummary.documentsCount} href={`/properties/${property.propertyPublicId}/documents`} />
        <RelatedCard label="Listings" value={property.relatedSummary.listingsCount} href={`/properties/${property.propertyPublicId}/listings`} />
        <RelatedCard label="Reservations" value={property.relatedSummary.reservationsCount} href="/deal-reservations" />
        <RelatedCard label="Activities" value={property.relatedSummary.activitiesCount} href={`/properties/${property.propertyPublicId}/activities`} />
      </section>

      <Card>
        <CardHeader><CardTitle>Property workflow status</CardTitle></CardHeader>
        <CardContent>
          <div className="asancha-cluster">
            <Badge tone="info">Source: {property.sourceLabel}</Badge>
            <Badge tone="warning">Documents: {property.documentStatus.replace(/_/g, ' ')}</Badge>
            <Badge tone="success">Listing: {property.listingStatus.replace(/_/g, ' ')}</Badge>
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
