// app/properties/page.tsx

import { PropertiesTable } from '../../src/components/properties/properties-table';
import {
  ManagementListPage,
  type ManagementListMetric,
} from '../../src/components/layout/page-shell/management-list-page';
import { DEMO_PROPERTIES } from '../../src/lib/demo/management-demo-data';

const metrics: readonly ManagementListMetric[] = [
  { label: 'All properties', value: '5', detail: 'Submitted demo property records', tone: 'info' },
  { label: 'Ready or approved', value: '2', detail: 'Eligible for listing workflows', tone: 'success' },
  { label: 'In review', value: '2', detail: 'Property or document review active', tone: 'warning' },
  { label: 'Correction required', value: '1', detail: 'User or source action needed', tone: 'danger' },
];

export default function PropertiesPage() {
  return (
    <ManagementListPage
      description="All properties with source, document, listing, company, and lifecycle context."
      filters={[
        { label: 'Submitted', href: '/properties?status=submitted' },
        { label: 'Under review', href: '/properties?status=under_review' },
        { label: 'Approved', href: '/properties?status=approved' },
        { label: 'Correction required', href: '/properties?status=correction_requested' },
      ]}
      metrics={metrics}
      title="Properties"
      totalLabel="5 properties"
    >
      <PropertiesTable properties={DEMO_PROPERTIES} />
    </ManagementListPage>
  );
}
