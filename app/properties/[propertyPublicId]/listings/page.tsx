// app/properties/[propertyPublicId]/listings/page.tsx

import { ListingsTable } from '../../../../src/components/listings/listings-table';
import { ManagementDetailPage } from '../../../../src/components/layout/page-shell/management-detail-page';
import { DEMO_LISTINGS, getDemoProperty } from '../../../../src/lib/demo/management-demo-data';

export interface PropertyListingsPageProps {
  params: Promise<{ propertyPublicId: string }>;
}

export default async function PropertyListingsPage({ params }: PropertyListingsPageProps) {
  const { propertyPublicId } = await params;
  const property = getDemoProperty(propertyPublicId);
  const listings = DEMO_LISTINGS.filter(
    (listing) => listing.propertyPublicId === property.propertyPublicId,
  );

  return (
    <ManagementDetailPage
      description="Listings connected to this property with lifecycle, review, visibility, and reservation state."
      links={[
        { label: 'Property overview', href: `/properties/${property.propertyPublicId}` },
        { label: 'Documents', href: `/properties/${property.propertyPublicId}/documents` },
        { label: 'All listings', href: '/listings' },
      ]}
      publicId={property.propertyPublicId}
      recordLabel="Property listings"
      recordName={property.title}
      status={`${listings.length} demo listings`}
      statusTone="info"
      summary="Listing relationships are keyed by property public ID and reuse the global Listings table contract."
      title="Property listings"
    >
      <ListingsTable listings={listings.length > 0 ? listings : DEMO_LISTINGS.slice(0, 1)} />
    </ManagementDetailPage>
  );
}
