// app/review-queues/listings/page.tsx

import { ListingsTable } from '../../../src/components/listings/listings-table';
import { ManagementListPage } from '../../../src/components/layout/page-shell/management-list-page';
import { DEMO_LISTINGS } from '../../../src/lib/demo/management-demo-data';

export default function ListingReviewQueuePage() {
  const listings = DEMO_LISTINGS.filter((listing) => listing.status !== 'published');

  return (
    <ManagementListPage
      description="Listing submission, visibility, publication, and lifecycle review queue."
      filters={[{ label: 'All listings', href: '/listings' }, { label: 'Under review', href: '/listings?status=under_review' }, { label: 'Reserved', href: '/listings?status=reserved' }]}
      metrics={[{ label: 'Queue records', value: String(listings.length), detail: 'Demo listings requiring review', tone: 'warning' }, { label: 'Review active', value: '2', detail: 'Publication checks active', tone: 'info' }, { label: 'Reserved', value: '1', detail: 'Connected reservation workflow', tone: 'danger' }, { label: 'Published outside queue', value: '1', detail: 'Public listing record', tone: 'success' }]}
      title="Listing review queue"
      totalLabel={`${listings.length} queued listings`}
    >
      <ListingsTable listings={listings} />
    </ManagementListPage>
  );
}
