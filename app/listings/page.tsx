// app/listings/page.tsx

import { ListingsTable } from '../../src/components/listings/listings-table';
import {
  ManagementListPage,
  type ManagementListMetric,
} from '../../src/components/layout/page-shell/management-list-page';
import { DEMO_LISTINGS } from '../../src/lib/demo/management-demo-data';

const metrics: readonly ManagementListMetric[] = [
  { label: 'All listings', value: '4', detail: 'Marketplace-facing demo records', tone: 'info' },
  { label: 'Published', value: '1', detail: 'Publicly visible listing', tone: 'success' },
  {
    label: 'In review',
    value: '2',
    detail: 'Review or publication checks active',
    tone: 'warning',
  },
  { label: 'Reserved', value: '1', detail: 'Connected to a deal reservation', tone: 'danger' },
];

export default function ListingsPage() {
  return (
    <ManagementListPage
      description="All listings with connected property, review, visibility, reservation, and value context."
      filters={[
        { label: 'Submitted or review', href: '/listings?status=under_review' },
        { label: 'Published', href: '/listings?status=published' },
        { label: 'Reserved', href: '/listings?status=reserved' },
        { label: 'Visibility review', href: '/listings?view=visibility' },
      ]}
      metrics={metrics}
      title="Listings"
      totalLabel="4 listings"
    >
      <ListingsTable listings={DEMO_LISTINGS} />
    </ManagementListPage>
  );
}
